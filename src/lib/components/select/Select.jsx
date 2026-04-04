import { forwardRef } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn, getControlRadius } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";

const SELECT_PRIMITIVES = {
  wrapper: "relative w-full",
  field: [
    "w-full appearance-none border bg-transparent px-3.5 pr-10 text-sm outline-none",
    "transition-[background-color,border-color,color] duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" "),
  icon:
    "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-current/55",
};

const SELECT_SIZE_CLASSES = {
  sm: "h-9",
  md: "h-11",
  lg: "h-12 text-base",
};

const SELECT_THEME_CLASSES = {
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

const Select = forwardRef(function Select(
  { children, className, disabled = false, id, invalid = false, required = false, size = "md", ...props },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = SELECT_THEME_CLASSES[theme];
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
    <span className={SELECT_PRIMITIVES.wrapper}>
      <select
        ref={ref}
        id={id ?? field?.controlId}
        required={resolvedRequired}
        disabled={resolvedDisabled}
        aria-invalid={resolvedInvalid || undefined}
        aria-describedby={describedBy}
        className={cn(
          SELECT_PRIMITIVES.field,
          getControlRadius(size),
          SELECT_SIZE_CLASSES[size] ?? SELECT_SIZE_CLASSES.md,
          resolvedInvalid ? ui.invalid : ui.base,
          !resolvedDisabled && ui.hover,
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <span className={SELECT_PRIMITIVES.icon} aria-hidden="true">
        <svg viewBox="0 0 20 20" className="size-4 fill-current">
          <path d="M5.75 7.75 10 12l4.25-4.25 1.06 1.06-5.31 5.31-5.31-5.31 1.06-1.06Z" />
        </svg>
      </span>
    </span>
  );
});

export { Select };
export default Select;
