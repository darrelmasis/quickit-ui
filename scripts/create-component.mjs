#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const componentsDir = path.join(root, "src", "lib", "components");

const name = process.argv[2];
if (!name) {
  console.error("Usage: npm run component:create -- Nombre");
  process.exit(1);
}

const pascal = name[0].toUpperCase() + name.slice(1);
const kebab = pascal.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
const componentDir = path.join(componentsDir, kebab);

if (fs.existsSync(componentDir)) {
  console.error(`Error: ${componentDir} already exists`);
  process.exit(1);
}

fs.mkdirSync(componentDir, { recursive: true });

// Component JSX
const componentCode = `import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const ${pascal} = forwardRef(function ${pascal}({ className, ...props }, ref) {
  return (
    <div ref={ref} className={cn(className)} {...props} />
  );
});

export { ${pascal} };
export default ${pascal};
`;

// Barrel index.js
const barrelCode = `export { ${pascal} } from "./${pascal}";
export { ${pascal} as default } from "./${pascal}";
`;

fs.writeFileSync(path.join(componentDir, `${pascal}.jsx`), componentCode);
// Los barrel index.js están deprecated — ver components/index.js para export directo.

// Append to components/index.js
const componentsIndexPath = path.join(componentsDir, "index.js");
const componentsIndex = fs.readFileSync(componentsIndexPath, "utf8");
const newLine = `export { ${pascal} } from "./${kebab}/${pascal}";`;
if (!componentsIndex.includes(newLine)) {
  // Insert in alphabetical order
  const lines = componentsIndex.trim().split("\n");
  const insertBefore = lines.findIndex(
    (l) => l.trim() > newLine,
  );
  if (insertBefore === -1 || insertBefore === 0) {
    lines.push(newLine);
  } else if (insertBefore === 1) {
    lines.splice(0, 0, newLine);
  } else {
    lines.splice(insertBefore, 0, newLine);
  }
  fs.writeFileSync(componentsIndexPath, lines.join("\n") + "\n");
}

console.log(`✅ Created component: ${pascal}`);
console.log(`   ${componentDir}\\${pascal}.jsx`);
console.log(`   Updated ${componentsIndexPath}`);
console.log("\nDon't forget to:");
console.log(`   • Add ${pascal}Props type to src/lib/quickit-ui.d.ts`);
