import { createContext } from "react";

export const QuickitThemeContext = createContext({
  focusRing: {
    disabledComponents: [],
    enabled: true,
  },
  ripple: {
    disabledComponents: [],
    enabled: true,
  },
  pressEffect: "transform",
  theme: "light",
});

/**
 * Normaliza cualquier valor de tema a "light" | "dark".
 * Centraliza la lógica que estaba duplicada en cada componente.
 */
export function resolveQuickitThemeMode(theme) {
  return theme === "dark" ? "dark" : "light";
}
