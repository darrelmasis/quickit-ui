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
]);

const DEFAULT_FOCUS_RING_CONFIG = Object.freeze({
  disabledComponents: [],
  enabled: true,
});

function resolveFocusRingComponent(component) {
  return QUICKIT_FOCUS_RING_COMPONENTS.includes(component)
    ? component
    : null;
}

export function normalizeQuickitFocusRingConfig(focusRing) {
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

  const disabledComponents = Array.isArray(focusRing.disabledComponents)
    ? focusRing.disabledComponents.filter(resolveFocusRingComponent)
    : [];

  return {
    disabledComponents,
    enabled: focusRing.enabled !== false,
  };
}

export function isQuickitFocusRingEnabled(focusRingConfig, component) {
  const resolvedComponent = resolveFocusRingComponent(component);

  if (!focusRingConfig?.enabled) {
    return false;
  }

  if (!resolvedComponent) {
    return true;
  }

  return !focusRingConfig.disabledComponents.includes(resolvedComponent);
}

export function stripQuickitFocusRingClasses(value) {
  if (Array.isArray(value)) {
    return value.map(stripQuickitFocusRingClasses).filter(Boolean);
  }

  if (typeof value !== "string") {
    return value;
  }

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

export function resolveQuickitFocusRingClasses(enabled, value) {
  return enabled ? value : stripQuickitFocusRingClasses(value);
}

export function useQuickitFocusRingConfig() {
  return useContext(QuickitThemeContext).focusRing;
}

export function useQuickitFocusRing(component) {
  const focusRing = useQuickitFocusRingConfig();

  return isQuickitFocusRingEnabled(focusRing, component);
}

