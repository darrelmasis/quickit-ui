import { useQuickitTheme } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn, getControlRadius } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";
import {
  ACTION_CONTROL_BASE_CLASSES,
  getActionControlRadius,
} from "@/lib/components/_shared/action-control";
import {
  FORM_FIELD_THEME_CLASSES,
  resolveFormFieldColor,
  resolveFormFieldTheme,
} from "@/lib/components/_shared/form-field";

export const INPUT_PRIMITIVES = {
  base: [
    "w-full border text-sm outline-none",
    "transition-[background-color,border-color,color,box-shadow] duration-200",
    "placeholder:text-current/45",
    "focus-visible:ring-4 focus-visible:ring-offset-0",
    "disabled:cursor-not-allowed disabled:opacity-60",
    "[&::-webkit-search-cancel-button]:appearance-none",
    "[&::-webkit-search-decoration]:appearance-none",
  ].join(" "),
  shell: "relative min-w-0 w-full",
  group: "relative min-w-0",
  actionButton: [
    ACTION_CONTROL_BASE_CLASSES,
    "pointer-events-auto inline-flex min-w-0 items-center justify-center",
    "gap-0 p-0 font-medium shadow-none",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  leftElement: "pointer-events-none absolute inset-y-0 left-3 z-10 inline-flex items-center justify-center",
  rightElement: "pointer-events-none inline-flex items-center justify-center",
  rightCluster:
    "pointer-events-none absolute top-1/2 right-1.5 z-10 inline-flex -translate-y-1/2 items-center gap-1.5",
  attachedGroup:
    "relative isolate min-w-0 focus-within:ring-4 focus-within:ring-offset-0",
  attachedGroupFrame: "relative w-full overflow-hidden border",
  attachedGroupInner:
    "min-w-0 w-full",
  groupItem: "min-w-0",
  addon:
    "inline-flex min-w-0 shrink-0 items-center whitespace-nowrap border text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-200",
  action:
    "inline-flex min-w-0 shrink-0 items-center justify-center whitespace-nowrap border font-medium transition-[background-color,border-color,color,box-shadow] duration-200 disabled:cursor-not-allowed disabled:opacity-60",
};

export const INPUT_SIZE_CLASSES = {
  sm: "h-9 px-3",
  md: "h-11 px-3.5",
  lg: "h-12 px-4 text-base",
};

export const INPUT_HEIGHT_CLASSES = {
  sm: "h-9",
  md: "h-11",
  lg: "h-12",
};

export const INPUT_ACTION_BUTTON_SIZE_CLASSES = {
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

export const INPUT_ACTION_BUTTON_THEME_CLASSES = {
  light: [
    "border-transparent bg-transparent text-slate-500",
    "hover:border-slate-200 hover:bg-slate-100 hover:text-slate-950",
    "focus-visible:outline-slate-500",
  ].join(" "),
  dark: [
    "border-transparent bg-transparent text-zinc-400",
    "hover:border-zinc-800 hover:bg-zinc-900 hover:text-zinc-50",
    "focus-visible:outline-zinc-400",
  ].join(" "),
};

export const INPUT_ACTION_ICON_SIZE_CLASSES = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4",
};

export const INPUT_SIDE_ELEMENT_SIZE_CLASSES = {
  sm: "text-[0.875rem]",
  md: "text-[0.95rem]",
  lg: "text-base",
};

export const INPUT_SIDE_ELEMENT_THEME_CLASSES = {
  light: "text-slate-500/90",
  dark: "text-zinc-400/90",
};

export const INPUT_ACTION_PADDING_CLASSES = {
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

export const INPUT_GROUP_AFFIX_SIZE_CLASSES = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-3.5 text-sm",
  lg: "h-12 px-4 text-base",
};

export const INPUT_GROUP_AFFIX_ATTACHED_SIZE_CLASSES = {
  sm: "h-full px-3 text-sm",
  md: "h-full px-3.5 text-sm",
  lg: "h-full px-4 text-base",
};

export const INPUT_GROUP_ITEM_GROW_CLASSES = {
  inline: "flex-1",
  grid: "",
};

export const INPUT_GROUP_ALIGNMENT_CLASSES = {
  start: "justify-start text-left",
  center: "justify-center text-center",
  end: "justify-end text-right",
  "inline-start": "justify-start text-left",
  "inline-end": "justify-end text-right",
};

export const INPUT_GROUP_THEME_CLASSES = {
  light: {
    neutral: {
      frame: "border-slate-500/90 shadow-[0_1px_2px_rgba(15,23,42,0.08)]",
      separator: "bg-slate-500/90",
      focus: "focus-within:ring-slate-600/22",
    },
    slate: {
      frame: "border-slate-600 shadow-[0_1px_2px_rgba(15,23,42,0.08)]",
      separator: "bg-slate-600",
      focus: "focus-within:ring-slate-700/20",
    },
    zinc: {
      frame: "border-zinc-600 shadow-[0_1px_2px_rgba(24,24,27,0.08)]",
      separator: "bg-zinc-600",
      focus: "focus-within:ring-zinc-700/20",
    },
    primary: {
      frame: "border-sky-400/85 shadow-[0_1px_2px_rgba(14,165,233,0.1)]",
      separator: "bg-sky-400/85",
      focus: "focus-within:ring-sky-400/25",
    },
    brand: {
      frame: "border-brand-400/80 shadow-[0_1px_2px_rgba(112,56,255,0.12)]",
      separator: "bg-brand-400/80",
      focus: "focus-within:ring-brand-400/25",
    },
    success: {
      frame: "border-emerald-400/85 shadow-[0_1px_2px_rgba(16,185,129,0.1)]",
      separator: "bg-emerald-400/85",
      focus: "focus-within:ring-emerald-400/25",
    },
    danger: {
      frame: "border-rose-400/85 shadow-[0_1px_2px_rgba(244,63,94,0.1)]",
      separator: "bg-rose-400/85",
      focus: "focus-within:ring-rose-400/25",
    },
    warning: {
      frame: "border-amber-400/85 shadow-[0_1px_2px_rgba(245,158,11,0.1)]",
      separator: "bg-amber-400/85",
      focus: "focus-within:ring-amber-400/25",
    },
    info: {
      frame: "border-cyan-400/85 shadow-[0_1px_2px_rgba(6,182,212,0.1)]",
      separator: "bg-cyan-400/85",
      focus: "focus-within:ring-cyan-400/25",
    },
    light: {
      frame: "border-stone-300 shadow-[0_1px_2px_rgba(120,113,108,0.08)]",
      separator: "bg-stone-300",
      focus: "focus-within:ring-stone-400/25",
    },
    dark: {
      frame: "border-zinc-800 shadow-[0_1px_2px_rgba(24,24,27,0.22)]",
      separator: "bg-zinc-800",
      focus: "focus-within:ring-zinc-700/32",
    },
    black: {
      frame: "border-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,0.28)]",
      separator: "bg-zinc-950",
      focus: "focus-within:ring-zinc-700/32",
    },
  },
  dark: {
    neutral: {
      frame: "border-zinc-700 shadow-[0_1px_2px_rgba(0,0,0,0.38)]",
      separator: "bg-zinc-700",
      focus: "focus-within:ring-zinc-500/32",
    },
    slate: {
      frame: "border-slate-700 shadow-[0_1px_2px_rgba(0,0,0,0.36)]",
      separator: "bg-slate-700",
      focus: "focus-within:ring-slate-600/30",
    },
    zinc: {
      frame: "border-zinc-700 shadow-[0_1px_2px_rgba(0,0,0,0.36)]",
      separator: "bg-zinc-700",
      focus: "focus-within:ring-zinc-600/30",
    },
    primary: {
      frame: "border-sky-500/55 shadow-[0_1px_2px_rgba(14,165,233,0.14)]",
      separator: "bg-sky-500/55",
      focus: "focus-within:ring-sky-400/30",
    },
    brand: {
      frame: "border-brand-500/55 shadow-[0_1px_2px_rgba(112,56,255,0.16)]",
      separator: "bg-brand-500/55",
      focus: "focus-within:ring-brand-400/30",
    },
    success: {
      frame: "border-emerald-500/55 shadow-[0_1px_2px_rgba(16,185,129,0.14)]",
      separator: "bg-emerald-500/55",
      focus: "focus-within:ring-emerald-400/30",
    },
    danger: {
      frame: "border-rose-500/55 shadow-[0_1px_2px_rgba(244,63,94,0.14)]",
      separator: "bg-rose-500/55",
      focus: "focus-within:ring-rose-400/30",
    },
    warning: {
      frame: "border-amber-500/55 shadow-[0_1px_2px_rgba(245,158,11,0.14)]",
      separator: "bg-amber-500/55",
      focus: "focus-within:ring-amber-400/30",
    },
    info: {
      frame: "border-cyan-500/55 shadow-[0_1px_2px_rgba(6,182,212,0.14)]",
      separator: "bg-cyan-500/55",
      focus: "focus-within:ring-cyan-400/30",
    },
    light: {
      frame: "border-stone-300/70 shadow-[0_1px_2px_rgba(245,245,244,0.08)]",
      separator: "bg-stone-300/70",
      focus: "focus-within:ring-stone-300/30",
    },
    dark: {
      frame: "border-zinc-700 shadow-[0_1px_2px_rgba(0,0,0,0.4)]",
      separator: "bg-zinc-700",
      focus: "focus-within:ring-zinc-600/35",
    },
    black: {
      frame: "border-zinc-600 shadow-[0_1px_2px_rgba(0,0,0,0.42)]",
      separator: "bg-zinc-600",
      focus: "focus-within:ring-zinc-500/35",
    },
  },
};

export function resolveInputShape(shape) {
  return shape === "pill" ? "pill" : "square";
}

export function getInputRadius(shape = "square", size = "md") {
  return resolveInputShape(shape) === "pill"
    ? "rounded-full"
    : getControlRadius(size);
}

const INPUT_GROUP_ATTACHED_CHILD_RADIUS_CLASSES = {
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
        "[&>*:only-child]:rounded-[calc(0.625rem_-_1px)]",
        "[&>*:first-child]:rounded-l-[calc(0.625rem_-_1px)]",
        "[&>*:last-child]:rounded-r-[calc(0.625rem_-_1px)]",
      ].join(" "),
      grid: [
        "[&>*:only-child]:rounded-[calc(0.625rem_-_1px)]",
        "[&>*:first-child]:rounded-tl-[calc(0.625rem_-_1px)]",
        "[&>*:last-child]:rounded-br-[calc(0.625rem_-_1px)]",
      ].join(" "),
      gridTwoColumns: [
        "[&>[data-full-row]:first-child]:rounded-tr-[calc(0.625rem_-_1px)]",
        "[&>*:nth-last-child(2)]:rounded-bl-[calc(0.625rem_-_1px)]",
      ].join(" "),
    },
    md: {
      inline: [
        "[&>*:only-child]:rounded-[calc(0.75rem_-_1px)]",
        "[&>*:first-child]:rounded-l-[calc(0.75rem_-_1px)]",
        "[&>*:last-child]:rounded-r-[calc(0.75rem_-_1px)]",
      ].join(" "),
      grid: [
        "[&>*:only-child]:rounded-[calc(0.75rem_-_1px)]",
        "[&>*:first-child]:rounded-tl-[calc(0.75rem_-_1px)]",
        "[&>*:last-child]:rounded-br-[calc(0.75rem_-_1px)]",
      ].join(" "),
      gridTwoColumns: [
        "[&>[data-full-row]:first-child]:rounded-tr-[calc(0.75rem_-_1px)]",
        "[&>*:nth-last-child(2)]:rounded-bl-[calc(0.75rem_-_1px)]",
      ].join(" "),
    },
    lg: {
      inline: [
        "[&>*:only-child]:rounded-[calc(0.875rem_-_1px)]",
        "[&>*:first-child]:rounded-l-[calc(0.875rem_-_1px)]",
        "[&>*:last-child]:rounded-r-[calc(0.875rem_-_1px)]",
      ].join(" "),
      grid: [
        "[&>*:only-child]:rounded-[calc(0.875rem_-_1px)]",
        "[&>*:first-child]:rounded-tl-[calc(0.875rem_-_1px)]",
        "[&>*:last-child]:rounded-br-[calc(0.875rem_-_1px)]",
      ].join(" "),
      gridTwoColumns: [
        "[&>[data-full-row]:first-child]:rounded-tr-[calc(0.875rem_-_1px)]",
        "[&>*:nth-last-child(2)]:rounded-bl-[calc(0.875rem_-_1px)]",
      ].join(" "),
    },
  },
};

function getInputGroupSegmentRadiusClasses(shape = "square", size = "md") {
  const resolvedShape = resolveInputShape(shape);
  const resolvedSize = INPUT_SIZE_CLASSES[size] ? size : "md";

  return (
    INPUT_GROUP_ATTACHED_CHILD_RADIUS_CLASSES[resolvedShape]?.[resolvedSize] ??
    INPUT_GROUP_ATTACHED_CHILD_RADIUS_CLASSES.square.md
  );
}

export function normalizeInputValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

export function useInputFieldState({
  color = "neutral",
  disabled = false,
  id,
  invalid = false,
  required = false,
  ariaDescribedBy,
}) {
  const theme = resolveFormFieldTheme(useQuickitTheme());
  const ui = FORM_FIELD_THEME_CLASSES[theme];
  const resolvedColor = resolveFormFieldColor(color);
  const colorUi = FORM_FIELD_THEME_CLASSES[theme][resolvedColor];
  const field = useFormControl();
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const describedBy = [
    ariaDescribedBy,
    field?.descriptionId,
    resolvedInvalid ? field?.messageId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return {
    colorUi,
    describedBy,
    resolvedDisabled,
    resolvedId: id ?? field?.controlId,
    resolvedInvalid,
    resolvedRequired,
    theme,
    ui,
  };
}

export function getInputClassName({
  attached = false,
  className,
  colorUi,
  focusRingEnabled = true,
  shape = "square",
  resolvedDisabled,
  resolvedInvalid,
  size = "md",
  ui,
  paddingStartClassName,
  paddingEndClassName,
}) {
  return cn(
    resolveQuickitFocusRingClasses(focusRingEnabled, INPUT_PRIMITIVES.base),
    attached
      ? "rounded-none border-0 shadow-none focus-visible:border-transparent focus-visible:ring-0"
      : getInputRadius(shape, size),
    INPUT_SIZE_CLASSES[size] ?? INPUT_SIZE_CLASSES.md,
    paddingStartClassName,
    paddingEndClassName,
    resolveQuickitFocusRingClasses(
      attached ? false : focusRingEnabled,
      resolvedInvalid ? ui.invalid : colorUi.base,
    ),
    attached &&
      !resolvedInvalid &&
      !resolvedDisabled &&
      "focus-visible:outline-none",
    !attached && !resolvedDisabled && !resolvedInvalid && colorUi.hover,
    className,
  );
}

export function getInputActionButtonClassName({
  focusRingEnabled = true,
  shape = "circle",
  size = "md",
  theme = "light",
}) {
  const resolvedShape = shape === "square" ? "square" : "circle";
  const resolvedSize = INPUT_ACTION_BUTTON_SIZE_CLASSES[resolvedShape]?.[size]
    ? size
    : "md";

  return cn(
    resolveQuickitFocusRingClasses(
      focusRingEnabled,
      INPUT_PRIMITIVES.actionButton,
    ),
    getActionControlRadius(resolvedShape, resolvedSize),
    INPUT_ACTION_BUTTON_SIZE_CLASSES[resolvedShape][resolvedSize],
    resolveQuickitFocusRingClasses(
      focusRingEnabled,
      INPUT_ACTION_BUTTON_THEME_CLASSES[theme],
    ),
  );
}

export function resolveInputGroupLayout(layout) {
  return layout === "grid" ? "grid" : "inline";
}

export function getInputGroupClassName({
  attached = false,
  className,
  color = "neutral",
  focusRingEnabled = true,
  fullWidth = true,
  layout = "inline",
  shape = "square",
  size = "md",
  theme = "light",
}) {
  const resolvedLayout = resolveInputGroupLayout(layout);
  const resolvedTheme = resolveFormFieldTheme(theme);
  const resolvedColor = resolveFormFieldColor(color);
  const groupUi = INPUT_GROUP_THEME_CLASSES[resolvedTheme][resolvedColor];

  return cn(
    INPUT_PRIMITIVES.group,
    fullWidth && "w-full",
    !attached && (resolvedLayout === "grid" ? "grid gap-2" : "flex items-stretch gap-2"),
    attached &&
      cn(
        INPUT_PRIMITIVES.attachedGroup,
        getInputRadius(shape, size),
        focusRingEnabled && groupUi.focus,
      ),
    className,
  );
}

export function getInputGroupFrameClassName({
  color = "neutral",
  layout = "inline",
  shape = "square",
  size = "md",
  theme = "light",
}) {
  const resolvedTheme = resolveFormFieldTheme(theme);
  const resolvedColor = resolveFormFieldColor(color);
  const groupUi = INPUT_GROUP_THEME_CLASSES[resolvedTheme][resolvedColor];
  const resolvedLayout = resolveInputGroupLayout(layout);

  return cn(
    INPUT_PRIMITIVES.attachedGroupFrame,
    getInputRadius(shape, size),
    groupUi.frame,
    resolvedLayout === "inline" && (INPUT_HEIGHT_CLASSES[size] ?? INPUT_HEIGHT_CLASSES.md),
  );
}

export function getInputGroupInnerClassName({
  color = "neutral",
  layout = "inline",
  theme = "light",
}) {
  const resolvedLayout = resolveInputGroupLayout(layout);
  const resolvedTheme = resolveFormFieldTheme(theme);
  const resolvedColor = resolveFormFieldColor(color);
  const groupUi = INPUT_GROUP_THEME_CLASSES[resolvedTheme][resolvedColor];

  return cn(
    INPUT_PRIMITIVES.attachedGroupInner,
    groupUi.separator,
    resolvedLayout === "inline" ? "flex h-full w-full items-stretch gap-px" : "grid w-full gap-px",
  );
}

export function getInputGroupAttachedChildrenClassName({
  columns,
  layout = "inline",
  shape = "square",
  size = "md",
}) {
  const resolvedLayout = resolveInputGroupLayout(layout);
  const radius = getInputGroupSegmentRadiusClasses(shape, size);

  return cn(
    "[&>*]:min-w-0 [&>*]:overflow-hidden",
    resolvedLayout === "inline" &&
      cn(
        "[&>*]:h-full",
        radius.inline,
      ),
    resolvedLayout === "grid" &&
      cn(
        radius.grid,
        columns === 2 && radius.gridTwoColumns,
      ),
  );
}

export function getInputGroupItemClassName({
  className,
  grow = true,
  layout = "inline",
}) {
  const resolvedLayout = resolveInputGroupLayout(layout);

  return cn(
    INPUT_PRIMITIVES.groupItem,
    grow && INPUT_GROUP_ITEM_GROW_CLASSES[resolvedLayout],
    className,
  );
}

export function getInputGroupAddonClassName({
  align = "start",
  attached = false,
  className,
  color = "neutral",
  shape = "square",
  size = "md",
  theme = "light",
}) {
  const resolvedTheme = resolveFormFieldTheme(theme);
  const resolvedColor = resolveFormFieldColor(color);
  const colorUi = FORM_FIELD_THEME_CLASSES[resolvedTheme][resolvedColor];

  return cn(
    INPUT_PRIMITIVES.addon,
    attached
      ? INPUT_GROUP_AFFIX_ATTACHED_SIZE_CLASSES[size] ??
          INPUT_GROUP_AFFIX_ATTACHED_SIZE_CLASSES.md
      : INPUT_GROUP_AFFIX_SIZE_CLASSES[size] ?? INPUT_GROUP_AFFIX_SIZE_CLASSES.md,
    INPUT_GROUP_ALIGNMENT_CLASSES[align] ?? INPUT_GROUP_ALIGNMENT_CLASSES.start,
    attached
      ? "rounded-none border-0 shadow-none"
      : cn(getInputRadius(shape, size), colorUi.base),
    attached && cn("shadow-none", colorUi.base, "rounded-none border-0"),
    className,
  );
}

export function getInputGroupActionClassName({
  attached = false,
  className,
  size = "md",
}) {
  return cn(
    "min-w-0",
    attached
      ? INPUT_GROUP_AFFIX_ATTACHED_SIZE_CLASSES[size] ??
          INPUT_GROUP_AFFIX_ATTACHED_SIZE_CLASSES.md
      : INPUT_GROUP_AFFIX_SIZE_CLASSES[size] ?? INPUT_GROUP_AFFIX_SIZE_CLASSES.md,
    attached
      ? "rounded-none border-0 shadow-none"
      : null,
    className,
  );
}

export function assignInputRef(ref, node) {
  if (!ref) {
    return;
  }

  if (typeof ref === "function") {
    ref(node);
    return;
  }

  ref.current = node;
}

export function composeInputRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => assignInputRef(ref, node));
  };
}

export function dispatchNativeInputValue(input, nextValue) {
  if (!input) {
    return;
  }

  const descriptor = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  );

  descriptor?.set?.call(input, nextValue);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
