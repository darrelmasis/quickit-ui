import { forwardRef } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control/useFormControl";
import {
  FORM_FIELD_THEME_CLASSES,
  getFormFieldAutofillStyle,
  resolveFormFieldColor,
} from "@/lib/components/_shared/form-field";
import {
  FORM_FIELD_AUTOFILL_CLASS,
  FORM_FIELD_BASE_CLASSES,
  getFormFieldRadius,
} from "@/lib/components/_shared/form-field-base";

const TEXTAREA_FONT_SIZE_CLASSES = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
  "2xl": "text-lg",
};

const TEXTAREA_PRIMITIVES = {
  base: [
    FORM_FIELD_AUTOFILL_CLASS,
    "flex min-h-[80px]",
    FORM_FIELD_BASE_CLASSES,
  ].join(" "),
};

const Textarea = forwardRef(function Textarea(
  {
    className,
    color = "neutral",
    disabled = false,
    id,
    invalid = false,
    minRows,
    required = false,
    shape = "square",
    size = "md",
    style,
    ...props
  },
  ref,
) {
  const { theme, focusRing: focusRingEnabled } = useQuickitControlState("textarea");
  const ui = FORM_FIELD_THEME_CLASSES[theme];
  const resolvedColor = resolveFormFieldColor(color);
  const colorUi = FORM_FIELD_THEME_CLASSES[theme][resolvedColor];
  const field = useFormControl();
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const resolvedId = id ?? field?.controlId;
  const describedBy = [
    props["aria-describedby"],
    field?.descriptionId,
    resolvedInvalid ? field?.messageId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;
  const labelledBy = [
    props["aria-labelledby"],
    field?.labelId,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <textarea
      ref={ref}
      id={resolvedId}
      required={resolvedRequired}
      disabled={resolvedDisabled}
      rows={props.rows ?? minRows}
      aria-invalid={resolvedInvalid || undefined}
      aria-describedby={describedBy}
      aria-labelledby={labelledBy}
      className={cn(
        resolveQuickitFocusRingClasses(focusRingEnabled, TEXTAREA_PRIMITIVES.base),
        TEXTAREA_FONT_SIZE_CLASSES[size] ?? TEXTAREA_FONT_SIZE_CLASSES.md,
        getFormFieldRadius(shape, size),
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          resolvedInvalid ? ui.invalid : colorUi.base,
        ),
        !resolvedDisabled && !resolvedInvalid && colorUi.hover,
        className,
      )}
      style={getFormFieldAutofillStyle({
        color,
        invalid: resolvedInvalid,
        style,
        theme,
      })}
      {...props}
    />
  );
});

export { Textarea };
export default Textarea;
