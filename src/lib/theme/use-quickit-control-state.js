import { useEffect, useMemo } from "react";
import { resolveQuickitThemeMode } from "./quickit-theme-context";
import { useQuickitFocusRing } from "./focus-ring";
import { useQuickitRipple } from "./ripple";
import { useQuickitPressEffect } from "./press-effect";
import { useQuickitTheme } from "./useQuickitTheme";

/**
 * useQuickitControlState
 * 
 * Centraliza la resolución de políticas visuales (tema, foco, ripple, press effect)
 * para reducir el boilerplate en los componentes y asegurar consistencia total.
 * 
 * @param {string} component - Nombre del componente (ej: "button", "input")
 * @param {Object} props - Props de la instancia para sobrescribir políticas globales
 * @returns {Object} Estado visual resuelto
 */
export function useQuickitControlState(component, props = {}) {
  const theme = useQuickitTheme();
  const resolvedTheme = useMemo(() => resolveQuickitThemeMode(theme), [theme]);
  
  const focusRingEnabled = useQuickitFocusRing(component);
  const rippleEnabled = useQuickitRipple(component);
  const providerPressEffect = useQuickitPressEffect();

  const resolvedPressEffect = useMemo(() => {
    if (props.pressEffect === "ripple" || props.pressEffect === "transform") {
      return props.pressEffect;
    }
    return providerPressEffect;
  }, [props.pressEffect, providerPressEffect]);

  const resolvedRipple = useMemo(() => {
    if (props.ripple !== undefined) return props.ripple;
    return resolvedPressEffect === "ripple" ? rippleEnabled : false;
  }, [props.ripple, resolvedPressEffect, rippleEnabled]);

  const resolvedFocusRing = useMemo(() => {
    return props.focusRing !== undefined ? props.focusRing : focusRingEnabled;
  }, [props.focusRing, focusRingEnabled]);

  // Accesibilidad: Validación automática de icon buttons en desarrollo
  useEffect(() => {
    if (process.env.NODE_ENV === "production" || !component) return;
    
    // Solo aplica a componentes tipo 'button' o 'link' que podrían ser icon-only
    if (component !== "button" && component !== "link") return;

    const hasLabel = props["aria-label"] || props["aria-labelledby"] || props.title;
    const isIconOnly = props.shape === "square" || props.shape === "circle";

    if (isIconOnly && !hasLabel && !props.children) {
      console.warn(
        `[Quickit UI] <${component.charAt(0).toUpperCase() + component.slice(1)}>: ` +
        `Los componentes con forma "${props.shape}" sin contenido de texto ` +
        `deben incluir "aria-label", "aria-labelledby" o "title" para ser accesibles.`
      );
    }
  }, [component, props]);

  return {
    theme: resolvedTheme,
    focusRing: resolvedFocusRing,
    ripple: resolvedRipple,
    pressEffect: resolvedPressEffect,
  };
}
