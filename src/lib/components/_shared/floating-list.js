import { useTransitionStyles } from "@floating-ui/react";
import { resolveQuickitThemeMode } from "@/lib/theme/quickit-theme-context";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils/cn";

export const FLOATING_LIST_SURFACE_PRIMITIVES = {
  layout:
    "z-[9999] flex min-w-[12rem] flex-col gap-1 list-none rounded-[1rem] border p-1 outline-none",
};

export const FLOATING_LIST_ITEM_PRIMITIVES = {
  base: [
    "flex w-full items-center gap-2 rounded-[0.75rem] px-3 py-2 text-left cursor-pointer",
    "text-sm font-medium transition-colors outline-none",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
  ].join(" "),
};

export const FLOATING_LIST_SURFACE_THEME_CLASSES = {
  light: "border-slate-200 bg-white text-slate-950",
  dark: "border-zinc-800 bg-zinc-950 text-stone-100",
};

export const FLOATING_LIST_ITEM_THEME_CLASSES = {
  light: {
    default: [
      "text-slate-700",
      "hover:bg-slate-100 hover:text-slate-950",
      "focus-visible:bg-slate-100 focus-visible:text-slate-950",
      "focus-visible:outline-slate-300",
    ].join(" "),
    selected: "bg-slate-100 text-slate-950",
    danger: [
      "text-red-700",
      "hover:bg-red-50 hover:text-red-800",
      "focus-visible:bg-red-50 focus-visible:text-red-800",
      "focus-visible:outline-red-300",
    ].join(" "),
    disabled:
      "cursor-not-allowed text-slate-400 opacity-60 hover:bg-transparent",
    separator: "border-slate-200",
  },
  dark: {
    default: [
      "text-stone-300",
      "hover:bg-zinc-900 hover:text-stone-50",
      "focus-visible:bg-zinc-900 focus-visible:text-stone-50",
      "focus-visible:outline-zinc-700",
    ].join(" "),
    selected: "bg-zinc-900 text-stone-50",
    danger: [
      "text-red-300",
      "hover:bg-red-500/10 hover:text-red-200",
      "focus-visible:bg-red-500/10 focus-visible:text-red-200",
      "focus-visible:outline-red-500/40",
    ].join(" "),
    disabled:
      "cursor-not-allowed text-stone-500 opacity-60 hover:bg-transparent",
    separator: "border-zinc-800",
  },
};

export function resolveFloatingListTheme(theme) {
  return resolveQuickitThemeMode(theme);
}

export function getFloatingPlacementOrigin(placement) {
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

export function getFloatingClosedTransform(side) {
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

export function getFloatingArrowColors(theme) {
  return theme === "dark"
    ? { fill: "#09090b", stroke: "#27272a" }
    : { fill: "#ffffff", stroke: "#e2e8f0" };
}

export function useFloatingTransition(context, { duration, placement }) {
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
    apply({ rects, elements }) {
      Object.assign(elements.floating.style, {
        width: `${rects.reference.width}px`,
      });
    },
  };
}

export function getFloatingListItemClasses({
  focusRingEnabled,
  theme,
  variant = "default",
  selected,
  disabled,
}) {
  const itemTheme =
    variant === "danger"
      ? FLOATING_LIST_ITEM_THEME_CLASSES[theme].danger
      : FLOATING_LIST_ITEM_THEME_CLASSES[theme].default;
  return cn(
    FLOATING_LIST_ITEM_PRIMITIVES.base,
    resolveQuickitFocusRingClasses(
      focusRingEnabled,
      FLOATING_LIST_ITEM_PRIMITIVES.base,
    ),
    resolveQuickitFocusRingClasses(focusRingEnabled, itemTheme),
    selected && FLOATING_LIST_ITEM_THEME_CLASSES[theme].selected,
    disabled && FLOATING_LIST_ITEM_THEME_CLASSES[theme].disabled,
  );
}
