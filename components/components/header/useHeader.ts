import { ChangeEvent, useEffect, useState } from "react";
import scrollIntoView from "scroll-into-view";
import {
  TData,
  THeaderProps,
  TScrollIntoViewSetting,
} from "../../types/common.ts";
import getPersianChar from "../../helpers/getPersianChar.ts";
import { DefaultTranslation } from "../../constants/defaultTranslation.ts";

const scrollIntoViewSetting: TScrollIntoViewSetting = {
  time: 500,
  align: {
    top: 0,
    right: 0,
    topOffset: 0,
    leftOffset: 0,
    lockX: true,
    lockY: false,
  },
  validTarget: function (target) {
    return target !== window && target.matches(".scrollable");
  },
  isScrollable: function (target, defaultIsScrollable) {
    return (
      defaultIsScrollable(target) ||
      (target !== window && ~target.className.indexOf("scrollable"))
    );
  },
  debug: false,
};

export const useHeader = (args: THeaderProps) => {
  const {
    nodeRef,
    hiddenIds,
    searchResult,
    data,
    setHiddenIds,
    setMenuItems,
    setSearchInputValue,
    menuItems,
    setSearchResult,
    mappedProperties: MappedProperties,
    translation,
  } = args;

  const [showSearchBox, toggleShowSearchBox] = useState(false);
  const [searchItemCounter, setSearchItemCounter] = useState(0);

  useEffect(() => {
    if (searchResult.length) {
      scrollIntoView(
        nodeRef?.current?.[searchResult[0]],
        scrollIntoViewSetting as keyof typeof scrollIntoView,
      );
    } else {
      scrollIntoView(
        nodeRef?.current?.[menuItems[0]?.id as unknown as string | number],
        scrollIntoViewSetting as keyof typeof scrollIntoView,
      );
    }
  }, [searchResult, showSearchBox, menuItems, nodeRef]);

  const searchedItemClickHandler = (state: "down" | "up") => {
    if (hiddenIds.length) {
      setHiddenIds([]);
    }
    if (searchResult.length) {
      if (state === "down") {
        if (searchItemCounter >= searchResult.length - 1) {
          scrollIntoView(
            nodeRef?.current[searchResult[0]],
            scrollIntoViewSetting as keyof typeof scrollIntoView,
          );

          setSearchItemCounter(0);
        } else {
          scrollIntoView(
            nodeRef?.current[searchResult[searchItemCounter + 1]],
            scrollIntoViewSetting as keyof typeof scrollIntoView,
          );

          setSearchItemCounter(searchItemCounter + 1);
        }
      }
      if (state === "up") {
        if (searchItemCounter <= 0) {
          scrollIntoView(
            nodeRef?.current[searchResult[searchResult.length - 1]],
            scrollIntoViewSetting as keyof typeof scrollIntoView,
          );

          setSearchItemCounter(searchResult.length - 1);
        } else {
          scrollIntoView(
            nodeRef?.current[searchResult[searchItemCounter - 1]],
            scrollIntoViewSetting as keyof typeof scrollIntoView,
          );

          setSearchItemCounter(searchItemCounter - 1);
        }
      }
    }
    return false;
  };

  const closeAllNodes = () => {
    const ids: Array<string | number> = [];

    const finder = (data: Array<TData>) => {
      if (data) {
        data.forEach((item) => {
          const _id = item[MappedProperties.ID] as string | number;
          const _children = item[
            MappedProperties.CHILDREN
          ] as unknown as Array<TData>;
          ids.push(_id);
          finder(_children);
        });
      }
    };
    finder(JSON.parse(JSON.stringify(data)));
    setHiddenIds(ids);
  };

  const openAllNodes = () => {
    setHiddenIds([]);
  };

  const resetChangeHandler = () => {
    setSearchResult([]);
    setSearchInputValue("");
    toggleShowSearchBox(!showSearchBox);
    setMenuItems(JSON.parse(JSON.stringify(data)));
  };

  const searchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let keyword = e.target.value.replace(/\\/g, "\\\\");
    keyword = keyword.replace(/[-[\]/{}()*+?.\\^$|]/g, "");
    setSearchInputValue(keyword);
    const finder = (data: Array<TData>) => {
      data.forEach((item) => {
        const regex = new RegExp(getPersianChar(keyword), "gi");
        if (getPersianChar(keyword)) {
          const _title = item[MappedProperties.TITLE] as string;
          const _description = item[MappedProperties.DESCRIPTION] as string;
          const _tags = item[MappedProperties.TAGS] as string;
          const _id = item[MappedProperties.ID] as string;
          if (
            (item[MappedProperties.TITLE] &&
              getPersianChar(_title.toString()).match(regex)) ||
            (item[MappedProperties.DESCRIPTION] &&
              getPersianChar(_description.toString()).match(regex)) ||
            (item[MappedProperties.TAGS] &&
              getPersianChar(_tags.toString()).match(regex))
          ) {
            if (searchResult.indexOf(_id) === -1) {
              setHiddenIds((prevHiddenIds) =>
                prevHiddenIds.filter((id) => id !== item[MappedProperties.ID]),
              );
              setSearchResult((prevSearchResult) => [...prevSearchResult, _id]);
            }
          } else {
            setSearchResult((prevSearchResult) =>
              prevSearchResult.filter((id) => id !== item[MappedProperties.ID]),
            );
          }
        } else {
          setSearchResult([]);
        }
        const _children = item[
          MappedProperties.CHILDREN
        ] as unknown as Array<TData>;
        if (_children.length) {
          finder(_children);
        }
      });
    };
    finder(menuItems);
  };

  const getTranslate = (key: string) =>
    translation?.[key as keyof typeof DefaultTranslation] ??
    DefaultTranslation[key as keyof typeof DefaultTranslation];

  return {
    showSearchBox,
    openAllNodes,
    closeAllNodes,
    resetChangeHandler,
    toggleShowSearchBox,
    searchChangeHandler,
    searchedItemClickHandler,
    searchItemCounter,
    getTranslate,
  };
};
