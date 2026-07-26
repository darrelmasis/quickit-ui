import { createContext } from "react";

export interface QuickitThemeConfig {
  focusRing: {
    disabledComponents: string[];
    enabled: boolean;
  };
  ripple: {
    disabledComponents: string[];
    enabled: boolean;
  };
  pressEffect: string;
  customScrollbar: boolean;
  radius: string;
  theme: string;
}

export const QuickitThemeContext = createContext<QuickitThemeConfig>({
  focusRing: {
    disabledComponents: [],
    enabled: true,
  },
  ripple: {
    disabledComponents: [],
    enabled: true,
  },
  pressEffect: "transform",
  customScrollbar: true,
  radius: "0.75rem",
  theme: "light",
});

export function resolveQuickitThemeMode(theme: string): string {
  return theme === "dark" ? "dark" : "light";
}
