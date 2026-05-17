/* eslint-disable react-refresh/only-export-components */
import { FormControl, Switch } from "@/lib";
import { QUICKIT_COMPACT_CONTROL_SIZES } from "@/lib/tokens";
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
  usageCode: `import { Switch } from "quickit-ui";

export function SwitchUsage() {
  return (
    <Switch
      defaultChecked
      onCheckedChange={(checked) => console.log(checked)}
    />
  );
}`,
  examples: [{
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: `Tamaños compactos: ${QUICKIT_COMPACT_CONTROL_SIZES.join(", ")}.`,
    preview: <div className="grid gap-2">
          <Switch size="sm" label="Small" />
          <Switch size="md" label="Medium" />
        </div>
  }, {
    id: "ejemplos-colores",
    title: "Colores",
    description: "Aplica colores del sistema visual.",
    preview: <div className="grid gap-2">
          <Switch defaultChecked color="neutral" label="Neutral" />
          <Switch defaultChecked color="brand" label="Brand" />
        </div>
  }, {
    id: "ejemplos-formcontrol",
    title: "Con FormControl",
    description: "Útil cuando necesitas descripción y estado.",
    preview: <FormControl>
          <div className="mt-3">
            <Switch defaultChecked label="Modo oscuro" />
          </div>
          <FormControl.Description>Aplica el tema oscuro a toda la app.</FormControl.Description>
        </FormControl>
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
    notes: ["El control visible es un `button[role=\"switch\"]`.", "Si pasas `name`, el componente añade un checkbox oculto para integrarse con formularios HTML.", "Usa `onCheckedChange` para lógica de negocio y deja `onChange` para adaptadores que necesiten un evento estilo formulario."]
  }]
};
