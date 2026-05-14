// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const storybookFlat = storybook.configs["flat/recommended"];
const storybookConfigs = Array.isArray(storybookFlat)
  ? storybookFlat
  : storybookFlat
    ? [storybookFlat]
    : [];

export default tseslint.config(
  {
    ignores: [
      "dist",
      "storybook-static",
      "sample/**",
      "coverage",
      "**/node_modules/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ["packages/**/*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
  ...storybookConfigs,
);
