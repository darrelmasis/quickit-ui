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
  shell: "relative w-full",
  actionButton: [
    ACTION_CONTROL_BASE_CLASSES,
    "absolute top-1/2 right-1.5 z-10 inline-flex min-w-0 -translate-y-1/2 items-center justify-center",
    "gap-0 p-0 font-medium shadow-none",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
};

export const INPUT_SIZE_CLASSES = {
  sm: "h-9 px-3",
  md: "h-11 px-3.5",
  lg: "h-12 px-4 text-base",
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
};

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
  className,
  colorUi,
  focusRingEnabled = true,
  resolvedDisabled,
  resolvedInvalid,
  size = "md",
  ui,
  paddingEndClassName,
}) {
  return cn(
    resolveQuickitFocusRingClasses(focusRingEnabled, INPUT_PRIMITIVES.base),
    getControlRadius(size),
    INPUT_SIZE_CLASSES[size] ?? INPUT_SIZE_CLASSES.md,
    paddingEndClassName,
    resolveQuickitFocusRingClasses(
      focusRingEnabled,
      resolvedInvalid ? ui.invalid : colorUi.base,
    ),
    !resolvedDisabled && !resolvedInvalid && colorUi.hover,
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
