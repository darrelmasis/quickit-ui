import { forwardRef } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";

const RADIO_THEME_CLASSES = {
  light: {
    ring: "border-slate-300 bg-white",
    focus: "peer-focus-visible:outline-slate-300",
    colors: {
      neutral: { ring: "peer-checked:border-slate-950", dot: "bg-slate-950" },
      primary: { ring: "peer-checked:border-blue-700", dot: "bg-blue-700" },
      success: { ring: "peer-checked:border-emerald-600", dot: "bg-emerald-600" },
      danger: { ring: "peer-checked:border-red-600", dot: "bg-red-600" },
      warning: { ring: "peer-checked:border-amber-500", dot: "bg-amber-500" },
      info: { ring: "peer-checked:border-sky-600", dot: "bg-sky-600" },
    },
    invalid: "border-red-400 peer-checked:border-red-600",
    invalidDot: "bg-red-600",
  },
  dark: {
    ring: "border-zinc-700 bg-zinc-950",
    focus: "peer-focus-visible:outline-zinc-700",
    colors: {
      neutral: { ring: "peer-checked:border-stone-100", dot: "bg-stone-100" },
      primary: { ring: "peer-checked:border-blue-300", dot: "bg-blue-300" },
      success: { ring: "peer-checked:border-emerald-300", dot: "bg-emerald-300" },
      danger: { ring: "peer-checked:border-red-300", dot: "bg-red-300" },
      warning: { ring: "peer-checked:border-amber-300", dot: "bg-amber-300" },
      info: { ring: "peer-checked:border-sky-300", dot: "bg-sky-300" },
    },
    invalid: "border-red-500/60 peer-checked:border-red-300",
    invalidDot: "bg-red-300",
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
    disabled = false,
    id,
    invalid = false,
    required = false,
    size = "md",
    ...props
  },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = RADIO_THEME_CLASSES[theme];
  const field = useFormControl();
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const resolvedColor = ui.colors[color] ? color : "neutral";
  const resolvedSize = RADIO_SIZE_CLASSES[size] ? size : "md";
  const sizeUi = RADIO_SIZE_CLASSES[resolvedSize];
  const describedBy = [
    props["aria-describedby"],
    field?.descriptionId,
    resolvedInvalid ? field?.messageId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <span className={cn("relative inline-flex shrink-0 cursor-pointer", sizeUi.root, className)}>
      <input
        ref={ref}
        type="radio"
        id={id ?? field?.controlId}
        required={resolvedRequired}
        disabled={resolvedDisabled}
        aria-invalid={resolvedInvalid || undefined}
        aria-describedby={describedBy}
        className="peer absolute inset-0 m-0 cursor-pointer appearance-none rounded-full opacity-0 disabled:cursor-not-allowed"
        {...props}
      />
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex items-center justify-center rounded-full border outline-none transition-[background-color,border-color,opacity] duration-200 peer-disabled:opacity-60 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-checked:[&>span]:scale-100",
          sizeUi.control,
          ui.ring,
          ui.focus,
          resolvedInvalid ? ui.invalid : ui.colors[resolvedColor].ring,
        )}
      >
        <span
          className={cn(
            "scale-0 rounded-full transition-transform duration-150",
            sizeUi.dot,
            resolvedInvalid ? ui.invalidDot : ui.colors[resolvedColor].dot,
          )}
        />
      </span>
    </span>
  );
});

export { Radio };
export default Radio;
