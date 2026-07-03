/* eslint-disable react-refresh/only-export-components */
import { Button } from "@/lib";
import { QUICKIT_BUTTON_SHAPES, QUICKIT_BUTTON_VARIANTS, QUICKIT_CONTROL_SIZES, QUICKIT_SEMANTIC_COLORS } from "@/lib/tokens";
import { WEBSITE_BUTTON_DOC } from "@/website/docs-content";
const BUTTON_PREVIEW_CODE = `import { Button } from "quickit-ui";

export function ButtonPreview() {
  return <Button color="neutral">Guardar cambios</Button>;
}`;
function ButtonPreviewCanvas() {
  return <div className="flex items-center justify-center">
      <Button color="neutral" size="md">
        Guardar cambios
      </Button>
    </div>;
}
export const buttonDoc = {
  name: "Button",
  description: WEBSITE_BUTTON_DOC.description,
  previewCode: BUTTON_PREVIEW_CODE,
  preview: <ButtonPreviewCanvas />,
  installCode: WEBSITE_BUTTON_DOC.installCode,
  examples: [{
    id: "ejemplos-variantes",
    title: "Variantes",
    description: `Variantes disponibles: ${QUICKIT_BUTTON_VARIANTS.join(", ")}.`,
    preview: <div className="flex flex-wrap gap-3">
          <Button color="neutral">Solid</Button>
          <Button color="neutral" variant="outline">Outline</Button>
          <Button color="neutral" variant="ghost">Ghost</Button>
        </div>,
    code: `import { Button } from "quickit-ui";

export function ButtonVariantes() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button color="neutral">Solid</Button>
      <Button color="neutral" variant="outline">Outline</Button>
      <Button color="neutral" variant="ghost">Ghost</Button>
    </div>
  );
}`
  }, {
    id: "ejemplos-tamanos",
    title: "Tamaños",
    description: `Tamaños disponibles: ${QUICKIT_CONTROL_SIZES.join(", ")}.`,
    preview: <div className="flex flex-wrap items-end gap-3">
          <Button color="neutral" size="sm">Small</Button>
          <Button color="neutral" size="md">Medium</Button>
          <Button color="neutral" size="lg">Large</Button>
          <Button color="neutral" size="xl">XL</Button>
          <Button color="neutral" size="2xl">2XL</Button>
        </div>,
    code: `import { Button } from "quickit-ui";

export function ButtonTamanos() {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <Button color="neutral" size="sm">Small</Button>
      <Button color="neutral" size="md">Medium</Button>
      <Button color="neutral" size="lg">Large</Button>
      <Button color="neutral" size="xl">XL</Button>
      <Button color="neutral" size="2xl">2XL</Button>
    </div>
  );
}`
  }, {
    id: "ejemplos-formas",
    title: "Formas",
    description: `Formas disponibles: ${QUICKIT_BUTTON_SHAPES.join(", ")}.`,
    preview: <div className="flex flex-wrap gap-3">
          <Button color="neutral" shape="default">Default</Button>
          <Button color="neutral" shape="pill">Pill</Button>
          <Button color="neutral" shape="square" aria-label="Menu">⋯</Button>
          <Button color="neutral" shape="circle" aria-label="Next">→</Button>
        </div>,
    code: `import { Button } from "quickit-ui";

export function ButtonFormas() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button color="neutral" shape="default">Default</Button>
      <Button color="neutral" shape="pill">Pill</Button>
      <Button color="neutral" shape="square" aria-label="Menu">⋯</Button>
      <Button color="neutral" shape="circle" aria-label="Next">→</Button>
    </div>
  );
}`,
    note: "En `square` y `circle` el `pressEffect=\"transform\"` se desactiva por defecto. Para botones solo-icono usa `aria-label`."
  }, {
    id: "ejemplos-colores",
    title: "Colores",
    description: `Colores disponibles: ${QUICKIT_SEMANTIC_COLORS.join(", ")}.`,
    preview: <div className="flex flex-wrap gap-3">
          <Button color="neutral">Neutral</Button>
          <Button color="slate">Slate</Button>
          <Button color="zinc">Zinc</Button>
          <Button color="primary">Primary</Button>
          <Button color="brand">Brand</Button>
          <Button color="success">Success</Button>
          <Button color="danger">Danger</Button>
          <Button color="warning">Warning</Button>
          <Button color="info">Info</Button>
          <Button color="light">Light</Button>
          <Button color="dark">Dark</Button>
          <Button color="black">Black</Button>
        </div>,
    code: `import { Button } from "quickit-ui";

export function ButtonColores() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button color="neutral">Neutral</Button>
      <Button color="slate">Slate</Button>
      <Button color="zinc">Zinc</Button>
      <Button color="primary">Primary</Button>
      <Button color="brand">Brand</Button>
      <Button color="success">Success</Button>
      <Button color="danger">Danger</Button>
      <Button color="warning">Warning</Button>
      <Button color="info">Info</Button>
      <Button color="light">Light</Button>
      <Button color="dark">Dark</Button>
      <Button color="black">Black</Button>
    </div>
  );
}`
  }, {
    id: "ejemplos-estados",
    title: "Estados",
    description: "Incluye loading, disabled y pressed.",
    preview: <div className="flex flex-wrap gap-3">
          <Button color="neutral" loading>Guardando</Button>
          <Button color="neutral" loading spinner={false}>Enviando</Button>
          <Button color="neutral" loading loadingText="Actualizando">Guardar</Button>
          <Button color="neutral" disabled>Deshabilitado</Button>
          <Button color="neutral" pressed>Presionado</Button>
        </div>,
    code: `import { Button } from "quickit-ui";

export function ButtonEstados() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button color="neutral" loading>Guardando</Button>
      <Button color="neutral" loading spinner={false}>Enviando</Button>
      <Button color="neutral" loading loadingText="Actualizando">Guardar</Button>
      <Button color="neutral" disabled>Deshabilitado</Button>
      <Button color="neutral" pressed>Presionado</Button>
    </div>
  );
}`
  }, {
    id: "ejemplos-press-effect",
    title: "Press effect",
    description: "pressEffect controla el feedback en presión. ripple fuerza el efecto por instancia.",
    preview: <div className="flex flex-wrap gap-3">
          <Button color="neutral" pressEffect="transform">Transform</Button>
          <Button color="neutral" pressEffect="ripple" ripple>Ripple</Button>
        </div>,
    code: `import { Button } from "quickit-ui";

export function ButtonPressEffect() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button color="neutral" pressEffect="transform">Transform</Button>
      <Button color="neutral" pressEffect="ripple" ripple>Ripple</Button>
    </div>
  );
}`,
    note: "pressEffect=\"ripple\" requiere ripple habilitado en QuickitProvider o activado por instancia con ripple."
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: WEBSITE_BUTTON_DOC.props,
    notes: WEBSITE_BUTTON_DOC.notes
  }]
};
