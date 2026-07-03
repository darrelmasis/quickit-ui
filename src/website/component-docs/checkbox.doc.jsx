/* eslint-disable react-refresh/only-export-components */
import { Checkbox, FormControl, Label } from "@/lib";
import { QUICKIT_COMPACT_CONTROL_SIZES, QUICKIT_SEMANTIC_COLORS } from "@/lib/tokens";
const CHECKBOX_PREVIEW_CODE = `import { Checkbox } from "quickit-ui";

export function CheckboxPreview() {
  return (
    <div className="grid gap-2">
      <Checkbox label="Recordarme" defaultChecked />
      <Checkbox label="Recibir novedades" />
      <Checkbox label="Alertas de seguridad" />
    </div>
  );
}`;
function CheckboxPreviewCanvas() {
  return <div className="grid gap-2">
      <Checkbox label="Recordarme" defaultChecked />
      <Checkbox label="Recibir novedades" />
      <Checkbox label="Alertas de seguridad" />
    </div>;
}
export const checkboxDoc = {
  name: "Checkbox",
  description: "Control binario con label y handlers explícitos.",
  previewCode: CHECKBOX_PREVIEW_CODE,
  preview: <CheckboxPreviewCanvas />,
  installCode: `import { Checkbox } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Checkbox simple con label.",
    preview: <div className="grid gap-2">
          <Checkbox label="Acepto términos" defaultChecked />
          <Checkbox label="Recibir novedades" />
        </div>,
    code: `import { Checkbox } from "quickit-ui";

export function CheckboxBasico() {
  return (
    <div className="grid gap-2">
      <Checkbox label="Acepto términos" defaultChecked />
      <Checkbox label="Recibir novedades" />
    </div>
  );
}`
  }, {
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: `Tamaños compactos: ${QUICKIT_COMPACT_CONTROL_SIZES.join(", ")}.`,
    preview: <div className="grid gap-2">
          <Checkbox size="sm" label="Small" />
          <Checkbox size="md" label="Medium" />
        </div>,
    code: `import { Checkbox } from "quickit-ui";

export function CheckboxTamanos() {
  return (
    <div className="grid gap-2">
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium" />
    </div>
  );
}`
  }, {
    id: "ejemplos-colores",
    title: "Colores",
    description: `Colores disponibles: ${QUICKIT_SEMANTIC_COLORS.join(", ")}.`,
    preview: <div className="grid gap-2">
          <Checkbox color="neutral" label="Neutral" defaultChecked />
          <Checkbox color="brand" label="Brand" defaultChecked />
          <Checkbox color="success" label="Success" defaultChecked />
          <Checkbox color="danger" label="Danger" defaultChecked />
        </div>,
    code: `import { Checkbox } from "quickit-ui";

export function CheckboxColores() {
  return (
    <div className="grid gap-2">
      <Checkbox color="neutral" label="Neutral" defaultChecked />
      <Checkbox color="brand" label="Brand" defaultChecked />
      <Checkbox color="success" label="Success" defaultChecked />
      <Checkbox color="danger" label="Danger" defaultChecked />
    </div>
  );
}`
  }, {
    id: "ejemplos-estados",
    title: "Estados",
    description: "checked, disabled y unchecked.",
    preview: <div className="grid gap-2">
          <Checkbox label="Checkbox normal" />
          <Checkbox label="Checkbox checked" defaultChecked />
          <Checkbox label="Deshabilitado" disabled />
          <Checkbox label="Checked deshabilitado" defaultChecked disabled />
        </div>,
    code: `import { Checkbox } from "quickit-ui";

export function CheckboxEstados() {
  return (
    <div className="grid gap-2">
      <Checkbox label="Checkbox normal" />
      <Checkbox label="Checkbox checked" defaultChecked />
      <Checkbox label="Deshabilitado" disabled />
      <Checkbox label="Checked deshabilitado" defaultChecked disabled />
    </div>
  );
}`
  }, {
    id: "ejemplos-label-externo",
    title: "Label externo",
    description: "Usa Label con htmlFor cuando no quieras la prop label.",
    preview: <div className="flex items-center gap-3">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Acepto los términos</Label>
        </div>,
    code: `import { Checkbox, Label } from "quickit-ui";

export function CheckboxLabelExterno() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Acepto los términos</Label>
    </div>
  );
}`
  }, {
    id: "ejemplos-formcontrol",
    title: "Con FormControl",
    description: "Combina con FormControl para descripción y mensajes.",
    preview: <FormControl invalid>
          <div className="mt-3 grid gap-2">
            <Checkbox id="prefs-weekly" label="Correos semanales" defaultChecked />
            <Checkbox id="prefs-alerts" label="Alertas de seguridad" />
          </div>
          <FormControl.Description>Selecciona lo que quieras recibir.</FormControl.Description>
          <FormControl.Message>Hay una preferencia incompatible con tu plan actual.</FormControl.Message>
        </FormControl>,
    code: `import { Checkbox, FormControl } from "quickit-ui";

export function CheckboxFormControl() {
  return (
    <FormControl invalid>
      <div className="grid gap-2">
        <Checkbox id="prefs-weekly" label="Correos semanales" defaultChecked />
        <Checkbox id="prefs-alerts" label="Alertas de seguridad" />
      </div>
      <FormControl.Description>Selecciona lo que quieras recibir.</FormControl.Description>
      <FormControl.Message>Hay una preferencia incompatible con tu plan actual.</FormControl.Message>
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
