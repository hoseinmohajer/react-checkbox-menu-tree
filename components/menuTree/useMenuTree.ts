import { useEffect, useMemo, useRef, useState } from "react";
import { TChecked, TData, TMenuTreeProps } from "../types/common.ts";
import { getPropertyName } from "../helpers/getPropertyName.ts";
import findCheckedItems from "../helpers/findCheckedItems.ts";

export const useMenuTree = (args: TMenuTreeProps) => {
  const { data, onClick, propertiesMapper = null } = args;
  const nodeRef = useRef<HTMLLIElement | null>(null);
  const [menuItems, setMenuItems] = useState<Array<TData>>([]);
  const [hiddenIds, setHiddenIds] = useState<Array<string | number | null>>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Array<number | string>>([]);
  const [selectedNode, setSelectedNode] = useState<TData | null>(null);

  const MappedProperties = useMemo(
    () => ({
      ID: getPropertyName("id", propertiesMapper),
      PARENT_ID: getPropertyName("parentId", propertiesMapper),
      TITLE: getPropertyName("title", propertiesMapper),
      TAGS: getPropertyName("tags", propertiesMapper),
      DESCRIPTION: getPropertyName("description", propertiesMapper),
      ICON_NAME: getPropertyName("iconName", propertiesMapper),
      CHILDREN: getPropertyName("children", propertiesMapper),
      CHECKED: getPropertyName("checked", propertiesMapper),
    }),
    [propertiesMapper],
  );

  useEffect(() => {
    setMenuItems(JSON.parse(JSON.stringify(data)));
  }, [data]);

  const toggle = (id: string | number | null) => {
    if (hiddenIds.indexOf(id) !== -1) {
      setHiddenIds(hiddenIds.filter((hiddenId) => hiddenId !== id));
    } else {
      setHiddenIds(hiddenIds.concat([id]));
    }
  };

  const checkboxClickHandler = (selectedId: number | string) => {
    toggleChecked(selectedId);
    if (onClick) {
      onClick(menuItems, findCheckedItems(menuItems, propertiesMapper));
    }
  };

  const toggleChecked = (
    selectedId: number | string | null,
    dataArray: Array<TData> = menuItems,
    leafShouldBeChecked: TChecked = "NOT",
  ) => {
    const result = dataArray.map((item) => {
      const _children = item[MappedProperties.CHILDREN] as Array<
        string | number
      >;
      if (!selectedId) {
        item[MappedProperties.CHECKED] = leafShouldBeChecked;
        if (_children?.length) {
          toggleChecked(
            null,
            _children as unknown as Array<TData>,
            leafShouldBeChecked,
          );
        }
      } else if (item[MappedProperties.ID] === selectedId) {
        item[MappedProperties.CHECKED] =
          item[MappedProperties.CHECKED] === "FULL" ? "NOT" : "FULL";
        if (item[MappedProperties.PARENT_ID]) {
          toggleHalfChecked(menuItems, item[MappedProperties.PARENT_ID]);
        }
        if (_children?.length) {
          toggleChecked(
            null,
            _children as unknown as Array<TData>,
            item[MappedProperties.CHECKED] as TChecked,
          );
        }
      } else if (_children?.length) {
        toggleChecked(
          selectedId,
          _children as unknown as Array<TData>,
          "NOT" as TChecked,
        );
      }
      return item;
    });
    setMenuItems(result);
  };

  const toggleHalfChecked = (
    dataArray: Array<TData> = menuItems,
    parentId: TData["parentId"],
  ) => {
    const result = dataArray?.map((dataArrayItem) => {
      const _children = dataArrayItem[MappedProperties.CHILDREN] as
        | Array<string | number>
        | Array<TData>;
      if (dataArrayItem[MappedProperties.ID] === parentId) {
        if (_children?.length) {
          let checkedCount = 0;
          let halfCheckedCount = 0;
          (_children as Array<TData>)?.forEach((child: TData) => {
            if (child[MappedProperties.CHECKED] === "FULL") {
              checkedCount += 1;
            }
            if (child[MappedProperties.CHECKED] === "HALF") {
              halfCheckedCount += 1;
            }
          });
          if (_children?.length === checkedCount) {
            dataArrayItem[MappedProperties.CHECKED] = "FULL";
          } else {
            dataArrayItem[MappedProperties.CHECKED] = "HALF";
          }
          if (
            !checkedCount &&
            !halfCheckedCount &&
            dataArrayItem[MappedProperties.CHECKED] === "HALF"
          ) {
            dataArrayItem[MappedProperties.CHECKED] = "NOT";
          }
          toggleHalfChecked(
            menuItems,
            dataArrayItem[MappedProperties.PARENT_ID],
          );
        }
        if (
          dataArrayItem[MappedProperties.CHECKED] !== "HALF" &&
          dataArrayItem[MappedProperties.CHECKED] &&
          parentId !== null
        ) {
          toggleHalfChecked(
            menuItems,
            dataArrayItem[MappedProperties.PARENT_ID],
          );
        }
      }
      if (_children) {
        toggleHalfChecked(_children as Array<TData>, parentId);
      }
      return dataArrayItem;
    });
    setMenuItems(result);
  };

  const nodeClickHandler = (item: TData) => {
    setSelectedNode((prevSelectedNode): TData | null => {
      if (onClick) {
        if (prevSelectedNode !== item[MappedProperties.ID]) {
          onClick(item, item[MappedProperties.ID]);
          return item[MappedProperties.ID] as TData | null;
        } else {
          onClick(null, null);
          return null;
        }
      }
      return null;
    });
  };

  return {
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
  };
};
