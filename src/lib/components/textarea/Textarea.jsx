import { forwardRef } from "react";
import { useQuickitFocusRing, useQuickitTheme } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn, getControlRadius } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";
import {
  FORM_FIELD_THEME_CLASSES,
  resolveFormFieldColor,
  resolveFormFieldTheme,
} from "@/lib/components/_shared/form-field";

const TEXTAREA_PRIMITIVES = {
  base: [
    "w-full border px-3.5 py-3 text-sm outline-none",
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
    minRows = 4,
    required = false,
    ...props
  },
  ref,
) {
  const theme = resolveFormFieldTheme(useQuickitTheme());
  const focusRingEnabled = useQuickitFocusRing("textarea");
  const ui = FORM_FIELD_THEME_CLASSES[theme];
  const resolvedColor = resolveFormFieldColor(color);
  const colorUi = FORM_FIELD_THEME_CLASSES[theme][resolvedColor];
  const field = useFormControl();
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const describedBy =
    [
      props["aria-describedby"],
      field?.descriptionId,
      resolvedInvalid ? field?.messageId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <textarea
      ref={ref}
      id={id ?? field?.controlId}
      required={resolvedRequired}
      disabled={resolvedDisabled}
      aria-invalid={resolvedInvalid || undefined}
      aria-describedby={describedBy}
      field-sizing="content"
      rows={minRows}
      className={cn(
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          TEXTAREA_PRIMITIVES.base,
        ),
        getControlRadius("md"),
        "min-h-28",
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          resolvedInvalid ? ui.invalid : colorUi.base,
        ),
        !resolvedDisabled && !resolvedInvalid && colorUi.hover,
        className,
      )}
      {...props}
    />
  );
});

export { Textarea };
export default Textarea;
