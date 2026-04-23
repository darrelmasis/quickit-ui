import { copyFile, mkdir, writeFile } from "node:fs/promises";
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
await copyFile(
  path.join(rootDir, "src", "lib", "theme", "brand-theme.css"),
  path.join(distDir, "brand-theme.css"),
);
await copyFile(
  path.join(rootDir, "src", "lib", "theme", "brand-vars.css"),
  path.join(distDir, "brand-vars.css"),
);
await writeFile(
  path.join(distDir, "styles.css"),
  '@import "./brand-theme.css";\n@import "./quickit-ui.css";\n',
  "utf8",
);
