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
    id: "ejemplos-formulario-mensaje",
    title: "Formulario de mensaje",
    description: "Ejemplo realista de formulario de contacto con textarea.",
    preview: <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contacto-asunto">Asunto</Label>
          <input type="text" id="contacto-asunto" placeholder="Escribe el asunto..." className="rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contacto-mensaje">Mensaje</Label>
          <Textarea id="contacto-mensaje" minRows={4} placeholder="Escribe tu mensaje aquí..." />
        </div>
      </div>,
    code: `import { Label, Textarea } from "quickit-ui";

export function TextareaFormularioMensaje() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="contacto-asunto">Asunto</Label>
        <input type="text" id="contacto-asunto" placeholder="Escribe el asunto..." className="rounded-lg border px-3 py-2 text-sm" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contacto-mensaje">Mensaje</Label>
        <Textarea id="contacto-mensaje" minRows={4} placeholder="Escribe tu mensaje aquí..." />
      </div>
    </div>
  );
}`
  }, {
    id: "ejemplos-descripcion-producto",
    title: "Descripción de producto",
    description: "Ejemplo realista de textarea para descripciones largas.",
    preview: <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="producto-nombre">Nombre del producto</Label>
          <input type="text" id="producto-nombre" placeholder="Ej: Camiseta básica" className="rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="producto-descripcion">Descripción</Label>
          <Textarea id="producto-descripcion" minRows={6} placeholder="Describe las características del producto, materiales, tallas disponibles, etc." />
        </div>
      </div>,
    code: `import { Label, Textarea } from "quickit-ui";

export function TextareaDescripcionProducto() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="producto-nombre">Nombre del producto</Label>
        <input type="text" id="producto-nombre" placeholder="Ej: Camiseta básica" className="rounded-lg border px-3 py-2 text-sm" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="producto-descripcion">Descripción</Label>
        <Textarea id="producto-descripcion" minRows={6} placeholder="Describe las características del producto, materiales, tallas disponibles, etc." />
      </div>
    </div>
  );
}`
  }, {
    id: "ejemplos-comentarios",
    title: "Sección de comentarios",
    description: "Ejemplo realista de textarea para comentarios o reviews.",
    preview: <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="comentario-texto">Tu comentario</Label>
          <Textarea id="comentario-texto" minRows={3} placeholder="Comparte tu opinión sobre este producto..." />
        </div>
        <div className="flex items-center justify-end gap-3">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">Máximo 500 caracteres</span>
          <button type="button" className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-neutral-900">Publicar</button>
        </div>
      </div>,
    code: `import { Label, Textarea } from "quickit-ui";

export function TextareaComentarios() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="comentario-texto">Tu comentario</Label>
        <Textarea id="comentario-texto" minRows={3} placeholder="Comparte tu opinión sobre este producto..." />
      </div>
      <div className="flex items-center justify-end gap-3">
        <span className="text-xs text-neutral-500 dark:text-neutral-400">Máximo 500 caracteres</span>
        <button type="button" className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-neutral-900">Publicar</button>
      </div>
    </div>
  );
}`
  }, {
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
      type: `"sm" | "md" | "lg" | "xl" | "2xl"`,
      defaultValue: `"md"`,
      description: "Controla la tipografía y el radio del campo."
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
