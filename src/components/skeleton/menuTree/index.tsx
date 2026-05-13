import { Fragment } from "react";

type SkeletonItem = {
  id: number;
  children: SkeletonItem[];
};

const TREE: SkeletonItem[] = [
  { id: 1, children: [] },
  {
    id: 2,
    children: [
      { id: 3, children: [{ id: 4, children: [] }] },
      { id: 5, children: [] },
    ],
  },
  { id: 6, children: [] },
  {
    id: 7,
    children: [{ id: 8, children: [{ id: 9, children: [] }] }],
  },
];

const widths = [80, 120, 60, 100, 90, 110, 70, 130, 95];

function renderTree(items: SkeletonItem[], depth = 0) {
  return (
    <div className="rmt-skeleton-tree">
      <ul>
        {items.map((item, i) => {
          const hasChildren = item.children.length > 0;
          return (
            <Fragment key={item.id}>
              <li>
                <div className="rmt-skeleton-row">
                  <span className="rmt-skeleton-line" />
                  <div
                    className="rmt-skeleton-bar"
                    style={{ width: widths[(depth + i) % widths.length] }}
                  />
                </div>
              </li>
              {hasChildren && renderTree(item.children, depth + 1)}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}

export const MenuTreeSkeleton = () => (
  <div className="rmt-skeleton">
    <div className="rmt-shimmer-wrap">
      <div className="rmt-shimmer" />
    </div>
    <div className="rmt-skeleton-header">
      <div className="rmt-skeleton-title" />
      <div className="rmt-skeleton-icons">
        <div className="rmt-skeleton-icon" />
        <div className="rmt-skeleton-icon" />
      </div>
    </div>
    {renderTree(TREE)}
  </div>
);
