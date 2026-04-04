import { useId, useMemo } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { FormControlContext, useFormControlContext } from "./form-control-context";

const FORM_CONTROL_THEME_CLASSES = {
  light: {
    description: "text-slate-500",
    message: "text-red-600",
  },
  dark: {
    description: "text-stone-400",
    message: "text-red-300",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

export function FormControl({
  children,
  className,
  disabled = false,
  id,
  invalid = false,
  required = false,
  ...props
}) {
  const generatedId = useId();
  const resolvedId = id ?? `quickit-field-${generatedId}`;

  const contextValue = useMemo(
    () => ({
      controlId: resolvedId,
      descriptionId: `${resolvedId}-description`,
      disabled,
      invalid,
      messageId: `${resolvedId}-message`,
      required,
    }),
    [disabled, invalid, required, resolvedId],
  );

  return (
    <FormControlContext.Provider value={contextValue}>
      <div className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </FormControlContext.Provider>
  );
}

export function FormDescription({ children, className, id, ...props }) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = FORM_CONTROL_THEME_CLASSES[theme];
  const field = useFormControlContext("FormDescription");

  return (
    <p
      id={id ?? field?.descriptionId}
      className={cn("text-sm leading-6", ui.description, className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function FormMessage({ children, className, id, ...props }) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = FORM_CONTROL_THEME_CLASSES[theme];
  const field = useFormControlContext("FormMessage");

  if (!children) {
    return null;
  }

  return (
    <p
      id={id ?? field?.messageId}
      className={cn("text-sm leading-6", ui.message, className)}
      {...props}
    >
      {children}
    </p>
  );
}
