import { useState } from "react";
import MenuTree, {
  type TCallbackData,
  type TCallbackIds,
  type TData,
  type TLeftSideWidgetData,
} from "react-checkbox-menu-tree";
import "react-checkbox-menu-tree/components/fonts/fonts.css";

const mockData: TData[] = [
  {
    id: 1204,
    title: "Documents",
    description: "Company files and templates.",
    ticked: "FULL",
    parentId: null,
    tags: ["shared", "2024"],
    repeat: [],
  },
  {
    id: 1205,
    title: "Projects",
    description: "Active workstreams.",
    ticked: "HALF",
    parentId: null,
    repeat: [
      {
        id: 1206,
        title: "Website redesign",
        description: "Marketing site refresh.",
        ticked: "FULL",
        parentId: 1205,
        repeat: [],
      },
      {
        id: 1207,
        title: "Mobile app",
        description: "iOS and Android clients.",
        ticked: "NOT",
        parentId: 1205,
        tags: ["beta"],
        repeat: [],
      },
    ],
  },
  {
    id: 1208,
    title: "Archive",
    description: "Older releases.",
    ticked: "NOT",
    parentId: null,
    repeat: [],
  },
];

const propertiesMapper = {
  id: "id",
  title: "title",
  description: "description",
  checked: "ticked",
  parentId: "parentId",
  tags: "tags",
  children: "repeat",
  iconName: "iconName",
};

const translation = {
  result: "result",
  resultCount: "result count",
  close: "close",
  search: "search",
  closeAll: "close all",
  openAll: "open all",
};

export default function App() {
  const [log, setLog] = useState<string>("Click a node or use the header.");

  const handleClick = (data: TCallbackData, ids: TCallbackIds) => {
    setLog(
      `onClick — ids: ${JSON.stringify(ids)} — hasData: ${data != null}`,
    );
  };

  const leftSideWidget = (data: TLeftSideWidgetData) => (
    <button
      type="button"
      style={{
        fontSize: 11,
        padding: "2px 6px",
        borderRadius: 4,
        border: "1px solid #ccc",
        background: "#fafafa",
        cursor: "pointer",
      }}
      onClick={() =>
        setLog(`Widget — ${JSON.stringify(data && !Array.isArray(data) ? data.title : "node")}`)
      }
    >
      Info
    </button>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        background: "linear-gradient(160deg, #f0f4f8 0%, #e2e8f0 100%)",
        color: "#1e293b",
      }}
    >
      <header
        style={{
          padding: "24px 20px 12px",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <h1 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 700 }}>
          react-checkbox-menu-tree
        </h1>
        <p style={{ margin: 0, opacity: 0.85, lineHeight: 1.5 }}>
          Live sample for the{" "}
          <a
            href="https://www.npmjs.com/package/react-checkbox-menu-tree"
            style={{ color: "#0f766e" }}
          >
            npm package
          </a>
          . Source:{" "}
          <a
            href="https://github.com/hoseinmohajer/checkbox-menu-tree"
            style={{ color: "#0f766e" }}
          >
            hoseinmohajer/checkbox-menu-tree
          </a>
          .
        </p>
      </header>

      <main
        style={{
          display: "grid",
          gridTemplateColumns: "1fr minmax(280px, 360px)",
          gap: 20,
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 20px 32px",
        }}
      >
        <section
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(15,23,42,0.08)",
            overflow: "hidden",
            minHeight: 420,
          }}
        >
          <MenuTree
            data={mockData}
            title="Sample tree"
            hasCheckBox
            loading={false}
            headerLess={false}
            disabled={false}
            leftSideWidget={leftSideWidget}
            onClick={handleClick}
            propertiesMapper={propertiesMapper}
            translation={translation}
          />
        </section>

        <aside
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 4px 24px rgba(15,23,42,0.08)",
            fontSize: 14,
            lineHeight: 1.55,
            alignSelf: "start",
          }}
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 16 }}>Event log</h2>
          <pre
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: 13,
              background: "#f8fafc",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #e2e8f0",
            }}
          >
            {log}
          </pre>
          <p style={{ margin: "14px 0 0", fontSize: 12, opacity: 0.75 }}>
            Try expand/collapse, search, checkboxes, and the per-row{" "}
            <strong>Info</strong> button.
          </p>
        </aside>
      </main>
    </div>
  );
}
