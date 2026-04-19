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
    await user.click(await screen.findByRole("button", { name: "Accordion" }));

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
});
