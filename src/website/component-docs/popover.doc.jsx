/* eslint-disable react-refresh/only-export-components */
import { Popover } from "@/lib";
const POPOVER_PREVIEW_CODE = `import { Popover } from "quickit-ui";

export function PopoverPreview() {
  return <Popover content="Detalle rápido">Ver detalle</Popover>;
}`;
function PopoverPreviewCanvas() {
  return <Popover content="Detalle rápido">Ver detalle</Popover>;
}
export const popoverDoc = {
  name: "Popover",
  description: "Capa contextual flotante para contenido informativo o interactivo.",
  previewCode: POPOVER_PREVIEW_CODE,
  preview: <PopoverPreviewCanvas />,
  installCode: `import { Popover } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Popover simple con trigger hover.",
    preview: <Popover content="Contenido del popover">Pasa el mouse</Popover>,
    code: `import { Popover } from "quickit-ui";

export function PopoverBasico() {
  return <Popover content="Contenido del popover">Pasa el mouse</Popover>;
}`
  }, {
    id: "ejemplos-trigger",
    title: "Trigger click + interactive",
    description: "Usa click + interactive para contenido accionable.",
    preview: <Popover content={<div className="space-y-2">
            <p className="text-sm font-medium">¿Confirmar acción?</p>
            <button type="button" className="rounded-lg border border-current px-2 py-1 text-xs">Aceptar</button>
          </div>} trigger="click" interactive>
        Click aquí
      </Popover>,
    code: `import { Popover } from "quickit-ui";

export function PopoverClick() {
  return (
    <Popover
      content={(
        <div className="space-y-2">
          <p className="text-sm font-medium">¿Confirmar acción?</p>
          <button type="button" className="rounded-lg border border-current px-2 py-1 text-xs">
            Aceptar
          </button>
        </div>
      )}
      trigger="click"
      interactive
    >
      Click aquí
    </Popover>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "content",
      type: "ReactNode",
      defaultValue: "required",
      description: "Contenido del popover."
    }, {
      name: "trigger",
      type: `"hover" | "click" | "manual"`,
      defaultValue: `"hover"`,
      description: "Modo de activación."
    }, {
      name: "open",
      type: "boolean",
      defaultValue: "undefined",
      description: "Apertura controlada."
    }, {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "undefined",
      description: "Callback de apertura."
    }, {
      name: "interactive",
      type: "boolean",
      defaultValue: "false",
      description: "Activa foco para contenido interactivo."
    }, {
      name: "placement",
      type: "string",
      defaultValue: `"top"`,
      description: "Posición flotante."
    }, {
      name: "offset",
      type: "number | object",
      defaultValue: "8",
      description: "Separación del trigger."
    }, {
      name: "showArrow",
      type: "boolean",
      defaultValue: "true",
      description: "Muestra flecha."
    }, {
      name: "color",
      type: `"default" | QuickitSemanticColor`,
      defaultValue: `"default"`,
      description: "Paleta del floating."
    }, {
      name: "usePortal",
      type: "boolean",
      defaultValue: "true",
      description: "Renderiza en portal."
    }],
    notes: ["trigger=\"hover\" es para contenido no interactivo.", "Si el contenido tiene botones o inputs, usa trigger=\"click\" + interactive.", "Para ayuda breve no accionable, prefiere Tooltip."]
  }]
};
