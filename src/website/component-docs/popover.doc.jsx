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
  description: "Capa contextual flotante para contenido informativo o interactivo, según el trigger y la prop `interactive`.",
  previewCode: POPOVER_PREVIEW_CODE,
  preview: <PopoverPreviewCanvas />,
  installCode: `import { Popover } from "quickit-ui";`,
  usageCode: `import { Popover } from "quickit-ui";

export function PopoverUsage() {
  return (
    <Popover content="Detalle rápido" trigger="click">
      Ver detalle
    </Popover>
  );
}`,
  examples: [{
    id: "ejemplos-trigger",
    title: "Informativo vs interactivo",
    description: "Usa `hover` para contenido breve no interactivo. Para acciones o foco interno, usa `click` + `interactive`.",
    preview: <div className="flex flex-wrap gap-4">
          <Popover content="Resumen rápido" trigger="hover">
            Hover informativo
          </Popover>
          <Popover content={<div className="space-y-2">
                <p className="text-sm font-medium">Atajo</p>
                <button type="button" className="rounded-lg border border-current px-2 py-1 text-xs">
                  Confirmar
                </button>
              </div>} trigger="click" interactive>
            Popover interactivo
          </Popover>
        </div>
  }, {
    id: "ejemplos-arrow",
    title: "Arrow",
    description: "Personaliza color y tamaño de la flecha.",
    preview: <Popover content="Con arrow custom" showArrow arrowWidth={18} arrowHeight={8}>
          Arrow custom
        </Popover>
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
      description: "Apertura controlada (útil con `manual`)."
    }, {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "undefined",
      description: "Callback de apertura."
    }, {
      name: "asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Usa el hijo como nodo de referencia sin wrapper."
    }, {
      name: "interactive",
      type: "boolean",
      defaultValue: "false",
      description: "Activa semántica y foco para contenido interactivo."
    }, {
      name: "hoverDelayPreset",
      type: `"fast" | "normal" | "slow"`,
      defaultValue: `"normal"`,
      description: "Retraso de hover para tooltips y popovers hover."
    }, {
      name: "placement",
      type: "string",
      defaultValue: `"top"`,
      description: "Posición flotante."
    }, {
      name: "offset",
      type: "number | object",
      defaultValue: "8",
      description: "Separación del trigger (número o eje principal/cruzado)."
    }, {
      name: "showArrow",
      type: "boolean",
      defaultValue: "true",
      description: "Muestra flecha."
    }, {
      name: "arrowWidth",
      type: "number",
      defaultValue: "16",
      description: "Ancho de la flecha."
    }, {
      name: "arrowHeight",
      type: "number",
      defaultValue: "8",
      description: "Alto de la flecha."
    }, {
      name: "arrowFill",
      type: "string",
      defaultValue: "undefined",
      description: "Color de relleno del arrow."
    }, {
      name: "arrowStroke",
      type: "string",
      defaultValue: "undefined",
      description: "Color del borde del arrow."
    }, {
      name: "arrowStrokeWidth",
      type: "number",
      defaultValue: "0.75",
      description: "Grosor del borde."
    }, {
      name: "arrowTipRadius",
      type: "number",
      defaultValue: "2",
      description: "Radio de la punta."
    }, {
      name: "autoCloseMs",
      type: "number",
      defaultValue: "0",
      description: "Cierra automáticamente después de ms. Útil sobre todo en contenido informativo no interactivo."
    }, {
      name: "color",
      type: "\"default\" | QuickitSemanticColor",
      defaultValue: `"default"`,
      description: "Paleta del floating."
    }, {
      name: "usePortal",
      type: "boolean",
      defaultValue: "true",
      description: "Renderiza en portal."
    }, {
      name: "zIndex",
      type: "number",
      defaultValue: "2000",
      description: "Controla el stacking."
    }],
    notes: ["`trigger=\"hover\"` está pensado para contenido no interactivo.", "Si el contenido contiene botones, links o inputs, usa `trigger=\"click\"` o `manual` junto con `interactive`.", "Si quieres ayuda breve y no accionable, normalmente `Tooltip` comunica mejor la intención que `Popover`."]
  }]
};
