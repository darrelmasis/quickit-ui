/* eslint-disable react-refresh/only-export-components */
import { Link } from "@/lib";
import { QUICKIT_LINK_TEXT_VARIANTS, QUICKIT_LINK_UNDERLINES } from "@/lib/tokens";
const DOCS_LINK_HREF = "/docs/components/button";
const INPUT_LINK_HREF = "/docs/components/input";
const MODAL_LINK_HREF = "/docs/components/modal";
const SAFE_LINK_PROPS = { onClick: (event) => event.preventDefault() };
const LINK_PREVIEW_CODE = `import { Link } from "quickit-ui";

export function LinkPreview() {
  return <Link href="/docs">Visitar documentación</Link>;
}`;
function LinkPreviewCanvas() {
  return <div className="flex items-center justify-center">
      <Link href={DOCS_LINK_HREF} {...SAFE_LINK_PROPS}>Visitar documentación</Link>
    </div>;
}
export const linkDoc = {
  name: "Link",
  description: "Navegación textual con variantes de color, subrayado y tamaño.",
  previewCode: LINK_PREVIEW_CODE,
  preview: <LinkPreviewCanvas />,
  installCode: `import { Link } from "quickit-ui";`,
  examples: [{
    id: "ejemplos-variantes",
    title: "Variantes de texto",
    description: `Variantes: ${QUICKIT_LINK_TEXT_VARIANTS.join(", ")}.`,
    preview: <div className="flex flex-wrap gap-4">
          <Link href={DOCS_LINK_HREF} {...SAFE_LINK_PROPS}>Default</Link>
          <Link href={INPUT_LINK_HREF} variant="muted" {...SAFE_LINK_PROPS}>Muted</Link>
          <Link href={MODAL_LINK_HREF} variant="subtle" {...SAFE_LINK_PROPS}>Subtle</Link>
        </div>,
    code: `import { Link } from "quickit-ui";

export function LinkVariantes() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link href="/docs">Default</Link>
      <Link href="/docs" variant="muted">Muted</Link>
      <Link href="/docs" variant="subtle">Subtle</Link>
    </div>
  );
}`
  }, {
    id: "ejemplos-underline",
    title: "Subrayado",
    description: `Opciones: ${QUICKIT_LINK_UNDERLINES.join(", ")}.`,
    preview: <div className="flex flex-wrap gap-4">
          <Link href={DOCS_LINK_HREF} underline="always" {...SAFE_LINK_PROPS}>Siempre</Link>
          <Link href={INPUT_LINK_HREF} underline="hover" {...SAFE_LINK_PROPS}>Hover</Link>
          <Link href={MODAL_LINK_HREF} underline="none" {...SAFE_LINK_PROPS}>Nunca</Link>
        </div>,
    code: `import { Link } from "quickit-ui";

export function LinkUnderline() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link href="/docs" underline="always">Siempre</Link>
      <Link href="/docs" underline="hover">Hover</Link>
      <Link href="/docs" underline="none">Nunca</Link>
    </div>
  );
}`
  }, {
    id: "ejemplos-color",
    title: "Colores",
    description: "Paleta semántica completa.",
    preview: <div className="flex flex-wrap gap-4">
          <Link href={DOCS_LINK_HREF} color="primary" {...SAFE_LINK_PROPS}>Primary</Link>
          <Link href={DOCS_LINK_HREF} color="neutral" {...SAFE_LINK_PROPS}>Neutral</Link>
          <Link href={DOCS_LINK_HREF} color="primary" {...SAFE_LINK_PROPS}>Primary</Link>
          <Link href={DOCS_LINK_HREF} color="success" {...SAFE_LINK_PROPS}>Success</Link>
          <Link href={DOCS_LINK_HREF} color="danger" {...SAFE_LINK_PROPS}>Danger</Link>
        </div>,
    code: `import { Link } from "quickit-ui";

export function LinkColores() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link href="/docs" color="primary">Primary</Link>
      <Link href="/docs" color="neutral">Neutral</Link>
      <Link href="/docs" color="primary">Primary</Link>
      <Link href="/docs" color="success">Success</Link>
      <Link href="/docs" color="danger">Danger</Link>
    </div>
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "variant",
      type: "QuickitLinkTextVariant",
      defaultValue: '"default"',
      description: "Opacidad del texto."
    }, {
      name: "underline",
      type: "QuickitLinkUnderline",
      defaultValue: '"hover"',
      description: "Controla el subrayado."
    }, {
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: '"neutral"',
      description: "Paleta de color."
    }, {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "Tamaño de fuente."
    }, {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Deshabilita interacción."
    }],
    notes: ["Link acepta atributos nativos de HTMLAnchorElement.", "Para enlaces con apariencia de botón, usa Button con onClick."]
  }]
};
