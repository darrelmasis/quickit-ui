import { forwardRef, useId, useMemo, useState } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { SWITCH_THEME_CLASSES } from "@/lib/theme/theme-classes";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control/useFormControl";
import { Label } from "@/lib/components/label/Label";

const SWITCH_PRIMITIVES = {
  root: [
    "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border outline-none",
    "transition-[background-color,border-color] duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" "),
  thumb: [
    "pointer-events-none inline-flex rounded-full border",
    "transition-transform duration-200",
  ].join(" "),
};

const SWITCH_SIZE_CLASSES = {
  sm: {
    root: "h-5 w-9",
    thumb: "size-[0.875rem]",
    checked: "translate-x-[1.125rem]",
    unchecked: "translate-x-0.5",
  },
  md: {
    root: "h-6 w-11",
    thumb: "size-[1.125rem]",
    checked: "translate-x-[1.375rem]",
    unchecked: "translate-x-0.5",
  },
};

function createCheckedChangeEvent({ checked, id, name, nativeEvent, value }) {
  return {
    type: "change",
    nativeEvent,
    target: { checked, id, name, value },
    currentTarget: { checked, id, name, value },
    preventDefault() {
      nativeEvent?.preventDefault?.();
    },
    stopPropagation() {
      nativeEvent?.stopPropagation?.();
    },
  };
}

const Switch = forwardRef(function Switch(
  {
    checked,
    className,
    color = "neutral",
    containerClassName,
    defaultChecked = false,
    disabled = false,
    id,
    invalid = false,
    label,
    labelClassName,
    name,
    onChange,
    onCheckedChange,
    onClick,
    required = false,
    size = "md",
    value = "on",
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const resolvedChecked = isControlled ? checked : internalChecked;
  const { theme, focusRing: focusRingEnabled } = useQuickitControlState("switch");
  const ui = SWITCH_THEME_CLASSES[theme];
  const field = useFormControl();
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedColor = ui.checked[color] ? color : "neutral";
  const resolvedSize = SWITCH_SIZE_CLASSES[size] ? size : "md";
  const resolvedId = id ?? field?.controlId ?? generatedId;
  const labelledBy =
    [props["aria-labelledby"], !label ? field?.labelId : null].filter(Boolean).join(" ") || undefined;
  const describedBy = [
    props["aria-describedby"],
    field?.descriptionId,
    resolvedInvalid ? field?.messageId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const hiddenInputProps = useMemo(
    () =>
      name
        ? {
            disabled: resolvedDisabled,
            name,
            required: resolvedRequired,
            value,
          }
        : null,
    [name, resolvedDisabled, resolvedRequired, value],
  );

  const toggle = (nativeEvent) => {
    if (resolvedDisabled) {
      return;
    }

    const nextValue = !resolvedChecked;

    if (!isControlled) {
      setInternalChecked(nextValue);
    }

    const changeEvent = createCheckedChangeEvent({
      checked: nextValue,
      id: resolvedId,
      name,
      nativeEvent,
      value,
    });

    onCheckedChange?.(nextValue, changeEvent);
    onChange?.(changeEvent);
  };

  const control = (
    <>
      <button
        ref={ref}
        type="button"
        role="switch"
        id={resolvedId}
        aria-checked={resolvedChecked}
        aria-invalid={resolvedInvalid || undefined}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        disabled={resolvedDisabled}
        data-state={resolvedChecked ? "checked" : "unchecked"}
        className={cn(
          resolveQuickitFocusRingClasses(
            focusRingEnabled,
            SWITCH_PRIMITIVES.root,
          ),
          SWITCH_SIZE_CLASSES[resolvedSize].root,
          resolveQuickitFocusRingClasses(
            focusRingEnabled,
            resolvedInvalid
              ? ui.invalid
              : resolvedChecked
                ? ui.checked[resolvedColor]
                : ui.idle,
          ),
          className,
        )}
        {...props}
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            toggle(event);
          }
        }}
      >
        <span
          className={cn(
            SWITCH_PRIMITIVES.thumb,
            SWITCH_SIZE_CLASSES[resolvedSize].thumb,
            ui.thumb,
            resolvedChecked && ui.thumbChecked?.[resolvedColor],
            resolvedChecked
              ? SWITCH_SIZE_CLASSES[resolvedSize].checked
              : SWITCH_SIZE_CLASSES[resolvedSize].unchecked,
          )}
        />
      </button>
      {hiddenInputProps ? (
        <input
          type="checkbox"
          hidden
          readOnly
          checked={resolvedChecked}
          {...hiddenInputProps}
        />
      ) : null}
    </>
  );

  if (!label) {
    return control;
  }

  return (
    <span className={cn("inline-flex items-center gap-3", containerClassName)}>
      {control}
      <Label htmlFor={resolvedId} className={labelClassName}>
        {label}
      </Label>
    </span>
  );
});

export { Switch };
export default Switch;
