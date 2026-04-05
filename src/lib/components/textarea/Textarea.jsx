import { forwardRef } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn, getControlRadius } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";

const TEXTAREA_PRIMITIVES = {
  base: [
    "w-full border bg-transparent px-3.5 py-3 text-sm outline-none",
    "transition-[background-color,border-color,color,box-shadow] duration-200",
    "placeholder:text-current/45",
    "focus-visible:ring-4 focus-visible:ring-offset-0",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" "),
};

const TEXTAREA_THEME_CLASSES = {
  light: {
    base: "border-slate-200 bg-white text-slate-950 focus-visible:border-slate-300 focus-visible:ring-slate-200/70",
    hover: "hover:border-slate-300",
    invalid: "border-red-300 text-red-700 focus-visible:border-red-400 focus-visible:ring-red-200/70",
  },
  dark: {
    base: "border-zinc-800 bg-zinc-950 text-stone-50 focus-visible:border-zinc-700 focus-visible:ring-zinc-800/80",
    hover: "hover:border-zinc-700",
    invalid: "border-red-500/60 text-stone-50 focus-visible:border-red-400/80 focus-visible:ring-red-500/20",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

const Textarea = forwardRef(function Textarea(
  {
    className,
    disabled = false,
    id,
    invalid = false,
    minRows = 4,
    required = false,
    ...props
  },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = TEXTAREA_THEME_CLASSES[theme];
  const field = useFormControl();
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const describedBy =
    [
      props["aria-describedby"],
      field?.descriptionId,
      resolvedInvalid ? field?.messageId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <textarea
      ref={ref}
      id={id ?? field?.controlId}
      required={resolvedRequired}
      disabled={resolvedDisabled}
      aria-invalid={resolvedInvalid || undefined}
      aria-describedby={describedBy}
      field-sizing="content"
      rows={minRows}
      className={cn(
        TEXTAREA_PRIMITIVES.base,
        getControlRadius("md"),
        "min-h-28",
        resolvedInvalid ? ui.invalid : ui.base,
        !resolvedDisabled && ui.hover,
        className,
      )}
      {...props}
    />
  );
});

export { Textarea };
export default Textarea;
