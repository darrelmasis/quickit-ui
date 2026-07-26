import { forwardRef, useId } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { RADIO_THEME_CLASSES } from "@/lib/theme/theme-classes";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control/useFormControl";
import { Label } from "@/lib/components/label/Label";

const RADIO_SIZE_CLASSES = {
  sm: {
    root: "size-4",
    box: "size-4 rounded-full",
    dot: "size-1.5",
  },
  md: {
    root: "size-5",
    box: "size-5 rounded-full",
    dot: "size-2",
  },
};

const Radio = forwardRef(function Radio(
  {
    className,
    color = "neutral",
    containerClassName,
    disabled = false,
    id,
    invalid = false,
    label,
    labelClassName,
    name,
    onChange,
    onCheckedChange,
    required = false,
    size = "md",
    value,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const { theme, focusRing: focusRingEnabled } = useQuickitControlState("radio");
  const ui = RADIO_THEME_CLASSES[theme];
  const field = useFormControl();
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const resolvedColor = ui.colors[color] ? color : "neutral";
  const resolvedSize = RADIO_SIZE_CLASSES[size] ? size : "md";
  const resolvedId = id ?? generatedId;
  const labelledBy =
    [props["aria-labelledby"], !label ? field?.labelId : null].filter(Boolean).join(" ") || undefined;
  const describedBy = [
    props["aria-describedby"],
    field?.descriptionId,
    resolvedInvalid ? field?.messageId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const control = (
    <span
      className={cn(
        "relative inline-flex shrink-0",
        RADIO_SIZE_CLASSES[resolvedSize].root,
        className,
      )}
    >
      <input
        ref={ref}
        type="radio"
        id={resolvedId}
        name={name}
        value={value}
        required={resolvedRequired}
        disabled={resolvedDisabled}
        aria-invalid={resolvedInvalid || undefined}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className="peer absolute inset-0 z-10 m-0 cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
        onChange={(event) => {
          onChange?.(event);
          onCheckedChange?.(event.target.checked, event);
        }}
        {...props}
      />
      <span
        aria-hidden="true"
        className={cn(
          resolveQuickitFocusRingClasses(
            focusRingEnabled,
            "pointer-events-none inline-flex items-center justify-center border outline-none transition-[background-color,border-color,opacity,box-shadow] duration-200 peer-disabled:opacity-60 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:ring-4 peer-focus-visible:ring-offset-2 peer-checked:[&_span]:opacity-100",
          ),
          RADIO_SIZE_CLASSES[resolvedSize].box,
          ui.box,
          resolveQuickitFocusRingClasses(focusRingEnabled, ui.focus),
          resolvedInvalid ? ui.invalid : ui.colors[resolvedColor].box,
        )}
      >
        <span
          className={cn(
            "pointer-events-none rounded-full opacity-0 transition-opacity duration-150",
            RADIO_SIZE_CLASSES[resolvedSize].dot,
            resolvedInvalid ? ui.invalidDot : ui.colors[resolvedColor].dot,
          )}
        />
      </span>
    </span>
  );

  if (!label) {
    return control;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-3",
        resolvedDisabled && "pointer-events-none opacity-60",
        containerClassName,
      )}
    >
      {control}
      <Label
        htmlFor={resolvedId}
        className={cn("cursor-pointer select-none", labelClassName)}
      >
        {label}
      </Label>
    </span>
  );
});

export { Radio };
export default Radio;
