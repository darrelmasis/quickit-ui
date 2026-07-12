import { forwardRef, useEffect, useId, useMemo, useState } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { FormControlContext, useFormControl } from "./form-control-context";

import { FORM_CONTROL_THEME_CLASSES } from "@/lib/theme/theme-classes";

const FormControl = forwardRef(function FormControl({
  children,
  className,
  controlId: controlIdProp,
  disabled = false,
  id,
  invalid = false,
  required = false,
  ...props
}, ref) {
  const generatedId = useId();
  const controlId = controlIdProp ?? `qi-control-${generatedId}`;
  const [labelId, setLabelId] = useState(null);
  const [descriptionId, setDescriptionId] = useState(null);
  const [messageId, setMessageId] = useState(null);

  const value = useMemo(
    () => ({
      controlId,
      descriptionId,
      disabled,
      invalid,
      labelId,
      messageId,
      required,
      setDescriptionId,
      setLabelId,
      setMessageId,
    }),
    [
      controlId,
      descriptionId,
      disabled,
      invalid,
      labelId,
      messageId,
      required,
      setDescriptionId,
      setLabelId,
      setMessageId,
    ],
  );

  return (
    <FormControlContext.Provider value={value}>
      <div
        ref={ref}
        id={id}
        role="group"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </FormControlContext.Provider>
  );
});

export const FormControlDescription = forwardRef(function FormControlDescription({ children, className, id, ...props }, ref) {
  const field = useFormControl();
  const generatedId = useId();
  const resolvedId = id ?? field?.descriptionId ?? `qi-description-${generatedId}`;
  const { theme } = useQuickitControlState("form-control-description");
  const ui = FORM_CONTROL_THEME_CLASSES[theme];

  useEffect(() => {
    if (!field) {
      return undefined;
    }

    field.setDescriptionId(resolvedId);

    return () => {
      field.setDescriptionId((currentId) =>
        currentId === resolvedId ? null : currentId,
      );
    };
  }, [field, resolvedId]);

  return (
    <p
      ref={ref}
      id={resolvedId}
      className={cn("text-xs leading-relaxed", ui.description, className)}
      {...props}
    >
      {children}
    </p>
  );
});

export const FormControlErrorMessage = forwardRef(function FormControlErrorMessage({ children, className, id, ...props }, ref) {
  const field = useFormControl();
  const generatedId = useId();
  const resolvedId = id ?? field?.messageId ?? `qi-message-${generatedId}`;
  const { theme } = useQuickitControlState("form-control-error-message");
  const ui = FORM_CONTROL_THEME_CLASSES[theme];

  useEffect(() => {
    if (!field) {
      return undefined;
    }

    field.setMessageId(resolvedId);

    return () => {
      field.setMessageId((currentId) =>
        currentId === resolvedId ? null : currentId,
      );
    };
  }, [field, resolvedId]);

  if (!field?.invalid) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={resolvedId}
      role="alert"
      className={cn("text-xs font-medium leading-relaxed", ui.message, className)}
      {...props}
    >
      {children}
    </p>
  );
});

FormControl.Description = FormControlDescription;
FormControl.Message = FormControlErrorMessage;
FormControl.ErrorMessage = FormControlErrorMessage;

export {
  FormControlDescription as FormDescription,
  FormControlErrorMessage as FormMessage,
};
export { FormControl };
export default FormControl;
