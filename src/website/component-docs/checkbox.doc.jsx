/* eslint-disable react-refresh/only-export-components */
import { Checkbox, FormControl, Label } from "@/lib";
import { QUICKIT_COMPACT_CONTROL_SIZES } from "@/lib/tokens";
const CHECKBOX_PREVIEW_CODE = `import { Checkbox } from "quickit-ui";

export function CheckboxPreview() {
  return (
    <div className="grid gap-2">
      <Checkbox label="Recordarme" defaultChecked />
      <Checkbox label="Recibir novedades" />
      <Checkbox label="Alertas de seguridad" defaultChecked />
    </div>
  );
}`;
function CheckboxPreviewCanvas() {
  return <div className="grid gap-2">
      <Checkbox label="Recordarme" defaultChecked />
      <Checkbox label="Recibir novedades" />
      <Checkbox label="Alertas de seguridad" defaultChecked />
    </div>;
}
export const checkboxDoc = {
  name: "Checkbox",
  description: "Control binario con label y handlers explícitos.",
  previewCode: CHECKBOX_PREVIEW_CODE,
  preview: <CheckboxPreviewCanvas />,
  installCode: `import { Checkbox } from "quickit-ui";`,
  usageCode: `import { Checkbox } from "quickit-ui";

export function CheckboxUsage() {
  return (
    <div className="grid gap-2">
      <Checkbox label="Acepto términos" defaultChecked />
      <Checkbox label="Recibir novedades" />
      <Checkbox label="Alertas de seguridad" />
    </div>
  );
}`,
  examples: [{
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: `Tamaños compactos: ${QUICKIT_COMPACT_CONTROL_SIZES.join(", ")}.`,
    preview: <div className="grid gap-2">
          <Checkbox size="sm" label="Small" />
          <Checkbox size="md" label="Medium" />
        </div>
  }, {
    id: "ejemplos-colores",
    title: "Colores",
    description: "Aplica colores semánticos.",
    preview: <div className="grid gap-2">
          <Checkbox color="neutral" label="Neutral" defaultChecked />
          <Checkbox color="brand" label="Brand" defaultChecked />
        </div>
  }, {
    id: "ejemplos-grupo",
    title: "Grupo con descripción",
    description: "Combina con FormControl para compartir descripción y mensajes, no para modelar validación grupal de \"elige al menos uno\".",
    preview: <FormControl invalid>
          <div className="mt-3 grid gap-2">
            <Checkbox id="prefs-weekly" label="Correos semanales" defaultChecked />
            <Checkbox id="prefs-alerts" label="Alertas de seguridad" />
          </div>
          <FormControl.Description>Selecciona lo que quieras recibir.</FormControl.Description>
          <FormControl.Message>Hay una preferencia incompatible con tu plan actual.</FormControl.Message>
        </FormControl>
  }, {
    id: "ejemplos-label",
    title: "Label externo",
    description: "Usa Label con htmlFor cuando no quieras la prop label.",
    preview: <div className="flex items-center gap-3">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Acepto los términos</Label>
        </div>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "Color del control."
    }, {
      name: "size",
      type: "QuickitCompactControlSize",
      defaultValue: `"md"`,
      description: "Tamaño del checkbox."
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
      name: "containerClassName",
      type: "string",
      defaultValue: "undefined",
      description: "Clases del contenedor externo."
    }, {
      name: "labelClassName",
      type: "string",
      defaultValue: "undefined",
      description: "Clases para el label interno."
    }, {
      name: "onCheckedChange",
      type: "(checked, event) => void",
      defaultValue: "undefined",
      description: "Callback de cambio."
    }],
    notes: ["Checkbox acepta atributos nativos de input (checked, defaultChecked, disabled, name, value, onChange)."]
  }]
};
