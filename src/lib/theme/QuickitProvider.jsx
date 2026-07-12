import { useEffect, useMemo } from "react";
import { normalizeQuickitCustomScrollbar } from "./custom-scrollbar";
import { normalizeQuickitFocusRingConfig } from "./focus-ring";
import { normalizeQuickitPressEffect } from "./press-effect";
import { normalizeQuickitRippleConfig } from "./ripple";
import { normalizeQuickitRadius } from "./radius";
import { QuickitThemeContext } from "./quickit-theme-context";

export function QuickitProvider({
  children,
  focusRing = true,
  pressEffect = "transform",
  ripple = true,
  customScrollbar = true,
  radius = "sm",
  theme = "light",
}) {
  // QuickitProvider no persiste estado; solo normaliza la política visual
  // compartida para tema, focus ring y efectos de presión.
  const normalizedRadius = useMemo(() => normalizeQuickitRadius(radius), [radius]);

  const value = useMemo(
    () => ({
      focusRing: normalizeQuickitFocusRingConfig(focusRing),
      pressEffect: normalizeQuickitPressEffect(pressEffect),
      ripple: normalizeQuickitRippleConfig(ripple),
      customScrollbar: normalizeQuickitCustomScrollbar(customScrollbar),
      radius: normalizedRadius,
      theme,
    }),
    [focusRing, pressEffect, ripple, customScrollbar, normalizedRadius, theme],
  );

  useEffect(() => {
    const html = document.documentElement;
    html.style.setProperty("--qi-radius", normalizedRadius);
  }, [normalizedRadius]);

  useEffect(() => {
    const html = document.documentElement;
    if (customScrollbar) {
      html.setAttribute("data-qi-custom-scrollbar", "");
    } else {
      html.removeAttribute("data-qi-custom-scrollbar");
    }
  }, [customScrollbar]);

  return (
    <QuickitThemeContext.Provider value={value}>
      {children}
    </QuickitThemeContext.Provider>
  );
}
