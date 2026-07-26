import { useContext } from "react";
import { QuickitThemeContext } from "./quickit-theme-context";

export const QUICKIT_FOCUS_RING_COMPONENTS = Object.freeze([
  "button",
  "link",
  "input",
  "textarea",
  "select",
  "checkbox",
  "radio",
  "switch",
  "tabs",
  "accordion",
  "dropdown",
  "modal",
  "drawer",
]);

const DEFAULT_FOCUS_RING_CONFIG = Object.freeze({
  disabledComponents: [],
  enabled: true,
});

function resolveFocusRingComponent(component: string) {
  return QUICKIT_FOCUS_RING_COMPONENTS.includes(component)
    ? component
    : null;
}

export function normalizeQuickitFocusRingConfig(focusRing: unknown): { disabledComponents: string[]; enabled: boolean } {
  if (focusRing === false) {
    return {
      disabledComponents: [],
      enabled: false,
    };
  }

  if (focusRing === true || focusRing == null) {
    return {
      ...DEFAULT_FOCUS_RING_CONFIG,
      disabledComponents: [],
    };
  }

  if (typeof focusRing !== "object" || focusRing === null) {
    return { disabledComponents: [], enabled: true };
  }

  const config = focusRing as Record<string, unknown>;

  const disabledComponents = Array.isArray(config.disabledComponents)
    ? (config.disabledComponents as unknown[]).filter((v): v is string => resolveFocusRingComponent(v as string) !== null)
    : [];

  return {
    disabledComponents,
    enabled: config.enabled !== false,
  };
}

export function isQuickitFocusRingEnabled(focusRingConfig: { disabledComponents: string[]; enabled: boolean } | undefined, component: string): boolean {
  const resolvedComponent = resolveFocusRingComponent(component);

  if (!focusRingConfig?.enabled) {
    return false;
  }

  if (!resolvedComponent) {
    return true;
  }

  return !focusRingConfig.disabledComponents.includes(resolvedComponent);
}

export function stripQuickitFocusRingClasses(value: string | string[]): string | string[] {
  if (Array.isArray(value)) {
    return value.map(stripQuickitFocusRingClasses).flat().filter(Boolean);
  }

  if (typeof value !== "string") {
    return value;
  }

  // Cuando el provider apaga el focus ring, removemos solo las utilidades
  // relacionadas con focus-visible y dejamos intacto el resto de la clase.
  return value
    .split(/\s+/)
    .filter(
      (token) =>
        token &&
        !token.includes("focus-visible:") &&
        !token.includes("peer-focus-visible:"),
    )
    .join(" ");
}

export function resolveQuickitFocusRingClasses(enabled: boolean, value: string | string[]): string | string[] {
  return enabled ? value : stripQuickitFocusRingClasses(value);
}

export function useQuickitFocusRingConfig() {
  return useContext(QuickitThemeContext).focusRing;
}

export function useQuickitFocusRing(component: string) {
  const focusRing = useQuickitFocusRingConfig();

  return isQuickitFocusRingEnabled(focusRing, component);
}
