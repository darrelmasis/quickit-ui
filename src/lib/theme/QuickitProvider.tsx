import { useEffect, useMemo } from "react";
import { normalizeQuickitCustomScrollbar } from "./custom-scrollbar";
import { normalizeQuickitFocusRingConfig } from "./focus-ring";
import { normalizeQuickitPressEffect } from "./press-effect";
import { normalizeQuickitRippleConfig } from "./ripple";
import { normalizeQuickitRadius } from "./radius";
import { QuickitThemeContext } from "./quickit-theme-context";
import { QuickitLangContext } from "@/lib/i18n/lang-context";
import type { QuickitLang } from "@/lib/i18n/lang-context";

export function QuickitProvider({
  children,
  focusRing = true,
  lang = "es",
  pressEffect = "transform",
  ripple = true,
  customScrollbar = true,
  radius = "sm",
  theme = "light",
}: {
  children?: React.ReactNode;
  focusRing?: boolean | { disabledComponents?: string[]; enabled?: boolean };
  lang?: QuickitLang;
  pressEffect?: string;
  ripple?: boolean | { disabledComponents?: string[]; enabled?: boolean };
  customScrollbar?: boolean;
  radius?: string;
  theme?: string;
}) {
  // QuickitProvider no persiste estado; solo normaliza la política visual
  // compartida para tema, focus ring, efectos de presión e idioma.
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
    html.style.setProperty("--qk-radius", normalizedRadius);
  }, [normalizedRadius]);

  useEffect(() => {
    const html = document.documentElement;
    if (customScrollbar) {
      html.setAttribute("data-qk-custom-scrollbar", "");
    } else {
      html.removeAttribute("data-qk-custom-scrollbar");
    }
  }, [customScrollbar]);

  return (
    <QuickitLangContext.Provider value={lang}>
      <QuickitThemeContext.Provider value={value}>
        {children}
      </QuickitThemeContext.Provider>
    </QuickitLangContext.Provider>
  );
}
