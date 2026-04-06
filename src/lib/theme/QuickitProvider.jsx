import { useMemo } from "react";
import { normalizeQuickitFocusRingConfig } from "./focus-ring";
import { QuickitThemeContext } from "./quickit-theme-context";

export function QuickitProvider({
  children,
  focusRing = true,
  theme = "light",
}) {
  const value = useMemo(
    () => ({
      focusRing: normalizeQuickitFocusRingConfig(focusRing),
      theme,
    }),
    [focusRing, theme],
  );

  return (
    <QuickitThemeContext.Provider value={value}>
      {children}
    </QuickitThemeContext.Provider>
  );
}
