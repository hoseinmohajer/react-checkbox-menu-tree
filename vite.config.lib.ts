import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["index.ts", "components"],
      rollupTypes: true,
      compilerOptions: {
        skipLibCheck: true,
        noImplicitAny: false,
        strict: false,
      },
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "ReactCheckboxMenuTree",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "styled-components",
      ],
      output: {
        exports: "named",
        assetFileNames: "react-checkbox-menu-tree.[ext]",
      },
    },
    emptyOutDir: true,
    outDir: "dist",
  },
});
