import { forwardRef } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn, getControlRadius } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";

const INPUT_PRIMITIVES = {
  base: [
    "w-full border bg-transparent text-sm outline-none",
    "transition-[background-color,border-color,color] duration-200",
    "placeholder:text-current/45",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" "),
};

const INPUT_SIZE_CLASSES = {
  sm: "h-9 px-3",
  md: "h-11 px-3.5",
  lg: "h-12 px-4 text-base",
};

const INPUT_THEME_CLASSES = {
  light: {
    base: "border-slate-200 bg-white text-slate-950 focus-visible:outline-slate-300",
    hover: "hover:border-slate-300",
    invalid: "border-red-300 text-red-700 focus-visible:outline-red-300",
  },
  dark: {
    base: "border-zinc-800 bg-zinc-950 text-stone-50 focus-visible:outline-zinc-700",
    hover: "hover:border-zinc-700",
    invalid: "border-red-500/60 text-stone-50 focus-visible:outline-red-400",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

const Input = forwardRef(function Input(
  { className, disabled = false, id, invalid = false, required = false, size = "md", ...props },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = INPUT_THEME_CLASSES[theme];
  const field = useFormControl();
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const describedBy = [
    props["aria-describedby"],
    field?.descriptionId,
    resolvedInvalid ? field?.messageId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <input
      ref={ref}
      id={id ?? field?.controlId}
      required={resolvedRequired}
      disabled={resolvedDisabled}
      aria-invalid={resolvedInvalid || undefined}
      aria-describedby={describedBy}
      className={cn(
        INPUT_PRIMITIVES.base,
        getControlRadius(size),
        INPUT_SIZE_CLASSES[size] ?? INPUT_SIZE_CLASSES.md,
        resolvedInvalid ? ui.invalid : ui.base,
        !resolvedDisabled && ui.hover,
        className,
      )}
      {...props}
    />
  );
});

export { Input };
export default Input;
