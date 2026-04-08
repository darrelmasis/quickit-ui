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

export const QUICKIT_THEME_STORAGE_KEY = "quickit-ui-theme";
export const QUICKIT_THEME_OPTIONS = Object.freeze([
  "system",
  "light",
  "dark",
]);
const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";

const QuickitThemeControllerContext = createContext(null);

function resolveThemeMode(theme) {
  return theme === "dark" ? "dark" : "light";
}

function resolveThemeOption(theme) {
  return QUICKIT_THEME_OPTIONS.includes(theme) ? theme : "light";
}

function getSystemTheme() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "light";
  }

  return window.matchMedia(SYSTEM_THEME_QUERY).matches ? "dark" : "light";
}

function readStoredTheme(storageKey, fallbackTheme) {
  if (typeof window === "undefined") {
    return resolveThemeOption(fallbackTheme);
  }

  const storedTheme = window.localStorage.getItem(storageKey);
  return resolveThemeOption(storedTheme ?? fallbackTheme);
}

function applyThemeClass(theme) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function QuickitThemeProvider({
  children,
  defaultTheme = "system",
  focusRing = true,
  pressEffect = "transform",
  ripple = true,
  storageKey = QUICKIT_THEME_STORAGE_KEY,
}) {
  const [theme, setThemeState] = useState(() =>
    readStoredTheme(storageKey, defaultTheme),
  );
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);
  // theme = preferencia guardada; resolvedTheme = modo efectivo que realmente
  // consume la librería después de resolver el caso "system".
  const resolvedTheme = theme === "system" ? systemTheme : resolveThemeMode(theme);

  useEffect(() => {
    setThemeState(readStoredTheme(storageKey, defaultTheme));
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY);
    // Escuchamos cambios del sistema solo una vez; si el usuario está en
    // "system", resolvedTheme se actualiza sin que tenga que refrescar.
    const updateSystemTheme = (event) => {
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
      // Persistimos la preferencia original, no el tema resuelto, para que el
      // modo "system" siga siendo reversible entre sesiones.
      window.localStorage.setItem(storageKey, theme);
    }
  }, [resolvedTheme, storageKey, theme]);

  const setTheme = useCallback((nextTheme) => {
    setThemeState(resolveThemeOption(nextTheme));
  }, []);

  const toggleTheme = useCallback(() => {
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
        pressEffect={pressEffect}
        ripple={ripple}
      >
        {children}
      </QuickitProvider>
    </QuickitThemeControllerContext.Provider>
  );
}

export function useQuickitThemeController() {
  const context = useContext(QuickitThemeControllerContext);

  if (!context) {
    throw new Error(
      "useQuickitThemeController must be used within QuickitThemeProvider.",
    );
  }

  return context;
}
