/* eslint-disable react-refresh/only-export-components */
import { Badge } from "@/lib";
import { QUICKIT_ACCENT_COLORS, QUICKIT_COMPACT_CONTROL_SIZES } from "@/lib/tokens";
const BADGE_PREVIEW_CODE = `import { Badge } from "quickit-ui";

export function BadgePreview() {
  return <Badge color="primary">Nuevo</Badge>;
}`;
function BadgePreviewCanvas() {
  return <div className="flex items-center justify-center">
      <span className="inline-flex">
        <Badge color="primary">Nuevo</Badge>
      </span>
    </div>;
}
export const badgeDoc = {
  name: "Badge",
  description: "Etiqueta compacta para estados, categorías o indicadores.",
  previewCode: BADGE_PREVIEW_CODE,
  preview: <BadgePreviewCanvas />,
  installCode: `import { Badge } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-variantes",
    title: "Variantes",
    description: "Variantes: soft, outline, solid.",
    preview: <div className="flex flex-wrap gap-3">
          <Badge color="neutral" variant="soft">Soft</Badge>
          <Badge color="neutral" variant="outline">Outline</Badge>
          <Badge color="neutral" variant="solid">Solid</Badge>
        </div>,
    code: `import { Badge } from "quickit-ui";

export function BadgeVariantes() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge color="neutral" variant="soft">Soft</Badge>
      <Badge color="neutral" variant="outline">Outline</Badge>
      <Badge color="neutral" variant="solid">Solid</Badge>
    </div>
  );
}`
  }, {
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: `Tamaños disponibles: ${QUICKIT_COMPACT_CONTROL_SIZES.join(", ")}.`,
    preview: <div className="inline-flex flex-wrap gap-3">
          <Badge color="neutral" size="sm">Small</Badge>
          <Badge color="neutral" size="md">Medium</Badge>
        </div>,
    code: `import { Badge } from "quickit-ui";

export function BadgeTamanos() {
  return (
    <div className="inline-flex flex-wrap gap-3">
      <Badge color="neutral" size="sm">Small</Badge>
      <Badge color="neutral" size="md">Medium</Badge>
    </div>
  );
}`
  }, {
    id: "ejemplos-colores",
    title: "Colores",
    description: `Colores disponibles: ${QUICKIT_ACCENT_COLORS.join(", ")}.`,
    preview: <div className="flex flex-wrap gap-3">
          <Badge color="neutral">Neutral</Badge>
          <Badge color="primary">Primary</Badge>
          <Badge color="secondary">Secondary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="danger">Danger</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="info">Info</Badge>
        </div>,
    code: `import { Badge } from "quickit-ui";

export function BadgeColores() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge color="neutral">Neutral</Badge>
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="danger">Danger</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="info">Info</Badge>
    </div>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "color",
      type: "QuickitAccentColor",
      defaultValue: `"neutral"`,
      description: "Color aplicado al badge."
    }, {
      name: "size",
      type: "QuickitCompactControlSize",
      defaultValue: `"md"`,
      description: "Controla altura y tipografía."
    }, {
      name: "variant",
      type: `"soft" | "outline" | "solid"`,
      defaultValue: `"soft"`,
      description: "Tratamiento visual del badge."
    }],
    notes: ["Badge acepta atributos nativos de HTMLSpanElement."]
  }]
};
