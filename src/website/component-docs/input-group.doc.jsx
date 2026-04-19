/* eslint-disable react-refresh/only-export-components */
import { Input, InputGroup } from "@/lib";
const INPUT_GROUP_PREVIEW_CODE = `import { InputGroup, Input } from "quickit-ui";

export function InputGroupPreview() {
  return (
    <InputGroup attached>
      <InputGroup.Addon align="inline-start">https://</InputGroup.Addon>
      <Input placeholder="quickit.dev" />
      <InputGroup.Action>Ir</InputGroup.Action>
    </InputGroup>
  );
}`;
function InputGroupPreviewCanvas() {
  return <div className="w-full max-w-md space-y-4">
      <InputGroup attached>
        <InputGroup.Addon align="inline-start">https://</InputGroup.Addon>
        <Input placeholder="quickit.dev" />
        <InputGroup.Action>Ir</InputGroup.Action>
      </InputGroup>
    </div>;
}
export const inputGroupDoc = {
  name: "InputGroup",
  description: "Agrupa inputs, addons y acciones dentro de un mismo contenedor.",
  previewCode: INPUT_GROUP_PREVIEW_CODE,
  preview: <InputGroupPreviewCanvas />,
  installCode: `import { InputGroup, Input } from "quickit-ui";`,
  usageCode: `import { InputGroup, Input } from "quickit-ui";

export function InputGroupUsage() {
  return (
    <InputGroup attached>
      <InputGroup.Addon align="start">https://</InputGroup.Addon>
      <Input placeholder="quickit.dev" />
      <InputGroup.Action>Ir</InputGroup.Action>
    </InputGroup>
  );
}`,
  examples: [{
    id: "ejemplos-layout",
    title: "Layouts",
    description: "Usa layout inline o grid con columns.",
    preview: <div className="grid gap-4">
            <InputGroup layout="inline" attached>
              <InputGroup.Addon align="inline-start">+1</InputGroup.Addon>
              <Input placeholder="Teléfono" />
            </InputGroup>
            <InputGroup layout="grid" columns={2} attached>
              <InputGroup.Item>
                <Input placeholder="Nombre" />
              </InputGroup.Item>
              <InputGroup.Item>
                <Input placeholder="Apellido" />
              </InputGroup.Item>
            </InputGroup>
          </div>
  }, {
    id: "ejemplos-acciones",
    title: "Acciones y addons",
    description: "Combina addons y botones internos.",
    preview: <div className="grid gap-4">
            <InputGroup attached>
              <InputGroup.Addon align="inline-start">@</InputGroup.Addon>
              <Input placeholder="usuario" />
              <InputGroup.Action variant="outline">Verificar</InputGroup.Action>
            </InputGroup>
            <InputGroup attached>
              <InputGroup.Addon align="inline-start">https://</InputGroup.Addon>
              <Input placeholder="quickit.dev" />
            </InputGroup>
          </div>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "attached",
      type: "boolean",
      defaultValue: "false",
      description: "Une los elementos en una sola cápsula."
    }, {
      name: "layout",
      type: `"inline" | "grid"`,
      defaultValue: `"inline"`,
      description: "Distribuye los hijos."
    }, {
      name: "columns",
      type: "number | string",
      defaultValue: "undefined",
      description: "Define columnas para layout grid."
    }, {
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "Color compartido."
    }, {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      defaultValue: `"md"`,
      description: "Tamaño del grupo."
    }, {
      name: "shape",
      type: `"square" | "pill"`,
      defaultValue: `"square"`,
      description: "Forma del contenedor."
    }, {
      name: "fullWidth",
      type: "boolean",
      defaultValue: "true",
      description: "Hace el grupo 100% ancho."
    }],
    notes: ["InputGroup.Item soporta grow (boolean) y span (number) para layout grid.", "InputGroup.Addon soporta align: start | center | end | inline-start | inline-end.", "InputGroup.Action es un Button compacto con variant, size y activeMotion (desactivado por defecto). Los nombres planos (InputGroupItem, etc.) siguen exportados."]
  }]
};
