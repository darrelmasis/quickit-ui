import { useEffect, useMemo } from "react";
import { resolveQuickitThemeMode } from "./quickit-theme-context";
import { useQuickitCustomScrollbar } from "./custom-scrollbar";
import { useQuickitFocusRing } from "./focus-ring";
import { useQuickitRipple } from "./ripple";
import { useQuickitPressEffect } from "./press-effect";
import { useQuickitTheme } from "./useQuickitTheme";

/**
 * useQuickitControlState
 * 
 * Centraliza la resolución de políticas visuales (tema, foco, ripple, press effect, custom scrollbar)
 * para reducir el boilerplate en los componentes y asegurar consistencia total.
 * 
 * @param {string} component - Nombre del componente (ej: "button", "input")
 * @param {Object} props - Props de la instancia para sobrescribir políticas globales
 * @returns {Object} Estado visual resuelto
 */
export function useQuickitControlState(component, props = {}) {
  const theme = useQuickitTheme();
  const resolvedTheme = useMemo(() => resolveQuickitThemeMode(theme), [theme]);
  const ariaLabel = props["aria-label"];
  const ariaLabelledBy = props["aria-labelledby"];
  const { children, customScrollbar, focusRing, pressEffect, ripple, shape, title } = props;
  
  const focusRingEnabled = useQuickitFocusRing(component);
  const rippleEnabled = useQuickitRipple(component);
  const providerPressEffect = useQuickitPressEffect();
  const providerCustomScrollbar = useQuickitCustomScrollbar();

  const resolvedPressEffect = useMemo(() => {
    if (pressEffect === "ripple" || pressEffect === "transform") {
      return pressEffect;
    }
    return providerPressEffect;
  }, [pressEffect, providerPressEffect]);

  const resolvedRipple = useMemo(() => {
    if (ripple !== undefined) return ripple;
    return resolvedPressEffect === "ripple" ? rippleEnabled : false;
  }, [ripple, resolvedPressEffect, rippleEnabled]);

  const resolvedFocusRing = useMemo(() => {
    return focusRing !== undefined ? focusRing : focusRingEnabled;
  }, [focusRing, focusRingEnabled]);

  const resolvedCustomScrollbar = useMemo(() => {
    return customScrollbar !== undefined ? customScrollbar : providerCustomScrollbar;
  }, [customScrollbar, providerCustomScrollbar]);

  // Validacion de accesibilidad solo en desarrollo para controles icon-only.
  useEffect(() => {
    if (process.env.NODE_ENV === "production" || !component) return;
    
    // Solo aplica a componentes que podrían ser icon-only
    if (component !== "button") return;

    const hasLabel = ariaLabel || ariaLabelledBy || title;
    const isIconOnly = shape === "square" || shape === "circle";

    if (isIconOnly && !hasLabel && !children) {
      console.warn(
        `[Quickit UI] <${component.charAt(0).toUpperCase() + component.slice(1)}>: ` +
        `Los componentes con forma "${shape}" sin contenido de texto ` +
        `deben incluir "aria-label", "aria-labelledby" o "title" para ser accesibles.`
      );
    }
  }, [ariaLabel, ariaLabelledBy, children, component, shape, title]);

  return {
    theme: resolvedTheme,
    focusRing: resolvedFocusRing,
    ripple: resolvedRipple,
    pressEffect: resolvedPressEffect,
    customScrollbar: resolvedCustomScrollbar,
  };
}
