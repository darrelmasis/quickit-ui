/* eslint-disable react-refresh/only-export-components */
import { FormControl, Switch } from "@/lib";
import { QUICKIT_COMPACT_CONTROL_SIZES, QUICKIT_SEMANTIC_COLORS } from "@/lib/tokens";
const SWITCH_PREVIEW_CODE = `import { Switch } from "quickit-ui";

export function SwitchPreview() {
  return <Switch defaultChecked label="Modo oscuro" />;
}`;
function SwitchPreviewCanvas() {
  return <div className="flex items-center justify-center">
      <Switch defaultChecked label="Modo oscuro" />
    </div>;
}
export const switchDoc = {
  name: "Switch",
  description: "Toggle visual para estados activado/desactivado.",
  previewCode: SWITCH_PREVIEW_CODE,
  preview: <SwitchPreviewCanvas />,
  installCode: `import { Switch } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Switch simple con label.",
    preview: <div className="grid gap-2">
          <Switch label="Modo oscuro" />
          <Switch label="Notificaciones" defaultChecked />
        </div>,
    code: `import { Switch } from "quickit-ui";

export function SwitchBasico() {
  return (
    <div className="grid gap-2">
      <Switch label="Modo oscuro" />
      <Switch label="Notificaciones" defaultChecked />
    </div>
  );
}`
  }, {
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: `Tamaños compactos: ${QUICKIT_COMPACT_CONTROL_SIZES.join(", ")}.`,
    preview: <div className="grid gap-2">
          <Switch size="sm" label="Small" />
          <Switch size="md" label="Medium" />
        </div>,
    code: `import { Switch } from "quickit-ui";

export function SwitchTamanos() {
  return (
    <div className="grid gap-2">
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium" />
    </div>
  );
}`
  }, {
    id: "ejemplos-colores",
    title: "Colores",
    description: `Colores disponibles: ${QUICKIT_SEMANTIC_COLORS.join(", ")}.`,
    preview: <div className="grid gap-2">
          <Switch defaultChecked color="neutral" label="Neutral" />
          <Switch defaultChecked color="primary" label="Primary" />
          <Switch defaultChecked color="success" label="Success" />
        </div>,
    code: `import { Switch } from "quickit-ui";

export function SwitchColores() {
  return (
    <div className="grid gap-2">
      <Switch defaultChecked color="neutral" label="Neutral" />
      <Switch defaultChecked color="primary" label="Primary" />
      <Switch defaultChecked color="success" label="Success" />
    </div>
  );
}`
  }, {
    id: "ejemplos-formcontrol",
    title: "Con FormControl",
    description: "Útil cuando necesitas descripción y estado.",
    preview: <FormControl>
          <div className="mt-3">
            <Switch defaultChecked label="Modo oscuro" />
          </div>
          <FormControl.Description>Aplica el tema oscuro a toda la app.</FormControl.Description>
        </FormControl>,
    code: `import { FormControl, Switch } from "quickit-ui";

export function SwitchFormControl() {
  return (
    <FormControl>
      <Switch defaultChecked label="Modo oscuro" />
      <FormControl.Description>Aplica el tema oscuro a toda la app.</FormControl.Description>
    </FormControl>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "checked",
      type: "boolean",
      defaultValue: "undefined",
      description: "Controla el estado."
    }, {
      name: "defaultChecked",
      type: "boolean",
      defaultValue: "false",
      description: "Estado inicial."
    }, {
      name: "onCheckedChange",
      type: "(checked: boolean) => void",
      defaultValue: "undefined",
      description: "Callback de cambio."
    }, {
      name: "onChange",
      type: "(event) => void",
      defaultValue: "undefined",
      description: "Callback con evento tipo change."
    }, {
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "Color del switch."
    }, {
      name: "size",
      type: "QuickitCompactControlSize",
      defaultValue: `"md"`,
      description: "Tamaño del switch."
    }, {
      name: "label",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Texto descriptivo."
    }, {
      name: "invalid",
      type: "boolean",
      defaultValue: "false",
      description: "Muestra estado inválido."
    }, {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Marca el campo como requerido."
    }, {
      name: "name",
      type: "string",
      defaultValue: "undefined",
      description: "Nombre del campo en formularios."
    }, {
      name: "value",
      type: "string",
      defaultValue: `"on"`,
      description: "Valor enviado cuando está checked."
    }, {
      name: "containerClassName",
      type: "string",
      defaultValue: "undefined",
      description: "Clases del contenedor externo."
    }, {
      name: "labelClassName",
      type: "string",
      defaultValue: "undefined",
      description: "Clases del label interno."
    }],
    notes: ["El control visible es un button[role=\"switch\"].", "Si pasas `name`, el componente añade un checkbox oculto para formularios HTML.", "Usa `onCheckedChange` para lógica de negocio; `onChange` para adaptadores."]
  }]
};
