import { forwardRef, useId } from "react";
import { useQuickitTheme } from "@/lib/theme";
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
    box: "border-slate-300 bg-white",
    focus: "peer-focus-visible:outline-slate-300",
    colors: {
      neutral: {
        box: "peer-checked:border-neutral-950 peer-checked:bg-neutral-950",
        icon: "text-white",
      },
      primary: {
        box: "peer-checked:border-blue-700 peer-checked:bg-blue-700",
        icon: "text-white",
      },
      brand: {
        box: "peer-checked:border-brand-700 peer-checked:bg-brand-700",
        icon: "text-white",
      },
      success: {
        box: "peer-checked:border-emerald-600 peer-checked:bg-emerald-600",
        icon: "text-white",
      },
      danger: {
        box: "peer-checked:border-red-600 peer-checked:bg-red-600",
        icon: "text-white",
      },
      warning: {
        box: "peer-checked:border-amber-400 peer-checked:bg-amber-400",
        icon: "text-slate-950",
      },
      info: {
        box: "peer-checked:border-sky-600 peer-checked:bg-sky-600",
        icon: "text-white",
      },
    },
    invalid: "border-red-400 peer-checked:border-red-600 peer-checked:bg-red-600",
    invalidIcon: "text-white",
  },
  dark: {
    box: "border-zinc-700 bg-zinc-950",
    focus: "peer-focus-visible:outline-zinc-700",
    colors: {
      neutral: {
        box: "peer-checked:border-neutral-100 peer-checked:bg-neutral-100",
        icon: "text-neutral-950",
      },
      primary: {
        box: "peer-checked:border-blue-300 peer-checked:bg-blue-300",
        icon: "text-zinc-950",
      },
      brand: {
        box: "peer-checked:border-brand-300 peer-checked:bg-brand-300",
        icon: "text-zinc-950",
      },
      success: {
        box: "peer-checked:border-emerald-300 peer-checked:bg-emerald-300",
        icon: "text-zinc-950",
      },
      danger: {
        box: "peer-checked:border-red-300 peer-checked:bg-red-300",
        icon: "text-zinc-950",
      },
      warning: {
        box: "peer-checked:border-amber-300 peer-checked:bg-amber-300",
        icon: "text-zinc-950",
      },
      info: {
        box: "peer-checked:border-sky-300 peer-checked:bg-sky-300",
        icon: "text-zinc-950",
      },
    },
    invalid: "border-red-500/60 peer-checked:border-red-300 peer-checked:bg-red-300",
    invalidIcon: "text-neutral-950",
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
          "pointer-events-none inline-flex items-center justify-center border outline-none transition-[background-color,border-color,opacity] duration-200 peer-disabled:opacity-60 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-checked:[&_svg]:opacity-100",
          CHECKBOX_SIZE_CLASSES[resolvedSize].box,
          ui.box,
          ui.focus,
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
