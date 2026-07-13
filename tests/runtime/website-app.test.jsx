import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { QuickitThemeProvider } from "@/lib";
import WebsiteApp from "@/website/WebsiteApp";
import { WEBSITE_THEME_STORAGE_KEY } from "@/website/site-config";

describe("WebsiteApp", () => {
  beforeEach(() => {
    window.history.pushState(null, "", "/");
    window.scrollTo = vi.fn();
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    Element.prototype.scrollIntoView = vi.fn();
    global.IntersectionObserver = class {
      disconnect() {}
      observe() {}
      unobserve() {}
    };
  });

  it("normalizes legacy docs routes to english urls", async () => {
    window.history.pushState(null, "", "/docs/instalacion");

    render(
      <QuickitThemeProvider
        defaultTheme="light"
        storageKey={WEBSITE_THEME_STORAGE_KEY}
      >
        <WebsiteApp />
      </QuickitThemeProvider>,
    );

    expect(await screen.findByRole("heading", { name: "Instalación" })).toBeTruthy();
    expect(window.location.pathname).toBe("/docs/installation");
  }, 15000);

  it("renders the examples page without invalid component types", async () => {
    window.history.pushState(null, "", "/examples");

    render(
      <QuickitThemeProvider
        defaultTheme="light"
        storageKey={WEBSITE_THEME_STORAGE_KEY}
      >
        <WebsiteApp />
      </QuickitThemeProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: "Ejemplos de producto reales" }),
    ).toBeTruthy();
  }, 15000);

  it("renders the landing page without invalid component types", async () => {
    window.history.pushState(null, "", "/");

    render(
      <QuickitThemeProvider
        defaultTheme="light"
        storageKey={WEBSITE_THEME_STORAGE_KEY}
      >
        <WebsiteApp />
      </QuickitThemeProvider>,
    );

    expect(
      await screen.findByRole("heading", {
        name: /construye interfaces/i,
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /documentación/i }),
    ).toBeTruthy();
  }, 15000);

  it("renders the avatar docs page without invalid component types", async () => {
    window.history.pushState(null, "", "/docs/components/avatar");

    render(
      <QuickitThemeProvider
        defaultTheme="light"
        storageKey={WEBSITE_THEME_STORAGE_KEY}
      >
        <WebsiteApp />
      </QuickitThemeProvider>,
    );

    expect(await screen.findByRole("heading", { name: "Avatar" })).toBeTruthy();
    const designLeadEls = await screen.findAllByText("Design lead");
    expect(designLeadEls.length).toBeGreaterThanOrEqual(1);
  }, 15000);

  it("syncs the document theme when toggling dark mode", async () => {
    const user = userEvent.setup();
    window.history.pushState(null, "", "/");

    render(
      <QuickitThemeProvider
        defaultTheme="light"
        storageKey={WEBSITE_THEME_STORAGE_KEY}
      >
        <WebsiteApp />
      </QuickitThemeProvider>,
    );

    expect(document.documentElement.classList.contains("dark")).toBe(false);

    await user.click(screen.getByRole("button", { name: /activar tema oscuro/i }));

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  }, 15000);
});
