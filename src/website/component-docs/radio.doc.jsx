/* eslint-disable react-refresh/only-export-components */
import { Label, Radio } from "@/lib";
import { QUICKIT_COMPACT_CONTROL_SIZES, QUICKIT_SEMANTIC_COLORS } from "@/lib/tokens";
const RADIO_PREVIEW_CODE = `import { Radio } from "quickit-ui";

export function RadioPreview() {
  return (
    <div className="grid gap-2">
      <Radio name="billing-plan" label="Plan mensual" />
      <Radio name="billing-plan" label="Plan anual" defaultChecked />
      <Radio name="billing-plan" label="Plan enterprise" />
    </div>
  );
}`;
function RadioPreviewCanvas() {
  return <div className="grid gap-2">
      <Radio name="billing-plan" label="Plan mensual" />
      <Radio name="billing-plan" label="Plan anual" defaultChecked />
      <Radio name="billing-plan" label="Plan enterprise" />
    </div>;
}
export const radioDoc = {
  name: "Radio",
  description: "Selección exclusiva con API coherente con Checkbox.",
  previewCode: RADIO_PREVIEW_CODE,
  preview: <RadioPreviewCanvas />,
  installCode: `import { Radio } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Grupo de radios con el mismo name.",
    preview: <div className="grid gap-2">
          <Radio name="plan" label="Plan mensual" />
          <Radio name="plan" label="Plan anual" defaultChecked />
          <Radio name="plan" label="Plan enterprise" />
        </div>,
    code: `import { Radio } from "quickit-ui";

export function RadioBasico() {
  return (
    <div className="grid gap-2">
      <Radio name="plan" label="Plan mensual" />
      <Radio name="plan" label="Plan anual" defaultChecked />
      <Radio name="plan" label="Plan enterprise" />
    </div>
  );
}`
  }, {
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: `Tamaños compactos: ${QUICKIT_COMPACT_CONTROL_SIZES.join(", ")}.`,
    preview: <div className="grid gap-2">
          <Radio size="sm" label="Small" />
          <Radio size="md" label="Medium" />
        </div>,
    code: `import { Radio } from "quickit-ui";

export function RadioTamanos() {
  return (
    <div className="grid gap-2">
      <Radio size="sm" label="Small" />
      <Radio size="md" label="Medium" />
    </div>
  );
}`
  }, {
    id: "ejemplos-colores",
    title: "Colores",
    description: `Colores disponibles: ${QUICKIT_SEMANTIC_COLORS.join(", ")}.`,
    preview: <div className="grid gap-2">
          <Radio color="neutral" label="Neutral" defaultChecked />
          <Radio color="primary" label="Primary" defaultChecked />
          <Radio color="success" label="Success" defaultChecked />
        </div>,
    code: `import { Radio } from "quickit-ui";

export function RadioColores() {
  return (
    <div className="grid gap-2">
      <Radio color="neutral" label="Neutral" defaultChecked />
      <Radio color="primary" label="Primary" defaultChecked />
      <Radio color="success" label="Success" defaultChecked />
    </div>
  );
}`
  }, {
    id: "ejemplos-estados",
    title: "Estados",
    description: "checked, disabled.",
    preview: <div className="grid gap-2">
          <Radio name="estados" label="Opción normal" />
          <Radio name="estados" label="Opción seleccionada" defaultChecked />
          <Radio name="estados-2" label="Deshabilitado" disabled />
        </div>,
    code: `import { Radio } from "quickit-ui";

export function RadioEstados() {
  return (
    <div className="grid gap-2">
      <Radio name="estados" label="Opción normal" />
      <Radio name="estados" label="Opción seleccionada" defaultChecked />
      <Radio name="estados-2" label="Deshabilitado" disabled />
    </div>
  );
}`
  }, {
    id: "ejemplos-label-externo",
    title: "Label externo",
    description: "Usa Label con htmlFor para layout custom.",
    preview: <div className="flex items-center gap-3">
          <Radio id="plan-pro" name="plan-2" />
          <Label htmlFor="plan-pro">Plan Pro</Label>
        </div>,
    code: `import { Label, Radio } from "quickit-ui";

export function RadioLabelExterno() {
  return (
    <div className="flex items-center gap-3">
      <Radio id="plan-pro" name="plan-2" />
      <Label htmlFor="plan-pro">Plan Pro</Label>
    </div>
  );
}`
  }, {
    id: "ejemplos-grupo",
    title: "Grupo de opciones",
    description: "Combina varios radios con el mismo name y un label de grupo.",
    preview: <div role="radiogroup" aria-labelledby="billing-plan-label" className="grid gap-2">
          <p id="billing-plan-label" className="text-sm font-medium text-neutral-950 dark:text-neutral-50">
            Plan de facturación
          </p>
          <div className="grid gap-2">
            <Radio id="plan-monthly" name="plan" label="Mensual" />
            <Radio id="plan-annual" name="plan" label="Anual" />
          </div>
        </div>,
    code: `import { Radio } from "quickit-ui";

export function RadioGrupo() {
  return (
    <div role="radiogroup" aria-labelledby="plan-label">
      <p id="plan-label" className="text-sm font-medium">
        Plan de facturación
      </p>
      <div className="grid gap-2">
        <Radio id="plan-monthly" name="plan" label="Mensual" />
        <Radio id="plan-annual" name="plan" label="Anual" />
      </div>
    </div>
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
      description: "Tamaño del radio."
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
    notes: ["Radio acepta atributos nativos de input.", "Para requisitos del grupo usa fieldset/legend o validación controlada propia."]
  }]
};
