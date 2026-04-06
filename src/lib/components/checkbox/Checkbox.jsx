import { forwardRef, useId } from "react";
import { useQuickitFocusRing, useQuickitTheme } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";
import { Label } from "@/lib/components/label";

const CHECKBOX_SIZE_CLASSES = {
  sm: {
    root: "size-4",
    box: "size-4 rounded-[0.35rem]",
    icon: "size-3",
  },
  md: {
    root: "size-5",
    box: "size-5 rounded-[0.45rem]",
    icon: "size-3.5",
  },
};

const CHECKBOX_THEME_CLASSES = {
  light: {
    box: "border-slate-500 bg-slate-200/90 shadow-[0_1px_2px_rgba(15,23,42,0.09)] peer-hover:border-slate-700 peer-hover:bg-slate-100",
    focus:
      "peer-focus-visible:outline-slate-700 peer-focus-visible:ring-slate-400/35 peer-focus-visible:ring-offset-stone-50",
    colors: {
      neutral: {
        box: "peer-checked:border-slate-800 peer-checked:bg-slate-800 peer-hover:peer-checked:border-slate-950 peer-hover:peer-checked:bg-slate-950",
        icon: "text-white",
      },
      slate: {
        box: "peer-checked:border-slate-800 peer-checked:bg-slate-800 peer-hover:peer-checked:border-slate-950 peer-hover:peer-checked:bg-slate-950",
        icon: "text-white",
      },
      zinc: {
        box: "peer-checked:border-zinc-800 peer-checked:bg-zinc-800 peer-hover:peer-checked:border-zinc-950 peer-hover:peer-checked:bg-zinc-950",
        icon: "text-white",
      },
      primary: {
        box: "peer-checked:border-sky-600 peer-checked:bg-sky-600 peer-hover:peer-checked:border-sky-700 peer-hover:peer-checked:bg-sky-700",
        icon: "text-white",
      },
      brand: {
        box: "peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-hover:peer-checked:border-brand-700 peer-hover:peer-checked:bg-brand-700",
        icon: "text-white",
      },
      success: {
        box: "peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-hover:peer-checked:border-emerald-700 peer-hover:peer-checked:bg-emerald-700",
        icon: "text-white",
      },
      danger: {
        box: "peer-checked:border-rose-600 peer-checked:bg-rose-600 peer-hover:peer-checked:border-rose-700 peer-hover:peer-checked:bg-rose-700",
        icon: "text-white",
      },
      warning: {
        box: "peer-checked:border-amber-500 peer-checked:bg-amber-500 peer-hover:peer-checked:border-amber-600 peer-hover:peer-checked:bg-amber-600",
        icon: "text-slate-950",
      },
      info: {
        box: "peer-checked:border-cyan-600 peer-checked:bg-cyan-600 peer-hover:peer-checked:border-cyan-700 peer-hover:peer-checked:bg-cyan-700",
        icon: "text-white",
      },
      light: {
        box: "peer-checked:border-stone-200 peer-checked:bg-stone-200 peer-hover:peer-checked:border-stone-300 peer-hover:peer-checked:bg-stone-300",
        icon: "text-stone-950",
      },
      dark: {
        box: "peer-checked:border-zinc-900 peer-checked:bg-zinc-900 peer-hover:peer-checked:border-black peer-hover:peer-checked:bg-black",
        icon: "text-white",
      },
      black: {
        box: "peer-checked:border-slate-950 peer-checked:bg-slate-950 peer-hover:peer-checked:border-black peer-hover:peer-checked:bg-black",
        icon: "text-white",
      },
    },
    invalid: "border-rose-400 peer-checked:border-rose-600 peer-checked:bg-rose-600 peer-hover:peer-checked:border-rose-700 peer-hover:peer-checked:bg-rose-700",
    invalidIcon: "text-white",
  },
  dark: {
    box: "border-zinc-700 bg-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,0.34)] peer-hover:border-zinc-600 peer-hover:bg-zinc-900",
    focus:
      "peer-focus-visible:outline-zinc-400 peer-focus-visible:ring-zinc-400/35 peer-focus-visible:ring-offset-[#09090b]",
    colors: {
      neutral: {
        box: "peer-checked:border-zinc-100 peer-checked:bg-zinc-100 peer-hover:peer-checked:border-white peer-hover:peer-checked:bg-white",
        icon: "text-zinc-950",
      },
      slate: {
        box: "peer-checked:border-slate-100 peer-checked:bg-slate-100 peer-hover:peer-checked:border-white peer-hover:peer-checked:bg-white",
        icon: "text-slate-950",
      },
      zinc: {
        box: "peer-checked:border-zinc-100 peer-checked:bg-zinc-100 peer-hover:peer-checked:border-white peer-hover:peer-checked:bg-white",
        icon: "text-zinc-950",
      },
      primary: {
        box: "peer-checked:border-sky-300 peer-checked:bg-sky-300 peer-hover:peer-checked:border-sky-200 peer-hover:peer-checked:bg-sky-200",
        icon: "text-zinc-950",
      },
      brand: {
        box: "peer-checked:border-brand-300 peer-checked:bg-brand-300 peer-hover:peer-checked:border-brand-200 peer-hover:peer-checked:bg-brand-200",
        icon: "text-zinc-950",
      },
      success: {
        box: "peer-checked:border-emerald-300 peer-checked:bg-emerald-300 peer-hover:peer-checked:border-emerald-200 peer-hover:peer-checked:bg-emerald-200",
        icon: "text-zinc-950",
      },
      danger: {
        box: "peer-checked:border-rose-300 peer-checked:bg-rose-300 peer-hover:peer-checked:border-rose-200 peer-hover:peer-checked:bg-rose-200",
        icon: "text-zinc-950",
      },
      warning: {
        box: "peer-checked:border-amber-300 peer-checked:bg-amber-300 peer-hover:peer-checked:border-amber-200 peer-hover:peer-checked:bg-amber-200",
        icon: "text-zinc-950",
      },
      info: {
        box: "peer-checked:border-cyan-300 peer-checked:bg-cyan-300 peer-hover:peer-checked:border-cyan-200 peer-hover:peer-checked:bg-cyan-200",
        icon: "text-zinc-950",
      },
      light: {
        box: "peer-checked:border-stone-200 peer-checked:bg-stone-200 peer-hover:peer-checked:border-stone-100 peer-hover:peer-checked:bg-stone-100",
        icon: "text-zinc-950",
      },
      dark: {
        box: "peer-checked:border-zinc-300 peer-checked:bg-zinc-300 peer-hover:peer-checked:border-zinc-200 peer-hover:peer-checked:bg-zinc-200",
        icon: "text-zinc-950",
      },
      black: {
        box: "peer-checked:border-white peer-checked:bg-white peer-hover:peer-checked:border-stone-100 peer-hover:peer-checked:bg-stone-100",
        icon: "text-zinc-950",
      },
    },
    invalid: "border-rose-500/70 peer-checked:border-rose-300 peer-checked:bg-rose-300 peer-hover:peer-checked:border-rose-200 peer-hover:peer-checked:bg-rose-200",
    invalidIcon: "text-zinc-950",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

const Checkbox = forwardRef(function Checkbox(
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
  const focusRingEnabled = useQuickitFocusRing("checkbox");
  const ui = CHECKBOX_THEME_CLASSES[theme];
  const field = useFormControl();
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const resolvedColor = ui.colors[color] ? color : "neutral";
  const resolvedSize = CHECKBOX_SIZE_CLASSES[size] ? size : "md";
  const resolvedId = id ?? field?.controlId ?? generatedId;
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
        CHECKBOX_SIZE_CLASSES[resolvedSize].root,
        className,
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        id={resolvedId}
        required={resolvedRequired}
        disabled={resolvedDisabled}
        aria-invalid={resolvedInvalid || undefined}
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
            "pointer-events-none inline-flex items-center justify-center border outline-none transition-[background-color,border-color,opacity,box-shadow] duration-200 peer-disabled:opacity-60 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:ring-4 peer-focus-visible:ring-offset-2 peer-checked:[&_svg]:opacity-100",
          ),
          CHECKBOX_SIZE_CLASSES[resolvedSize].box,
          ui.box,
          resolveQuickitFocusRingClasses(focusRingEnabled, ui.focus),
          resolvedInvalid ? ui.invalid : ui.colors[resolvedColor].box,
        )}
      >
        <svg
          viewBox="0 0 16 16"
          className={cn(
            "pointer-events-none opacity-0 transition-opacity duration-150",
            CHECKBOX_SIZE_CLASSES[resolvedSize].icon,
            resolvedInvalid ? ui.invalidIcon : ui.colors[resolvedColor].icon,
          )}
          fill="none"
        >
          <path
            d="M4 8.5 6.5 11 12 5.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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

export { Checkbox };
export default Checkbox;
