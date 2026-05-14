import { ChangeEvent, useEffect } from "react";
import { InternalTreeNode, THeaderProps } from "../../types/common";
import getPersianChar from "../../helpers/getPersianChar";
import { DefaultTranslation } from "../../constants/defaultTranslation";

function scrollToNode(
  nodeRef: THeaderProps["nodeRef"],
  nodeId: string,
): void {
  const scroll = () => {
    const el = nodeRef.current[nodeId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (typeof window !== "undefined" && window.requestAnimationFrame) {
    window.requestAnimationFrame(scroll);
  } else {
    setTimeout(scroll, 0);
  }
}

function collectAllIds(items: InternalTreeNode[]): string[] {
  const ids: string[] = [];
  for (const item of items) {
    ids.push(item.id);
    if (item.children?.length) {
      ids.push(...collectAllIds(item.children));
    }
  }
  return ids;
}

function collectAncestorIds(
  items: InternalTreeNode[],
  targetId: string,
): Set<string> {
  const ancestorIds = new Set<string>();

  const walk = (nodes: InternalTreeNode[], ancestors: string[]): boolean => {
    for (const node of nodes) {
      if (node.id === targetId) {
        ancestors.forEach((ancestorId) => ancestorIds.add(ancestorId));
        return true;
      }

      if (node.children?.length && walk(node.children, [...ancestors, node.id])) {
        return true;
      }
    }

    return false;
  };

  walk(items, []);
  return ancestorIds;
}

export const useHeader = (args: THeaderProps) => {
  const {
    nodeRef,
    searchResult,
    setHiddenIds,
    setSearchInputValue,
    menuItems,
    setSearchResult,
    searchItemCounter,
    setSearchItemCounter,
    translation,
  } = args;

  useEffect(() => {
    const activeId = searchResult[searchItemCounter] ?? searchResult[0];
    if (activeId) {
      scrollToNode(nodeRef, activeId);
    }
  }, [searchResult, searchItemCounter, nodeRef]);

  const searchedItemClickHandler = (state: "down" | "up") => {
    if (!searchResult.length) return;

    if (state === "down") {
      const next =
        searchItemCounter >= searchResult.length - 1
          ? 0
          : searchItemCounter + 1;
      const ancestorIds = collectAncestorIds(menuItems, searchResult[next]);
      setHiddenIds((prev) => prev.filter((id) => !ancestorIds.has(id)));
      setSearchItemCounter(next);
      scrollToNode(nodeRef, searchResult[next]);
    } else {
      const prev =
        searchItemCounter <= 0
          ? searchResult.length - 1
          : searchItemCounter - 1;
      const ancestorIds = collectAncestorIds(menuItems, searchResult[prev]);
      setHiddenIds((ids) => ids.filter((id) => !ancestorIds.has(id)));
      setSearchItemCounter(prev);
      scrollToNode(nodeRef, searchResult[prev]);
    }
  };

  const closeAllNodes = () => {
    setHiddenIds(collectAllIds(menuItems));
  };

  const openAllNodes = () => {
    setHiddenIds([]);
  };

  const findMatchingNodes = (
    items: InternalTreeNode[],
    query: string,
  ): { matchedIds: string[]; ancestorIds: Set<string> } => {
    const matchedIds: string[] = [];
    const ancestorIds = new Set<string>();
    const normalizedQuery = getPersianChar(query).toLowerCase();

    const walk = (nodes: InternalTreeNode[], ancestors: string[]) => {
      for (const node of nodes) {
        const label = getPersianChar(node.label).toLowerCase();
        const desc = node.description
          ? getPersianChar(node.description).toLowerCase()
          : "";
        const tags = node.tags
          ? getPersianChar(node.tags.join(" ")).toLowerCase()
          : "";

        const matchesSelf =
          label.includes(normalizedQuery) ||
          desc.includes(normalizedQuery) ||
          tags.includes(normalizedQuery);

        if (matchesSelf) {
          matchedIds.push(node.id);
          ancestors.forEach((ancestorId) => ancestorIds.add(ancestorId));
        }

        if (node.children?.length) {
          walk(node.children, [...ancestors, node.id]);
        }
      }
    };

    walk(items, []);
    return { matchedIds, ancestorIds };
  };

  const searchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const keyword = raw
      .replace(/\\/g, "\\\\")
      .replace(/[-[\]/{}()*+?.\\^$|]/g, "");
    setSearchInputValue(keyword);

    if (!keyword.trim()) {
      setSearchResult([]);
      return;
    }

    const { matchedIds, ancestorIds } = findMatchingNodes(menuItems, keyword);

    setSearchResult(matchedIds);
    setHiddenIds((prev) => prev.filter((id) => !ancestorIds.has(id)));
    setSearchItemCounter(0);
  };

  const getTranslate = (key: string) =>
    translation?.[key as keyof typeof DefaultTranslation] ??
    DefaultTranslation[key as keyof typeof DefaultTranslation];

  return {
    openAllNodes,
    closeAllNodes,
    searchChangeHandler,
    searchedItemClickHandler,
    searchItemCounter,
    getTranslate,
  };
};
