import { forwardRef } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";

const LABEL_THEME_CLASSES = {
  light: {
    base: "text-slate-950",
    muted: "text-red-600",
  },
  dark: {
    base: "text-stone-50",
    muted: "text-red-300",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

const Label = forwardRef(function Label(
  {
    children,
    className,
    htmlFor,
    optional = false,
    requiredIndicator = true,
    ...props
  },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = LABEL_THEME_CLASSES[theme];
  const field = useFormControl();
  const showRequiredIndicator =
    requiredIndicator && field?.required && !optional;

  return (
    <label
      ref={ref}
      htmlFor={htmlFor ?? field?.controlId}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium leading-6",
        field?.disabled && "cursor-not-allowed opacity-60",
        ui.base,
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {showRequiredIndicator ? (
        <span aria-hidden="true" className={ui.muted}>
          *
        </span>
      ) : null}
      {optional ? (
        <span className="text-xs font-medium opacity-70">(Opcional)</span>
      ) : null}
    </label>
  );
});

export { Label };
export default Label;
