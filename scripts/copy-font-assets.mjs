import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const fontsSrc = path.join(root, "components", "fonts");
const dist = path.join(root, "dist");
const fontsDest = path.join(dist, "fonts");

fs.mkdirSync(fontsDest, { recursive: true });

for (const name of fs.readdirSync(fontsSrc)) {
  if (name === "fonts.css") continue;
  const from = path.join(fontsSrc, name);
  const to = path.join(fontsDest, name);
  fs.cpSync(from, to, { recursive: true });
}

let css = fs.readFileSync(path.join(fontsSrc, "fonts.css"), "utf8");
css = css
  .replaceAll("url('eot/", "url('./fonts/eot/")
  .replaceAll("url('woff2/", "url('./fonts/woff2/")
  .replaceAll("url('woff/", "url('./fonts/woff/")
  .replaceAll("url('ttf/", "url('./fonts/ttf/");

fs.writeFileSync(path.join(dist, "react-checkbox-menu-tree.css"), css);
