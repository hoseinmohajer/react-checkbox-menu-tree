import { useEffect, useState } from "react";
import { MenuTree } from "./menuTree";
import { MockData } from "./MockData";
import customTheme from "./customTheme";
import { TDirection, FieldNames, TreeNode } from "./types/common";

type DummyPost = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
};

type DummyPostsResponse = {
  posts: DummyPost[];
};

const POSTS_API_URL = "https://dummyjson.com/posts";

const mapPostToTreeNode = (post: DummyPost): TreeNode => ({
  id: `post-${post.id}`,
  label: post.title,
  description: post.body,
  tags: post.tags,
  checked: false,
  children: [
    {
      id: `post-${post.id}-author`,
      label: `User ${post.userId}`,
      description: "Post author",
    },
    {
      id: `post-${post.id}-reactions`,
      label: `${post.reactions.likes} likes / ${post.reactions.dislikes} dislikes`,
      description: "Reaction summary",
    },
    {
      id: `post-${post.id}-views`,
      label: `${post.views} views`,
      description: "View count",
    },
  ],
});

function App() {
  const [direction, setDirection] = useState<TDirection>("rtl");
  const [asyncNodes, setAsyncNodes] = useState<TreeNode[]>([]);
  const [asyncLoading, setAsyncLoading] = useState(true);
  const [asyncError, setAsyncError] = useState<string | null>(null);

  const dataFieldNames: FieldNames = {
    id: "key",
    label: "title",
    description: "desc",
    tags: "badges",
    checked: "ticked",
    children: "items",
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        setAsyncLoading(true);
        setAsyncError(null);

        const response = await fetch(POSTS_API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as DummyPostsResponse;
        setAsyncNodes(data.posts.map(mapPostToTreeNode));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setAsyncError(
          error instanceof Error ? error.message : "Unable to load posts",
        );
        setAsyncNodes([]);
      } finally {
        if (!controller.signal.aborted) {
          setAsyncLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      controller.abort();
    };
  }, []);

  const asyncMenuNodes = asyncError
    ? [
        {
          id: "posts-load-error",
          label: "Could not load posts",
          description: asyncError,
        },
      ]
    : asyncNodes;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(145deg, #050810 0%, #0a1628 50%, #050810 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "15%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          textAlign: "center",
          marginBottom: "32px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            background: "rgba(14, 165, 233, 0.08)",
            border: "1px solid rgba(14, 165, 233, 0.2)",
            borderRadius: "20px",
            fontSize: "12px",
            color: "#0ea5e9",
            marginBottom: "16px",
            fontFamily: "'Vazirmatn', sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#10b981",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
          v2.0.0 — Zero Dependencies
        </div>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 700,
            color: "#f1f5f9",
            margin: "0 0 12px",
            fontFamily: "'Vazirmatn', sans-serif",
            lineHeight: 1.3,
          }}
        >
          React Checkbox{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Menu Tree
          </span>
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#64748b",
            maxWidth: "460px",
            margin: "0 auto 24px",
            lineHeight: 1.8,
            fontFamily: "'Vazirmatn', sans-serif",
          }}
        >
          Lightweight React tree component with hierarchical checkboxes, search,
          RTL/LTR support, and CSS variable theming. Zero runtime dependencies.
        </p>

        <div
          style={{
            display: "inline-flex",
            background: "#0c1222",
            border: "1px solid #1e3a5f",
            borderRadius: "10px",
            padding: "4px",
            gap: "4px",
          }}
        >
          <button
            onClick={() => setDirection("rtl")}
            style={{
              padding: "8px 20px",
              borderRadius: "7px",
              border: "none",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'Vazirmatn', sans-serif",
              transition: "all 0.2s ease",
              background:
                direction === "rtl"
                  ? "linear-gradient(135deg, #0ea5e9, #0284c7)"
                  : "transparent",
              color: direction === "rtl" ? "#ffffff" : "#64748b",
              boxShadow:
                direction === "rtl"
                  ? "0 2px 8px rgba(14, 165, 233, 0.3)"
                  : "none",
            }}
          >
            RTL
          </button>
          <button
            onClick={() => setDirection("ltr")}
            style={{
              padding: "8px 20px",
              borderRadius: "7px",
              border: "none",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'Vazirmatn', sans-serif",
              transition: "all 0.2s ease",
              background:
                direction === "ltr"
                  ? "linear-gradient(135deg, #0ea5e9, #0284c7)"
                  : "transparent",
              color: direction === "ltr" ? "#ffffff" : "#64748b",
              boxShadow:
                direction === "ltr"
                  ? "0 2px 8px rgba(14, 165, 233, 0.3)"
                  : "none",
            }}
          >
            LTR
          </button>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "780px",
          position: "relative",
          zIndex: 1,
          marginTop: "48px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#94a3b8",
            marginBottom: "16px",
            fontFamily: "'Vazirmatn', sans-serif",
            textAlign: "center",
          }}
        >
          Async API Data
        </h2>
        <MenuTree
          nodes={asyncMenuNodes}
          title="DummyJSON Posts"
          direction={direction}
          loading={asyncLoading}
          disabled={!!asyncError}
          theme={customTheme}
          onNodeCheck={(node, checked) => {
            console.log("async check:", node.label, checked);
          }}
          onNodeSelect={(node) => {
            console.log("async select:", node.label);
          }}
          translation={{
            result: "result",
            resultCount: "results",
            close: "Close",
            search: "Search",
            closeAll: "Close all",
            openAll: "Open all",
            expandAll: "Expand",
            collapseAll: "Collapse",
            itemCount: "items",
            selected: "Selected",
            notSelected: "Not selected",
          }}
        />
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "780px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            background: "rgba(12, 18, 34, 0.6)",
            border: "1px solid rgba(30, 58, 95, 0.5)",
            borderRadius: "16px",
            padding: "2px",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 0 0 1px rgba(14, 165, 233, 0.05), 0 20px 50px rgba(0, 0, 0, 0.4), 0 0 100px rgba(14, 165, 233, 0.03)",
          }}
        >
          <MenuTree
            nodes={MockData}
            fieldNames={dataFieldNames}
            title="Admin Panel"
            direction={direction}
            loading={false}
            disabled={false}
            theme={customTheme}
            onNodeCheck={(node, checked) => {
              console.log("check:", node.label, checked);
            }}
            onNodeSelect={(node) => {
              console.log("select:", node.label);
            }}
            onNodeEdit={(node) => {
              console.log("edit:", node.label);
            }}
            onNodeCopy={(node) => {
              console.log("copy:", node.label);
            }}
            onNodeDelete={(node) => {
              console.log("delete:", node.label);
            }}
            onNodeMore={(node) => {
              console.log("more:", node.label);
            }}
            translation={{
              result: "result",
              resultCount: "results",
              close: "Close",
              search: "Search",
              closeAll: "Close all",
              openAll: "Open all",
              expandAll: "Expand",
              collapseAll: "Collapse",
              itemCount: "items",
              selected: "Selected",
              notSelected: "Not selected",
            }}
          />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "780px",
          position: "relative",
          zIndex: 1,
          marginTop: "48px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#94a3b8",
            marginBottom: "16px",
            fontFamily: "'Vazirmatn', sans-serif",
            textAlign: "center",
          }}
        >
          Default Theme (Basic)
        </h2>
        <MenuTree
          nodes={MockData}
          fieldNames={dataFieldNames}
          title="Simple Menu"
          direction={direction}
          showIcon={false}
          onNodeSelect={(node) => {
            console.log("basic select:", node.label);
          }}
          headerLess
        />
      </div>

      <div
        style={{
          marginTop: "32px",
          display: "flex",
          gap: "24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {[
          { label: "RTL Support", icon: "←→" },
          { label: "Zero Deps", icon: "0" },
          { label: "TypeScript", icon: "TS" },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "#64748b",
              fontFamily: "'Vazirmatn', sans-serif",
            }}
          >
            <span
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                background: "rgba(14, 165, 233, 0.08)",
                border: "1px solid rgba(14, 165, 233, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                color: "#0ea5e9",
              }}
            >
              {item.icon}
            </span>
            {item.label}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

export default App;
