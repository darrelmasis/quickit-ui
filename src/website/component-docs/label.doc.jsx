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
  usageCode: `import { FormControl, Label, Input } from "quickit-ui";

export function LabelUsage() {
  return (
    <FormControl controlId="email" required>
      <Label>Correo</Label>
      <Input type="email" />
    </FormControl>
  );
}`,
  examples: [{
    id: "ejemplos-formcontrol",
    title: "Con FormControl",
    description: "El indicador de requerido se activa automáticamente si el campo es required.",
    preview: <FormControl controlId="label-required" required>
          <Label>Nombre</Label>
          <Input placeholder="Elena Ruiz" />
          <FormControl.Description>Este campo es obligatorio.</FormControl.Description>
        </FormControl>
  }, {
    id: "ejemplos-opcional",
    title: "Optional y requiredIndicator",
    description: "`optional` muestra un texto auxiliar. `requiredIndicator` personaliza el marcador cuando el campo viene como requerido desde FormControl.",
    preview: <div className="flex flex-wrap gap-6">
          <Label optional>Descripción</Label>
          <FormControl controlId="label-required-indicator" required>
            <Label requiredIndicator="Obligatorio">Correo</Label>
            <Input type="email" placeholder="correo@quickit.dev" />
          </FormControl>
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
      type: "ReactNode | false",
      defaultValue: `"*"`,
      description: "Personaliza u oculta el indicador cuando FormControl está en `required`."
    }, {
      name: "size",
      type: `"sm" | "md"`,
      defaultValue: `"md"`,
      description: "Tamaño tipográfico del label."
    }],
    notes: ["Label acepta atributos nativos de HTMLLabelElement.", "Si `optional` es true, no se renderiza el indicador de requerido.", "Fuera de FormControl, `requiredIndicator` no fuerza por sí solo un marcador; úsalo como personalización del estado requerido contextual."]
  }]
};
