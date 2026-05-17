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
  return <Textarea rows={4} placeholder="Escribe algo..." />;
}`,
  examples: [{
    id: "ejemplos-formcontrol",
    title: "Con FormControl",
    description: "Ideal para estados inválidos y descripción.",
    preview: <FormControl controlId="doc-textarea-form" invalid required>
          <Label>Mensaje</Label>
          <Textarea minRows={4} placeholder="Describe el problema..." />
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
      description: "Define las filas iniciales cuando no pasas `rows`; no activa autosize."
    }, {
      name: "rows",
      type: "number",
      defaultValue: "undefined",
      description: "Controla directamente el atributo nativo `rows`."
    }, {
      name: "shape",
      type: `"square" | "pill"`,
      defaultValue: `"square"`,
      description: "Radio visual del campo."
    }, {
      name: "size",
      type: `"sm" | "md" | "lg" | "xl" | "2xl"`,
      defaultValue: `"md"`,
      description: "Escala el radio del control para mantener coherencia con otros fields."
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
    notes: ["Textarea acepta atributos nativos de HTMLTextAreaElement.", "Dentro de FormControl, usa `controlId` si quieres que Label, descripción y mensajes se conecten sin repetir ids manuales.", "Si necesitas altura variable según contenido, hoy debes implementarla fuera del componente; `minRows` no hace autosize."]
  }]
};
