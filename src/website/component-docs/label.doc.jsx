import { Checkbox, FormControl, Input, Label } from "@/lib";
export const labelDoc = {
  name: "Label",
  description: "Etiqueta accesible que se asocia a input, select, textarea o controles.",
  previewCode: `import { Label } from "quickit-ui";

export function LabelPreview() {
  return <Label htmlFor="email">Correo</Label>;
}`,
  preview: <div className="flex items-center justify-center">
      <Label htmlFor="label-preview">Correo</Label>
    </div>,
  installCode: `import { Label } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Label simple con htmlFor.",
    preview: <Label htmlFor="label-basic">Correo electrónico</Label>,
    code: `import { Label } from "quickit-ui";

export function LabelBasico() {
  return <Label htmlFor="email">Correo electrónico</Label>;
}`
  }, {
    id: "ejemplos-formcontrol",
    title: "Con FormControl",
    description: "El indicador de requerido se activa automáticamente.",
    preview: <FormControl controlId="label-required" required>
          <Label>Nombre</Label>
          <Input placeholder="Elena Ruiz" />
          <FormControl.Description>Este campo es obligatorio.</FormControl.Description>
        </FormControl>,
    code: `import { FormControl, Input, Label } from "quickit-ui";

export function LabelFormControl() {
  return (
    <FormControl controlId="nombre" required>
      <Label>Nombre</Label>
      <Input placeholder="Elena Ruiz" />
      <FormControl.Description>Este campo es obligatorio.</FormControl.Description>
    </FormControl>
  );
}`
  }, {
    id: "ejemplos-opcional",
    title: "Optional y requiredIndicator",
    description: "optional muestra texto auxiliar.",
    preview: <div className="flex flex-wrap gap-6">
          <Label optional>Descripción</Label>
          <FormControl controlId="label-indicator" required>
            <Label requiredIndicator="Obligatorio">Correo</Label>
            <Input type="email" placeholder="correo@quickit.dev" />
          </FormControl>
        </div>,
    code: `import { FormControl, Input, Label } from "quickit-ui";

export function LabelOptional() {
  return (
    <div className="flex flex-wrap gap-6">
      <Label optional>Descripción</Label>
      <FormControl controlId="correo" required>
        <Label requiredIndicator="Obligatorio">Correo</Label>
        <Input type="email" placeholder="correo@quickit.dev" />
      </FormControl>
    </div>
  );
}`
  }, {
    id: "ejemplos-custom",
    title: "Control externo",
    description: "Funciona con cualquier control usando htmlFor.",
    preview: <div className="flex items-center gap-3">
          <Checkbox id="label-checkbox" />
          <Label htmlFor="label-checkbox">Acepto términos</Label>
        </div>,
    code: `import { Checkbox, Label } from "quickit-ui";

export function LabelExterno() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="terminos" />
      <Label htmlFor="terminos">Acepto términos</Label>
    </div>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "htmlFor",
      type: "string",
      defaultValue: "context",
      description: "Asocia el label con un control."
    }, {
      name: "optional",
      type: "boolean",
      defaultValue: "false",
      description: "Muestra indicador de opcional."
    }, {
      name: "requiredIndicator",
      type: "ReactNode | false",
      defaultValue: `"*"`,
      description: "Personaliza el marcador requerido."
    }, {
      name: "size",
      type: `"sm" | "md"`,
      defaultValue: `"md"`,
      description: "Tamaño tipográfico."
    }],
    notes: ["Label acepta atributos nativos de HTMLLabelElement.", "Si optional es true, no se renderiza indicador de requerido."]
  }]
};
