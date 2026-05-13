import {
  Settings,
  ExpandSmall,
  CollapseSmall,
  SearchSmall,
  Down,
  Up,
} from "../../assets/icons";
import { THeaderProps } from "../../types/common";
import { useHeader } from "./useHeader";

export const Header = (props: THeaderProps) => {
  const {
    searchInputValue,
    title,
    searchResult,
    direction,
    totalItemCount,
  } = props;

  const {
    openAllNodes,
    closeAllNodes,
    searchChangeHandler,
    searchedItemClickHandler,
    searchItemCounter,
    getTranslate,
  } = useHeader(props);

  return (
    <>
      <div className="rmt-header">
        {title && (
          <div className="rmt-header-title-section">
            <span className="rmt-header-title">{title}</span>
            <span className="rmt-header-count">
              {totalItemCount} {getTranslate("itemCount") || "item"}
            </span>
          </div>
        )}

        <div className="rmt-controls">
          <div className="rmt-search-wrap">
            <span className="rmt-search-icon">
              <SearchSmall />
            </span>
            <input
              className="rmt-search-input"
              type="text"
              dir={direction}
              placeholder={getTranslate("searchPlaceholder") || "Search..."}
              onChange={searchChangeHandler}
              value={searchInputValue}
            />
          </div>

          <div className="rmt-divider" />

          <button
            className="rmt-ghost-btn"
            type="button"
            onClick={openAllNodes}
            title={getTranslate("expandAll")}
          >
            <ExpandSmall />
            {getTranslate("expandAll")}
          </button>

          <button
            className="rmt-ghost-btn"
            type="button"
            onClick={closeAllNodes}
            title={getTranslate("collapseAll")}
          >
            <CollapseSmall />
            {getTranslate("collapseAll")}
          </button>

          <div className="rmt-divider" />

          <button
            className="rmt-ghost-icon-btn"
            type="button"
            title={getTranslate("settings")}
          >
            <Settings />
          </button>
        </div>
      </div>

      {!!searchResult?.length && (
        <div className="rmt-search-result">
          <div className="rmt-nav-btns">
            <button
              className="rmt-nav-btn"
              type="button"
              onClick={() => searchedItemClickHandler("up")}
            >
              <Up />
            </button>
            <button
              className="rmt-nav-btn"
              type="button"
              onClick={() => searchedItemClickHandler("down")}
            >
              <Down />
            </button>
          </div>
          <div className="rmt-result-msg">
            <span className="rmt-result-label">
              {getTranslate("resultCount")}:
            </span>
            <span className="rmt-result-text">
              {`${searchItemCounter + 1}/${searchResult?.length}`}
            </span>
            <span className="rmt-result-text">
              {" "}{getTranslate("result")}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
