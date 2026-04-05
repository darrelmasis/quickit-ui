import { forwardRef, useMemo, useState } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";

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
    thumb: "size-4",
    checked: "translate-x-4",
    unchecked: "translate-x-0.5",
  },
  md: {
    root: "h-6 w-11",
    thumb: "size-5",
    checked: "translate-x-5",
    unchecked: "translate-x-0.5",
  },
};

const SWITCH_THEME_CLASSES = {
  light: {
    idle: "border-slate-300 bg-slate-200 focus-visible:outline-slate-300",
    checked: {
      neutral: "border-slate-950 bg-slate-950",
      primary: "border-blue-700 bg-blue-700",
      success: "border-emerald-600 bg-emerald-600",
      danger: "border-red-600 bg-red-600",
      warning: "border-amber-500 bg-amber-500",
      info: "border-sky-600 bg-sky-600",
    },
    thumb: "border-white bg-white",
  },
  dark: {
    idle: "border-zinc-700 bg-zinc-800 focus-visible:outline-zinc-700",
    checked: {
      neutral: "border-stone-100 bg-stone-100 text-zinc-950",
      primary: "border-blue-300 bg-blue-300 text-zinc-950",
      success: "border-emerald-300 bg-emerald-300 text-zinc-950",
      danger: "border-red-300 bg-red-300 text-zinc-950",
      warning: "border-amber-300 bg-amber-300 text-zinc-950",
      info: "border-sky-300 bg-sky-300 text-zinc-950",
    },
    thumb: "border-zinc-950 bg-zinc-950",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

const Switch = forwardRef(function Switch(
  {
    checked,
    className,
    color = "neutral",
    defaultChecked = false,
    disabled = false,
    id,
    invalid = false,
    name,
    onCheckedChange,
    required = false,
    size = "md",
    value = "on",
    ...props
  },
  ref,
) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const resolvedChecked = isControlled ? checked : internalChecked;
  const theme = resolveTheme(useQuickitTheme());
  const ui = SWITCH_THEME_CLASSES[theme];
  const field = useFormControl();
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedColor = ui.checked[color] ? color : "neutral";
  const resolvedSize = SWITCH_SIZE_CLASSES[size] ? size : "md";
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

  const toggle = () => {
    if (resolvedDisabled) {
      return;
    }

    const nextValue = !resolvedChecked;

    if (!isControlled) {
      setInternalChecked(nextValue);
    }

    onCheckedChange?.(nextValue);
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        role="switch"
        id={id ?? field?.controlId}
        aria-checked={resolvedChecked}
        aria-invalid={resolvedInvalid || undefined}
        aria-describedby={describedBy}
        disabled={resolvedDisabled}
        data-state={resolvedChecked ? "checked" : "unchecked"}
        className={cn(
          SWITCH_PRIMITIVES.root,
          SWITCH_SIZE_CLASSES[resolvedSize].root,
          resolvedChecked ? ui.checked[resolvedColor] : ui.idle,
          className,
        )}
        onClick={toggle}
        {...props}
      >
        <span
          className={cn(
            SWITCH_PRIMITIVES.thumb,
            SWITCH_SIZE_CLASSES[resolvedSize].thumb,
            ui.thumb,
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
});

export { Switch };
export default Switch;
