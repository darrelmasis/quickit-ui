import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const srcDir = path.resolve(rootDir, "src");
const libEntry = path.resolve(srcDir, "lib", "index.js");

export default defineConfig(({ command, mode }) => {
  const isDevServer = command === "serve";
  const isDocsBuild = mode === "docs";

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": srcDir,
      },
    },
    build: isDevServer
      ? undefined
      : isDocsBuild
        ? {
            outDir: "dist-docs",
            emptyOutDir: true,
          }
        : {
          emptyOutDir: true,
          sourcemap: true,
          lib: {
            entry: libEntry,
            name: "QuickitUI",
            formats: ["es"],
            fileName: "quickit-ui",
            cssFileName: "quickit-ui",
          },
          rollupOptions: {
            external: ["react", "react-dom"],
            output: {
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
              },
            },
          },
        },
  };
});
