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
  usageCode: `import { Label, Input } from "quickit-ui";

export function LabelUsage() {
  return (
    <>
      <Label htmlFor="email" requiredIndicator>
        Correo
      </Label>
      <Input id="email" type="email" />
    </>
  );
}`,
  examples: [{
    id: "ejemplos-formcontrol",
    title: "Con FormControl",
    description: "El indicador de requerido se activa automáticamente si el campo es required.",
    preview: <FormControl required>
          <Label htmlFor="label-required">Nombre</Label>
          <Input id="label-required" placeholder="Elena Ruiz" />
          <FormControl.Description>Este campo es obligatorio.</FormControl.Description>
        </FormControl>
  }, {
    id: "ejemplos-opcional",
    title: "Opcional",
    description: "Usa optional para mostrar el indicador.",
    preview: <div className="flex flex-wrap gap-6">
          <Label optional>Descripción</Label>
          <Label requiredIndicator>Correo</Label>
        </div>
  }, {
    id: "ejemplos-custom",
    title: "Control externo",
    description: "Funciona con cualquier control usando htmlFor.",
    preview: <div className="flex items-center gap-3">
          <Checkbox id="label-checkbox" />
          <Label htmlFor="label-checkbox">Acepto términos</Label>
        </div>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "htmlFor",
      type: "string",
      defaultValue: "context",
      description: "Asocia el label con un control. Si está dentro de FormControl usa su controlId."
    }, {
      name: "optional",
      type: "boolean",
      defaultValue: "false",
      description: "Muestra un indicador de opcional."
    }, {
      name: "requiredIndicator",
      type: "boolean",
      defaultValue: "true",
      description: "Muestra indicador de requerido cuando FormControl está en required."
    }],
    notes: ["Label acepta atributos nativos de HTMLLabelElement.", "Si optional es true, no se renderiza el indicador de requerido."]
  }]
};
