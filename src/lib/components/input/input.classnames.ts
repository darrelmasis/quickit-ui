import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import { getActionControlRadius } from "@/lib/components/_shared/action-control";
import {
  FORM_FIELD_THEME_CLASSES,
  resolveFormFieldColor,
  resolveFormFieldTheme,
} from "@/lib/components/_shared/form-field";
import {
  INPUT_GROUP_THEME_CLASSES,
  INPUT_AFFIX_THEME_CLASSES,
} from "@/lib/theme/theme-classes";
import {
  INPUT_PRIMITIVES,
  INPUT_SIZE_CLASSES,
  INPUT_HEIGHT_CLASSES,
  INPUT_ACTION_BUTTON_SIZE_CLASSES,
  INPUT_ACTION_BUTTON_THEME_CLASSES,
  INPUT_GROUP_AFFIX_SIZE_CLASSES,
  INPUT_GROUP_AFFIX_ATTACHED_SIZE_CLASSES,
  INPUT_GROUP_ITEM_GROW_CLASSES,
  INPUT_GROUP_ALIGNMENT_CLASSES,
} from "./input.constants";
import { getInputRadius } from "./input.utils";
import { getInputGroupSegmentRadiusClasses } from "./input.constants";

type FormFieldColorClasses = { base: string; hover: string };

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
}: {
  attached?: boolean;
  className?: string;
  colorUi: FormFieldColorClasses;
  focusRingEnabled?: boolean;
  shape?: string;
  resolvedDisabled?: boolean;
  resolvedInvalid?: boolean;
  size?: string;
  ui: { invalid: string };
  paddingStartClassName?: string;
  paddingEndClassName?: string;
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
}: {
  focusRingEnabled?: boolean;
  shape?: string;
  size?: string;
  theme?: string;
  color?: string;
  invalid?: boolean;
}) {
  const resolvedShape = shape === "square" ? "square" : "circle";
  const resolvedSize = INPUT_ACTION_BUTTON_SIZE_CLASSES[resolvedShape]?.[size]
    ? size
    : "md";
  const resolvedTheme = theme === "dark" ? "dark" : "light";
  const resolvedColor = invalid ? "danger" : color;
  const colorClasses =
    (INPUT_AFFIX_THEME_CLASSES as Record<string, Record<string, string>>)[resolvedTheme]?.[resolvedColor] ??
    (INPUT_AFFIX_THEME_CLASSES as Record<string, Record<string, string>>)[resolvedTheme].neutral;

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

export function resolveInputGroupLayout(layout: string) {
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
}: {
  attached?: boolean;
  className?: string;
  color?: string;
  focusRingEnabled?: boolean;
  fullWidth?: boolean;
  layout?: string;
  shape?: string;
  size?: string;
  theme?: string;
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
  focusRingEnabled = true,
  layout = "inline",
  shape = "square",
  size = "md",
  theme = "light",
}: {
  color?: string;
  focusRingEnabled?: boolean;
  layout?: string;
  shape?: string;
  size?: string;
  theme?: string;
}) {
  const resolvedTheme = resolveFormFieldTheme(theme);
  const resolvedColor = resolveFormFieldColor(color);
  const groupUi = (INPUT_GROUP_THEME_CLASSES as Record<string, Record<string, { frame: string; separator: string; focus: string; focusBorder: string }>>)[resolvedTheme][resolvedColor];
  const resolvedLayout = resolveInputGroupLayout(layout);

  return cn(
    INPUT_PRIMITIVES.attachedGroupFrame,
    getInputRadius(shape, size),
    groupUi.frame,
    focusRingEnabled && groupUi.focusBorder,
    (resolvedLayout === "inline" && INPUT_HEIGHT_CLASSES[size]) ?? INPUT_HEIGHT_CLASSES.md,
  );
}

export function getInputGroupInnerClassName({
  color = "neutral",
  layout = "inline",
  theme = "light",
}: {
  color?: string;
  layout?: string;
  theme?: string;
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
}: {
  columns?: unknown;
  layout?: string;
  shape?: string;
  size?: string;
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
}: {
  className?: string;
  grow?: boolean;
  layout?: string;
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
}: {
  align?: string;
  attached?: boolean;
  className?: string;
  color?: string;
  shape?: string;
  size?: string;
  theme?: string;
}) {
  const resolvedTheme = resolveFormFieldTheme(theme);
  const resolvedColor = resolveFormFieldColor(color);
  const colorUi = (FORM_FIELD_THEME_CLASSES as Record<string, Record<string, string | FormFieldColorClasses>>)[resolvedTheme][resolvedColor] as FormFieldColorClasses;

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
}: {
  attached?: boolean;
  className?: string;
  size?: string;
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
