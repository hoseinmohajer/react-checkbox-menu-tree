/**
 * Publishes to registry.npmjs.org while the repo is configured for GitHub Packages
 * (.npmrc scope + publishConfig per https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).
 */
import { readFileSync, writeFileSync, renameSync, existsSync, unlinkSync } from "node:fs";
import { spawnSync } from "node:child_process";

const pkgPath = "package.json";
const npmrcPath = ".npmrc";
const npmrcTmp = ".npmrc.publish-npmjs.bak";

const pkgOriginal = readFileSync(pkgPath, "utf8");
const npmrcOriginal = existsSync(npmrcPath) ? readFileSync(npmrcPath, "utf8") : null;

const pkg = JSON.parse(pkgOriginal);
delete pkg.publishConfig;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

if (npmrcOriginal) renameSync(npmrcPath, npmrcTmp);
else if (existsSync(npmrcTmp)) unlinkSync(npmrcTmp);

const result = spawnSync(
  "npm",
  ["publish", "--registry", "https://registry.npmjs.org/", "--access", "public"],
  { stdio: "inherit" },
);

writeFileSync(pkgPath, pkgOriginal);
if (npmrcOriginal) renameSync(npmrcTmp, npmrcPath);

process.exit(result.status === null ? 1 : result.status);
