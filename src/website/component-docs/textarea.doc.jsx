/* eslint-disable react-refresh/only-export-components */
import { FormControl, Label, Textarea } from "@/lib";
import { QUICKIT_CONTROL_SIZES } from "@/lib/tokens";
const TEXTAREA_PREVIEW_CODE = `import { Label, Textarea } from "quickit-ui";

export function TextareaPreview() {
  return (
    <div>
      <Label htmlFor="notas">Notas</Label>
      <Textarea id="notas" placeholder="Escribe algo..." />
    </div>
  );
}`;
function TextareaPreviewCanvas() {
  return <div className="w-full max-w-md flex flex-col gap-3">
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
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Textarea simple con placeholder.",
    preview: <div className="w-full max-w-md">
        <Textarea placeholder="Escribe algo..." />
      </div>,
    code: `import { Textarea } from "quickit-ui";

export function TextareaBasico() {
  return <Textarea placeholder="Escribe algo..." />;
}`
  }, {
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: `Sizes disponibles: ${QUICKIT_CONTROL_SIZES.join(", ")}.`,
    preview: <div className="grid gap-3 sm:grid-cols-2">
          <Textarea size="sm" placeholder="Small" />
          <Textarea size="md" placeholder="Medium" />
          <Textarea size="lg" placeholder="Large" />
        </div>,
    code: `import { Textarea } from "quickit-ui";

export function TextareaTamanos() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Textarea size="sm" placeholder="Small" />
      <Textarea size="md" placeholder="Medium" />
      <Textarea size="lg" placeholder="Large" />
    </div>
  );
}`
  }, {
    id: "ejemplos-formcontrol",
    title: "Con FormControl",
    description: "Ideal para estados inválidos y descripción.",
    preview: <FormControl controlId="doc-textarea-form" invalid required>
          <Label>Mensaje</Label>
          <Textarea minRows={4} placeholder="Describe el problema..." />
          <FormControl.Description>Se enviará al equipo de soporte.</FormControl.Description>
          <FormControl.Message>El mensaje es obligatorio.</FormControl.Message>
        </FormControl>,
    code: `import { FormControl, Label, Textarea } from "quickit-ui";

export function TextareaFormControl() {
  return (
    <FormControl controlId="mensaje" invalid required>
      <Label>Mensaje</Label>
      <Textarea minRows={4} placeholder="Describe el problema..." />
      <FormControl.Description>Se enviará al equipo de soporte.</FormControl.Description>
      <FormControl.Message>El mensaje es obligatorio.</FormControl.Message>
    </FormControl>
  );
}`
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
      description: "Define las filas iniciales cuando no pasas rows."
    }, {
      name: "rows",
      type: "number",
      defaultValue: "undefined",
      description: "Controla el atributo nativo rows."
    }, {
      name: "shape",
      type: `"square" | "pill"`,
      defaultValue: `"square"`,
      description: "Radio visual del campo."
    }, {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      defaultValue: `"md"`,
      description: "Escala el radio del control."
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
    notes: ["Textarea acepta atributos nativos de HTMLTextAreaElement.", "Dentro de FormControl, usa controlId para conectar Label y mensajes automáticamente.", "Si necesitas autosize, debes implementarlo fuera del componente."]
  }]
};
