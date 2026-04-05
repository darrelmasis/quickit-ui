import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const srcDir = path.resolve(rootDir, "src");

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": srcDir,
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.js"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
