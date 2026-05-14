import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { MenuTree } from "../menuTree/MenuTree";
import type { TreeNode, TTheme } from "../types/common";

// ── Shared data ──────────────────────────────────────────────

const simpleNodes: TreeNode[] = [
  { id: "1", label: "Documents" },
  { id: "2", label: "Downloads" },
  { id: "3", label: "Pictures" },
];

const nestedNodes: TreeNode[] = [
  {
    id: "1",
    label: "User Management",
    description: "Manage user accounts and permissions",
    tags: ["Admin", "Active"],
    checked: true,
    children: [
      {
        id: "1-1",
        label: "User List",
        description: "View and search all users",
        tags: ["Report"],
        checked: true,
        children: [
          { id: "1-1-1", label: "Active Users", tags: ["Online"], checked: true },
          { id: "1-1-2", label: "Inactive Users", checked: false },
        ],
      },
      {
        id: "1-2",
        label: "Roles & Permissions",
        description: "Manage user access levels",
        tags: ["Security", "RBAC"],
        checked: false,
      },
    ],
  },
  {
    id: "2",
    label: "System Settings",
    description: "General configuration and advanced settings",
    tags: ["Config"],
    checked: false,
    children: [
      { id: "2-1", label: "General Settings", checked: false },
      { id: "2-2", label: "Security Settings", tags: ["Important", "SSL", "Encryption"], checked: true },
    ],
  },
  {
    id: "3",
    label: "Reports",
    description: "Statistical and analytical system reports",
    tags: ["Stats", "Dashboard"],
    checked: false,
  },
];

const deepTree: TreeNode[] = [
  {
    id: "1",
    label: "Root",
    children: [
      {
        id: "1-1",
        label: "Level 1 — Branch A",
        children: [
          {
            id: "1-1-1",
            label: "Level 2 — Sub-branch",
            children: [
              {
                id: "1-1-1-1",
                label: "Level 3 — Deep",
                children: [
                  { id: "1-1-1-1-1", label: "Level 4 — Leaf" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1-2",
        label: "Level 1 — Branch B",
        children: [
          { id: "1-2-1", label: "Leaf B-1" },
          { id: "1-2-2", label: "Leaf B-2" },
        ],
      },
    ],
  },
];

const manyTagsNodes: TreeNode[] = [
  {
    id: "1",
    label: "Highly Tagged Item",
    tags: ["React", "TypeScript", "CSS", "RTL", "Search", "Checkbox", "Tree"],
  },
  {
    id: "2",
    label: "Few Tags Item",
    tags: ["Simple", "Clean"],
  },
];

const largeTree: TreeNode[] = Array.from({ length: 20 }, (_, i) => ({
  id: `item-${i + 1}`,
  label: `Category ${i + 1}`,
  description: i % 3 === 0 ? `Description for category ${i + 1}` : undefined,
  tags: i % 4 === 0 ? ["Featured"] : undefined,
  checked: i % 2 === 0,
  children:
    i % 2 === 0
      ? Array.from({ length: 3 }, (_, j) => ({
          id: `item-${i + 1}-${j + 1}`,
          label: `Sub-item ${i + 1}.${j + 1}`,
          checked: j === 0,
        }))
      : undefined,
}));

const customFieldData = [
  {
    key: "1",
    title: "Products",
    desc: "All product categories",
    badges: ["E-commerce"],
    ticked: true,
    items: [
      { key: "1-1", title: "Electronics", ticked: true },
      { key: "1-2", title: "Clothing", ticked: false },
    ],
  },
  {
    key: "2",
    title: "Services",
    badges: ["Support"],
    ticked: false,
  },
];

const darkTheme: TTheme = {
  name: "dark-theme",
  colors: {
    white: "#0c1222",
    white_200: "#111a2e",
    white_300: "#1e3a5f",
    white_500: "#1e293b",
    black_100: "#1e3a5f",
    black_200: "#64748b",
    black_300: "#94a3b8",
    black_400: "#f1f5f9",
    primary: "#10b981",
    secondary_100: "#1a3550",
    tertiary: "#0ea5e9",
    warning: "#f59e0b",
    shadow_100: "rgba(0,0,0,0.3)",
    shadow_200: "rgba(0,0,0,0.5)",
  },
  fontSize: { h5: "14px", h6: "12px", h8: "11px" },
  fontWeight: { bold: 600, normal: 400, high: 500 },
};

const purpleTheme: TTheme = {
  name: "purple-theme",
  colors: {
    white: "#faf5ff",
    white_200: "#f3e8ff",
    white_300: "#e9d5ff",
    white_500: "#d8b4fe",
    black_100: "#c084fc",
    black_200: "#7c3aed",
    black_300: "#6d28d9",
    black_400: "#4c1d95",
    primary: "#8b5cf6",
    secondary_100: "#ede9fe",
    tertiary: "#7c3aed",
    warning: "#f59e0b",
  },
  fontSize: { h5: "14px", h6: "12px", h8: "10px" },
  fontWeight: { bold: 700, normal: 400, high: 600 },
};

// ── Meta ─────────────────────────────────────────────────────

const meta: Meta<typeof MenuTree> = {
  title: "Components/MenuTree",
  component: MenuTree,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A lightweight, zero-dependency React tree menu component with hierarchical checkboxes, search, RTL/LTR support, and CSS variable theming.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    nodes: { control: false },
    fieldNames: { control: false },
    renderNodeActions: { control: false },
    theme: { control: false },
    translation: { control: false },
    direction: {
      control: "radio",
      options: ["ltr", "rtl"],
    },
    showIcon: { control: "boolean" },
    loading: { control: "boolean" },
    headerLess: { control: "boolean" },
    bare: { control: "boolean" },
    disabled: { control: "boolean" },
    title: { control: "text" },
  },
  args: {
    direction: "ltr",
    showIcon: true,
    loading: false,
    headerLess: false,
    bare: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof MenuTree>;

// ── Stories ──────────────────────────────────────────────────

/** The simplest usage: flat list of nodes. */
export const Default: Story = {
  args: {
    nodes: simpleNodes,
    title: "File Browser",
  },
};

/** Nested tree with descriptions, tags, and mixed checked states. */
export const NestedWithDetails: Story = {
  args: {
    nodes: nestedNodes,
    title: "Admin Panel",
    onNodeCheck: fn(),
    onNodeSelect: fn(),
  },
};

/** Enable checkboxes by passing `onNodeCheck`. Half-check states are computed automatically from child states. */
export const WithCheckboxes: Story = {
  args: {
    nodes: nestedNodes,
    title: "Permissions",
    onNodeCheck: fn(),
  },
};

/** All action buttons: edit, copy, delete, and more. They appear on hover. */
export const WithAllActions: Story = {
  args: {
    nodes: nestedNodes,
    title: "Full Actions",
    onNodeCheck: fn(),
    onNodeEdit: fn(),
    onNodeCopy: fn(),
    onNodeDelete: fn(),
    onNodeMore: fn(),
  },
};

/** Selective action buttons — only edit and delete. */
export const WithSelectiveActions: Story = {
  args: {
    nodes: nestedNodes,
    title: "Edit & Delete Only",
    onNodeEdit: fn(),
    onNodeDelete: fn(),
  },
};

/** Custom action widget replaces default buttons via `renderNodeActions`. */
export const CustomActionWidget: Story = {
  args: {
    nodes: nestedNodes,
    title: "Custom Widget",
    renderNodeActions: (node, state) => (
      <div style={{ display: "flex", gap: 4, alignItems: "center", fontSize: 11 }}>
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 9999,
            background: state.isChecked ? "#dcfce7" : "#fef2f2",
            color: state.isChecked ? "#166534" : "#991b1b",
            fontWeight: 500,
          }}
        >
          {state.isChecked ? "Active" : "Inactive"}
        </span>
        <button
          style={{
            padding: "3px 10px",
            borderRadius: 6,
            border: "1px solid #e5e7eb",
            background: "#fff",
            cursor: "pointer",
            fontSize: 11,
          }}
          onClick={(e) => {
            e.stopPropagation();
            alert(`Details for: ${node.label}`);
          }}
        >
          Details
        </button>
      </div>
    ),
    onNodeCheck: fn(),
  },
};

/** A deeply nested tree (4+ levels) showing tree connectors. */
export const DeepNesting: Story = {
  args: {
    nodes: deepTree,
    title: "Deep Tree",
  },
};

/** Tags that overflow beyond the maximum visible (5) show a +N indicator. */
export const TagOverflow: Story = {
  args: {
    nodes: manyTagsNodes,
    title: "Tag Overflow",
  },
};

/** A large scrollable tree (20 items with children). */
export const LargeTree: Story = {
  args: {
    nodes: largeTree,
    title: "Large Dataset",
    onNodeCheck: fn(),
  },
};

/** Left-to-right layout. */
export const LTRDirection: Story = {
  args: {
    nodes: nestedNodes,
    title: "LTR Layout",
    direction: "ltr",
    onNodeCheck: fn(),
    translation: {
      result: "result",
      resultCount: "results",
      close: "Close",
      search: "Search",
      searchPlaceholder: "Search...",
      closeAll: "Close all",
      openAll: "Open all",
      expandAll: "Expand",
      collapseAll: "Collapse",
      settings: "Settings",
      itemCount: "items",
      selected: "Selected",
      notSelected: "Not selected",
    },
  },
};

/** Right-to-left layout with Farsi translations. */
export const RTLDirection: Story = {
  args: {
    nodes: [
      {
        id: "1",
        label: "مدیریت کاربران",
        description: "مدیریت حساب‌های کاربری",
        tags: ["مهم", "فعال"],
        checked: true,
        children: [
          { id: "1-1", label: "لیست کاربران", checked: true },
          { id: "1-2", label: "نقش‌ها و دسترسی‌ها", checked: false },
        ],
      },
      {
        id: "2",
        label: "تنظیمات سیستم",
        tags: ["پیکربندی"],
        children: [
          { id: "2-1", label: "تنظیمات عمومی" },
          { id: "2-2", label: "تنظیمات امنیتی", tags: ["SSL"] },
        ],
      },
    ],
    title: "پنل مدیریت",
    direction: "rtl",
    onNodeCheck: fn(),
    translation: {
      result: "نتیجه",
      resultCount: "تعداد نتایج",
      close: "بستن",
      search: "جستجو",
      searchPlaceholder: "جستجو...",
      closeAll: "بستن همه",
      openAll: "باز کردن همه",
      expandAll: "باز کردن",
      collapseAll: "جمع کردن",
      settings: "تنظیمات",
      itemCount: "آیتم",
      selected: "انتخاب شده",
      notSelected: "انتخاب نشده",
      noResults: "نتیجه‌ای یافت نشد",
      noResultsHint: "عبارت جستجوی دیگری را امتحان کنید",
    },
  },
};

/** Without header: set `headerLess` to hide the search/expand controls. */
export const HeaderLess: Story = {
  args: {
    nodes: nestedNodes,
    headerLess: true,
    onNodeCheck: fn(),
  },
};

/** Bare mode removes the container background, shadow, and border-radius. Useful for embedding. */
export const BareMode: Story = {
  args: {
    nodes: nestedNodes,
    title: "Bare Mode",
    bare: true,
    onNodeCheck: fn(),
  },
};

/** Hide folder/file icons by setting `showIcon` to false. */
export const NoIcons: Story = {
  args: {
    nodes: nestedNodes,
    title: "No Icons",
    showIcon: false,
    onNodeCheck: fn(),
  },
};

/** Disabled state: checkboxes and click handlers are inactive. */
export const Disabled: Story = {
  args: {
    nodes: nestedNodes,
    title: "Disabled",
    disabled: true,
    onNodeCheck: fn(),
  },
};

/** Loading state shows a skeleton placeholder. */
export const Loading: Story = {
  args: {
    nodes: [],
    loading: true,
    title: "Loading...",
  },
};

/** Dark theme applied via the `theme` prop. Colors map to CSS variables. */
export const DarkTheme: Story = {
  args: {
    nodes: nestedNodes,
    title: "Dark Theme",
    theme: darkTheme,
    onNodeCheck: fn(),
    onNodeEdit: fn(),
    onNodeDelete: fn(),
    translation: {
      result: "result",
      resultCount: "results",
      close: "Close",
      search: "Search",
      searchPlaceholder: "Search...",
      closeAll: "Close all",
      openAll: "Open all",
      expandAll: "Expand",
      collapseAll: "Collapse",
      itemCount: "items",
      selected: "Selected",
      notSelected: "Not selected",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#050810", padding: 24, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};

/** Purple theme — demonstrating a fully custom color palette. */
export const PurpleTheme: Story = {
  args: {
    nodes: nestedNodes,
    title: "Purple Theme",
    theme: purpleTheme,
    onNodeCheck: fn(),
  },
};

/** Use `fieldNames` to map non-standard data shapes to the expected tree format. */
export const CustomFieldNames: Story = {
  args: {
    nodes: customFieldData as unknown as TreeNode[],
    fieldNames: {
      id: "key",
      label: "title",
      description: "desc",
      tags: "badges",
      checked: "ticked",
      children: "items",
    },
    title: "Custom Fields",
    onNodeCheck: fn(),
  },
};

/** Select mode (no checkboxes): clicking a node triggers `onNodeSelect`. */
export const SelectMode: Story = {
  args: {
    nodes: nestedNodes,
    title: "Select Mode",
    onNodeSelect: fn(),
  },
};

/** Flat list with no children — the simplest tree. */
export const FlatList: Story = {
  args: {
    nodes: [
      { id: "1", label: "Apple" },
      { id: "2", label: "Banana" },
      { id: "3", label: "Cherry" },
      { id: "4", label: "Date" },
      { id: "5", label: "Elderberry" },
    ],
    title: "Fruits",
    onNodeSelect: fn(),
  },
};

/** All nodes fully checked. */
export const AllChecked: Story = {
  args: {
    nodes: [
      {
        id: "1",
        label: "Project A",
        checked: true,
        children: [
          { id: "1-1", label: "Task 1", checked: true },
          { id: "1-2", label: "Task 2", checked: true },
          { id: "1-3", label: "Task 3", checked: true },
        ],
      },
      {
        id: "2",
        label: "Project B",
        checked: true,
        children: [
          { id: "2-1", label: "Task 4", checked: true },
          { id: "2-2", label: "Task 5", checked: true },
        ],
      },
    ],
    title: "All Checked",
    onNodeCheck: fn(),
  },
};

/** Mixed checked/unchecked children produce half-check (indeterminate) on parents. */
export const HalfCheckStates: Story = {
  args: {
    nodes: [
      {
        id: "1",
        label: "Parent (half-check)",
        children: [
          { id: "1-1", label: "Checked child", checked: true },
          { id: "1-2", label: "Unchecked child", checked: false },
          { id: "1-3", label: "Unchecked child", checked: false },
        ],
      },
      {
        id: "2",
        label: "Grandparent (half-check)",
        children: [
          {
            id: "2-1",
            label: "Parent (half-check)",
            children: [
              { id: "2-1-1", label: "Checked", checked: true },
              { id: "2-1-2", label: "Unchecked", checked: false },
            ],
          },
          {
            id: "2-2",
            label: "Parent (all unchecked)",
            children: [
              { id: "2-2-1", label: "Unchecked", checked: false },
              { id: "2-2-2", label: "Unchecked", checked: false },
            ],
          },
        ],
      },
    ],
    title: "Half-Check Demo",
    onNodeCheck: fn(),
  },
};

/** Custom translations override all UI strings. */
export const CustomTranslation: Story = {
  args: {
    nodes: nestedNodes,
    title: "Arborescence",
    direction: "ltr",
    onNodeCheck: fn(),
    translation: {
      result: "résultat",
      resultCount: "résultats",
      close: "Fermer",
      search: "Rechercher",
      searchPlaceholder: "Rechercher...",
      closeAll: "Tout fermer",
      openAll: "Tout ouvrir",
      expandAll: "Développer",
      collapseAll: "Réduire",
      settings: "Paramètres",
      itemCount: "éléments",
      selected: "Sélectionné",
      notSelected: "Non sélectionné",
      edit: "Modifier",
      copy: "Copier",
      delete: "Supprimer",
      more: "Plus",
      noResults: "Aucun résultat trouvé",
      noResultsHint: "Essayez un autre terme de recherche",
    },
  },
};

/** Minimal setup: nodes only, no props. Uses all defaults. */
export const MinimalConfig: Story = {
  args: {
    nodes: [
      { id: "1", label: "Item A" },
      { id: "2", label: "Item B" },
      { id: "3", label: "Item C" },
    ],
  },
};

/** Loading skeleton with dark theme applied. */
export const DarkThemeLoading: Story = {
  args: {
    nodes: [],
    loading: true,
    theme: darkTheme,
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#050810", padding: 24, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};

/** Everything combined: checkboxes, actions, tags, descriptions, dark theme, LTR. */
export const KitchenSink: Story = {
  args: {
    nodes: nestedNodes,
    title: "Kitchen Sink",
    direction: "ltr",
    theme: darkTheme,
    onNodeCheck: fn(),
    onNodeEdit: fn(),
    onNodeCopy: fn(),
    onNodeDelete: fn(),
    onNodeMore: fn(),
    translation: {
      result: "result",
      resultCount: "results",
      close: "Close",
      search: "Search",
      searchPlaceholder: "Search nodes...",
      closeAll: "Close all",
      openAll: "Open all",
      expandAll: "Expand",
      collapseAll: "Collapse",
      settings: "Settings",
      itemCount: "items",
      selected: "Selected",
      notSelected: "Not selected",
      edit: "Edit",
      copy: "Copy",
      delete: "Delete",
      more: "More",
      noResults: "No results found",
      noResultsHint: "Try a different search term",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#050810", padding: 24, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};
