import { AVATAR_RADIUS_BY_SIZE, CONTROL_RADIUS_BY_SIZE } from "@/lib/utils/radius";

export const QUICKIT_SEMANTIC_COLORS = Object.freeze([
  "neutral",
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
]);

export const QUICKIT_ACCENT_COLORS = Object.freeze([
  "neutral",
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
]);

export const QUICKIT_STATUS_COLORS = Object.freeze([
  "success",
  "danger",
  "warning",
  "info",
]);

export const QUICKIT_NEUTRAL_COLORS = Object.freeze([
  "neutral",
  "light",
  "dark",
]);

export const QUICKIT_CONTROL_SIZES = Object.freeze([
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
]);

export const QUICKIT_COMPACT_CONTROL_SIZES = Object.freeze(["sm", "md"]);

export const QUICKIT_BUTTON_VARIANTS = Object.freeze([
  "solid",
  "outline",
  "soft",
  "ghost",
]);

export const QUICKIT_BUTTON_SHAPES = Object.freeze([
  "default",
  "square",
  "circle",
  "pill",
]);

export const QUICKIT_AVATAR_SHAPES = Object.freeze([
  "circle",
  "rounded",
  "square",
]);

export const QUICKIT_AVATAR_SIZES = QUICKIT_CONTROL_SIZES;

export const QUICKIT_LINK_TEXT_VARIANTS = Object.freeze([
  "default",
  "muted",
  "subtle",
]);

export const QUICKIT_LINK_UNDERLINES = Object.freeze([
  "always",
  "hover",
  "none",
]);

export const QUICKIT_TAB_SIZES = Object.freeze([
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
]);

export const QUICKIT_EASE_DEFAULT = "cubic-bezier(0.22, 1, 0.36, 1)";

export const QUICKIT_BREAKPOINTS = Object.freeze({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
});

export const QUICKIT_CONTROL_RADIUS_TOKENS = CONTROL_RADIUS_BY_SIZE;
export const QUICKIT_AVATAR_RADIUS_TOKENS = AVATAR_RADIUS_BY_SIZE;

export function isQuickitTokenValue(collection, value) {
  return Array.isArray(collection) && collection.includes(value);
}

export function resolveQuickitToken(collection, value, fallback) {
  return isQuickitTokenValue(collection, value) ? value : fallback;
}
