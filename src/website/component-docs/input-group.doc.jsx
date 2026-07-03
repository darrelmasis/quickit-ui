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
  installCode: `import { InputGroup } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "InputGroup con addon y action.",
    preview: <div className="w-full max-w-md">
        <InputGroup attached>
          <InputGroup.Addon align="inline-start">https://</InputGroup.Addon>
          <Input placeholder="quickit.dev" />
          <InputGroup.Action>Ir</InputGroup.Action>
        </InputGroup>
      </div>,
    code: `import { Input, InputGroup } from "quickit-ui";

export function InputGroupBasico() {
  return (
    <InputGroup attached>
      <InputGroup.Addon align="inline-start">https://</InputGroup.Addon>
      <Input placeholder="quickit.dev" />
      <InputGroup.Action>Ir</InputGroup.Action>
    </InputGroup>
  );
}`
  }, {
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
        </div>,
    code: `import { Input, InputGroup } from "quickit-ui";

export function InputGroupLayout() {
  return (
    <div className="grid gap-4">
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
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "attached",
      type: "boolean",
      defaultValue: "false",
      description: "Une los elementos en una cápsula."
    }, {
      name: "layout",
      type: `"inline" | "grid"`,
      defaultValue: `"inline"`,
      description: "Distribuye los hijos."
    }, {
      name: "columns",
      type: "number | string",
      defaultValue: "undefined",
      description: "Columnas para layout grid."
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
      description: "100% ancho."
    }],
    notes: ["InputGroup.Item soporta grow y span para grid.", "InputGroup.Addon soporta align: start, center, end, inline-start, inline-end.", "InputGroup.Action es un Button compacto."]
  }]
};
