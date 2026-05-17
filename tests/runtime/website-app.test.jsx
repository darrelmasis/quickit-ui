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

  it("navigates to component docs from the header search", async () => {
    const user = userEvent.setup();

    render(
      <QuickitThemeProvider
        defaultTheme="light"
        storageKey={WEBSITE_THEME_STORAGE_KEY}
      >
        <WebsiteApp />
      </QuickitThemeProvider>,
    );

    await user.click(screen.getByRole("button", { name: /buscar en docs/i }));

    const searchInput = await screen.findByLabelText(
      /buscar en la paleta de comandos/i,
    );

    await user.type(searchInput, "Accordion");
    await user.click(await screen.findByRole("option", { name: "Accordion" }));

    expect(await screen.findByRole("heading", { name: "Accordion" })).toBeTruthy();
    expect(window.location.pathname).toBe("/docs/components/accordion");
  }, 15000);

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
        name: /la forma más/i,
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /abrir quickit ui en npm/i }),
    ).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: /abrir quickit ui en npm/i })
        .getAttribute("href"),
    ).toBe("https://www.npmjs.com/package/quickit-ui");
    expect(
      screen
        .getByRole("link", {
          name: /abrir repositorio de quickit ui en github/i,
        })
        .getAttribute("href"),
    ).toBe("https://github.com/darrelmasis/quickit-ui");
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
    expect(await screen.findByText("Design lead")).toBeTruthy();
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
