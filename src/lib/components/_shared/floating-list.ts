import { useLayoutEffect } from "react";
import { useTransitionStyles, type FloatingContext, type MiddlewareState, type Placement } from "@floating-ui/react";
import { resolveQuickitThemeMode } from "@/lib/theme/quickit-theme-context";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils/cn";

export const FLOATING_LIST_SURFACE_PRIMITIVES = {
  layout:
    "qk-floating-surface flex min-w-[12rem] flex-col gap-1 list-none rounded-[var(--qk-radius-2xl)] border p-1 outline-none",
};

export const FLOATING_LIST_ITEM_PRIMITIVES = {
  base: [
    "flex w-full items-center gap-2 rounded-[var(--qk-radius-xl)] px-3 py-2 text-left cursor-pointer",
    "text-sm font-medium transition-colors outline-none",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
  ].join(" "),
};

export const FLOATING_LIST_SURFACE_THEME_CLASSES: Record<string, Record<string, string>> = {
  light: {
    neutral: "border-neutral-200 bg-white text-neutral-950",
    primary: "border-blue-200 bg-white text-neutral-950",
    secondary: "border-purple-200 bg-white text-neutral-950",
    success: "border-green-200 bg-white text-neutral-950",
    danger: "border-red-200 bg-white text-neutral-950",
    warning: "border-amber-200 bg-white text-neutral-950",
    info: "border-cyan-200 bg-white text-neutral-950",
    light: "border-neutral-200 bg-white text-neutral-950",
    dark: "border-neutral-300 bg-white text-neutral-950",
  },
  dark: {
    neutral: "border-neutral-800 bg-neutral-950 text-neutral-100",
    primary: "border-blue-800 bg-neutral-950 text-neutral-100",
    secondary: "border-purple-800 bg-neutral-950 text-neutral-100",
    success: "border-green-800 bg-neutral-950 text-neutral-100",
    danger: "border-red-800 bg-neutral-950 text-neutral-100",
    warning: "border-amber-800 bg-neutral-950 text-neutral-100",
    info: "border-cyan-800 bg-neutral-950 text-neutral-100",
    light: "border-neutral-700 bg-neutral-950 text-neutral-100",
    dark: "border-neutral-700 bg-neutral-950 text-neutral-100",
  },
};

export const FLOATING_LIST_ITEM_THEME_CLASSES: Record<string, Record<string, { default: string; selected: string; separator: string } | string>> = {
  light: {
    neutral: {
      default: [
        "text-neutral-700",
        "hover:bg-neutral-100 hover:text-neutral-950",
        "focus-visible:bg-neutral-100 focus-visible:text-neutral-950",
        "focus-visible:outline-neutral-300",
      ].join(" "),
      selected: "bg-neutral-100 text-neutral-950",
      separator: "border-neutral-200",
    },
    primary: {
      default: [
        "text-blue-700",
        "hover:bg-blue-50 hover:text-blue-800",
        "focus-visible:bg-blue-50 focus-visible:text-blue-800",
        "focus-visible:outline-blue-300",
      ].join(" "),
      selected: "bg-blue-50 text-blue-800",
      separator: "border-blue-200",
    },
    secondary: {
      default: [
        "text-purple-700",
        "hover:bg-purple-50 hover:text-purple-800",
        "focus-visible:bg-purple-50 focus-visible:text-purple-800",
        "focus-visible:outline-purple-300",
      ].join(" "),
      selected: "bg-purple-50 text-purple-800",
      separator: "border-purple-200",
    },
    success: {
      default: [
        "text-green-700",
        "hover:bg-green-50 hover:text-green-800",
        "focus-visible:bg-green-50 focus-visible:text-green-800",
        "focus-visible:outline-green-300",
      ].join(" "),
      selected: "bg-green-50 text-green-800",
      separator: "border-green-200",
    },
    danger: {
      default: [
        "text-red-700",
        "hover:bg-red-50 hover:text-red-800",
        "focus-visible:bg-red-50 focus-visible:text-red-800",
        "focus-visible:outline-red-300",
      ].join(" "),
      selected: "bg-red-50 text-red-800",
      separator: "border-red-200",
    },
    warning: {
      default: [
        "text-amber-700",
        "hover:bg-amber-50 hover:text-amber-800",
        "focus-visible:bg-amber-50 focus-visible:text-amber-800",
        "focus-visible:outline-amber-300",
      ].join(" "),
      selected: "bg-amber-50 text-amber-800",
      separator: "border-amber-200",
    },
    info: {
      default: [
        "text-cyan-700",
        "hover:bg-cyan-50 hover:text-cyan-800",
        "focus-visible:bg-cyan-50 focus-visible:text-cyan-800",
        "focus-visible:outline-cyan-300",
      ].join(" "),
      selected: "bg-cyan-50 text-cyan-800",
      separator: "border-cyan-200",
    },
    light: {
      default: [
        "text-neutral-700",
        "hover:bg-neutral-100 hover:text-neutral-950",
        "focus-visible:bg-neutral-100 focus-visible:text-neutral-950",
        "focus-visible:outline-neutral-300",
      ].join(" "),
      selected: "bg-neutral-100 text-neutral-950",
      separator: "border-neutral-200",
    },
    dark: {
      default: [
        "text-neutral-800",
        "hover:bg-neutral-200 hover:text-neutral-950",
        "focus-visible:bg-neutral-200 focus-visible:text-neutral-950",
        "focus-visible:outline-neutral-400",
      ].join(" "),
      selected: "bg-neutral-200 text-neutral-950",
      separator: "border-neutral-300",
    },
    dangerVariant: [
      "text-red-700",
      "hover:bg-red-50 hover:text-red-800",
      "focus-visible:bg-red-50 focus-visible:text-red-800",
      "focus-visible:outline-red-300",
    ].join(" "),
    disabled:
      "cursor-not-allowed text-neutral-400 opacity-60 hover:bg-transparent",
  },
  dark: {
    neutral: {
      default: [
        "text-neutral-300",
        "hover:bg-neutral-900 hover:text-neutral-50",
        "focus-visible:bg-neutral-900 focus-visible:text-neutral-50",
        "focus-visible:outline-neutral-700",
      ].join(" "),
      selected: "bg-neutral-900 text-neutral-50",
      separator: "border-neutral-800",
    },
    primary: {
      default: [
        "text-blue-300",
        "hover:bg-blue-500/10 hover:text-blue-200",
        "focus-visible:bg-blue-500/10 focus-visible:text-blue-200",
        "focus-visible:outline-blue-500/40",
      ].join(" "),
      selected: "bg-blue-500/10 text-blue-200",
      separator: "border-blue-800",
    },
    secondary: {
      default: [
        "text-purple-300",
        "hover:bg-purple-500/10 hover:text-purple-200",
        "focus-visible:bg-purple-500/10 focus-visible:text-purple-200",
        "focus-visible:outline-purple-500/40",
      ].join(" "),
      selected: "bg-purple-500/10 text-purple-200",
      separator: "border-purple-800",
    },
    success: {
      default: [
        "text-green-300",
        "hover:bg-green-500/10 hover:text-green-200",
        "focus-visible:bg-green-500/10 focus-visible:text-green-200",
        "focus-visible:outline-green-500/40",
      ].join(" "),
      selected: "bg-green-500/10 text-green-200",
      separator: "border-green-800",
    },
    danger: {
      default: [
        "text-red-300",
        "hover:bg-red-500/10 hover:text-red-200",
        "focus-visible:bg-red-500/10 focus-visible:text-red-200",
        "focus-visible:outline-red-500/40",
      ].join(" "),
      selected: "bg-red-500/10 text-red-200",
      separator: "border-red-800",
    },
    warning: {
      default: [
        "text-amber-300",
        "hover:bg-amber-500/10 hover:text-amber-200",
        "focus-visible:bg-amber-500/10 focus-visible:text-amber-200",
        "focus-visible:outline-amber-500/40",
      ].join(" "),
      selected: "bg-amber-500/10 text-amber-200",
      separator: "border-amber-800",
    },
    info: {
      default: [
        "text-cyan-300",
        "hover:bg-cyan-500/10 hover:text-cyan-200",
        "focus-visible:bg-cyan-500/10 focus-visible:text-cyan-200",
        "focus-visible:outline-cyan-500/40",
      ].join(" "),
      selected: "bg-cyan-500/10 text-cyan-200",
      separator: "border-cyan-800",
    },
    light: {
      default: [
        "text-neutral-300",
        "hover:bg-neutral-800 hover:text-neutral-50",
        "focus-visible:bg-neutral-800 focus-visible:text-neutral-50",
        "focus-visible:outline-neutral-700",
      ].join(" "),
      selected: "bg-neutral-800 text-neutral-50",
      separator: "border-neutral-700",
    },
    dark: {
      default: [
        "text-neutral-300",
        "hover:bg-neutral-900 hover:text-neutral-50",
        "focus-visible:bg-neutral-900 focus-visible:text-neutral-50",
        "focus-visible:outline-neutral-700",
      ].join(" "),
      selected: "bg-neutral-900 text-neutral-50",
      separator: "border-neutral-800",
    },
    dangerVariant: [
      "text-red-300",
      "hover:bg-red-500/10 hover:text-red-200",
      "focus-visible:bg-red-500/10 focus-visible:text-red-200",
      "focus-visible:outline-red-500/40",
    ].join(" "),
    disabled:
      "cursor-not-allowed text-neutral-500 opacity-60 hover:bg-transparent",
  },
};

export function resolveFloatingListTheme(theme: string) {
  return resolveQuickitThemeMode(theme);
}

export function getFloatingPlacementOrigin(placement: string) {
  switch (placement) {
    case "top-start":
      return "bottom left";
    case "top-end":
      return "bottom right";
    case "top":
      return "bottom center";
    case "bottom-start":
      return "top left";
    case "bottom-end":
      return "top right";
    case "bottom":
      return "top center";
    case "left-start":
      return "top right";
    case "left-end":
      return "bottom right";
    case "left":
      return "right center";
    case "right-start":
      return "top left";
    case "right-end":
      return "bottom left";
    case "right":
      return "left center";
    default:
      return "top center";
  }
}

export function getFloatingClosedTransform(side: string) {
  switch (side) {
    case "top":
      return "translateY(4px) scale(0.98)";
    case "bottom":
      return "translateY(-4px) scale(0.98)";
    case "left":
      return "translateX(4px) scale(0.98)";
    case "right":
      return "translateX(-4px) scale(0.98)";
    default:
      return "scale(0.98)";
  }
}

export const DROPDOWN_ARROW_COLORS: Record<string, Record<string, { fill: string; stroke: string }>> = {
  light: {
    neutral: { fill: "oklch(1 0 0)", stroke: "oklch(0.92 0 0)" },
    primary: { fill: "oklch(1 0 0)", stroke: "oklch(0.901 0.058 230.9)" },
    secondary: { fill: "oklch(1 0 0)", stroke: "oklch(0.87 0.065 274)" },
    success: { fill: "oklch(1 0 0)", stroke: "oklch(0.905 0.093 164.2)" },
    danger: { fill: "oklch(1 0 0)", stroke: "oklch(0.892 0.059 12.8)" },
    warning: { fill: "oklch(1 0 0)", stroke: "oklch(0.945 0.129 101.5)" },
    info: { fill: "oklch(1 0 0)", stroke: "oklch(0.917 0.08 205)" },
    light: { fill: "oklch(1 0 0)", stroke: "oklch(0.964 0 0)" },
    dark: { fill: "oklch(1 0 0)", stroke: "oklch(0.32 0 0)" },
  },
  dark: {
    neutral: { fill: "oklch(0.15 0 0)", stroke: "oklch(0.32 0 0)" },
    primary: { fill: "oklch(0.15 0 0)", stroke: "oklch(0.443 0.11 240.8)" },
    secondary: { fill: "oklch(0.15 0 0)", stroke: "oklch(0.398 0.189 277.4)" },
    success: { fill: "oklch(0.15 0 0)", stroke: "oklch(0.432 0.095 166.9)" },
    danger: { fill: "oklch(0.15 0 0)", stroke: "oklch(0.455 0.188 16.2)" },
    warning: { fill: "oklch(0.15 0 0)", stroke: "oklch(0.476 0.114 61.9)" },
    info: { fill: "oklch(0.15 0 0)", stroke: "oklch(0.45 0.085 224.3)" },
    light: { fill: "oklch(0.15 0 0)", stroke: "oklch(0.868 0 0)" },
    dark: { fill: "oklch(0.15 0 0)", stroke: "oklch(0.382 0 0)" },
  },
};

export function getFloatingArrowColors(theme: string, color: string = "neutral") {
  return DROPDOWN_ARROW_COLORS[theme]?.[color] ?? DROPDOWN_ARROW_COLORS[theme]?.neutral ?? { fill: "#ffffff", stroke: "#e5e5e5" };
}

export function resolveFloatingArrowPosition(position: string | undefined) {
  if (position === "left") return "0%";
  if (position === "right") return "100%";
  return undefined;
}

export function useFloatingTransition(context: FloatingContext, { duration, placement }: { duration: number | { open?: number; close?: number }; placement: Placement }) {
  return useTransitionStyles(context, {
    duration,
    initial: ({ side }) => ({
      opacity: 0,
      transform: getFloatingClosedTransform(side),
    }),
    open: {
      opacity: 1,
      transform: "translate(0px, 0px) scale(1)",
    },
    close: ({ side }) => ({
      opacity: 0,
      transform: getFloatingClosedTransform(side),
    }),
    common: {
      transformOrigin: getFloatingPlacementOrigin(placement),
    },
  });
}

export function useMatchFloatingWidth() {
  return {
    name: "matchWidth",
    fn({ x, y, rects, elements }: MiddlewareState) {
      elements.floating.style.width = `${rects.reference.width}px`;
      return { x, y };
    },
  };
}

export function getFloatingListItemClasses({
  focusRingEnabled,
  theme,
  color = "neutral",
  variant = "default",
  selected,
  disabled,
}: {
  focusRingEnabled: boolean;
  theme: string;
  color?: string;
  variant?: string;
  selected: boolean;
  disabled: boolean;
}) {
  const colorClasses = FLOATING_LIST_ITEM_THEME_CLASSES[theme][color] as { default: string; selected: string; separator: string };
  const itemTheme =
    variant === "danger"
      ? (FLOATING_LIST_ITEM_THEME_CLASSES[theme].dangerVariant as string)
      : colorClasses.default;
  return cn(
    FLOATING_LIST_ITEM_PRIMITIVES.base,
    resolveQuickitFocusRingClasses(
      focusRingEnabled,
      FLOATING_LIST_ITEM_PRIMITIVES.base,
    ),
    resolveQuickitFocusRingClasses(focusRingEnabled, itemTheme),
    selected && colorClasses.selected,
    disabled && (FLOATING_LIST_ITEM_THEME_CLASSES[theme].disabled as string),
  );
}

export function useFloatingSurfaceArrowColors({
  enabled,
  elementRef,
  fill,
  stroke,
  fallbackFill,
  fallbackStroke,
}: {
  enabled: boolean;
  elementRef: React.RefObject<HTMLElement | null>;
  fill?: string;
  stroke?: string;
  fallbackFill: string;
  fallbackStroke: string;
}) {
  const resolvedArrowFill = fill ?? fallbackFill;
  const resolvedArrowStroke = stroke ?? fallbackStroke;

  useLayoutEffect(() => {
    if (!enabled || !elementRef.current) {
      return;
    }

    const el = elementRef.current;
    const style = window.getComputedStyle(el);
    el.style.setProperty("--qk-arrow-fill", style.backgroundColor || resolvedArrowFill);
    el.style.setProperty(
      "--qk-arrow-stroke",
      style.borderTopColor || style.borderColor || resolvedArrowStroke,
    );
  }, [enabled, elementRef, resolvedArrowFill, resolvedArrowStroke]);

  return { resolvedArrowFill, resolvedArrowStroke };
}
