import { forwardRef, useId } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";
import { Label } from "@/lib/components/label";

const RADIO_THEME_CLASSES = {
  light: {
    ring: "border-slate-500 bg-slate-200/90 shadow-[0_1px_2px_rgba(15,23,42,0.09)] peer-hover:border-slate-700 peer-hover:bg-slate-100",
    focus: "peer-focus-visible:outline-slate-600",
    colors: {
      neutral: { ring: "peer-checked:border-slate-800", dot: "bg-slate-800" },
      slate: { ring: "peer-checked:border-slate-800", dot: "bg-slate-800" },
      zinc: { ring: "peer-checked:border-zinc-800", dot: "bg-zinc-800" },
      primary: { ring: "peer-checked:border-sky-600", dot: "bg-sky-600" },
      brand: { ring: "peer-checked:border-brand-600", dot: "bg-brand-600" },
      success: { ring: "peer-checked:border-emerald-600", dot: "bg-emerald-600" },
      danger: { ring: "peer-checked:border-rose-600", dot: "bg-rose-600" },
      warning: { ring: "peer-checked:border-amber-500", dot: "bg-amber-500" },
      info: { ring: "peer-checked:border-cyan-600", dot: "bg-cyan-600" },
      light: { ring: "peer-checked:border-stone-300", dot: "bg-stone-300" },
      dark: { ring: "peer-checked:border-zinc-900", dot: "bg-zinc-900" },
      black: { ring: "peer-checked:border-slate-950", dot: "bg-slate-950" },
    },
    invalid: "border-rose-400 peer-checked:border-rose-600",
    invalidDot: "bg-rose-600",
  },
  dark: {
    ring: "border-zinc-700 bg-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,0.34)] peer-hover:border-zinc-600 peer-hover:bg-zinc-900",
    focus: "peer-focus-visible:outline-zinc-500",
    colors: {
      neutral: { ring: "peer-checked:border-zinc-100", dot: "bg-zinc-100" },
      slate: { ring: "peer-checked:border-slate-100", dot: "bg-slate-100" },
      zinc: { ring: "peer-checked:border-zinc-100", dot: "bg-zinc-100" },
      primary: { ring: "peer-checked:border-sky-300", dot: "bg-sky-300" },
      brand: { ring: "peer-checked:border-brand-300", dot: "bg-brand-300" },
      success: { ring: "peer-checked:border-emerald-300", dot: "bg-emerald-300" },
      danger: { ring: "peer-checked:border-rose-300", dot: "bg-rose-300" },
      warning: { ring: "peer-checked:border-amber-300", dot: "bg-amber-300" },
      info: { ring: "peer-checked:border-cyan-300", dot: "bg-cyan-300" },
      light: { ring: "peer-checked:border-stone-200", dot: "bg-stone-200" },
      dark: { ring: "peer-checked:border-zinc-300", dot: "bg-zinc-300" },
      black: { ring: "peer-checked:border-white", dot: "bg-white" },
    },
    invalid: "border-rose-500/70 peer-checked:border-rose-300",
    invalidDot: "bg-rose-300",
  },
};

const RADIO_SIZE_CLASSES = {
  sm: {
    root: "size-3.5",
    control: "size-3.5",
    dot: "size-1.5",
  },
  md: {
    root: "size-4",
    control: "size-4",
    dot: "size-2",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

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
    onChange,
    onCheckedChange,
    required = false,
    size = "md",
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const theme = resolveTheme(useQuickitTheme());
  const ui = RADIO_THEME_CLASSES[theme];
  const field = useFormControl();
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const resolvedColor = ui.colors[color] ? color : "neutral";
  const resolvedSize = RADIO_SIZE_CLASSES[size] ? size : "md";
  const sizeUi = RADIO_SIZE_CLASSES[resolvedSize];
  const resolvedId = id ?? field?.controlId ?? generatedId;
  const describedBy = [
    props["aria-describedby"],
    field?.descriptionId,
    resolvedInvalid ? field?.messageId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const control = (
    <span className={cn("relative inline-flex shrink-0 cursor-pointer", sizeUi.root, className)}>
      <input
        ref={ref}
        type="radio"
        id={resolvedId}
        required={resolvedRequired}
        disabled={resolvedDisabled}
        aria-invalid={resolvedInvalid || undefined}
        aria-describedby={describedBy}
        className="peer absolute inset-0 z-10 m-0 cursor-pointer appearance-none rounded-full opacity-0 disabled:cursor-not-allowed"
        onChange={(event) => {
          onChange?.(event);
          onCheckedChange?.(event.target.checked, event);
        }}
        {...props}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-flex items-center justify-center rounded-full border outline-none transition-[background-color,border-color,opacity] duration-200 peer-disabled:opacity-60 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-checked:[&>span]:scale-100",
          sizeUi.control,
          ui.ring,
          ui.focus,
          resolvedInvalid ? ui.invalid : ui.colors[resolvedColor].ring,
        )}
      >
        <span
          className={cn(
            "pointer-events-none scale-0 rounded-full transition-transform duration-150",
            sizeUi.dot,
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
    <span className={cn("inline-flex items-center gap-3", containerClassName)}>
      {control}
      <Label htmlFor={resolvedId} className={labelClassName}>
        {label}
      </Label>
    </span>
  );
});

export { Radio };
export default Radio;
