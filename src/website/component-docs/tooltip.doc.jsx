/* eslint-disable react-refresh/only-export-components */
import { Tooltip } from "@/lib";
const TOOLTIP_PREVIEW_CODE = `import { Tooltip } from "quickit-ui";

export function TooltipPreview() {
  return <Tooltip content="Ayuda rápida">Hover aquí</Tooltip>;
}`;
function TooltipPreviewCanvas() {
  return <Tooltip content="Ayuda rápida">Hover aquí</Tooltip>;
}
export const tooltipDoc = {
  name: "Tooltip",
  description: "Ayuda contextual breve para hover o focus. Está pensado para contenido no interactivo.",
  previewCode: TOOLTIP_PREVIEW_CODE,
  preview: <TooltipPreviewCanvas />,
  installCode: `import { Tooltip } from "quickit-ui";`,
  usageCode: `import { Tooltip } from "quickit-ui";

export function TooltipUsage() {
  return <Tooltip content="Ayuda rápida">Hover aquí</Tooltip>;
}`,
  examples: [{
    id: "ejemplos-placement",
    title: "Placement",
    description: "Cambia la posición con placement.",
    preview: <Tooltip content="Ayuda arriba" placement="top">
          Tooltip arriba
        </Tooltip>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "content",
      type: "ReactNode",
      defaultValue: "required",
      description: "Texto o nodo de tooltip."
    }, {
      name: "placement",
      type: "string",
      defaultValue: `"top"`,
      description: "Posición preferida."
    }, {
      name: "offset",
      type: "number",
      defaultValue: "8",
      description: "Separación del trigger."
    }, {
      name: "showArrow",
      type: "boolean",
      defaultValue: "true",
      description: "Muestra flecha."
    }, {
      name: "arrowWidth",
      type: "number",
      defaultValue: "12",
      description: "Ancho de la flecha."
    }, {
      name: "arrowHeight",
      type: "number",
      defaultValue: "6",
      description: "Alto de la flecha."
    }, {
      name: "arrowTipRadius",
      type: "number",
      defaultValue: "1.5",
      description: "Radio de la punta."
    }, {
      name: "arrowStrokeWidth",
      type: "number",
      defaultValue: "0.75",
      description: "Grosor del borde."
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
    notes: ["Tooltip fuerza `trigger=\"hover\"` e `interactive={false}`; para contenido accionable usa `Popover`.", "Mantén el contenido corto y descriptivo para no convertir el tooltip en un mini diálogo."]
  }]
};
