import { useCallback } from "react";
import "../fonts/fonts.css";
import {
  MenuTreeMainContainer,
  Container,
  UL,
  LI,
  ArrowIcon,
  RightSide,
  LeftSide,
  Description,
  NodeContainer,
  TagsContainer,
  TreeTitle,
  Icon,
  SPAN,
} from "./style";
import { CheckBox, Badge, MenuTreeSkeleton, Header } from "../components";
import { ParentArrow } from "../assets/icons";
import highlighter from "../helpers/highlighter";
import {TChecked, TData, TMappedProperties, TMenuTreeProps} from "../types/common";
import { ThemeProvider } from "styled-components";
import DefaultTheme from "../constants/themes/defaultTheme";
import { useMenuTree } from "./useMenuTree.ts";

export const MenuTree = (props: TMenuTreeProps) => {
  const {
    data,
    leftSideWidget,
    hasCheckBox = false,
    loading,
    title = "unknown",
    headerLess,
    disabled = false,
    theme,
    translation
  } = props;

  const {
    MappedProperties,
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
  } = useMenuTree(props);

  const getHighlightedString = useCallback((
      id: number | string,
      string: string,
      type: "title" | "description" | "tag",
  ) => {
    const currentNode = false;
    switch (type) {
      case "title":
        return (
            <SPAN
                dangerouslySetInnerHTML={{
                  __html:
                      searchResult.length && searchResult.indexOf(id) !== -1
                          ? highlighter(searchInputValue, string, currentNode)
                          : string,
                }}
            />
        );
      case "description":
        return (
            <Description
                $hasCheckBox={hasCheckBox}
                dangerouslySetInnerHTML={{
                  __html:
                      searchResult.length && searchResult.indexOf(id) !== -1
                          ? highlighter(searchInputValue, string, currentNode)
                          : string,
                }}
            />
        );
      case "tag":
        return (
            <SPAN
                dangerouslySetInnerHTML={{
                  __html:
                      searchResult.length && searchResult.indexOf(id) !== -1
                          ? highlighter(searchInputValue, string, currentNode)
                          : string,
                }}
            />
        );
    }
  }, [searchResult, highlighter, searchInputValue]);

  const menuEngine = useCallback(
    (menuItems: Array<TData>) => {
      return (
        <UL>
          {menuItems.map((item) => {
            const _children = item[MappedProperties.CHILDREN] as Array<
              string | number
            >;
            const _tags = item[MappedProperties.TAGS] as Array<string | number>;
            const _id = item[MappedProperties.ID] as string | number;
            const hasChildren =
              item[MappedProperties.CHILDREN] && _children?.length !== 0;
            const showChildren = !!(
              hasChildren && hiddenIds.indexOf(_id) === -1
            );

            return (
              <LI
                key={Math.random() * Number(item[MappedProperties.ID])}
                ref={(el) => {
                  if (nodeRef?.current) {
                    // @ts-expect-error
                    return (nodeRef.current[_id] = el);
                  }
                }}
              >
                <NodeContainer
                  $selectedNode={selectedNode === item[MappedProperties.ID]}
                >
                  {hasChildren && (
                    <ArrowIcon onClick={() => toggle(_id)} $show={showChildren}>
                      <ParentArrow />
                    </ArrowIcon>
                  )}
                  <RightSide
                      $hasCheckBox={hasCheckBox}
                    onClick={() =>
                      !hasCheckBox && !disabled ? nodeClickHandler(item) : false
                    }
                  >
                    {hasCheckBox && (
                      <CheckBox
                        size="sm"
                        checked={item[MappedProperties.CHECKED] as TChecked}
                        onSelect={() =>
                          checkboxClickHandler(
                            item[MappedProperties.ID] as number | string,
                          )
                        }
                        disabled={disabled}
                      >
                        <TreeTitle>
                          {item[MappedProperties.ICON_NAME] && (
                            <Icon
                              className={String(
                                item[MappedProperties.ICON_NAME],
                              )}
                            />
                          )}
                          {getHighlightedString(
                            _id,
                            item[MappedProperties.TITLE] as string,
                            "title",
                          )}
                        </TreeTitle>
                      </CheckBox>
                    )}
                    {!hasCheckBox && (
                      <TreeTitle>
                        {item[MappedProperties.ICON_NAME] && (
                          <Icon
                            className={String(item[MappedProperties.ICON_NAME])}
                          />
                        )}
                        {getHighlightedString(
                          _id,
                          item[MappedProperties.TITLE] as string,
                          "title",
                        )}
                      </TreeTitle>
                    )}
                    {leftSideWidget &&
                      item[MappedProperties.TAGS] &&
                      _tags?.length && (
                        <TagsContainer $hasCheckBox={hasCheckBox}>
                          {_tags?.map((tag, index) => {
                            const _label = getHighlightedString(
                              _id,
                              tag as string,
                              "tag",
                            );
                            return (
                              <Badge key={Math.random() + index}>
                                {_label}
                              </Badge>
                            );
                          })}
                        </TagsContainer>
                      )}
                    {item[MappedProperties.DESCRIPTION] &&
                      getHighlightedString(
                        _id,
                        item[MappedProperties.DESCRIPTION] as string,
                        "description",
                      )}
                  </RightSide>
                  {!leftSideWidget &&
                    item[MappedProperties.TAGS] &&
                    typeof item[MappedProperties.TAGS] === "object" &&
                    _tags.length && (
                      <LeftSide>
                        {_tags.map((tag, index) => {
                          const _label = getHighlightedString(
                            _id,
                            tag as string,
                            "tag",
                          );
                          return (
                            <Badge key={Math.random() + index}>{_label}</Badge>
                          );
                        })}
                      </LeftSide>
                    )}
                  {!leftSideWidget &&
                    item[MappedProperties.TAGS] &&
                    typeof item[MappedProperties.TAGS] === "string" && (
                      <LeftSide>
                        <Badge>
                          {getHighlightedString(
                            _id,
                            item[MappedProperties.TAGS] as string,
                            "tag",
                          )}
                        </Badge>
                      </LeftSide>
                    )}
                  {leftSideWidget && (
                    <LeftSide>{leftSideWidget(item as TData)}</LeftSide>
                  )}
                </NodeContainer>

                {showChildren &&
                  menuEngine(
                    item[MappedProperties.CHILDREN] as unknown as Array<TData>,
                  )}
              </LI>
            );
          })}
        </UL>
      );
    },
    [menuItems, toggle],
  );

  return (
    <div className={"scrollable"}>
      {!loading && (
        <ThemeProvider theme={theme ?? DefaultTheme}>
          <Container>
            {!headerLess && (
              <Header
                nodeRef={nodeRef}
                setSearchInputValue={setSearchInputValue}
                setSearchResult={setSearchResult}
                title={title}
                hiddenIds={hiddenIds}
                searchInputValue={searchInputValue}
                searchResult={searchResult}
                data={data}
                setHiddenIds={setHiddenIds}
                setMenuItems={setMenuItems}
                menuItems={menuItems}
                theme={theme ?? DefaultTheme}
                mappedProperties={MappedProperties as TMappedProperties}
                translation={translation}
              />
            )}
            <MenuTreeMainContainer className={"scrollable"}>
              {menuEngine(menuItems)}
            </MenuTreeMainContainer>
          </Container>
        </ThemeProvider>
      )}
      {loading && (
        <ThemeProvider theme={theme ?? DefaultTheme}>
          <MenuTreeSkeleton />
        </ThemeProvider>
      )}
    </div>
  );
};