import { forwardRef, useId, useMemo, useState } from "react";
import { useQuickitFocusRing, useQuickitTheme } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";
import { Label } from "@/lib/components/label";

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

const SWITCH_THEME_CLASSES = {
  light: {
    idle: "border-slate-500 bg-slate-400/95 hover:border-slate-700 hover:bg-slate-500 focus-visible:outline-slate-600",
    checked: {
      neutral: "border-slate-800 bg-slate-800",
      slate: "border-slate-800 bg-slate-800",
      zinc: "border-zinc-800 bg-zinc-800",
      primary: "border-sky-600 bg-sky-600",
      brand: "border-brand-600 bg-brand-600",
      success: "border-emerald-600 bg-emerald-600",
      danger: "border-rose-600 bg-rose-600",
      warning: "border-amber-500 bg-amber-500",
      info: "border-cyan-600 bg-cyan-600",
      light: "border-stone-300 bg-stone-300",
      dark: "border-zinc-900 bg-zinc-900",
      black: "border-slate-950 bg-slate-950",
    },
    invalid: "border-rose-400 bg-rose-100/80 focus-visible:outline-rose-400",
    thumb: "border-white/90 bg-white shadow-[0_1px_1px_rgba(15,23,42,0.18)]",
    thumbChecked: {
      warning: "border-slate-950 bg-slate-950",
      light: "border-slate-950 bg-slate-950",
    },
  },
  dark: {
    idle: "border-zinc-700 bg-zinc-900/95 hover:border-zinc-600 hover:bg-zinc-900 focus-visible:outline-zinc-500",
    checked: {
      neutral: "border-zinc-100 bg-zinc-100 text-zinc-950",
      slate: "border-slate-100 bg-slate-100 text-slate-950",
      zinc: "border-zinc-100 bg-zinc-100 text-zinc-950",
      primary: "border-sky-300 bg-sky-300 text-zinc-950",
      brand: "border-brand-300 bg-brand-300 text-zinc-950",
      success: "border-emerald-300 bg-emerald-300 text-zinc-950",
      danger: "border-rose-300 bg-rose-300 text-zinc-950",
      warning: "border-amber-300 bg-amber-300 text-zinc-950",
      info: "border-cyan-300 bg-cyan-300 text-zinc-950",
      light: "border-stone-200 bg-stone-200 text-zinc-950",
      dark: "border-zinc-300 bg-zinc-300 text-zinc-950",
      black: "border-zinc-950 bg-zinc-950 text-white",
    },
    invalid: "border-rose-500/70 bg-rose-500/18 focus-visible:outline-rose-400",
    thumb: "border-zinc-300/70 bg-zinc-100 shadow-[0_1px_1px_rgba(0,0,0,0.32)]",
    thumbChecked: {
      black: "border-white bg-white",
      neutral: "border-zinc-950 bg-zinc-950",
      zinc: "border-zinc-950 bg-zinc-950",
      primary: "border-zinc-950 bg-zinc-950",
      brand: "border-zinc-950 bg-zinc-950",
      success: "border-zinc-950 bg-zinc-950",
      danger: "border-zinc-950 bg-zinc-950",
      warning: "border-zinc-950 bg-zinc-950",
      info: "border-zinc-950 bg-zinc-950",
      light: "border-zinc-950 bg-zinc-950",
      slate: "border-zinc-950 bg-zinc-950",
      dark: "border-zinc-950 bg-zinc-950",
    },
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

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
  const theme = resolveTheme(useQuickitTheme());
  const focusRingEnabled = useQuickitFocusRing("switch");
  const ui = SWITCH_THEME_CLASSES[theme];
  const field = useFormControl();
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedColor = ui.checked[color] ? color : "neutral";
  const resolvedSize = SWITCH_SIZE_CLASSES[size] ? size : "md";
  const resolvedId = id ?? field?.controlId ?? generatedId;
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

    onCheckedChange?.(nextValue);
    onChange?.(
      createCheckedChangeEvent({
        checked: nextValue,
        id: resolvedId,
        name,
        nativeEvent,
        value,
      }),
    );
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
