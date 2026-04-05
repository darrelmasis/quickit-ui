import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");

await mkdir(distDir, { recursive: true });
await copyFile(
  path.join(rootDir, "src", "lib", "quickit-ui.d.ts"),
  path.join(distDir, "quickit-ui.d.ts"),
);
await copyFile(
  path.join(rootDir, "src", "lib", "styles.css.d.ts"),
  path.join(distDir, "styles.css.d.ts"),
);
