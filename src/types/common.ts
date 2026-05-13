import { Dispatch, ReactElement, SetStateAction } from "react";

// ── Public API types ───────────────────────────────────────

export interface TreeNode {
  id: string;
  label: string;
  description?: string;
  tags?: string[];
  checked?: boolean;
  children?: TreeNode[];
}

export interface NodeState {
  isExpanded: boolean;
  isChecked: boolean;
  hasChildren: boolean;
  level: number;
}

export interface FieldNames {
  id?: string;
  label?: string;
  description?: string;
  tags?: string;
  checked?: string;
  children?: string;
}

export interface TreeMenuProps {
  nodes: TreeNode[] | Record<string, unknown>[];
  fieldNames?: FieldNames;
  title?: string;
  direction?: "rtl" | "ltr";
  onNodeSelect?: (node: TreeNode) => void;
  onNodeCheck?: (node: TreeNode, checked: boolean) => void;
  onNodeEdit?: (node: TreeNode) => void;
  onNodeCopy?: (node: TreeNode) => void;
  onNodeDelete?: (node: TreeNode) => void;
  onNodeMore?: (node: TreeNode) => void;
  renderNodeActions?: (node: TreeNode, state: NodeState) => ReactElement;
  showIcon?: boolean;
  loading?: boolean;
  headerLess?: boolean;
  bare?: boolean;
  disabled?: boolean;
  theme?: TTheme;
  translation?: TTranslate;
}

// ── Internal types ─────────────────────────────────────────

export type TChecked = "FULL" | "HALF" | "NOT";
export type TDirection = "rtl" | "ltr";

export type InternalTreeNode = {
  id: string;
  label: string;
  description?: string;
  tags?: string[];
  _checked: TChecked;
  children?: InternalTreeNode[];
};

export type TTheme = {
  name: string;
  colors?: {
    white?: string;
    white_200?: string;
    white_300?: string;
    white_500?: string;
    black_100?: string;
    black_200?: string;
    black_300?: string;
    black_400?: string;
    primary?: string;
    secondary_100?: string;
    tertiary?: string;
    warning?: string;
    shadow_100?: string;
    shadow_200?: string;
  };
  fontSize?: {
    h5?: string;
    h6?: string;
    h8?: string;
  };
  fontWeight?: {
    bold?: string | number;
    normal?: string | number;
    high?: string | number;
  };
};

export type TTranslate = {
  result: string;
  resultCount: string;
  close: string;
  search: string;
  searchPlaceholder?: string;
  closeAll: string;
  openAll: string;
  expandAll?: string;
  collapseAll?: string;
  settings?: string;
  itemCount?: string;
  selected?: string;
  notSelected?: string;
  edit?: string;
  copy?: string;
  delete?: string;
  more?: string;
  noResults?: string;
  noResultsHint?: string;
};

export type THeaderProps = {
  nodeRef: { current: Record<string, HTMLElement | null> };
  setSearchInputValue: Dispatch<SetStateAction<string>>;
  hiddenIds: Array<string>;
  searchInputValue: string;
  title?: string;
  searchResult: Array<string>;
  nodes: TreeNode[];
  setHiddenIds: Dispatch<SetStateAction<Array<string>>>;
  setMenuItems: Dispatch<SetStateAction<Array<InternalTreeNode>>>;
  menuItems: InternalTreeNode[];
  setSearchResult: Dispatch<SetStateAction<Array<string>>>;
  searchItemCounter: number;
  setSearchItemCounter: Dispatch<SetStateAction<number>>;
  translation?: TTranslate;
  direction: TDirection;
  totalItemCount: number;
};

// ── Conversion helpers ─────────────────────────────────────

const DEFAULT_FIELD_NAMES: Required<FieldNames> = {
  id: "id",
  label: "label",
  description: "description",
  tags: "tags",
  checked: "checked",
  children: "children",
};

export function mapToTreeNodes(
  data: Record<string, unknown>[],
  fieldNames: FieldNames,
): TreeNode[] {
  const fields = { ...DEFAULT_FIELD_NAMES, ...fieldNames };

  const walk = (items: Record<string, unknown>[]): TreeNode[] =>
    items.map((item) => {
      const rawChildren = item[fields.children];
      const children = Array.isArray(rawChildren)
        ? walk(rawChildren as Record<string, unknown>[])
        : undefined;

      return {
        id: String(item[fields.id] ?? ""),
        label: String(item[fields.label] ?? ""),
        description: item[fields.description] != null
          ? String(item[fields.description])
          : undefined,
        tags: Array.isArray(item[fields.tags])
          ? (item[fields.tags] as unknown[]).map(String)
          : undefined,
        checked: Boolean(item[fields.checked]),
        children: children?.length ? children : undefined,
      };
    });

  return walk(data);
}

function reconcileCheckedState(node: InternalTreeNode): InternalTreeNode {
  if (!node.children?.length) return node;

  const children = node.children.map(reconcileCheckedState);
  let full = 0;
  let half = 0;
  for (const child of children) {
    if (child._checked === "FULL") full++;
    else if (child._checked === "HALF") half++;
  }

  let parentState: TChecked;
  if (full === children.length) parentState = "FULL";
  else if (full > 0 || half > 0) parentState = "HALF";
  else parentState = "NOT";

  return { ...node, children, _checked: parentState };
}

export function toInternal(node: TreeNode): InternalTreeNode {
  const raw: InternalTreeNode = {
    id: node.id,
    label: node.label,
    description: node.description,
    tags: node.tags,
    _checked: node.checked ? "FULL" : "NOT",
    children: node.children?.map(toInternal),
  };
  return reconcileCheckedState(raw);
}

export function toExternal(node: InternalTreeNode): TreeNode {
  return {
    id: node.id,
    label: node.label,
    description: node.description,
    tags: node.tags,
    checked: node._checked === "FULL",
    children: node.children?.map(toExternal),
  };
}
