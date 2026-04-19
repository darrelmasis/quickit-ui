import { useId, useMemo } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { FormControlContext, useFormControl } from "./form-control-context";

const FORM_CONTROL_THEME_CLASSES = {
  light: {
    description: "text-slate-500",
    message: "text-rose-600",
  },
  dark: {
    description: "text-zinc-400",
    message: "text-rose-400",
  },
};

export function FormControl({
  children,
  className,
  disabled = false,
  id,
  invalid = false,
  required = false,
}) {
  const generatedId = useId();
  const controlId = id ?? `qi-control-${generatedId}`;
  const labelId = `qi-label-${generatedId}`;
  const descriptionId = `qi-description-${generatedId}`;
  const messageId = `qi-message-${generatedId}`;

  const value = useMemo(
    () => ({
      controlId,
      descriptionId,
      disabled,
      invalid,
      labelId,
      messageId,
      required,
    }),
    [
      controlId,
      descriptionId,
      disabled,
      invalid,
      labelId,
      messageId,
      required,
    ],
  );

  return (
    <FormControlContext.Provider value={value}>
      <div
        role="group"
        className={cn("flex flex-col gap-2", className)}
      >
        {children}
      </div>
    </FormControlContext.Provider>
  );
}

export function FormControlDescription({ children, className }) {
  const { descriptionId } = useFormControl() ?? {};
  const { theme } = useQuickitControlState("form-control-description");
  const ui = FORM_CONTROL_THEME_CLASSES[theme];

  return (
    <p
      id={descriptionId}
      className={cn("text-xs leading-relaxed", ui.description, className)}
    >
      {children}
    </p>
  );
}

export function FormControlErrorMessage({ children, className }) {
  const { invalid, messageId } = useFormControl() ?? {};
  const { theme } = useQuickitControlState("form-control-error-message");
  const ui = FORM_CONTROL_THEME_CLASSES[theme];

  if (!invalid) {
    return null;
  }

  return (
    <p
      id={messageId}
      role="alert"
      className={cn("text-xs font-medium leading-relaxed", ui.message, className)}
    >
      {children}
    </p>
  );
}

FormControl.Description = FormControlDescription;
FormControl.Message = FormControlErrorMessage;
FormControl.ErrorMessage = FormControlErrorMessage;

export {
  FormControlDescription as FormDescription,
  FormControlErrorMessage as FormMessage,
};
export default FormControl;
