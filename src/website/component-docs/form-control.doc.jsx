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
  installCode: `import { FormControl } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "FormControl une label, input y descripción.",
    preview: <div className="w-full max-w-md space-y-3">
        <FormControl controlId="fc-basic">
          <Label>Nombre</Label>
          <Input placeholder="Elena Ruiz" />
          <FormControl.Description>Se mostrará en tu perfil.</FormControl.Description>
        </FormControl>
      </div>,
    code: `import { FormControl, Input, Label } from "quickit-ui";

export function FormControlBasico() {
  return (
    <FormControl controlId="nombre">
      <Label>Nombre</Label>
      <Input placeholder="Elena Ruiz" />
      <FormControl.Description>Se mostrará en tu perfil.</FormControl.Description>
    </FormControl>
  );
}`
  }, {
    id: "ejemplos-estados",
    title: "Estados",
    description: "disabled, required e invalid se propagan a los hijos.",
    preview: <div className="grid gap-4 sm:grid-cols-2">
          <FormControl controlId="fc-required" required>
            <Label>Nombre</Label>
            <Input placeholder="Elena Ruiz" />
            <FormControl.Description>Campo obligatorio.</FormControl.Description>
          </FormControl>
          <FormControl controlId="fc-disabled" disabled>
            <Label>Equipo</Label>
            <Input placeholder="Quickit" />
            <FormControl.Description>Campo deshabilitado.</FormControl.Description>
          </FormControl>
        </div>,
    code: `import { FormControl, Input, Label } from "quickit-ui";

export function FormControlEstados() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormControl controlId="nombre" required>
        <Label>Nombre</Label>
        <Input placeholder="Elena Ruiz" />
        <FormControl.Description>Campo obligatorio.</FormControl.Description>
      </FormControl>
      <FormControl controlId="equipo" disabled>
        <Label>Equipo</Label>
        <Input placeholder="Quickit" />
        <FormControl.Description>Campo deshabilitado.</FormControl.Description>
      </FormControl>
    </div>
  );
}`
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
      description: "Marca como inválido."
    }, {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Propaga required a los hijos."
    }, {
      name: "controlId",
      type: "string",
      defaultValue: "auto",
      description: "Id compartido por Label, Input y mensajes."
    }],
    notes: ["Label, Input, Textarea, Select y otros consumen el contexto automáticamente.", "FormControl.Description y FormControl.Message son opcionales."]
  }]
};
