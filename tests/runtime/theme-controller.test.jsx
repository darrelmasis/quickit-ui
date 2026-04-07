import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  QUICKIT_THEME_OPTIONS,
  QuickitThemeProvider,
  useQuickitTheme,
  useQuickitThemeController,
} from "@/lib";

const STORAGE_KEY = "quickit-ui-theme-test";
const SYSTEM_QUERY = "(prefers-color-scheme: dark)";

function installMatchMedia(initialMatches = false) {
  const listeners = new Set();
  const mediaQueryList = {
    matches: initialMatches,
    media: SYSTEM_QUERY,
    addEventListener: (_event, listener) => {
      listeners.add(listener);
    },
    removeEventListener: (_event, listener) => {
      listeners.delete(listener);
    },
    addListener: (listener) => {
      listeners.add(listener);
    },
    removeListener: (listener) => {
      listeners.delete(listener);
    },
    dispatch(nextMatches) {
      mediaQueryList.matches = nextMatches;
      listeners.forEach((listener) => listener({ matches: nextMatches }));
    },
  };

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: () => mediaQueryList,
  });

  return mediaQueryList;
}

function ThemeControllerPreview() {
  const quickitTheme = useQuickitTheme();
  const { resolvedTheme, setTheme, systemTheme, theme, toggleTheme } =
    useQuickitThemeController();

  return (
    <div>
      <span>provider theme: {quickitTheme}</span>
      <span>controller theme: {theme}</span>
      <span>resolved theme: {resolvedTheme}</span>
      <span>system theme: {systemTheme}</span>
      <button type="button" onClick={toggleTheme}>
        toggle
      </button>
      <button type="button" onClick={() => setTheme("light")}>
        light
      </button>
      <button type="button" onClick={() => setTheme("system")}>
        system
      </button>
    </div>
  );
}

describe("theme controller", () => {
  beforeEach(() => {
    installMatchMedia(false);
    window.localStorage.removeItem(STORAGE_KEY);
    document.documentElement.classList.remove("dark");
  });

  afterEach(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    document.documentElement.classList.remove("dark");
  });

  it("exports the expected theme options", () => {
    expect(QUICKIT_THEME_OPTIONS).toEqual(["system", "light", "dark"]);
  });

  it("reads the initial theme from localStorage and syncs QuickitProvider", async () => {
    window.localStorage.setItem(STORAGE_KEY, "dark");

    render(
      <QuickitThemeProvider defaultTheme="light" storageKey={STORAGE_KEY}>
        <ThemeControllerPreview />
      </QuickitThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("provider theme: dark")).toBeTruthy();
      expect(screen.getByText("controller theme: dark")).toBeTruthy();
      expect(screen.getByText("resolved theme: dark")).toBeTruthy();
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });

  it("supports system theme and reacts to prefers-color-scheme changes", async () => {
    const mediaQuery = installMatchMedia(true);

    render(
      <QuickitThemeProvider defaultTheme="system" storageKey={STORAGE_KEY}>
        <ThemeControllerPreview />
      </QuickitThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("controller theme: system")).toBeTruthy();
      expect(screen.getByText("resolved theme: dark")).toBeTruthy();
      expect(screen.getByText("system theme: dark")).toBeTruthy();
      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe("system");
    });

    mediaQuery.dispatch(false);

    await waitFor(() => {
      expect(screen.getByText("resolved theme: light")).toBeTruthy();
      expect(screen.getByText("system theme: light")).toBeTruthy();
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });
  });

  it("toggles theme and persists it using the configured storage key", async () => {
    const user = userEvent.setup();

    render(
      <QuickitThemeProvider defaultTheme="light" storageKey={STORAGE_KEY}>
        <ThemeControllerPreview />
      </QuickitThemeProvider>,
    );

    expect(screen.getByText("provider theme: light")).toBeTruthy();
    expect(screen.getByText("controller theme: light")).toBeTruthy();
    expect(screen.getByText("resolved theme: light")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "toggle" }));

    await waitFor(() => {
      expect(screen.getByText("provider theme: dark")).toBeTruthy();
      expect(screen.getByText("controller theme: dark")).toBeTruthy();
      expect(screen.getByText("resolved theme: dark")).toBeTruthy();
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    await user.click(screen.getByRole("button", { name: "light" }));

    await waitFor(() => {
      expect(screen.getByText("provider theme: light")).toBeTruthy();
      expect(screen.getByText("controller theme: light")).toBeTruthy();
      expect(screen.getByText("resolved theme: light")).toBeTruthy();
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe("light");
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    await user.click(screen.getByRole("button", { name: "system" }));

    await waitFor(() => {
      expect(screen.getByText("controller theme: system")).toBeTruthy();
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe("system");
    });
  });
});
