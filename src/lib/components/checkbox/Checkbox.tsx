import { forwardRef, useEffect, useRef, useState } from "react";
import { CheckIcon, MinusIcon } from "@/lib/assets/icons";
import { useQuickitControlState } from "@/lib/theme";
import { CHECKBOX_THEME_CLASSES } from "@/lib/theme/theme-classes";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn, getCheckboxRadius } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control/useFormControl";

const CHECKBOX_PRIMITIVES = {
  host: "flex cursor-pointer items-center gap-2.5",
  input:
    "peer absolute inset-0 z-10 m-0 cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed",
  box: [
    "pointer-events-none inline-flex items-center justify-center rounded border transition-all duration-200",
    "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
  ].join(" "),
  indicator: "size-3.5 fill-current",
  label: "font-medium leading-none select-none",
};

const CHECKBOX_SIZE_CLASSES = {
  sm: {
    box: "size-4",
    icon: "size-3",
  },
  md: {
    box: "size-5",
    icon: "size-3.5",
  },
};

const Checkbox = forwardRef(function Checkbox(
  {
    checked,
    children,
    className,
    color = "neutral",
    containerClassName,
    defaultChecked = false,
    disabled = false,
    id,
    indeterminate = false,
    invalid = false,
    label,
    labelClassName,
    name,
    onChange,
    onCheckedChange,
    required = false,
    size = "md",
    ...props
  },
  ref,
) {
  const inputRef = useRef(null);
  const formControl = useFormControl();
  const { theme, focusRing: focusRingEnabled } = useQuickitControlState("checkbox");
  const ui = CHECKBOX_THEME_CLASSES[theme];
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const resolvedChecked = isControlled ? checked : internalChecked;
  const resolvedColor = ui.box.colors[color] ? color : "neutral";
  const resolvedSize = CHECKBOX_SIZE_CLASSES[size] ? size : "md";
  const labelContent = label ?? children;

  const isInvalid = invalid || formControl?.invalid;
  const isDisabled = disabled || formControl?.disabled;
  const isRequired = required || formControl?.required;
  const describedBy = [
    props["aria-describedby"],
    formControl?.descriptionId,
    isInvalid ? formControl?.messageId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;
  const labelledBy =
    [props["aria-labelledby"], formControl?.labelId].filter(Boolean).join(" ") || undefined;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (event) => {
    if (isDisabled) {
      return;
    }

    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }

    onChange?.(event);
    onCheckedChange?.(event.target.checked, event);
  };

  return (
    <label
      className={cn(
        CHECKBOX_PRIMITIVES.host,
        isDisabled && "pointer-events-none opacity-50",
        containerClassName,
      )}
    >
      <div className="relative flex items-center">
        <input
          {...props}
          ref={(node) => {
            inputRef.current = node;

            if (typeof ref === "function") {
              ref(node);
              return;
            }

            if (ref) {
              ref.current = node;
            }
          }}
          type="checkbox"
          id={id ?? formControl?.controlId}
          name={name}
          checked={isControlled ? checked : undefined}
          defaultChecked={isControlled ? undefined : defaultChecked}
          disabled={isDisabled}
          required={isRequired}
          aria-invalid={isInvalid || undefined}
          aria-required={isRequired || undefined}
          aria-describedby={describedBy}
          aria-labelledby={labelContent ? undefined : labelledBy}
          className={cn(CHECKBOX_PRIMITIVES.input, className)}
          onChange={handleChange}
        />

        <div
          className={cn(
            resolveQuickitFocusRingClasses(focusRingEnabled, CHECKBOX_PRIMITIVES.box),
            CHECKBOX_SIZE_CLASSES[resolvedSize].box,
            getCheckboxRadius(resolvedSize),
            ui.box.idle,
            ui.box.focus,
            ui.box.colors[resolvedColor],
            isInvalid && ui.box.invalid,
          )}
        >
          {indeterminate ? (
            <MinusIcon
              className={cn(CHECKBOX_PRIMITIVES.indicator, CHECKBOX_SIZE_CLASSES[resolvedSize].icon)}
            />
          ) : resolvedChecked ? (
            <CheckIcon
              className={cn(CHECKBOX_PRIMITIVES.indicator, CHECKBOX_SIZE_CLASSES[resolvedSize].icon)}
            />
          ) : null}
        </div>
      </div>

      {labelContent ? (
        <span className={cn(CHECKBOX_PRIMITIVES.label, ui.label, labelClassName)}>
          {labelContent}
        </span>
      ) : null}
    </label>
  );
});

export { Checkbox };
export default Checkbox;
