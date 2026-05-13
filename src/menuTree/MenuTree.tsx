import { CSSProperties, useMemo } from "react";
import "../styles.css";
import {
  InternalTreeNode,
  TTheme,
  TreeMenuProps,
  toExternal,
} from "../types/common";
import { Header } from "../components/header/Header";
import { MenuTreeSkeleton } from "../components/skeleton/menuTree";
import {
  ChevronLeft,
  FolderIcon,
  FolderOpenIcon,
  FileTextIcon,
  PencilIcon,
  CopyIcon,
  TrashIcon,
  MoreHorizontal,
  SearchLarge,
} from "../assets/icons";
import highlighter from "../helpers/highlighter";
import { useMenuTree } from "./useMenuTree";

function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.replace("#", "");
  if (h.length < 6) return null;
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)
    ? null
    : [r, g, b];
}

function rgba(hex: string, alpha: number): string | null {
  const rgb = hexToRgb(hex);
  return rgb ? `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})` : null;
}

function themeToVars(theme?: TTheme): CSSProperties | undefined {
  if (!theme) return undefined;
  const v: Record<string, string> = {};
  const c = theme.colors;
  if (c?.white) {
    v["--rmt-white"] = c.white;
    v["--rmt-white-50"] = rgba(c.white, 0.5) ?? v["--rmt-white-50"];
  }
  if (c?.white_200) v["--rmt-white-200"] = c.white_200;
  if (c?.white_300) v["--rmt-white-300"] = c.white_300;
  if (c?.white_500) v["--rmt-white-500"] = c.white_500;
  if (c?.black_100) {
    v["--rmt-black-100"] = c.black_100;
    const lc = rgba(c.black_100, 0.6);
    if (lc) v["--rmt-line-color"] = lc;
  }
  if (c?.black_200) v["--rmt-black-200"] = c.black_200;
  if (c?.black_300) v["--rmt-black-300"] = c.black_300;
  if (c?.black_400) v["--rmt-black-400"] = c.black_400;
  if (c?.primary) v["--rmt-primary"] = c.primary;
  if (c?.secondary_100) {
    v["--rmt-secondary-100"] = c.secondary_100;
    const s = rgba(c.secondary_100, 0.5);
    if (s) v["--rmt-secondary-100-50"] = s;
  }
  if (c?.tertiary) {
    v["--rmt-tertiary"] = c.tertiary;
    const t10 = rgba(c.tertiary, 0.1);
    const t13 = rgba(c.tertiary, 0.13);
    const t15 = rgba(c.tertiary, 0.15);
    if (t10) v["--rmt-tertiary-10"] = t10;
    if (t13) v["--rmt-tertiary-13"] = t13;
    if (t15) v["--rmt-tertiary-15"] = t15;
  }
  if (c?.warning) v["--rmt-warning"] = c.warning;
  const f = theme.fontSize;
  if (f?.h5) v["--rmt-font-h5"] = f.h5;
  if (f?.h6) v["--rmt-font-h6"] = f.h6;
  if (f?.h8) v["--rmt-font-h8"] = f.h8;
  const w = theme.fontWeight;
  if (w?.bold != null) v["--rmt-fw-bold"] = String(w.bold);
  if (w?.normal != null) v["--rmt-fw-normal"] = String(w.normal);
  if (w?.high != null) v["--rmt-fw-high"] = String(w.high);
  return v as CSSProperties;
}

export const MenuTree = (props: TreeMenuProps) => {
  const {
    loading,
    title,
    headerLess,
    bare = false,
    showIcon = true,
    disabled = false,
    direction = "rtl",
    onNodeCheck,
    onNodeEdit,
    onNodeCopy,
    onNodeDelete,
    onNodeMore,
    renderNodeActions,
    theme,
    translation,
  } = props;

  const hasCheckBox = !!onNodeCheck;

  const {
    nodeClickHandler,
    hiddenIds,
    nodeRef,
    selectedNode,
    toggle,
    checkboxClickHandler,
    setSearchInputValue,
    setSearchResult,
    searchInputValue,
    searchResult,
    setHiddenIds,
    setMenuItems,
    menuItems,
    totalItemCount,
    normalizedNodes,
    searchItemCounter,
    setSearchItemCounter,
  } = useMenuTree(props);

  const themeStyle = useMemo(() => themeToVars(theme), [theme]);

  const searchResultSet = useMemo(
    () => new Set(searchResult),
    [searchResult],
  );

  const hiddenIdsSet = useMemo(() => new Set(hiddenIds), [hiddenIds]);

  const activeResultId =
    searchResult.length > 0 ? searchResult[searchItemCounter] : null;

  const getHighlightedHtml = (id: string, text: string): string => {
    if (searchResultSet.size > 0 && searchResultSet.has(id)) {
      return highlighter(searchInputValue, text, id === activeResultId);
    }
    return text;
  };

  const MAX_VISIBLE_TAGS = 5;

  const renderTags = (tags: string[], nodeId: string) => {
    const visible = tags.slice(0, MAX_VISIBLE_TAGS);
    const overflow = tags.length - MAX_VISIBLE_TAGS;

    return (
      <>
        {visible.map((tag, index) => (
          <span className="rmt-tag" key={`${nodeId}-tag-${index}`}>
            <span
              dangerouslySetInnerHTML={{
                __html: getHighlightedHtml(nodeId, tag),
              }}
            />
          </span>
        ))}
        {overflow > 0 && (
          <span className="rmt-tag-overflow">+{overflow}</span>
        )}
      </>
    );
  };

  const menuEngine = (items: InternalTreeNode[], level = 0) => (
    <ul className="rmt-ul">
      {items.map((item) => {
        const hasChildren = !!item.children?.length;
        const showChildren = hasChildren && !hiddenIdsSet.has(item.id);

        return (
          <li
            key={item.id}
            className={`rmt-li ${level === 0 ? "rmt-li--l0" : "rmt-li--nested"}`}
            ref={(el) => {
              nodeRef.current[item.id] = el;
            }}
          >
            <div
              className={`rmt-node${selectedNode === item.id ? " rmt-node--selected" : ""}${activeResultId === item.id ? " rmt-node--active-result" : ""}`}
            >
              {showIcon && (
                <span
                  className={`rmt-icon ${hasChildren ? "rmt-icon--folder" : "rmt-icon--file"}`}
                >
                  {hasChildren
                    ? showChildren
                      ? <FolderOpenIcon />
                      : <FolderIcon />
                    : <FileTextIcon />}
                </span>
              )}

              {hasChildren && (
                <button
                  className={`rmt-chevron${showChildren ? " rmt-chevron--open" : ""}`}
                  onClick={() => toggle(item.id)}
                  type="button"
                >
                  <ChevronLeft />
                </button>
              )}

              {hasCheckBox && (
                <div
                  className={`rmt-checkbox rmt-checkbox--${item._checked.toLowerCase()}${disabled ? " rmt-checkbox--disabled" : ""}`}
                  onClick={() => {
                    if (!disabled) checkboxClickHandler(item.id);
                  }}
                  role="checkbox"
                  aria-checked={
                    item._checked === "FULL"
                      ? true
                      : item._checked === "HALF"
                        ? "mixed"
                        : false
                  }
                />
              )}

              <div
                className={`rmt-content${!hasCheckBox && !disabled ? " rmt-content--clickable" : ""}`}
                onClick={
                  !hasCheckBox && !disabled
                    ? () => nodeClickHandler(item)
                    : undefined
                }
              >
                <div className="rmt-title-row">
                  <span className="rmt-title">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getHighlightedHtml(item.id, item.label),
                      }}
                    />
                  </span>
                  {item.tags && item.tags.length > 0 && (
                    <div className="rmt-tags">
                      {renderTags(item.tags, item.id)}
                    </div>
                  )}
                </div>

                {item.description && (
                  <div
                    className="rmt-desc"
                    dangerouslySetInnerHTML={{
                      __html: getHighlightedHtml(item.id, item.description),
                    }}
                  />
                )}
              </div>

              {renderNodeActions ? (
                <div className="rmt-widget">
                  {renderNodeActions(toExternal(item), {
                    isExpanded: showChildren,
                    isChecked: item._checked === "FULL",
                    hasChildren,
                    level,
                  })}
                </div>
              ) : (
                <div className="rmt-actions">
                  {onNodeEdit && (
                    <button
                      className="rmt-action-btn"
                      type="button"
                      title={translation?.edit ?? "Edit"}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNodeEdit(toExternal(item));
                      }}
                    >
                      <PencilIcon />
                    </button>
                  )}
                  {onNodeCopy && (
                    <button
                      className="rmt-action-btn"
                      type="button"
                      title={translation?.copy ?? "Copy"}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNodeCopy(toExternal(item));
                      }}
                    >
                      <CopyIcon />
                    </button>
                  )}
                  {onNodeDelete && (
                    <button
                      className="rmt-action-btn"
                      type="button"
                      title={translation?.delete ?? "Delete"}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNodeDelete(toExternal(item));
                      }}
                    >
                      <TrashIcon />
                    </button>
                  )}
                  {onNodeMore && (
                    <button
                      className="rmt-action-btn"
                      type="button"
                      title={translation?.more ?? "More"}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNodeMore(toExternal(item));
                      }}
                    >
                      <MoreHorizontal />
                    </button>
                  )}
                </div>
              )}
            </div>

            {hasChildren && (
              <div
                className={`rmt-collapse${showChildren ? " rmt-collapse--open" : ""}`}
              >
                <div className="rmt-collapse-inner">
                  {menuEngine(item.children!, level + 1)}
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  const rootClass = `rmt-root${bare ? " rmt-root--bare" : ""}`;

  if (loading) {
    return (
      <div className={rootClass} dir={direction} style={themeStyle}>
        <MenuTreeSkeleton />
      </div>
    );
  }

  return (
    <div className={rootClass} dir={direction} style={themeStyle}>
      {!headerLess && (
        <Header
          nodeRef={nodeRef}
          setSearchInputValue={setSearchInputValue}
          setSearchResult={setSearchResult}
          title={title}
          hiddenIds={hiddenIds}
          searchInputValue={searchInputValue}
          searchResult={searchResult}
          nodes={normalizedNodes}
          setHiddenIds={setHiddenIds}
          setMenuItems={setMenuItems}
          menuItems={menuItems}
          searchItemCounter={searchItemCounter}
          setSearchItemCounter={setSearchItemCounter}
          translation={translation}
          direction={direction}
          totalItemCount={totalItemCount}
        />
      )}
      <div className="rmt-scroll">
        {menuItems.length > 0
          ? menuEngine(menuItems)
          : searchInputValue.trim() && (
              <div className="rmt-empty">
                <div className="rmt-empty-icon">
                  <SearchLarge />
                </div>
                <div className="rmt-empty-title">
                  {translation?.noResults ?? "No results found"}
                </div>
                <div className="rmt-empty-desc">
                  {translation?.noResultsHint ?? "Try a different search term"}
                </div>
              </div>
            )}
      </div>
      {hasCheckBox && (
        <div className="rmt-footer">
          <div className="rmt-legend">
            <span className="rmt-legend-dot rmt-legend-dot--on" />
            <span>{translation?.selected ?? "Selected"}</span>
          </div>
          <div className="rmt-legend">
            <span className="rmt-legend-dot rmt-legend-dot--off" />
            <span>{translation?.notSelected ?? "Not selected"}</span>
          </div>
        </div>
      )}
    </div>
  );
};
