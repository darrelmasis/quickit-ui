import { useContext } from "react";
import { normalizeQuickitPressEffect } from "./press-effect";
import { QuickitThemeContext } from "./quickit-theme-context";

export const QUICKIT_RIPPLE_COMPONENTS = Object.freeze([
  "button",
  "link",
]);

const DEFAULT_RIPPLE_CONFIG = Object.freeze({
  disabledComponents: [],
  enabled: true,
});

function resolveRippleComponent(component) {
  return QUICKIT_RIPPLE_COMPONENTS.includes(component)
    ? component
    : null;
}

export function normalizeQuickitRippleConfig(ripple) {
  if (ripple === false) {
    return {
      disabledComponents: [],
      enabled: false,
    };
  }

  if (ripple === true || ripple == null) {
    return {
      ...DEFAULT_RIPPLE_CONFIG,
      disabledComponents: [],
    };
  }

  const disabledComponents = Array.isArray(ripple.disabledComponents)
    ? ripple.disabledComponents.filter(resolveRippleComponent)
    : [];

  return {
    disabledComponents,
    enabled: ripple.enabled !== false,
  };
}

export function isQuickitRippleEnabled(rippleConfig, component) {
  const resolvedComponent = resolveRippleComponent(component);

  if (!rippleConfig?.enabled) {
    return false;
  }

  if (!resolvedComponent) {
    return true;
  }

  return !rippleConfig.disabledComponents.includes(resolvedComponent);
}

export function useQuickitRippleConfig() {
  return useContext(QuickitThemeContext).ripple;
}

export function useQuickitRipple(component) {
  const context = useContext(QuickitThemeContext);
  const ripple = context.ripple;
  const pressEffect = normalizeQuickitPressEffect(context.pressEffect);

  return (
    pressEffect === "ripple" &&
    isQuickitRippleEnabled(ripple, component)
  );
}
