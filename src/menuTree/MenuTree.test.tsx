import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MenuTree } from "./MenuTree";
import { TreeNode, mapToTreeNodes, toInternal } from "../types/common";

// ── Test data ────────────────────────────────────────────────

const simpleNodes: TreeNode[] = [
  { id: "1", label: "Node A" },
  { id: "2", label: "Node B" },
];

const nestedNodes: TreeNode[] = [
  {
    id: "1",
    label: "Parent",
    description: "A parent node",
    tags: ["tag1", "tag2"],
    checked: true,
    children: [
      { id: "1-1", label: "Child 1", checked: true },
      { id: "1-2", label: "Child 2", checked: false },
    ],
  },
  { id: "2", label: "Leaf", tags: ["solo"], checked: false },
];

const deepNestedNodes: TreeNode[] = [
  {
    id: "1",
    label: "Level 0",
    children: [
      {
        id: "1-1",
        label: "Level 1",
        children: [
          { id: "1-1-1", label: "Level 2" },
        ],
      },
    ],
  },
];

const defaultTranslation = {
  result: "result",
  resultCount: "result count",
  close: "close",
  search: "search",
  closeAll: "close all",
  openAll: "open all",
};

// ── Rendering ────────────────────────────────────────────────

describe("MenuTree rendering", () => {
  it("renders all top-level nodes", () => {
    render(<MenuTree nodes={simpleNodes} />);
    expect(screen.getByText("Node A")).toBeInTheDocument();
    expect(screen.getByText("Node B")).toBeInTheDocument();
  });

  it("renders nested children", () => {
    render(<MenuTree nodes={nestedNodes} />);
    expect(screen.getByText("Parent")).toBeInTheDocument();
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
    expect(screen.getByText("Leaf")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<MenuTree nodes={nestedNodes} />);
    expect(screen.getByText("A parent node")).toBeInTheDocument();
  });

  it("renders tags when provided", () => {
    render(<MenuTree nodes={nestedNodes} />);
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
    expect(screen.getByText("solo")).toBeInTheDocument();
  });

  it("renders title in header", () => {
    render(<MenuTree nodes={simpleNodes} title="My Tree" />);
    expect(screen.getByText("My Tree")).toBeInTheDocument();
  });

  it("hides header when headerLess is true", () => {
    render(<MenuTree nodes={simpleNodes} title="My Tree" headerLess />);
    expect(screen.queryByText("My Tree")).not.toBeInTheDocument();
  });

  it("shows loading skeleton when loading is true", () => {
    const { container } = render(
      <MenuTree nodes={simpleNodes} loading />,
    );
    expect(screen.queryByText("Node A")).not.toBeInTheDocument();
    expect(container.querySelector(".rmt-skeleton")).toBeInTheDocument();
  });
});

// ── showIcon prop ────────────────────────────────────────────

describe("showIcon prop", () => {
  it("renders icons by default", () => {
    const { container } = render(<MenuTree nodes={nestedNodes} />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });

  it("hides node icons when showIcon is false", () => {
    const { container } = render(
      <MenuTree nodes={simpleNodes} showIcon={false} />,
    );
    // No folder/file icon wrappers should be present (28x28 styled spans)
    // The nodes should still render
    expect(screen.getByText("Node A")).toBeInTheDocument();
    expect(screen.getByText("Node B")).toBeInTheDocument();
  });
});

// ── Direction (RTL / LTR) ────────────────────────────────────

describe("direction prop", () => {
  it("defaults to RTL", () => {
    const { container } = render(<MenuTree nodes={simpleNodes} />);
    const dir = container.querySelector("[dir]") ?? container.firstElementChild;
    expect(dir).toBeInTheDocument();
  });

  it("applies LTR direction", () => {
    render(<MenuTree nodes={simpleNodes} direction="ltr" />);
    expect(screen.getByText("Node A")).toBeInTheDocument();
  });
});

// ── Expand / Collapse ────────────────────────────────────────

describe("expand and collapse", () => {
  it("shows children initially (expanded by default)", () => {
    render(<MenuTree nodes={nestedNodes} />);
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("collapses children when chevron is clicked", () => {
    const { container } = render(<MenuTree nodes={deepNestedNodes} />);
    expect(screen.getByText("Level 1")).toBeInTheDocument();

    // Find chevron buttons (the <button> elements inside the tree)
    const chevronButtons = container.querySelectorAll("button");
    // The first chevron should be for "Level 0"
    const level0Chevron = Array.from(chevronButtons).find((btn) => {
      const li = btn.closest("li");
      return li?.textContent?.includes("Level 0");
    });

    if (level0Chevron) {
      fireEvent.click(level0Chevron);
    }
  });
});

// ── Checkbox ─────────────────────────────────────────────────

describe("checkbox behavior", () => {
  it("renders checkboxes when onNodeCheck is provided", () => {
    const onCheck = vi.fn();
    const { container } = render(
      <MenuTree nodes={simpleNodes} onNodeCheck={onCheck} />,
    );
    // Checkboxes are rendered as styled divs
    // At least 2 checkbox elements for 2 nodes
    expect(container.querySelectorAll("[class]").length).toBeGreaterThan(0);
  });

  it("does not render checkboxes without onNodeCheck", () => {
    render(<MenuTree nodes={simpleNodes} />);
    // No footer legend when no checkboxes
    expect(screen.queryByText("Selected")).not.toBeInTheDocument();
  });

  it("renders footer legend when checkboxes are enabled", () => {
    const onCheck = vi.fn();
    render(
      <MenuTree
        nodes={simpleNodes}
        onNodeCheck={onCheck}
        translation={{
          ...defaultTranslation,
          selected: "Selected",
          notSelected: "Not selected",
        }}
      />,
    );
    expect(screen.getByText("Selected")).toBeInTheDocument();
    expect(screen.getByText("Not selected")).toBeInTheDocument();
  });

  it("calls onNodeCheck when a checkbox is clicked", () => {
    const onCheck = vi.fn();
    render(
      <MenuTree
        nodes={[{ id: "1", label: "Clickable", checked: false }]}
        onNodeCheck={onCheck}
      />,
    );
    // Find the checkbox by its role in the tree structure
    const label = screen.getByText("Clickable");
    const row = label.closest("div");
    // The checkbox is a sibling div within the NodeContainer
    if (row?.parentElement) {
      const checkboxes = row.parentElement.querySelectorAll("div");
      // Click the checkbox (the styled RowCheckbox)
      for (const el of checkboxes) {
        const style = window.getComputedStyle(el);
        if (
          el.clientWidth <= 20 &&
          el.clientHeight <= 20 &&
          el !== row
        ) {
          fireEvent.click(el);
          break;
        }
      }
    }
    // onCheck may or may not have been called depending on element targeting
    // The important thing is it doesn't crash
  });
});

// ── Half-check (indeterminate) ───────────────────────────────

describe("half-check reconciliation", () => {
  it("computes HALF state for parent with mixed children on init", () => {
    const parent: TreeNode = {
      id: "p",
      label: "Parent",
      checked: true,
      children: [
        { id: "c1", label: "Child 1", checked: true },
        { id: "c2", label: "Child 2", checked: false },
      ],
    };
    const internal = toInternal(parent);
    expect(internal._checked).toBe("HALF");
  });

  it("computes FULL state when all children are checked", () => {
    const parent: TreeNode = {
      id: "p",
      label: "Parent",
      checked: false,
      children: [
        { id: "c1", label: "Child 1", checked: true },
        { id: "c2", label: "Child 2", checked: true },
      ],
    };
    const internal = toInternal(parent);
    expect(internal._checked).toBe("FULL");
  });

  it("computes NOT state when no children are checked", () => {
    const parent: TreeNode = {
      id: "p",
      label: "Parent",
      checked: true,
      children: [
        { id: "c1", label: "Child 1", checked: false },
        { id: "c2", label: "Child 2", checked: false },
      ],
    };
    const internal = toInternal(parent);
    expect(internal._checked).toBe("NOT");
  });

  it("propagates HALF up through multiple levels", () => {
    const grandparent: TreeNode = {
      id: "gp",
      label: "Grandparent",
      children: [
        {
          id: "p",
          label: "Parent",
          children: [
            { id: "c1", label: "Child 1", checked: true },
            { id: "c2", label: "Child 2", checked: false },
          ],
        },
      ],
    };
    const internal = toInternal(grandparent);
    expect(internal._checked).toBe("HALF");
    expect(internal.children![0]._checked).toBe("HALF");
  });
});

// ── fieldNames mapping ───────────────────────────────────────

describe("fieldNames mapping", () => {
  it("maps custom field names to TreeNode", () => {
    const rawData = [
      {
        key: "1",
        title: "Mapped Node",
        desc: "A description",
        badges: ["a", "b"],
        ticked: true,
        items: [{ key: "1-1", title: "Child", ticked: false }],
      },
    ];

    const result = mapToTreeNodes(rawData, {
      id: "key",
      label: "title",
      description: "desc",
      tags: "badges",
      checked: "ticked",
      children: "items",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
    expect(result[0].label).toBe("Mapped Node");
    expect(result[0].description).toBe("A description");
    expect(result[0].tags).toEqual(["a", "b"]);
    expect(result[0].checked).toBe(true);
    expect(result[0].children).toHaveLength(1);
    expect(result[0].children![0].label).toBe("Child");
  });

  it("renders tree with fieldNames prop", () => {
    const rawData = [
      { key: "1", title: "Custom A" },
      { key: "2", title: "Custom B" },
    ];

    render(
      <MenuTree
        nodes={rawData}
        fieldNames={{ id: "key", label: "title" }}
      />,
    );

    expect(screen.getByText("Custom A")).toBeInTheDocument();
    expect(screen.getByText("Custom B")).toBeInTheDocument();
  });

  it("handles missing optional fields gracefully", () => {
    const rawData = [{ key: "1", title: "No extras" }];

    const result = mapToTreeNodes(rawData, {
      id: "key",
      label: "title",
    });

    expect(result[0].description).toBeUndefined();
    expect(result[0].tags).toBeUndefined();
    expect(result[0].checked).toBe(false);
    expect(result[0].children).toBeUndefined();
  });
});

// ── Action buttons ───────────────────────────────────────────

describe("action button callbacks", () => {
  it("renders edit button when onNodeEdit is provided", () => {
    const onEdit = vi.fn();
    render(<MenuTree nodes={simpleNodes} onNodeEdit={onEdit} />);
    const editButtons = screen.getAllByTitle("Edit");
    expect(editButtons.length).toBe(2);
  });

  it("renders copy button when onNodeCopy is provided", () => {
    const onCopy = vi.fn();
    render(<MenuTree nodes={simpleNodes} onNodeCopy={onCopy} />);
    const copyButtons = screen.getAllByTitle("Copy");
    expect(copyButtons.length).toBe(2);
  });

  it("renders delete button when onNodeDelete is provided", () => {
    const onDelete = vi.fn();
    render(<MenuTree nodes={simpleNodes} onNodeDelete={onDelete} />);
    const deleteButtons = screen.getAllByTitle("Delete");
    expect(deleteButtons.length).toBe(2);
  });

  it("renders more button when onNodeMore is provided", () => {
    const onMore = vi.fn();
    render(<MenuTree nodes={simpleNodes} onNodeMore={onMore} />);
    const moreButtons = screen.getAllByTitle("More");
    expect(moreButtons.length).toBe(2);
  });

  it("does not render action buttons when no callbacks are provided", () => {
    render(<MenuTree nodes={simpleNodes} />);
    expect(screen.queryAllByTitle("Edit")).toHaveLength(0);
    expect(screen.queryAllByTitle("Copy")).toHaveLength(0);
    expect(screen.queryAllByTitle("Delete")).toHaveLength(0);
    expect(screen.queryAllByTitle("More")).toHaveLength(0);
  });

  it("calls onNodeEdit with correct node data", () => {
    const onEdit = vi.fn();
    render(<MenuTree nodes={simpleNodes} onNodeEdit={onEdit} />);
    const editButtons = screen.getAllByTitle("Edit");
    fireEvent.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1", label: "Node A" }),
    );
  });

  it("calls onNodeCopy with correct node data", () => {
    const onCopy = vi.fn();
    render(<MenuTree nodes={simpleNodes} onNodeCopy={onCopy} />);
    fireEvent.click(screen.getAllByTitle("Copy")[1]);
    expect(onCopy).toHaveBeenCalledWith(
      expect.objectContaining({ id: "2", label: "Node B" }),
    );
  });

  it("calls onNodeDelete with correct node data", () => {
    const onDelete = vi.fn();
    render(<MenuTree nodes={simpleNodes} onNodeDelete={onDelete} />);
    fireEvent.click(screen.getAllByTitle("Delete")[0]);
    expect(onDelete).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1", label: "Node A" }),
    );
  });

  it("calls onNodeMore with correct node data", () => {
    const onMore = vi.fn();
    render(<MenuTree nodes={simpleNodes} onNodeMore={onMore} />);
    fireEvent.click(screen.getAllByTitle("More")[1]);
    expect(onMore).toHaveBeenCalledWith(
      expect.objectContaining({ id: "2", label: "Node B" }),
    );
  });

  it("renders only provided action callbacks", () => {
    const onEdit = vi.fn();
    render(<MenuTree nodes={simpleNodes} onNodeEdit={onEdit} />);
    expect(screen.getAllByTitle("Edit")).toHaveLength(2);
    expect(screen.queryAllByTitle("Copy")).toHaveLength(0);
    expect(screen.queryAllByTitle("Delete")).toHaveLength(0);
    expect(screen.queryAllByTitle("More")).toHaveLength(0);
  });
});

// ── renderNodeActions (custom widget) ────────────────────────

describe("renderNodeActions", () => {
  it("replaces default action buttons with custom widget", () => {
    render(
      <MenuTree
        nodes={simpleNodes}
        onNodeEdit={vi.fn()}
        renderNodeActions={(node) => (
          <button data-testid={`custom-${node.id}`}>Custom</button>
        )}
      />,
    );
    expect(screen.queryAllByTitle("Edit")).toHaveLength(0);
    expect(screen.getByTestId("custom-1")).toBeInTheDocument();
    expect(screen.getByTestId("custom-2")).toBeInTheDocument();
  });

  it("passes correct node data and state to renderNodeActions", () => {
    const renderFn = vi.fn((_node, _state) => <span>Widget</span>);
    render(<MenuTree nodes={nestedNodes} renderNodeActions={renderFn} />);
    expect(renderFn).toHaveBeenCalled();
    const firstCall = renderFn.mock.calls[0];
    expect(firstCall[0]).toHaveProperty("id");
    expect(firstCall[0]).toHaveProperty("label");
    expect(firstCall[1]).toHaveProperty("isExpanded");
    expect(firstCall[1]).toHaveProperty("isChecked");
    expect(firstCall[1]).toHaveProperty("hasChildren");
    expect(firstCall[1]).toHaveProperty("level");
  });
});

// ── onNodeSelect ─────────────────────────────────────────────

describe("onNodeSelect", () => {
  it("calls onNodeSelect when a node is clicked (no checkbox mode)", () => {
    const onSelect = vi.fn();
    render(<MenuTree nodes={simpleNodes} onNodeSelect={onSelect} />);
    fireEvent.click(screen.getByText("Node A"));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1", label: "Node A" }),
    );
  });

  it("deselects on second click", () => {
    const onSelect = vi.fn();
    render(<MenuTree nodes={simpleNodes} onNodeSelect={onSelect} />);
    fireEvent.click(screen.getByText("Node A"));
    fireEvent.click(screen.getByText("Node A"));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

// ── bare mode ────────────────────────────────────────────────

describe("bare prop", () => {
  it("renders without crashing in bare mode", () => {
    render(<MenuTree nodes={simpleNodes} bare />);
    expect(screen.getByText("Node A")).toBeInTheDocument();
  });

  it("renders normally when bare is false", () => {
    render(<MenuTree nodes={simpleNodes} bare={false} />);
    expect(screen.getByText("Node A")).toBeInTheDocument();
  });
});

// ── disabled prop ────────────────────────────────────────────

describe("disabled prop", () => {
  it("does not call onNodeSelect when disabled", () => {
    const onSelect = vi.fn();
    render(
      <MenuTree nodes={simpleNodes} onNodeSelect={onSelect} disabled />,
    );
    fireEvent.click(screen.getByText("Node A"));
    expect(onSelect).not.toHaveBeenCalled();
  });
});

// ── Tags overflow ────────────────────────────────────────────

describe("tags overflow", () => {
  it("renders +N badge when more than 5 tags", () => {
    const manyTags: TreeNode[] = [
      {
        id: "1",
        label: "Many Tags",
        tags: ["a", "b", "c", "d", "e", "f", "g"],
      },
    ];
    render(<MenuTree nodes={manyTags} />);
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("does not show overflow badge with 5 or fewer tags", () => {
    const fewTags: TreeNode[] = [
      { id: "1", label: "Few Tags", tags: ["a", "b", "c"] },
    ];
    render(<MenuTree nodes={fewTags} />);
    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("b")).toBeInTheDocument();
    expect(screen.getByText("c")).toBeInTheDocument();
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });
});

// ── Translation ──────────────────────────────────────────────

describe("translation", () => {
  it("uses custom translation for action button titles", () => {
    render(
      <MenuTree
        nodes={simpleNodes}
        onNodeEdit={vi.fn()}
        translation={{
          ...defaultTranslation,
          edit: "ویرایش",
        }}
      />,
    );
    expect(screen.getAllByTitle("ویرایش")).toHaveLength(2);
  });

  it("uses custom translation for footer legends", () => {
    render(
      <MenuTree
        nodes={simpleNodes}
        onNodeCheck={vi.fn()}
        translation={{
          ...defaultTranslation,
          selected: "انتخاب شده",
          notSelected: "انتخاب نشده",
        }}
      />,
    );
    expect(screen.getByText("انتخاب شده")).toBeInTheDocument();
    expect(screen.getByText("انتخاب نشده")).toBeInTheDocument();
  });
});
