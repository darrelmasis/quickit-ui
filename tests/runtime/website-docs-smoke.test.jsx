import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuickitThemeProvider } from "@/lib";
import { COMPONENT_DOCS } from "@/website/component-docs";
import DocsPage from "@/website/sections/DocsPage";
import { WEBSITE_THEME_STORAGE_KEY } from "@/website/site-config";

function renderDocsPath(pathname) {
  window.history.pushState(null, "", pathname);

  return render(
    <QuickitThemeProvider
      defaultTheme="light"
      storageKey={WEBSITE_THEME_STORAGE_KEY}
    >
      <DocsPage currentPath={pathname} />
    </QuickitThemeProvider>,
  );
}

describe("DocsPage smoke", () => {
  beforeEach(() => {
    window.history.pushState(null, "", "/docs");
    window.scrollTo = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();
    global.IntersectionObserver = class {
      disconnect() {}
      observe() {}
      unobserve() {}
    };
  });

  afterEach(() => {
    cleanup();
  });

  it("renders overview docs routes", async () => {
    const routes = [
      "/docs",
      "/docs/installation",
      "/docs/migration",
      "/docs/changelog",
      "/docs/theme",
      "/docs/behavior",
      "/docs/tokens",
      "/docs/components",
      "/docs/hooks",
    ];

    for (const route of routes) {
      const view = renderDocsPath(route);
      expect(await screen.findByRole("main")).toBeTruthy();
      view.unmount();
    }
  }, 30000);

  it("renders every component docs page", async () => {
    for (const slug of Object.keys(COMPONENT_DOCS)) {
      const view = renderDocsPath(`/docs/components/${slug}`);
      expect(await screen.findByRole("heading", { level: 1 })).toBeTruthy();
      view.unmount();
    }
  }, 60000);
});
