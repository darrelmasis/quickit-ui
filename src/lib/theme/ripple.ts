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

function resolveRippleComponent(component: string) {
  return QUICKIT_RIPPLE_COMPONENTS.includes(component)
    ? component
    : null;
}

export function normalizeQuickitRippleConfig(ripple: unknown): { disabledComponents: string[]; enabled: boolean } {
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

  if (typeof ripple !== "object" || ripple === null) {
    return { disabledComponents: [], enabled: true };
  }

  const config = ripple as Record<string, unknown>;

  const disabledComponents = Array.isArray(config.disabledComponents)
    ? (config.disabledComponents as unknown[]).filter((v): v is string => resolveRippleComponent(v as string) !== null)
    : [];

  return {
    disabledComponents,
    enabled: config.enabled !== false,
  };
}

export function isQuickitRippleEnabled(rippleConfig: { disabledComponents: string[]; enabled: boolean } | undefined, component: string): boolean {
  const resolvedComponent = resolveRippleComponent(component);

  if (!rippleConfig?.enabled) {
    return false;
  }

  if (!resolvedComponent) {
    return false;
  }

  return !rippleConfig.disabledComponents.includes(resolvedComponent);
}

export function useQuickitRippleConfig() {
  return useContext(QuickitThemeContext).ripple;
}

export function useQuickitRipple(component: string) {
  const context = useContext(QuickitThemeContext);
  const ripple = context.ripple;
  const pressEffect = normalizeQuickitPressEffect(context.pressEffect);

  return (
    pressEffect === "ripple" &&
    isQuickitRippleEnabled(ripple, component)
  );
}
