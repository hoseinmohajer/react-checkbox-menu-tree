import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ command }) => {
  const isLib = command === "build";

  return {
    plugins: [react()],

    ...(isLib && {
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          formats: ["es", "cjs"],
          fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
        },
        rollupOptions: {
          external: ["react", "react-dom", "react/jsx-runtime"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
            assetFileNames: "style[extname]",
          },
        },
        sourcemap: true,
        minify: "esbuild",
        copyPublicDir: false,
      },
    }),

    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
      css: true,
    },
  };
});
