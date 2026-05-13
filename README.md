<div align="center">

# react-checktree

A lightweight, **zero-dependency** React tree component with hierarchical checkboxes, full-text search, RTL/LTR support, and CSS-variable theming.

[![npm version](https://img.shields.io/npm/v/react-checktree?color=0ea5e9&style=flat-square)](https://www.npmjs.com/package/react-checktree)
[![npm downloads](https://img.shields.io/npm/dm/react-checktree?color=10b981&style=flat-square)](https://www.npmjs.com/package/react-checktree)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-checktree?color=8b5cf6&style=flat-square)](https://bundlephobia.com/package/react-checktree)
[![license](https://img.shields.io/npm/l/react-checktree?color=64748b&style=flat-square)](https://choosealicense.com/licenses/mit/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[Live Demo](https://hoseinmohajer.github.io/react-checkbox-menu-tree/) · [Storybook](https://hoseinmohajer.github.io/react-checkbox-menu-tree/) · [npm](https://www.npmjs.com/package/react-checktree) · [GitHub](https://github.com/hoseinmohajer/checkbox-menu-tree)

</div>

---

## Demo

<!-- Replace with an actual screen recording / GIF of your component in action.
     You can record one with tools like: LICEcap, peek, gifcap.com, or vhs.
     Place the file at assets/demo.gif and uncomment the line below. -->
<!-- <p align="center"><img src="assets/demo.gif" alt="react-checktree demo" width="700" /></p> -->

> **Try it yourself** — open the [interactive Storybook](https://hoseinmohajer.github.io/react-checkbox-menu-tree/) to explore every feature with live controls.

---

## Why react-checktree?

| | Feature |
|---|---|
| **0 deps** | Zero runtime dependencies — just React as a peer |
| **Checkboxes** | Tri-state checkboxes (checked / indeterminate / unchecked) with automatic parent-child reconciliation |
| **Search** | Built-in full-text search with result highlighting and navigation |
| **RTL / LTR** | First-class bidirectional layout support |
| **Theming** | Fully customizable via a `theme` prop that maps to CSS variables |
| **i18n** | All UI strings are overridable through the `translation` prop |
| **Actions** | Built-in edit, copy, delete, and more buttons per node — or bring your own via `renderNodeActions` |
| **Field mapping** | Use `fieldNames` to adapt any data shape — no need to transform your API response |
| **TypeScript** | Written in TypeScript with full type exports |
| **Accessible** | Proper ARIA roles (`role="checkbox"`, `aria-checked`) and keyboard-friendly |
| **Lightweight** | Small bundle, CSS-only animations, no heavy dependencies |

---

## Quick Start

### 1. Install

```bash
npm install react-checktree
```

```bash
# or with yarn / pnpm
yarn add react-checktree
pnpm add react-checktree
```

### 2. Import the stylesheet

```tsx
import "react-checktree/style.css";
```

### 3. Render

```tsx
import { MenuTree } from "react-checktree";
import "react-checktree/style.css";

const nodes = [
  { id: "1", label: "Documents" },
  {
    id: "2",
    label: "Pictures",
    children: [
      { id: "2-1", label: "Vacation" },
      { id: "2-2", label: "Family" },
    ],
  },
  { id: "3", label: "Music" },
];

export default function App() {
  return <MenuTree nodes={nodes} title="File Browser" />;
}
```

That's it — you have a working tree in three lines of config.

---

## Examples

### Basic tree

A flat or nested list rendered with expand/collapse controls and folder/file icons.

```tsx
<MenuTree nodes={nodes} title="My Tree" />
```

### With checkboxes

Pass `onNodeCheck` to enable tri-state checkboxes. Parent nodes update automatically when children change.

```tsx
const nodes = [
  {
    id: "1",
    label: "Frontend",
    checked: true,
    children: [
      { id: "1-1", label: "React", checked: true },
      { id: "1-2", label: "Vue", checked: false },
    ],
  },
  { id: "2", label: "Backend", checked: false },
];

<MenuTree
  nodes={nodes}
  title="Tech Stack"
  onNodeCheck={(node, checked) => {
    console.log(node.label, checked);
  }}
/>
```

### With action buttons

Enable per-node action buttons by passing any combination of `onNodeEdit`, `onNodeCopy`, `onNodeDelete`, and `onNodeMore`. Buttons appear on hover.

```tsx
<MenuTree
  nodes={nodes}
  title="Projects"
  onNodeEdit={(node) => console.log("edit", node)}
  onNodeCopy={(node) => console.log("copy", node)}
  onNodeDelete={(node) => console.log("delete", node)}
/>
```

### Custom action widget

Replace the default action buttons with your own React element using `renderNodeActions`.

```tsx
<MenuTree
  nodes={nodes}
  title="Custom Actions"
  onNodeCheck={(node, checked) => console.log(node.label, checked)}
  renderNodeActions={(node, state) => (
    <button onClick={() => alert(`Details for ${node.label}`)}>
      {state.isChecked ? "Active" : "Inactive"}
    </button>
  )}
/>
```

### Select mode (no checkboxes)

Omit `onNodeCheck` and use `onNodeSelect` for single-node click handling.

```tsx
<MenuTree
  nodes={nodes}
  title="Select a category"
  onNodeSelect={(node) => console.log("selected:", node)}
/>
```

### RTL layout

Set `direction="rtl"` for right-to-left languages. Pair with `translation` for full localization.

```tsx
<MenuTree
  nodes={[
    {
      id: "1",
      label: "مدیریت کاربران",
      children: [
        { id: "1-1", label: "لیست کاربران" },
        { id: "1-2", label: "نقش‌ها و دسترسی‌ها" },
      ],
    },
  ]}
  title="پنل مدیریت"
  direction="rtl"
  onNodeCheck={(node, checked) => console.log(node.label, checked)}
  translation={{
    result: "نتیجه",
    resultCount: "تعداد نتایج",
    close: "بستن",
    search: "جستجو",
    closeAll: "بستن همه",
    openAll: "باز کردن همه",
  }}
/>
```

### Header-less & bare mode

Hide the header (search bar, expand/collapse controls) or remove the container styling for seamless embedding.

```tsx
{/* No header */}
<MenuTree nodes={nodes} headerLess onNodeCheck={handleCheck} />

{/* No container background, shadow, or border-radius */}
<MenuTree nodes={nodes} title="Embedded" bare onNodeCheck={handleCheck} />
```

### Field mapping

Your API returns `title` instead of `label`? Use `fieldNames` to map any data shape — no data transformation needed.

```tsx
const apiData = [
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
];

<MenuTree
  nodes={apiData}
  fieldNames={{
    id: "key",
    label: "title",
    description: "desc",
    tags: "badges",
    checked: "ticked",
    children: "items",
  }}
  title="Product Catalog"
  onNodeCheck={(node, checked) => console.log(node.label, checked)}
/>
```

---

## API Reference

### `<MenuTree />` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `nodes` | `TreeNode[] \| Record<string, unknown>[]` | **required** | The tree data. Can be your own shape if you provide `fieldNames`. |
| `fieldNames` | `FieldNames` | `undefined` | Maps your data keys to the expected tree structure. See [Field Mapping](#field-mapping). |
| `title` | `string` | `undefined` | Header title. Hidden when `headerLess` is `true`. |
| `direction` | `"ltr" \| "rtl"` | `"rtl"` | Layout direction. |
| `showIcon` | `boolean` | `true` | Show folder/file icons next to nodes. |
| `loading` | `boolean` | `false` | Show a skeleton placeholder while data is loading. |
| `headerLess` | `boolean` | `false` | Hide the header (search, expand/collapse, title). |
| `bare` | `boolean` | `false` | Remove container background, shadow, and border-radius. |
| `disabled` | `boolean` | `false` | Disable all interactions (checkboxes, clicks). |
| `theme` | `TTheme` | `undefined` | Custom theme object. See [Theming](#theming). |
| `translation` | `TTranslate` | `undefined` | Override all UI strings. See [Translation](#translation--i18n). |

### Callback Props

| Prop | Type | Description |
|------|------|-------------|
| `onNodeCheck` | `(node: TreeNode, checked: boolean) => void` | Called when a checkbox is toggled. **Passing this prop enables checkboxes.** |
| `onNodeSelect` | `(node: TreeNode) => void` | Called when a node is clicked (only when checkboxes are disabled). |
| `onNodeEdit` | `(node: TreeNode) => void` | Shows an edit button on each node. |
| `onNodeCopy` | `(node: TreeNode) => void` | Shows a copy button on each node. |
| `onNodeDelete` | `(node: TreeNode) => void` | Shows a delete button on each node. |
| `onNodeMore` | `(node: TreeNode) => void` | Shows a "more" button on each node. |
| `renderNodeActions` | `(node: TreeNode, state: NodeState) => ReactElement` | Replace the default action buttons with a custom widget. |

### `TreeNode`

```ts
interface TreeNode {
  id: string;
  label: string;
  description?: string;
  tags?: string[];
  checked?: boolean;
  children?: TreeNode[];
}
```

### `FieldNames`

```ts
interface FieldNames {
  id?: string;        // default: "id"
  label?: string;     // default: "label"
  description?: string; // default: "description"
  tags?: string;      // default: "tags"
  checked?: string;   // default: "checked"
  children?: string;  // default: "children"
}
```

### `NodeState`

Provided to `renderNodeActions` for context about the current node.

```ts
interface NodeState {
  isExpanded: boolean;
  isChecked: boolean;
  hasChildren: boolean;
  level: number;
}
```

---

## Theming

Customize the entire look by passing a `theme` object. Every value maps to a CSS custom property, so you can also override them directly in CSS.

```tsx
const darkTheme = {
  name: "dark",
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
  },
  fontSize: {
    h5: "14px",
    h6: "12px",
    h8: "11px",
  },
  fontWeight: {
    bold: 600,
    normal: 400,
    high: 500,
  },
};

<MenuTree nodes={nodes} title="Dark Mode" theme={darkTheme} />
```

<details>
<summary><strong>CSS variable reference</strong></summary>

| CSS Variable | Theme Path | Description |
|---|---|---|
| `--rmt-white` | `colors.white` | Main background |
| `--rmt-white-200` | `colors.white_200` | Secondary background |
| `--rmt-white-300` | `colors.white_300` | Tertiary background |
| `--rmt-white-500` | `colors.white_500` | Border / divider |
| `--rmt-black-100` | `colors.black_100` | Light text / lines |
| `--rmt-black-200` | `colors.black_200` | Muted text |
| `--rmt-black-300` | `colors.black_300` | Secondary text |
| `--rmt-black-400` | `colors.black_400` | Primary text |
| `--rmt-primary` | `colors.primary` | Primary accent |
| `--rmt-secondary-100` | `colors.secondary_100` | Secondary accent |
| `--rmt-tertiary` | `colors.tertiary` | Tertiary accent / highlights |
| `--rmt-warning` | `colors.warning` | Warning / error |
| `--rmt-font-h5` | `fontSize.h5` | Large text |
| `--rmt-font-h6` | `fontSize.h6` | Normal text |
| `--rmt-font-h8` | `fontSize.h8` | Small text |
| `--rmt-fw-bold` | `fontWeight.bold` | Bold weight |
| `--rmt-fw-normal` | `fontWeight.normal` | Normal weight |
| `--rmt-fw-high` | `fontWeight.high` | Medium weight |

</details>

---

## Translation / i18n

Override any UI string by passing a `translation` object. This covers header controls, search, tooltips, footer legends, and empty states.

```tsx
<MenuTree
  nodes={nodes}
  title="Arborescence"
  translation={{
    result: "résultat",
    resultCount: "résultats",
    close: "Fermer",
    search: "Rechercher",
    searchPlaceholder: "Rechercher...",
    closeAll: "Tout fermer",
    openAll: "Tout ouvrir",
    selected: "Sélectionné",
    notSelected: "Non sélectionné",
    noResults: "Aucun résultat trouvé",
    noResultsHint: "Essayez un autre terme",
  }}
/>
```

<details>
<summary><strong>All translation keys</strong></summary>

| Key | Default | Where it appears |
|-----|---------|-----------------|
| `result` | `"result"` | Header result count |
| `resultCount` | `"result count"` | Header result count |
| `close` | `"close"` | Search close button tooltip |
| `search` | `"search"` | Search icon tooltip |
| `searchPlaceholder` | — | Search input placeholder |
| `closeAll` | `"close all"` | Collapse all tooltip |
| `openAll` | `"open all"` | Expand all tooltip |
| `expandAll` | — | Expand all label |
| `collapseAll` | — | Collapse all label |
| `settings` | — | Settings label |
| `itemCount` | — | Item count label |
| `selected` | `"Selected"` | Footer legend |
| `notSelected` | `"Not selected"` | Footer legend |
| `edit` | `"Edit"` | Edit action tooltip |
| `copy` | `"Copy"` | Copy action tooltip |
| `delete` | `"Delete"` | Delete action tooltip |
| `more` | `"More"` | More action tooltip |
| `noResults` | `"No results found"` | Empty search state |
| `noResultsHint` | `"Try a different search term"` | Empty search hint |

</details>

---

## TypeScript

All types are exported for your convenience:

```tsx
import type {
  TreeNode,
  TreeMenuProps,
  FieldNames,
  NodeState,
  TTheme,
  TTranslate,
  TDirection,
} from "react-checktree";
```

---

## Migration from v1 (react-checkbox-menu-tree)

This package was previously published as `react-checkbox-menu-tree` (v1). Version 2.0 is a full rewrite with a cleaner API.

### Step 1 — Install the new package

```bash
npm uninstall react-checkbox-menu-tree
npm install react-checktree
```

### Step 2 — Update imports

```tsx
// v1
import MenuTree from "react-checkbox-menu-tree";

// v2
import { MenuTree } from "react-checktree";
import "react-checktree/style.css";
```

### Step 3 — Prop changes

| v1 Prop | v2 Equivalent | Notes |
|---------|---------------|-------|
| `data` | `nodes` | Renamed |
| `hasCheckBox` | — | Pass `onNodeCheck` to enable checkboxes |
| `onClick` | `onNodeSelect` | Renamed |
| `propertiesMapper` | `fieldNames` | Renamed, uses `label` instead of `title` |
| `leftSideWidget` | `renderNodeActions` | New signature: `(node, state) => ReactElement` |
| `theme` | `theme` | Same structure, now maps to CSS variables |
| `translation` | `translation` | Expanded with more keys |

### Data shape changes

```tsx
// v1 node
{ id: 1204, title: "node_1", checked: "FULL", parentId: null, children: [] }

// v2 node
{ id: "1", label: "node_1", checked: true, children: [] }
```

Key differences:
- `id` is now a `string`
- `title` is now `label`
- `checked` is a `boolean` (not `"FULL"` / `"HALF"` / `"NOT"`) — half-check states are computed automatically from children
- `parentId` is no longer needed — the tree structure is defined by nesting

> The old `react-checkbox-menu-tree` package will continue to work but is deprecated.

---

## Donate

Help me to stack sats!

`0xB4B2008f50E945fA28a99f2A650a9bF97C3d55eC`

---

## Contributing

Pull requests are welcome. For major changes, please open an [issue](https://github.com/hoseinmohajer/checkbox-menu-tree/issues) first
to discuss what you would like to change.

```bash
git clone https://github.com/hoseinmohajer/checkbox-menu-tree.git
cd checkbox-menu-tree
pnpm install
pnpm dev          # dev server
pnpm storybook    # storybook
pnpm test         # tests
pnpm build        # production build
```

Join me in making react-checktree even better.

---

## Contact

If you have any questions or suggestions, please reach out:

hosein.mohajer@gmail.com

---

## License

[MIT](https://choosealicense.com/licenses/mit/) — free for personal and commercial use.
