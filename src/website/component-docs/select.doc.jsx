/* eslint-disable react-refresh/only-export-components */
import { FormControl, Label, Select } from "@/lib";
const SELECT_PREVIEW_CODE = `import { Select } from "quickit-ui";

export function SelectPreview() {
  return (
    <Select placeholder="Selecciona estado">
      <option value="active">Activo</option>
      <option value="paused">Pausado</option>
    </Select>
  );
}`;
function SelectPreviewCanvas() {
  return <div className="w-full max-w-xs space-y-3">
      <Label htmlFor="doc-select">Estado</Label>
      <Select id="doc-select" placeholder="Selecciona estado">
        <option value="active">Activo</option>
        <option value="paused">Pausado</option>
      </Select>
    </div>;
}
export const selectDoc = {
  name: "Select",
  description: "Selector composable con trigger y panel flotante basado en opciones nativas.",
  previewCode: SELECT_PREVIEW_CODE,
  preview: <SelectPreviewCanvas />,
  installCode: `import { Select } from "quickit-ui";`,
  usageCode: `import { Select } from "quickit-ui";

export function SelectUsage() {
  return (
    <Select placeholder="Estado">
      <option value="active">Activo</option>
      <option value="paused">Pausado</option>
      <option value="blocked">Bloqueado</option>
    </Select>
  );
}`,
  examples: [{
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: "sm, md, lg.",
    preview: <div className="grid gap-3 sm:grid-cols-2">
            <Select size="sm" placeholder="Small">
              <option value="1">Opción</option>
            </Select>
            <Select size="md" placeholder="Medium">
              <option value="1">Opción</option>
            </Select>
            <Select size="lg" placeholder="Large">
              <option value="1">Opción</option>
            </Select>
          </div>
  }, {
    id: "ejemplos-formcontrol",
    title: "Con Label",
    description: "Úsalo dentro de FormControl para estados y mensajes.",
    preview: <FormControl required>
            <div className="mt-3">
              <Label htmlFor="doc-select-form">Estado</Label>
              <Select id="doc-select-form" placeholder="Selecciona estado">
                <option value="active">Activo</option>
                <option value="paused">Pausado</option>
              </Select>
            </div>
            <FormControl.Description>Este dato se usa en reportes.</FormControl.Description>
        </FormControl>
  }, {
    id: "ejemplos-disabled",
    title: "Disabled",
    description: "Deshabilita el select para evitar interacción.",
    preview: <Select disabled placeholder="No disponible">
          <option value="1">Opción</option>
        </Select>
  }, {
    id: "ejemplos-controlado",
    title: "Controlado",
    description: "Escucha onValueChange cuando necesitas reaccionar.",
    preview: <Select defaultValue="active" onValueChange={value => value}>
          <option value="active">Activo</option>
          <option value="paused">Pausado</option>
        </Select>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "Color del select."
    }, {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      defaultValue: `"md"`,
      description: "Tamaño del control."
    }, {
      name: "defaultValue",
      type: "string | number",
      defaultValue: "undefined",
      description: "Valor inicial cuando es uncontrolled."
    }, {
      name: "value",
      type: "string | number",
      defaultValue: "undefined",
      description: "Controla el valor seleccionado."
    }, {
      name: "placeholder",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Texto cuando no hay valor."
    }, {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Deshabilita el select."
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
    }, {
      name: "name",
      type: "string",
      defaultValue: "undefined",
      description: "Nombre del campo en formularios."
    }, {
      name: "usePortal",
      type: "boolean",
      defaultValue: "true",
      description: "Renderiza el panel en portal."
    }, {
      name: "onChange",
      type: "(event) => void",
      defaultValue: "undefined",
      description: "Callback de cambio."
    }, {
      name: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "undefined",
      description: "Callback con el valor."
    }],
    notes: ["Select acepta <option> como hijos para definir opciones."]
  }]
};
