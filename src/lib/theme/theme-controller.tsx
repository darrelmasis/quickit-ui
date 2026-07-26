/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { QuickitProvider } from "./QuickitProvider";
import { resolveQuickitThemeMode } from "./quickit-theme-context";
import type { QuickitLang } from "@/lib/i18n/lang-context";

export const QUICKIT_THEME_STORAGE_KEY = "quickit-ui-theme";
export const QUICKIT_THEME_OPTIONS = Object.freeze([
  "system",
  "light",
  "dark",
] as const);

type QuickitThemeOption = (typeof QUICKIT_THEME_OPTIONS)[number];

interface ThemeControllerValue {
  resolvedTheme: string;
  setTheme: (theme: string) => void;
  systemTheme: "light" | "dark";
  theme: string;
  toggleTheme: () => void;
}

const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";

const QuickitThemeControllerContext = createContext<ThemeControllerValue | null>(null);

function resolveThemeMode(theme: string): string {
  return resolveQuickitThemeMode(theme);
}

function resolveThemeOption(theme: string | null): QuickitThemeOption {
  return QUICKIT_THEME_OPTIONS.includes(theme as QuickitThemeOption)
    ? (theme as QuickitThemeOption)
    : "light";
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "light";
  }

  return window.matchMedia(SYSTEM_THEME_QUERY).matches ? "dark" : "light";
}

function readStoredTheme(storageKey: string, fallbackTheme: string): string {
  if (typeof window === "undefined") {
    return resolveThemeOption(fallbackTheme);
  }

  const storedTheme = window.localStorage.getItem(storageKey);
  return resolveThemeOption(storedTheme ?? fallbackTheme);
}

function applyThemeClass(theme: string): void {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function QuickitThemeProvider({
  children,
  defaultTheme = "system",
  focusRing = true,
  lang = "es",
  pressEffect = "transform",
  customScrollbar = true,
  ripple = true,
  radius = "sm",
  storageKey = QUICKIT_THEME_STORAGE_KEY,
}: {
  children?: React.ReactNode;
  defaultTheme?: string;
  focusRing?: boolean | { disabledComponents?: string[]; enabled?: boolean };
  lang?: QuickitLang;
  pressEffect?: string;
  customScrollbar?: boolean;
  ripple?: boolean | { disabledComponents?: string[]; enabled?: boolean };
  radius?: string;
  storageKey?: string;
}) {
  const [theme, setThemeState] = useState<string>(() =>
    readStoredTheme(storageKey, defaultTheme),
  );
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(getSystemTheme);

  const resolvedTheme = theme === "system" ? systemTheme : resolveThemeMode(theme);

  useEffect(() => {
    setThemeState(readStoredTheme(storageKey, defaultTheme));
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY);

    const updateSystemTheme = (event: MediaQueryListEvent): void => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateSystemTheme);
      return () => {
        mediaQuery.removeEventListener("change", updateSystemTheme);
      };
    }

    mediaQuery.addListener(updateSystemTheme);
    return () => {
      mediaQuery.removeListener(updateSystemTheme);
    };
  }, []);

  useEffect(() => {
    applyThemeClass(resolvedTheme);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, theme);
    }
  }, [resolvedTheme, storageKey, theme]);

  const setTheme = useCallback((nextTheme: string): void => {
    setThemeState(resolveThemeOption(nextTheme));
  }, []);

  const toggleTheme = useCallback((): void => {
    setThemeState((currentTheme) => {
      const currentResolvedTheme =
        currentTheme === "system" ? systemTheme : resolveThemeMode(currentTheme);
      return currentResolvedTheme === "dark" ? "light" : "dark";
    });
  }, [systemTheme]);

  const value = useMemo(
    () => ({
      resolvedTheme,
      setTheme,
      systemTheme,
      theme,
      toggleTheme,
    }),
    [resolvedTheme, setTheme, systemTheme, theme, toggleTheme],
  );

  return (
    <QuickitThemeControllerContext.Provider value={value}>
      <QuickitProvider
        theme={resolvedTheme}
        focusRing={focusRing}
        lang={lang}
        pressEffect={pressEffect}
        customScrollbar={customScrollbar}
        ripple={ripple}
        radius={radius}
      >
        {children}
      </QuickitProvider>
    </QuickitThemeControllerContext.Provider>
  );
}

export function useQuickitThemeController(): ThemeControllerValue {
  const context = useContext(QuickitThemeControllerContext);

  if (!context) {
    throw new Error(
      "useQuickitThemeController must be used within QuickitThemeProvider.",
    );
  }

  return context;
}
