import { forwardRef } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn, getControlRadius } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control/useFormControl";
import {
  FORM_FIELD_THEME_CLASSES,
  getFormFieldAutofillStyle,
  resolveFormFieldColor,
} from "@/lib/components/_shared/form-field";

const TEXTAREA_PRIMITIVES = {
  base: [
    "qi-form-field-autofill flex min-h-[80px] w-full border px-3.5 py-2.5 text-sm outline-none",
    "transition-[background-color,border-color,color,box-shadow] duration-200",
    "placeholder:text-current/45",
    "focus-visible:ring-4 focus-visible:ring-offset-0",
    "disabled:cursor-not-allowed disabled:opacity-60",
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
        getControlRadius(shape === "pill" ? "lg" : size),
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
