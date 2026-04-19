/* eslint-disable react-refresh/only-export-components */
import { FormControl, Label, Textarea } from "@/lib";
const TEXTAREA_PREVIEW_CODE = `import { Textarea } from "quickit-ui";

export function TextareaPreview() {
  return <Textarea placeholder="Notas..." />;
}`;
function TextareaPreviewCanvas() {
  return <div className="w-full max-w-md space-y-3">
      <Label htmlFor="doc-textarea">Notas</Label>
      <Textarea id="doc-textarea" placeholder="Escribe algo..." />
    </div>;
}
export const textareaDoc = {
  name: "Textarea",
  description: "Área de texto multi línea alineada con Input.",
  previewCode: TEXTAREA_PREVIEW_CODE,
  preview: <TextareaPreviewCanvas />,
  installCode: `import { Textarea } from "quickit-ui";`,
  usageCode: `import { Textarea } from "quickit-ui";

export function TextareaUsage() {
  return <Textarea minRows={4} placeholder="Escribe algo..." />;
}`,
  examples: [{
    id: "ejemplos-formcontrol",
    title: "Con FormControl",
    description: "Ideal para estados inválidos y descripción.",
    preview: <FormControl invalid required>
          <Label htmlFor="doc-textarea-form">Mensaje</Label>
          <Textarea id="doc-textarea-form" minRows={4} placeholder="Describe el problema..." />
          <FormControl.Description>Se enviará al equipo de soporte.</FormControl.Description>
          <FormControl.Message>El mensaje es obligatorio.</FormControl.Message>
        </FormControl>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "Color del campo."
    }, {
      name: "minRows",
      type: "number",
      defaultValue: "3",
      description: "Controla la altura mínima."
    }, {
      name: "invalid",
      type: "boolean",
      defaultValue: "false",
      description: "Muestra estado inválido."
    }, {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Marca como requerido."
    }],
    notes: ["Textarea acepta atributos nativos de HTMLTextAreaElement."]
  }]
};
