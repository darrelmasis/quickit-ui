/* eslint-disable react-refresh/only-export-components */
import { Link } from "@/lib";
import { QUICKIT_LINK_TEXT_VARIANTS, QUICKIT_LINK_UNDERLINES } from "@/lib/tokens";
const DOCS_LINK_HREF = "/docs/components/button";
const INPUT_LINK_HREF = "/docs/components/input";
const MODAL_LINK_HREF = "/docs/components/modal";
const SETTINGS_LINK_HREF = "/examples/flows/settings-theme";
const SAFE_LINK_PROPS = {
  onClick: (event) => event.preventDefault()
};
const LINK_PREVIEW_CODE = `import { Link } from "quickit-ui";

export function LinkPreview() {
  return <Link href="/docs/components/button">Visitar documentación</Link>;
}`;
const LINK_USAGE_CODE = `import { Link } from "quickit-ui";

export function LinkUsage() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link href="/docs/components/button">Link básico</Link>
      <Link href="/docs/components/input" variant="muted">
        Muted
      </Link>
      <Link href="/docs/components/modal" appearance="button" color="neutral">
        Acción
      </Link>
    </div>
  );
}`;
function LinkPreviewCanvas() {
  return <div className="flex items-center justify-center">
      <Link href={DOCS_LINK_HREF} {...SAFE_LINK_PROPS}>Visitar documentación</Link>
    </div>;
}
export const linkDoc = {
  name: "Link",
  description: "Link cubre navegación textual y acciones con apariencia de botón. El significado de varias props cambia según `appearance`.",
  previewCode: LINK_PREVIEW_CODE,
  preview: <LinkPreviewCanvas />,
  installCode: `import { Link } from "quickit-ui";`,
  usageCode: LINK_USAGE_CODE,
  examples: [{
    id: "ejemplos-variantes",
    title: "Variantes de texto",
    description: `Variantes disponibles: ${QUICKIT_LINK_TEXT_VARIANTS.join(", ")}.`,
    preview: <div className="flex flex-wrap gap-4">
          <Link href={DOCS_LINK_HREF} {...SAFE_LINK_PROPS}>Default</Link>
          <Link href={INPUT_LINK_HREF} variant="muted" {...SAFE_LINK_PROPS}>
            Muted
          </Link>
          <Link href={MODAL_LINK_HREF} variant="subtle" {...SAFE_LINK_PROPS}>
            Subtle
          </Link>
        </div>
  }, {
    id: "ejemplos-underline",
    title: "Subrayado",
    description: `Opciones: ${QUICKIT_LINK_UNDERLINES.join(", ")}.`,
    preview: <div className="flex flex-wrap gap-4">
          <Link href={DOCS_LINK_HREF} underline="always" {...SAFE_LINK_PROPS}>
            Siempre
          </Link>
          <Link href={INPUT_LINK_HREF} underline="hover" {...SAFE_LINK_PROPS}>
            Hover
          </Link>
          <Link href={MODAL_LINK_HREF} underline="none" {...SAFE_LINK_PROPS}>
            Nunca
          </Link>
        </div>
  }, {
    id: "ejemplos-boton",
    title: "Apariencia de botón",
    description: "`appearance=\"button\"` habilita shape, size y variantes de Button.",
    preview: <div className="flex flex-wrap gap-3">
          <Link href={SETTINGS_LINK_HREF} appearance="button" color="neutral" {...SAFE_LINK_PROPS}>
            Neutral
          </Link>
          <Link href={SETTINGS_LINK_HREF} appearance="button" color="slate" {...SAFE_LINK_PROPS}>
            Slate
          </Link>
          <Link href={SETTINGS_LINK_HREF} appearance="button" color="zinc" {...SAFE_LINK_PROPS}>
            Zinc
          </Link>
          <Link href={SETTINGS_LINK_HREF} appearance="button" color="primary" {...SAFE_LINK_PROPS}>
            Primary
          </Link>
          <Link href={SETTINGS_LINK_HREF} appearance="button" color="brand" {...SAFE_LINK_PROPS}>
            Brand
          </Link>
          <Link href={SETTINGS_LINK_HREF} appearance="button" color="success" {...SAFE_LINK_PROPS}>
            Success
          </Link>
          <Link href={SETTINGS_LINK_HREF} appearance="button" color="danger" {...SAFE_LINK_PROPS}>
            Danger
          </Link>
          <Link href={SETTINGS_LINK_HREF} appearance="button" color="warning" {...SAFE_LINK_PROPS}>
            Warning
          </Link>
          <Link href={SETTINGS_LINK_HREF} appearance="button" color="info" {...SAFE_LINK_PROPS}>
            Info
          </Link>
          <Link href={SETTINGS_LINK_HREF} appearance="button" color="light" {...SAFE_LINK_PROPS}>
            Light
          </Link>
          <Link href={SETTINGS_LINK_HREF} appearance="button" color="dark" {...SAFE_LINK_PROPS}>
            Dark
          </Link>
          <Link href={SETTINGS_LINK_HREF} appearance="button" color="black" {...SAFE_LINK_PROPS}>
            Black
          </Link>
        </div>
  }, {
    id: "ejemplos-icono",
    title: "Icon button",
    description: "Cuando solo hay icono, añade aria-label o title.",
    preview: <div className="flex flex-wrap gap-3">
          <Link href={SETTINGS_LINK_HREF} appearance="button" shape="circle" color="neutral" aria-label="Abrir menú" {...SAFE_LINK_PROPS}>
            ⋯
          </Link>
          <Link href={SETTINGS_LINK_HREF} appearance="button" shape="square" color="neutral" aria-label="Subir" {...SAFE_LINK_PROPS}>
            ↑
          </Link>
        </div>
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "appearance",
      type: `"text" | "button"`,
      defaultValue: `"text"`,
      description: "Define si se renderiza como texto o botón."
    }, {
      name: "variant",
      type: "QuickitLinkTextVariant | QuickitButtonVariant",
      defaultValue: `"default"`,
      description: "Con `appearance=\"text\"` usa variantes de link; con `appearance=\"button\"` reutiliza variantes de Button."
    }, {
      name: "underline",
      type: "QuickitLinkUnderline",
      defaultValue: `"hover"`,
      description: "Controla cuándo se muestra el subrayado."
    }, {
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"primary"`,
      description: "Paleta aplicada al texto o botón."
    }, {
      name: "shape",
      type: "QuickitButtonShape",
      defaultValue: `"default"`,
      description: "Solo disponible si appearance es button."
    }, {
      name: "size",
      type: "QuickitControlSize",
      defaultValue: `"md"`,
      description: "Solo disponible si appearance es button."
    }, {
      name: "fullWidth",
      type: "boolean",
      defaultValue: "false",
      description: "Hace el link botón 100% ancho."
    }, {
      name: "pressEffect",
      type: "QuickitPressEffect",
      defaultValue: "provider",
      description: "Sobrescribe el press effect global."
    }, {
      name: "ripple",
      type: "boolean",
      defaultValue: "provider",
      description: "Activa ripple por instancia."
    }, {
      name: "activeMotion",
      type: "boolean",
      defaultValue: "auto",
      description: "Habilita el motion de presión."
    }],
    notes: ["Link acepta atributos nativos de HTMLAnchorElement.", "Piensa el componente como dos contratos: texto navegable y link con apariencia de botón.", "Los ejemplos usan rutas reales pero cancelan la navegación en el preview para no sacarte de la documentación.", "Si `appearance` es `button` y `shape` es `square` o `circle`, define `aria-label`, `aria-labelledby` o `title`."]
  }]
};
