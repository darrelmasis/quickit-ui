/* eslint-disable react-refresh/only-export-components */
import { FormControl, Input, Label } from "@/lib";
const FORM_CONTROL_PREVIEW_CODE = `import { FormControl, Label, Input } from "quickit-ui";

export function FormControlPreview() {
  return (
    <FormControl>
      <Label htmlFor="name">Nombre</Label>
      <Input id="name" placeholder="Elena Ruiz" />
      <FormControl.Description>Se mostrará en tu perfil público.</FormControl.Description>
    </FormControl>
  );
}`;
function FormControlPreviewCanvas() {
  return <div className="w-full max-w-md space-y-3">
      <FormControl>
        <Label htmlFor="fc-name">Nombre</Label>
        <Input id="fc-name" placeholder="Elena Ruiz" />
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
    <FormControl invalid>
      <Label htmlFor="email">Correo</Label>
      <Input id="email" type="email" required />
      <FormControl.Message>El correo no es válido.</FormControl.Message>
    </FormControl>
  );
}`,
  examples: [{
    id: "ejemplos-estados",
    title: "Estados",
    description: "disabled, required e invalid se propagan a los hijos.",
    preview: <div className="grid gap-4 sm:grid-cols-2">
          <FormControl required>
            <Label htmlFor="fc-required">Nombre</Label>
            <Input id="fc-required" placeholder="Elena Ruiz" />
            <FormControl.Description>Este campo es obligatorio.</FormControl.Description>
          </FormControl>
          <FormControl disabled>
            <Label htmlFor="fc-disabled">Equipo</Label>
            <Input id="fc-disabled" placeholder="Quickit" />
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
      name: "id",
      type: "string",
      defaultValue: "auto",
      description: "Base usada para asociar ids internos."
    }],
    notes: ["FormControl.Description y FormControl.Message son opcionales; equivalen a FormDescription y FormMessage (siguen exportados con nombre).", "`useFormControl()` lee el mismo contexto desde inputs o controles personalizados."]
  }]
};
