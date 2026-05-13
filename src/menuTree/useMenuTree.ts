import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  TChecked,
  TreeMenuProps,
  TreeNode,
  InternalTreeNode,
  toInternal,
  toExternal,
  mapToTreeNodes,
} from "../types/common";

function computeParentState(children: InternalTreeNode[]): TChecked {
  let full = 0;
  let half = 0;
  for (const child of children) {
    if (child._checked === "FULL") full++;
    else if (child._checked === "HALF") half++;
  }
  if (full === children.length) return "FULL";
  if (full > 0 || half > 0) return "HALF";
  return "NOT";
}

function setAllChildren(
  children: InternalTreeNode[] | undefined,
  state: TChecked,
) {
  if (!children) return;
  for (const child of children) {
    child._checked = state;
    setAllChildren(child.children, state);
  }
}

function toggleNodeChecked(
  nodes: InternalTreeNode[],
  targetId: string,
): boolean {
  for (const node of nodes) {
    if (node.id === targetId) {
      const newState: TChecked = node._checked === "FULL" ? "NOT" : "FULL";
      node._checked = newState;
      setAllChildren(node.children, newState);
      return true;
    }
    if (node.children?.length) {
      const found = toggleNodeChecked(node.children, targetId);
      if (found) {
        node._checked = computeParentState(node.children);
        return true;
      }
    }
  }
  return false;
}

function findNodeById(
  nodes: InternalTreeNode[],
  id: string,
): InternalTreeNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children?.length) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

export const useMenuTree = (args: TreeMenuProps) => {
  const { nodes, fieldNames, onNodeSelect, onNodeCheck } = args;
  const nodeRef = useRef<Record<string, HTMLLIElement | null>>({});
  const [menuItems, setMenuItems] = useState<InternalTreeNode[]>([]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [searchItemCounter, setSearchItemCounter] = useState(0);

  const normalizedNodes: TreeNode[] = useMemo(
    () =>
      fieldNames
        ? mapToTreeNodes(nodes as Record<string, unknown>[], fieldNames)
        : (nodes as TreeNode[]),
    [nodes, fieldNames],
  );

  const countItems = useCallback((items: InternalTreeNode[]): number => {
    let count = 0;
    for (const item of items) {
      count += 1;
      if (item.children?.length) {
        count += countItems(item.children);
      }
    }
    return count;
  }, []);

  const totalItemCount = useMemo(
    () => countItems(menuItems),
    [menuItems, countItems],
  );

  useEffect(() => {
    setMenuItems(normalizedNodes.map(toInternal));
  }, [normalizedNodes]);

  const toggle = useCallback((id: string) => {
    setHiddenIds((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id],
    );
  }, []);

  const checkboxClickHandler = useCallback(
    (targetId: string) => {
      setMenuItems((prev) => {
        const cloned = structuredClone(prev);
        toggleNodeChecked(cloned, targetId);

        if (onNodeCheck) {
          const node = findNodeById(cloned, targetId);
          if (node) {
            onNodeCheck(toExternal(node), node._checked === "FULL");
          }
        }

        return cloned;
      });
    },
    [onNodeCheck],
  );

  const nodeClickHandler = useCallback(
    (item: InternalTreeNode) => {
      setSelectedNode((prev) => {
        if (prev !== item.id) {
          onNodeSelect?.(toExternal(item));
          return item.id;
        } else {
          return null;
        }
      });
    },
    [onNodeSelect],
  );

  return {
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
  };
};
