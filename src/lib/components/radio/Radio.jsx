import { forwardRef, useId } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";
import { Label } from "@/lib/components/label";

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

const RADIO_THEME_CLASSES = {
  light: {
    box: "border-slate-300 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] peer-hover:border-slate-400 peer-hover:bg-slate-50",
    focus:
      "peer-focus-visible:outline-slate-500 peer-focus-visible:ring-slate-400/45 peer-focus-visible:ring-offset-white",
    colors: {
      neutral: {
        box: "peer-checked:border-slate-700 peer-checked:bg-slate-700 peer-hover:peer-checked:border-slate-800 peer-hover:peer-checked:bg-slate-800",
        dot: "bg-white",
      },
      slate: {
        box: "peer-checked:border-slate-700 peer-checked:bg-slate-700 peer-hover:peer-checked:border-slate-800 peer-hover:peer-checked:bg-slate-800",
        dot: "bg-white",
      },
      zinc: {
        box: "peer-checked:border-zinc-700 peer-checked:bg-zinc-700 peer-hover:peer-checked:border-zinc-800 peer-hover:peer-checked:bg-zinc-800",
        dot: "bg-white",
      },
      primary: {
        box: "peer-checked:border-sky-600 peer-checked:bg-sky-600 peer-hover:peer-checked:border-sky-700 peer-hover:peer-checked:bg-sky-700",
        dot: "bg-white",
      },
      brand: {
        box: "peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-hover:peer-checked:border-brand-700 peer-hover:peer-checked:bg-brand-700",
        dot: "bg-white",
      },
      success: {
        box: "peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-hover:peer-checked:border-emerald-700 peer-hover:peer-checked:bg-emerald-700",
        dot: "bg-white",
      },
      danger: {
        box: "peer-checked:border-rose-600 peer-checked:bg-rose-600 peer-hover:peer-checked:border-rose-700 peer-hover:peer-checked:bg-rose-700",
        dot: "bg-white",
      },
      warning: {
        box: "peer-checked:border-amber-500 peer-checked:bg-amber-500 peer-hover:peer-checked:border-amber-600 peer-hover:peer-checked:bg-amber-600",
        dot: "bg-slate-950",
      },
      info: {
        box: "peer-checked:border-cyan-600 peer-checked:bg-cyan-600 peer-hover:peer-checked:border-cyan-700 peer-hover:peer-checked:bg-cyan-700",
        dot: "bg-white",
      },
      light: {
        box: "peer-checked:border-stone-200 peer-checked:bg-stone-200 peer-hover:peer-checked:border-stone-300 peer-hover:peer-checked:bg-stone-300",
        dot: "bg-stone-950",
      },
      dark: {
        box: "peer-checked:border-zinc-800 peer-checked:bg-zinc-800 peer-hover:peer-checked:border-zinc-900 peer-hover:peer-checked:bg-zinc-900",
        dot: "bg-white",
      },
      black: {
        box: "peer-checked:border-slate-950 peer-checked:bg-slate-950 peer-hover:peer-checked:border-black peer-hover:peer-checked:bg-black",
        dot: "bg-white",
      },
    },
    invalid: "border-rose-300 peer-checked:border-rose-600 peer-checked:bg-rose-600 peer-hover:peer-checked:border-rose-700 peer-hover:peer-checked:bg-rose-700",
    invalidDot: "bg-white",
  },
  dark: {
    box: "border-zinc-700 bg-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,0.34)] peer-hover:border-zinc-600 peer-hover:bg-zinc-900",
    focus:
      "peer-focus-visible:outline-zinc-400 peer-focus-visible:ring-zinc-400/35 peer-focus-visible:ring-offset-[#09090b]",
    colors: {
      neutral: {
        box: "peer-checked:border-zinc-100 peer-checked:bg-zinc-100 peer-hover:peer-checked:border-white peer-hover:peer-checked:bg-white",
        dot: "bg-zinc-950",
      },
      slate: {
        box: "peer-checked:border-slate-100 peer-checked:bg-slate-100 peer-hover:peer-checked:border-white peer-hover:peer-checked:bg-white",
        dot: "bg-slate-950",
      },
      zinc: {
        box: "peer-checked:border-zinc-100 peer-checked:bg-zinc-100 peer-hover:peer-checked:border-white peer-hover:peer-checked:bg-white",
        dot: "bg-zinc-950",
      },
      primary: {
        box: "peer-checked:border-sky-300 peer-checked:bg-sky-300 peer-hover:peer-checked:border-sky-200 peer-hover:peer-checked:bg-sky-200",
        dot: "bg-zinc-950",
      },
      brand: {
        box: "peer-checked:border-brand-300 peer-checked:bg-brand-300 peer-hover:peer-checked:border-brand-200 peer-hover:peer-checked:border-brand-200",
        dot: "bg-zinc-950",
      },
      success: {
        box: "peer-checked:border-emerald-300 peer-checked:bg-emerald-300 peer-hover:peer-checked:border-emerald-200 peer-hover:peer-checked:border-emerald-200",
        dot: "bg-zinc-950",
      },
      danger: {
        box: "peer-checked:border-rose-300 peer-checked:bg-rose-300 peer-hover:peer-checked:border-rose-200 peer-hover:peer-checked:border-rose-200",
        dot: "bg-zinc-950",
      },
      warning: {
        box: "peer-checked:border-amber-300 peer-checked:bg-amber-300 peer-hover:peer-checked:border-amber-200 peer-hover:peer-checked:border-amber-200",
        dot: "bg-zinc-950",
      },
      info: {
        box: "peer-checked:border-cyan-300 peer-checked:bg-cyan-300 peer-hover:peer-checked:border-cyan-200 peer-hover:peer-checked:border-cyan-200",
        dot: "bg-zinc-950",
      },
      light: {
        box: "peer-checked:border-stone-200 peer-checked:bg-stone-200 peer-hover:peer-checked:border-stone-100 peer-hover:peer-checked:border-stone-100",
        dot: "bg-zinc-950",
      },
      dark: {
        box: "peer-checked:border-zinc-300 peer-checked:bg-zinc-300 peer-hover:peer-checked:border-zinc-200 peer-hover:peer-checked:border-zinc-200",
        dot: "bg-zinc-950",
      },
      black: {
        box: "peer-checked:border-white peer-checked:bg-white peer-hover:peer-checked:border-stone-100 peer-hover:peer-checked:border-stone-100",
        dot: "bg-zinc-950",
      },
    },
    invalid: "border-rose-500/70 peer-checked:border-rose-300 peer-checked:bg-rose-300 peer-hover:peer-checked:border-rose-200 peer-hover:peer-checked:border-rose-200",
    invalidDot: "bg-zinc-950",
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
