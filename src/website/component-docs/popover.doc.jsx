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
  description: "Capa contextual flotante con trigger click u hover.",
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
    title: "Triggers",
    description: "Cambia el trigger a hover.",
    preview: <Popover content="Detalle rápido" trigger="hover">
          Hover aquí
        </Popover>
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
      description: "Cierra automáticamente después de ms."
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
    }]
  }]
};
