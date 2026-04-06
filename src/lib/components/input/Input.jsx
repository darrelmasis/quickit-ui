import { forwardRef } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn, getControlRadius } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";
import {
  FORM_FIELD_THEME_CLASSES,
  resolveFormFieldColor,
  resolveFormFieldTheme,
} from "@/lib/components/_shared/form-field";

const INPUT_PRIMITIVES = {
  base: [
    "w-full border bg-transparent text-sm outline-none",
    "transition-[background-color,border-color,color,box-shadow] duration-200",
    "placeholder:text-current/45",
    "focus-visible:ring-4 focus-visible:ring-offset-0",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" "),
};

const INPUT_SIZE_CLASSES = {
  sm: "h-9 px-3",
  md: "h-11 px-3.5",
  lg: "h-12 px-4 text-base",
};

const Input = forwardRef(function Input(
  {
    className,
    color = "neutral",
    disabled = false,
    id,
    invalid = false,
    required = false,
    size = "md",
    ...props
  },
  ref,
) {
  const theme = resolveFormFieldTheme(useQuickitTheme());
  const ui = FORM_FIELD_THEME_CLASSES[theme];
  const resolvedColor = resolveFormFieldColor(color);
  const colorUi = FORM_FIELD_THEME_CLASSES[theme][resolvedColor];
  const field = useFormControl();
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const describedBy = [
    props["aria-describedby"],
    field?.descriptionId,
    resolvedInvalid ? field?.messageId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <input
      ref={ref}
      id={id ?? field?.controlId}
      required={resolvedRequired}
      disabled={resolvedDisabled}
      aria-invalid={resolvedInvalid || undefined}
      aria-describedby={describedBy}
      className={cn(
        INPUT_PRIMITIVES.base,
        getControlRadius(size),
        INPUT_SIZE_CLASSES[size] ?? INPUT_SIZE_CLASSES.md,
        resolvedInvalid ? ui.invalid : colorUi.base,
        !resolvedDisabled && !resolvedInvalid && colorUi.hover,
        className,
      )}
      {...props}
    />
  );
});

export { Input };
export default Input;
