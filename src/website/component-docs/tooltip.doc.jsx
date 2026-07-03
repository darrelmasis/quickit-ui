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
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Tooltip simple con texto.",
    preview: <Tooltip content="Esto es un tooltip">Pasa el mouse</Tooltip>,
    code: `import { Tooltip } from "quickit-ui";

export function TooltipBasico() {
  return <Tooltip content="Esto es un tooltip">Pasa el mouse</Tooltip>;
}`
  }, {
    id: "ejemplos-placement",
    title: "Placement",
    description: "Cambia la posición con placement.",
    preview: <Tooltip content="Posición arriba" placement="top">Arriba</Tooltip>,
    code: `import { Tooltip } from "quickit-ui";

export function TooltipPlacement() {
  return <Tooltip content="Posición arriba" placement="top">Arriba</Tooltip>;
}`
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
      name: "color",
      type: `"default" | QuickitSemanticColor`,
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
    notes: ["Tooltip fuerza trigger=\"hover\" e interactive=false; para contenido accionable usa Popover.", "Mantén el contenido corto y descriptivo."]
  }]
};
