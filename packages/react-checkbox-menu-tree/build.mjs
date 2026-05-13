import { writeFileSync, mkdirSync } from "fs";

mkdirSync("dist", { recursive: true });

const esmContent = `export * from "react-checktree";\nexport { MenuTree as default } from "react-checktree";\n`;
const cjsContent = `"use strict";\nconst pkg = require("react-checktree");\nmodule.exports = pkg;\nObject.assign(module.exports, pkg);\nmodule.exports.default = pkg.MenuTree;\n`;
const dtsContent = `export * from "react-checktree";\nexport { MenuTree as default } from "react-checktree";\n`;

writeFileSync("dist/index.mjs", esmContent);
writeFileSync("dist/index.cjs", cjsContent);
writeFileSync("dist/index.d.ts", dtsContent);

console.log("Built react-checkbox-menu-tree wrapper.");
