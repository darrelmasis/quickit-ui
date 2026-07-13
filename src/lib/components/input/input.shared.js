import { useQuickitControlState } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn, getControlRadius } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control/useFormControl";
import {
  ACTION_CONTROL_BASE_CLASSES,
  getActionControlRadius,
} from "@/lib/components/_shared/action-control";
import {
  FORM_FIELD_THEME_CLASSES,
  resolveFormFieldColor,
  resolveFormFieldTheme,
} from "@/lib/components/_shared/form-field";
import {
  INPUT_GROUP_THEME_CLASSES,
  INPUT_AFFIX_THEME_CLASSES,
} from "@/lib/theme/theme-classes";

export const INPUT_PRIMITIVES = {
  base: [
    "qi-form-field-autofill w-full border text-sm outline-none",
    "transition-[background-color,border-color,color,box-shadow] duration-200",
    "placeholder:text-current/45",
    "focus-visible:ring-4 focus-visible:ring-offset-0",
    "disabled:cursor-not-allowed disabled:opacity-60",
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
  light: "border-transparent bg-transparent",
  dark: "border-transparent bg-transparent",
};

export const INPUT_ACTION_ICON_SIZE_CLASSES = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4",
};

export const INPUT_NUMBER_BUTTON_WIDTH_CLASSES = {
  sm: "w-7",
  md: "w-8",
  lg: "w-9",
};

export const INPUT_NUMBER_BUTTON_ICON_SIZE_CLASSES = {
  sm: "size-2.5",
  md: "size-3",
  lg: "size-3.5",
};

export const INPUT_SIDE_ELEMENT_SIZE_CLASSES = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};

export const INPUT_SIDE_ELEMENT_THEME_CLASSES = {
  light: "text-neutral-500/90",
  dark: "text-neutral-400/90",
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
        "[&>*:only-child]:rounded-[calc(var(--qi-radius-xs)_-_1px)]",
        "[&>*:first-child]:rounded-l-[calc(var(--qi-radius-xs)_-_1px)]",
        "[&>*:last-child]:rounded-r-[calc(var(--qi-radius-xs)_-_1px)]",
      ].join(" "),
      grid: [
        "[&>*:only-child]:rounded-[calc(var(--qi-radius-xs)_-_1px)]",
        "[&>*:first-child]:rounded-tl-[calc(var(--qi-radius-xs)_-_1px)]",
        "[&>*:last-child]:rounded-br-[calc(var(--qi-radius-xs)_-_1px)]",
      ].join(" "),
      gridTwoColumns: [
        "[&>[data-full-row]:first-child]:rounded-tr-[calc(var(--qi-radius-xs)_-_1px)]",
        "[&>*:nth-last-child(2)]:rounded-bl-[calc(var(--qi-radius-xs)_-_1px)]",
      ].join(" "),
    },
    md: {
      inline: [
        "[&>*:only-child]:rounded-[calc(var(--qi-radius)_-_1px)]",
        "[&>*:first-child]:rounded-l-[calc(var(--qi-radius)_-_1px)]",
        "[&>*:last-child]:rounded-r-[calc(var(--qi-radius)_-_1px)]",
      ].join(" "),
      grid: [
        "[&>*:only-child]:rounded-[calc(var(--qi-radius)_-_1px)]",
        "[&>*:first-child]:rounded-tl-[calc(var(--qi-radius)_-_1px)]",
        "[&>*:last-child]:rounded-br-[calc(var(--qi-radius)_-_1px)]",
      ].join(" "),
      gridTwoColumns: [
        "[&>[data-full-row]:first-child]:rounded-tr-[calc(var(--qi-radius)_-_1px)]",
        "[&>*:nth-last-child(2)]:rounded-bl-[calc(var(--qi-radius)_-_1px)]",
      ].join(" "),
    },
    lg: {
      inline: [
        "[&>*:only-child]:rounded-[calc(var(--qi-radius-lg)_-_1px)]",
        "[&>*:first-child]:rounded-l-[calc(var(--qi-radius-lg)_-_1px)]",
        "[&>*:last-child]:rounded-r-[calc(var(--qi-radius-lg)_-_1px)]",
      ].join(" "),
      grid: [
        "[&>*:only-child]:rounded-[calc(var(--qi-radius-lg)_-_1px)]",
        "[&>*:first-child]:rounded-tl-[calc(var(--qi-radius-lg)_-_1px)]",
        "[&>*:last-child]:rounded-br-[calc(var(--qi-radius-lg)_-_1px)]",
      ].join(" "),
      gridTwoColumns: [
        "[&>[data-full-row]:first-child]:rounded-tr-[calc(var(--qi-radius-lg)_-_1px)]",
        "[&>*:nth-last-child(2)]:rounded-bl-[calc(var(--qi-radius-lg)_-_1px)]",
      ].join(" "),
    },
  },
};

// Los grupos attached necesitan radios distintos al wrapper exterior para que los
// segmentos llenen la curva sin “cortarla” visualmente.
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
  ariaLabelledBy,
  color = "neutral",
  disabled = false,
  id,
  invalid = false,
  required = false,
  ariaDescribedBy,
}) {
  const { theme, focusRing: focusRingEnabled } = useQuickitControlState("input");
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
  const labelledBy = [
    ariaLabelledBy,
    field?.labelId,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return {
    colorUi,
    describedBy,
    focusRingEnabled,
    labelledBy,
    resolvedColor,
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
  color = "neutral",
  invalid = false,
}) {
  const resolvedShape = shape === "square" ? "square" : "circle";
  const resolvedSize = INPUT_ACTION_BUTTON_SIZE_CLASSES[resolvedShape]?.[size]
    ? size
    : "md";
  const resolvedTheme = theme === "dark" ? "dark" : "light";
  const resolvedColor = invalid ? "danger" : color;
  const colorClasses =
    INPUT_AFFIX_THEME_CLASSES[resolvedTheme]?.[resolvedColor] ??
    INPUT_AFFIX_THEME_CLASSES[resolvedTheme].neutral;

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
    resolveQuickitFocusRingClasses(focusRingEnabled, colorClasses),
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
    // El contenedor exterior dibuja el frame general; los hijos solo reciben
    // el radio mínimo necesario para fundirse con ese borde.
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

  // Usamos el setter nativo para que React y cualquier form controller escuchen
  // el cambio igual que si el usuario hubiera escrito en el campo.
  const descriptor = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  );

  descriptor?.set?.call(input, nextValue);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
