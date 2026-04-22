/* eslint-disable react-refresh/only-export-components */
import { FormControl, Input, Label } from "@/lib";
const FORM_CONTROL_PREVIEW_CODE = `import { FormControl, Label, Input } from "quickit-ui";

export function FormControlPreview() {
  return (
    <FormControl controlId="name">
      <Label>Nombre</Label>
      <Input placeholder="Elena Ruiz" />
      <FormControl.Description>Se mostrará en tu perfil público.</FormControl.Description>
    </FormControl>
  );
}`;
function FormControlPreviewCanvas() {
  return <div className="w-full max-w-md space-y-3">
      <FormControl controlId="fc-name">
        <Label>Nombre</Label>
        <Input placeholder="Elena Ruiz" />
        <FormControl.Description>Se mostrará en tu perfil público.</FormControl.Description>
      </FormControl>
    </div>;
}
export const formControlDoc = {
  name: "FormControl",
  description: "Contexto compartido para label, descripción y mensajes de estado.",
  previewCode: FORM_CONTROL_PREVIEW_CODE,
  preview: <FormControlPreviewCanvas />,
  installCode: `import { FormControl, Label, Input } from "quickit-ui";`,
  usageCode: `import { FormControl, Label, Input } from "quickit-ui";

export function FormControlUsage() {
  return (
    <FormControl controlId="email" invalid required>
      <Label>Correo</Label>
      <Input type="email" />
      <FormControl.Message>El correo no es válido.</FormControl.Message>
    </FormControl>
  );
}`,
  examples: [{
    id: "ejemplos-estados",
    title: "Estados",
    description: "disabled, required e invalid se propagan a los hijos.",
    preview: <div className="grid gap-4 sm:grid-cols-2">
          <FormControl controlId="fc-required" required>
            <Label>Nombre</Label>
            <Input placeholder="Elena Ruiz" />
            <FormControl.Description>Este campo es obligatorio.</FormControl.Description>
          </FormControl>
          <FormControl controlId="fc-disabled" disabled>
            <Label>Equipo</Label>
            <Input placeholder="Quickit" />
            <FormControl.Description>Campo deshabilitado.</FormControl.Description>
          </FormControl>
        </div>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Deshabilita todos los campos hijos."
    }, {
      name: "invalid",
      type: "boolean",
      defaultValue: "false",
      description: "Marca el control como inválido."
    }, {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Propaga el estado required a los hijos."
    }, {
      name: "controlId",
      type: "string",
      defaultValue: "auto",
      description: "Id compartido por Label, Input/Textarea/Select y el resto de hijos conectados al contexto."
    }, {
      name: "id",
      type: "string",
      defaultValue: "undefined",
      description: "Id del contenedor wrapper (`div[role=\"group\"]`)."
    }],
    notes: ["`Label`, `Input`, `Textarea`, `Select`, `DatePicker`, `TimePicker`, `Combobox` y `Range` consumen el contexto automáticamente; evita duplicar `htmlFor` e `id` cuando uses `controlId`.", "FormControl.Description y FormControl.Message son opcionales; equivalen a FormDescription y FormMessage (siguen exportados con nombre).", "`useFormControl()` lee el mismo contexto desde inputs o controles personalizados."]
  }]
};
