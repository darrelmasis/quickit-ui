import { useMemo } from "react";
import { normalizeQuickitFocusRingConfig } from "./focus-ring";
import { normalizeQuickitPressEffect } from "./press-effect";
import { normalizeQuickitRippleConfig } from "./ripple";
import { QuickitThemeContext } from "./quickit-theme-context";

export function QuickitProvider({
  children,
  focusRing = true,
  pressEffect = "transform",
  ripple = true,
  theme = "light",
}) {
  const value = useMemo(
    () => ({
      focusRing: normalizeQuickitFocusRingConfig(focusRing),
      pressEffect: normalizeQuickitPressEffect(pressEffect),
      ripple: normalizeQuickitRippleConfig(ripple),
      theme,
    }),
    [focusRing, pressEffect, ripple, theme],
  );

  return (
    <QuickitThemeContext.Provider value={value}>
      {children}
    </QuickitThemeContext.Provider>
  );
}
