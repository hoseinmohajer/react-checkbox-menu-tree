import React, { useState, useEffect, useRef } from "react";
import "./components/fonts/fonts.css";
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
import CheckBox from "./components/checkbox";
import Badge from "./components/badge";
import MenuTreeSkeleton from "./components/skeleton/menuTree";
import Header from "./components/header";
import { ParentArrow } from "./components/icons";
import highlighter from "./components/helpers/highlighter";
import findCheckedItems from "./components/helpers/findCheckedItems";
import USING_PROPERTY from "./components/constants/usingProperty";

const MenuTree = (props) => {
  const {
    data,
    leftSideWidget,
    hasCheckBox = false,
    loading,
    title = "unknown",
    headerLess,
    disabled = false,
    onClick,
    usingProperty = null,
  } = props;
  const nodeRef = useRef([]);
  const [menuItems, setMenuItems] = useState([]);
  const [hiddenIds, setHiddenIds] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedNode, setSelectedNode] = useState("");


  useEffect(() => {
    setMenuItems(JSON.parse(JSON.stringify(data)));
  }, [data]);

  const getProperty = (property) => {
    if (usingProperty && usingProperty[property]) {
      return usingProperty[property];
    }
    return USING_PROPERTY[property];
  };

  const toggle = (id) => {
    if (hiddenIds.indexOf(id) !== -1) {
      setHiddenIds(hiddenIds.filter((hiddenId) => hiddenId !== id));
    } else {
      setHiddenIds(hiddenIds.concat([id]));
    }
  };
  const checkboxClickHandler = (selectedId) => {
    toggleChecked(selectedId);
    if (onClick) {
      onClick(menuItems, findCheckedItems(menuItems, usingProperty));
    }
  };
  const toggleChecked = (
      selectedId,
      dataArray = menuItems,
      leafShouldBeChecked
  ) => {
    const result = dataArray.map((item) => {
      if (!selectedId) {
        item[getProperty("checked")] = leafShouldBeChecked;
        if (item[getProperty("children")].length) {
          toggleChecked(
              null,
              item[getProperty("children")],
              leafShouldBeChecked
          );
        }
      } else if (item[getProperty("id")] === selectedId) {
        item[getProperty("checked")] =
            item[getProperty("checked")] === "FULL" ? "NOT" : "FULL";
        if (item[getProperty("parentId")]) {
          toggleHalfChecked(menuItems, item[getProperty("parentId")]);
        }
        if (item[getProperty("children")].length) {
          toggleChecked(
              null,
              item[getProperty("children")],
              item[getProperty("checked")]
          );
        }
      } else if (item[getProperty("children")].length) {
        toggleChecked(selectedId, item[getProperty("children")], null);
      }
      return item;
    });
    setMenuItems(result);
  };
  const toggleHalfChecked = (dataArray = menuItems, parentId) => {
    const result = dataArray.map((dataArrayItem) => {
      if (dataArrayItem[getProperty("id")] === parentId) {
        if (dataArrayItem[getProperty("children")].length) {
          let checkedCount = 0;
          let halfCheckedCount = 0;
          dataArrayItem[getProperty("children")].forEach((child) => {
            if (child[getProperty("checked")] === "FULL") {
              checkedCount += 1;
            }
            if (child[getProperty("checked")] === "HALF") {
              halfCheckedCount += 1;
            }
          });
          if (dataArrayItem[getProperty("children")].length === checkedCount) {
            dataArrayItem[getProperty("checked")] = "FULL";
          } else {
            dataArrayItem[getProperty("checked")] = "HALF";
          }
          if (
              !checkedCount &&
              !halfCheckedCount &&
              dataArrayItem[getProperty("checked")] === "HALF"
          ) {
            dataArrayItem[getProperty("checked")] = "NOT";
          }
          toggleHalfChecked(menuItems, dataArrayItem[getProperty("parentId")]);
        }
        if (
            dataArrayItem[getProperty("checked")] !== "HALF" &&
            dataArrayItem[getProperty("checked")] &&
            parentId !== null
        ) {
          toggleHalfChecked(menuItems, dataArrayItem[getProperty("parentId")]);
        }
      }
      toggleHalfChecked(dataArrayItem[getProperty("children")], parentId);
    });
    setMenuItems(result);
  };
  const getHighlightedString = (id, string, type) => {
    let currentNode = false;
    // if (id === searchResult[currentSearchedItemId]) {
    //   currentNode = true;
    // }
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
                hasCheckBox={hasCheckBox}
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
  };
  const nodeClickHandler = (item) => {
    setSelectedNode((prevSelectedNode) => {
      if (prevSelectedNode !== item[getProperty("id")]) {
        onClick(item, item[getProperty("id")]);
        return item[getProperty("id")];
      } else {
        onClick(null, null);
        return "";
      }
    });
  };
  const menuEngine = (menuItems) => {
    return (
        <UL>
          {menuItems.map((item, index) => {
            const hasChildren =
                item[getProperty("children")] &&
                item[getProperty("children")].length !== 0;
            const showChildren = !!(
                hasChildren && hiddenIds.indexOf(item[getProperty("id")]) === -1
            );
            const { children, ...exceptChildren } = item;
            return (
                <LI
                    key={Math.random() * Number(item[getProperty("id")])}
                    ref={(el) => (nodeRef.current[item[getProperty("id")]] = el)}
                    index={index}
                >
                  <NodeContainer
                      selectedNode={selectedNode === item[getProperty("id")]}
                  >
                    {hasChildren && (
                        <ArrowIcon
                            onClick={() => toggle(item[getProperty("id")])}
                            show={showChildren}
                        >
                          <ParentArrow />
                        </ArrowIcon>
                    )}
                    <RightSide
                        hasCheckBox={hasCheckBox}
                        onClick={() =>
                            !hasCheckBox && !disabled ? nodeClickHandler(item) : false
                        }
                    >
                      {hasCheckBox && (
                          <CheckBox
                              size="sm"
                              checked={item[getProperty("checked")]}
                              onSelect={() =>
                                  checkboxClickHandler(item[getProperty("id")])
                              }
                              disabled={disabled}
                          >
                            <TreeTitle>
                              {item[getProperty("iconName")] && (
                                  <Icon className={item[getProperty("iconName")]} />
                              )}
                              {getHighlightedString(
                                  item[getProperty("id")],
                                  item[getProperty("title")],
                                  "title"
                              )}
                            </TreeTitle>
                          </CheckBox>
                      )}
                      {!hasCheckBox && (
                          <TreeTitle>
                            {item[getProperty("iconName")] && (
                                <Icon className={item[getProperty("iconName")]} />
                            )}
                            {getHighlightedString(
                                item[getProperty("id")],
                                item[getProperty("title")],
                                "title"
                            )}
                          </TreeTitle>
                      )}
                      {leftSideWidget &&
                          item[getProperty("tags")] &&
                          item[getProperty("tags")]?.length && (
                              <TagsContainer hasCheckBox={hasCheckBox}>
                                {item[getProperty("tags")]?.map((tag, index) => {
                                  return (
                                      <Badge key={Math.random() + index} type={"success"}>
                                        {getHighlightedString(
                                            item[getProperty("id")],
                                            tag,
                                            "tag"
                                        )}
                                      </Badge>
                                  );
                                })}
                              </TagsContainer>
                          )}
                      {item[getProperty("description")] &&
                          getHighlightedString(
                              item[getProperty("id")],
                              item[getProperty("description")],
                              "description"
                          )}
                    </RightSide>
                    {!leftSideWidget &&
                        item[getProperty("tags")] &&
                        typeof item[getProperty("tags")] === "object" &&
                        item[getProperty("tags")].length && (
                            <LeftSide>
                              {item[getProperty("tags")].map((tag, index) => {
                                return (
                                    <Badge key={Math.random() + index} type={"success"}>
                                      {getHighlightedString(
                                          item[getProperty("id")],
                                          tag,
                                          "tag"
                                      )}
                                    </Badge>
                                );
                              })}
                            </LeftSide>
                        )}
                    {!leftSideWidget &&
                        item[getProperty("tags")] &&
                        typeof item[getProperty("tags")] === "string" && (
                            <LeftSide>
                              <Badge type={"success"}>
                                {getHighlightedString(
                                    item[getProperty("id")],
                                    item[getProperty("tags")],
                                    "tag"
                                )}
                              </Badge>
                            </LeftSide>
                        )}
                    {leftSideWidget && (
                        <LeftSide>{leftSideWidget(exceptChildren)}</LeftSide>
                    )}
                  </NodeContainer>

                  {showChildren && menuEngine(item[getProperty("children")])}
                </LI>
            );
          })}
        </UL>
    );
  };
  return (
      <div className={"scrollable"}>
        {!loading && (
            <Container>
              {!headerLess && (
                  <Header
                      usingProperty={usingProperty}
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
                  />
              )}
              <MenuTreeMainContainer className={"scrollable"}>
                {menuEngine(menuItems)}
              </MenuTreeMainContainer>
            </Container>
        )}
        {loading && <MenuTreeSkeleton />}
      </div>
  );
};

export default MenuTree;
