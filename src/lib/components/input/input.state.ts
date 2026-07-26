import { useQuickitControlState } from "@/lib/theme";
import { useFormControl } from "@/lib/components/form-control/useFormControl";
import {
  FORM_FIELD_THEME_CLASSES,
  resolveFormFieldColor,
} from "@/lib/components/_shared/form-field";

type FormFieldColorClasses = { base: string; hover: string };

export function useInputFieldState({
  ariaLabelledBy,
  color = "neutral",
  disabled = false,
  id,
  invalid = false,
  required = false,
  ariaDescribedBy,
}: {
  ariaLabelledBy?: string;
  color?: string;
  disabled?: boolean;
  id?: string;
  invalid?: boolean;
  required?: boolean;
  ariaDescribedBy?: string;
}) {
  const { theme, focusRing: focusRingEnabled } = useQuickitControlState("input");
  const formFieldClasses = FORM_FIELD_THEME_CLASSES as Record<string, Record<string, string | FormFieldColorClasses>>;
  const ui = formFieldClasses[theme];
  const colorUi = formFieldClasses[theme][resolveFormFieldColor(color)] as FormFieldColorClasses;
  const field = useFormControl();
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const describedBy = [
    ariaDescribedBy,
    field?.descriptionId,
    resolvedInvalid ? field?.messageId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;
  const labelledBy = [
    ariaLabelledBy,
    field?.labelId,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return {
    colorUi,
    describedBy,
    focusRingEnabled,
    labelledBy,
    resolvedColor: resolveFormFieldColor(color),
    resolvedDisabled,
    resolvedId: id ?? field?.controlId,
    resolvedInvalid,
    resolvedRequired,
    theme,
    ui,
  };
}
