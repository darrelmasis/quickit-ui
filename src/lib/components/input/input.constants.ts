import { FORM_FIELD_AUTOFILL_CLASS, FORM_FIELD_BASE_CLASSES } from "@/lib/components/_shared/form-field-base";
import { ACTION_CONTROL_BASE_CLASSES } from "@/lib/components/_shared/action-control";

export const INPUT_PRIMITIVES = {
  base: [
    FORM_FIELD_AUTOFILL_CLASS,
    "text-sm",
    FORM_FIELD_BASE_CLASSES,
    "[&::-webkit-search-cancel-button]:appearance-none",
    "[&::-webkit-search-decoration]:appearance-none",
    "[&::-webkit-inner-spin-button]:appearance-none",
    "[&::-webkit-outer-spin-button]:appearance-none",
    "[-moz-appearance:textfield]",
  ].join(" "),
  shell: "relative min-w-0 w-full",
  group: "relative min-w-0",
  actionButton: [
    ACTION_CONTROL_BASE_CLASSES,
    "pointer-events-auto inline-flex min-w-0 items-center justify-center",
    "gap-0 p-0 font-medium shadow-none",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  leftElement: "pointer-events-none absolute inset-y-0 left-2.5 sm:left-3 z-10 inline-flex items-center justify-center",
  rightElement: "pointer-events-none inline-flex items-center justify-center",
  rightCluster:
    "pointer-events-none absolute top-1/2 right-1 sm:right-1.5 z-10 inline-flex -translate-y-1/2 items-center gap-1.5",
  attachedGroup:
    "relative isolate min-w-0 has-[*:focus-visible]:ring-4 has-[*:focus-visible]:ring-offset-0",
  attachedGroupFrame: "relative w-full overflow-hidden border",
  attachedGroupInner:
    "min-w-0 w-full",
  groupItem: "min-w-0",
  addon:
    "inline-flex min-w-0 shrink-0 items-center whitespace-nowrap border text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-200",
  action:
    "inline-flex min-w-0 shrink-0 items-center justify-center whitespace-nowrap border font-medium transition-[background-color,border-color,color,box-shadow] duration-200 disabled:cursor-not-allowed disabled:opacity-60",
};

export const INPUT_SIZE_CLASSES: Record<string, string> = {
  sm: "h-9 px-2.5 sm:px-3",
  md: "h-11 px-3 sm:px-3.5",
  lg: "h-12 px-3.5 sm:px-4 text-base",
};

export const INPUT_HEIGHT_CLASSES: Record<string, string> = {
  sm: "h-9",
  md: "h-11",
  lg: "h-12",
};

export const INPUT_ACTION_BUTTON_SIZE_CLASSES: Record<string, Record<string, string>> = {
  square: {
    sm: "size-6",
    md: "size-7",
    lg: "size-8",
  },
  circle: {
    sm: "size-6",
    md: "size-7",
    lg: "size-8",
  },
};

export const INPUT_ACTION_BUTTON_THEME_CLASSES: Record<string, string> = {
  light: "border-transparent bg-transparent",
  dark: "border-transparent bg-transparent",
};

export const INPUT_ACTION_ICON_SIZE_CLASSES: Record<string, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4",
};

export const INPUT_NUMBER_BUTTON_WIDTH_CLASSES: Record<string, string> = {
  sm: "w-7",
  md: "w-8",
  lg: "w-9",
};

export const INPUT_NUMBER_BUTTON_ICON_SIZE_CLASSES: Record<string, string> = {
  sm: "size-2.5",
  md: "size-3",
  lg: "size-3.5",
};

export const INPUT_SIDE_ELEMENT_SIZE_CLASSES: Record<string, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};

export const INPUT_SIDE_ELEMENT_THEME_CLASSES: Record<string, string> = {
  light: "text-neutral-500/90",
  dark: "text-neutral-400/90",
};

export const INPUT_ACTION_PADDING_CLASSES: Record<string, Record<string, string>> = {
  clear: {
    sm: "pr-9",
    md: "pr-10",
    lg: "pr-11",
  },
  password: {
    sm: "pr-9",
    md: "pr-10",
    lg: "pr-11",
  },
  element: {
    sm: "pr-9",
    md: "pr-10",
    lg: "pr-11",
  },
  leftElement: {
    sm: "pl-9",
    md: "pl-10",
    lg: "pl-11",
  },
  elementWithAction: {
    sm: "pr-16",
    md: "pr-[4.5rem]",
    lg: "pr-20",
  },
};

export const INPUT_GROUP_AFFIX_SIZE_CLASSES: Record<string, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-3.5 text-sm",
  lg: "h-12 px-4 text-base",
};

export const INPUT_GROUP_AFFIX_ATTACHED_SIZE_CLASSES: Record<string, string> = {
  sm: "h-full px-3 text-sm",
  md: "h-full px-3.5 text-sm",
  lg: "h-full px-4 text-base",
};

export const INPUT_GROUP_ITEM_GROW_CLASSES: Record<string, string> = {
  inline: "flex-1",
  grid: "",
};

export const INPUT_GROUP_ALIGNMENT_CLASSES: Record<string, string> = {
  start: "justify-start text-left",
  center: "justify-center text-center",
  end: "justify-end text-right",
  "inline-start": "justify-start text-left",
  "inline-end": "justify-end text-right",
};

const INPUT_GROUP_ATTACHED_CHILD_RADIUS_CLASSES: Record<string, Record<string, Record<string, string>>> = {
  pill: {
    sm: {
      inline: [
        "[&>*:only-child]:rounded-[calc(9999px_-_1px)]",
        "[&>*:first-child]:rounded-l-[calc(9999px_-_1px)]",
        "[&>*:last-child]:rounded-r-[calc(9999px_-_1px)]",
      ].join(" "),
      grid: [
        "[&>*:only-child]:rounded-[calc(9999px_-_1px)]",
        "[&>*:first-child]:rounded-tl-[calc(9999px_-_1px)]",
        "[&>*:last-child]:rounded-br-[calc(9999px_-_1px)]",
      ].join(" "),
      gridTwoColumns: [
        "[&>[data-full-row]:first-child]:rounded-tr-[calc(9999px_-_1px)]",
        "[&>*:nth-last-child(2)]:rounded-bl-[calc(9999px_-_1px)]",
      ].join(" "),
    },
    md: {
      inline: [
        "[&>*:only-child]:rounded-[calc(9999px_-_1px)]",
        "[&>*:first-child]:rounded-l-[calc(9999px_-_1px)]",
        "[&>*:last-child]:rounded-r-[calc(9999px_-_1px)]",
      ].join(" "),
      grid: [
        "[&>*:only-child]:rounded-[calc(9999px_-_1px)]",
        "[&>*:first-child]:rounded-tl-[calc(9999px_-_1px)]",
        "[&>*:last-child]:rounded-br-[calc(9999px_-_1px)]",
      ].join(" "),
      gridTwoColumns: [
        "[&>[data-full-row]:first-child]:rounded-tr-[calc(9999px_-_1px)]",
        "[&>*:nth-last-child(2)]:rounded-bl-[calc(9999px_-_1px)]",
      ].join(" "),
    },
    lg: {
      inline: [
        "[&>*:only-child]:rounded-[calc(9999px_-_1px)]",
        "[&>*:first-child]:rounded-l-[calc(9999px_-_1px)]",
        "[&>*:last-child]:rounded-r-[calc(9999px_-_1px)]",
      ].join(" "),
      grid: [
        "[&>*:only-child]:rounded-[calc(9999px_-_1px)]",
        "[&>*:first-child]:rounded-tl-[calc(9999px_-_1px)]",
        "[&>*:last-child]:rounded-br-[calc(9999px_-_1px)]",
      ].join(" "),
      gridTwoColumns: [
        "[&>[data-full-row]:first-child]:rounded-tr-[calc(9999px_-_1px)]",
        "[&>*:nth-last-child(2)]:rounded-bl-[calc(9999px_-_1px)]",
      ].join(" "),
    },
  },
  square: {
    sm: {
      inline: [
        "[&>*:only-child]:rounded-[calc(var(--qk-radius-xs)_-_1px)]",
        "[&>*:first-child]:rounded-l-[calc(var(--qk-radius-xs)_-_1px)]",
        "[&>*:last-child]:rounded-r-[calc(var(--qk-radius-xs)_-_1px)]",
      ].join(" "),
      grid: [
        "[&>*:only-child]:rounded-[calc(var(--qk-radius-xs)_-_1px)]",
        "[&>*:first-child]:rounded-tl-[calc(var(--qk-radius-xs)_-_1px)]",
        "[&>*:last-child]:rounded-br-[calc(var(--qk-radius-xs)_-_1px)]",
      ].join(" "),
      gridTwoColumns: [
        "[&>[data-full-row]:first-child]:rounded-tr-[calc(var(--qk-radius-xs)_-_1px)]",
        "[&>*:nth-last-child(2)]:rounded-bl-[calc(var(--qk-radius-xs)_-_1px)]",
      ].join(" "),
    },
    md: {
      inline: [
        "[&>*:only-child]:rounded-[calc(var(--qk-radius)_-_1px)]",
        "[&>*:first-child]:rounded-l-[calc(var(--qk-radius)_-_1px)]",
        "[&>*:last-child]:rounded-r-[calc(var(--qk-radius)_-_1px)]",
      ].join(" "),
      grid: [
        "[&>*:only-child]:rounded-[calc(var(--qk-radius)_-_1px)]",
        "[&>*:first-child]:rounded-tl-[calc(var(--qk-radius)_-_1px)]",
        "[&>*:last-child]:rounded-br-[calc(var(--qk-radius)_-_1px)]",
      ].join(" "),
      gridTwoColumns: [
        "[&>[data-full-row]:first-child]:rounded-tr-[calc(var(--qk-radius)_-_1px)]",
        "[&>*:nth-last-child(2)]:rounded-bl-[calc(var(--qk-radius)_-_1px)]",
      ].join(" "),
    },
    lg: {
      inline: [
        "[&>*:only-child]:rounded-[calc(var(--qk-radius-lg)_-_1px)]",
        "[&>*:first-child]:rounded-l-[calc(var(--qk-radius-lg)_-_1px)]",
        "[&>*:last-child]:rounded-r-[calc(var(--qk-radius-lg)_-_1px)]",
      ].join(" "),
      grid: [
        "[&>*:only-child]:rounded-[calc(var(--qk-radius-lg)_-_1px)]",
        "[&>*:first-child]:rounded-tl-[calc(var(--qk-radius-lg)_-_1px)]",
        "[&>*:last-child]:rounded-br-[calc(var(--qk-radius-lg)_-_1px)]",
      ].join(" "),
      gridTwoColumns: [
        "[&>[data-full-row]:first-child]:rounded-tr-[calc(var(--qk-radius-lg)_-_1px)]",
        "[&>*:nth-last-child(2)]:rounded-bl-[calc(var(--qk-radius-lg)_-_1px)]",
      ].join(" "),
    },
  },
};

export function getInputGroupSegmentRadiusClasses(shape = "square", size = "md") {
  const resolvedShape = shape === "pill" ? "pill" : "square";
  const resolvedSize = INPUT_SIZE_CLASSES[size] ? size : "md";

  return (
    INPUT_GROUP_ATTACHED_CHILD_RADIUS_CLASSES[resolvedShape]?.[resolvedSize] ??
    INPUT_GROUP_ATTACHED_CHILD_RADIUS_CLASSES.square.md
  );
}
