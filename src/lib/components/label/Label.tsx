import { forwardRef, useEffect, useId } from "react";
import { useFormControl } from "@/lib/components/form-control/useFormControl";
import { useQuickitControlState } from "@/lib/theme";
import { LABEL_THEME_CLASSES } from "@/lib/theme/theme-classes";
import { cn } from "@/lib/utils";

const LABEL_SIZE_CLASSES = {
  sm: "text-xs px-0.5",
  md: "text-[0.85rem] px-0.5",
};

const Label = forwardRef(function Label(
  {
    children,
    className,
    htmlFor,
    id,
    optional = false,
    requiredIndicator = "*",
    size = "md",
    ...props
  },
  ref,
) {
  const field = useFormControl();
  const { theme } = useQuickitControlState("label");
  const generatedId = useId();
  const resolvedId = id ?? (field ? `qi-label-${generatedId}` : undefined);
  const resolvedHtmlFor = htmlFor ?? field?.controlId;
  const showRequiredIndicator =
    Boolean(field?.required) && !optional && requiredIndicator !== false;

  useEffect(() => {
    if (!field || !resolvedId) {
      return undefined;
    }

    field.setLabelId(resolvedId);

    return () => {
      field.setLabelId((currentId) => (currentId === resolvedId ? null : currentId));
    };
  }, [field, resolvedId]);

  return (
    <label
      ref={ref}
      id={resolvedId}
      htmlFor={resolvedHtmlFor}
      className={cn(
        "inline-block self-start font-medium tracking-[-0.01em]",
        LABEL_THEME_CLASSES[theme],
        LABEL_SIZE_CLASSES[size] ?? LABEL_SIZE_CLASSES.md,
        className,
      )}
      {...props}
    >
      {children}
      {showRequiredIndicator ? (
        <span aria-hidden="true" className="ml-1 text-red-600 dark:text-red-400">
          {requiredIndicator}
        </span>
      ) : null}
      {optional ? (
        <span className="ml-2 text-xs font-normal opacity-70">(Opcional)</span>
      ) : null}
    </label>
  );
});

export { Label };
export default Label;
