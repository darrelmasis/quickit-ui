/* eslint-disable react-refresh/only-export-components */
import { Link } from "@/lib";
import { QUICKIT_LINK_TEXT_VARIANTS, QUICKIT_LINK_UNDERLINES } from "@/lib/tokens";
const LINK_PREVIEW_CODE = `import { Link } from "quickit-ui";

export function LinkPreview() {
  return <Link href="#">Visitar documentación</Link>;
}`;
const LINK_USAGE_CODE = `import { Link } from "quickit-ui";

export function LinkUsage() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link href="#">Link básico</Link>
      <Link href="#" variant="muted">
        Muted
      </Link>
      <Link href="#" appearance="button" color="neutral">
        Acción
      </Link>
    </div>
  );
}`;
function LinkPreviewCanvas() {
  return <div className="flex items-center justify-center">
      <Link href="#">Visitar documentación</Link>
    </div>;
}
export const linkDoc = {
  name: "Link",
  description: "Link cubre navegación y acciones tipo botón con variantes de texto, subrayado y apariencia de botón.",
  previewCode: LINK_PREVIEW_CODE,
  preview: <LinkPreviewCanvas />,
  installCode: `import { Link } from "quickit-ui";`,
  usageCode: LINK_USAGE_CODE,
  examples: [{
    id: "ejemplos-variantes",
    title: "Variantes de texto",
    description: `Variantes disponibles: ${QUICKIT_LINK_TEXT_VARIANTS.join(", ")}.`,
    preview: <div className="flex flex-wrap gap-4">
          <Link href="#">Default</Link>
          <Link href="#" variant="muted">
            Muted
          </Link>
          <Link href="#" variant="subtle">
            Subtle
          </Link>
        </div>
  }, {
    id: "ejemplos-underline",
    title: "Subrayado",
    description: `Opciones: ${QUICKIT_LINK_UNDERLINES.join(", ")}.`,
    preview: <div className="flex flex-wrap gap-4">
          <Link href="#" underline="always">
            Siempre
          </Link>
          <Link href="#" underline="hover">
            Hover
          </Link>
          <Link href="#" underline="none">
            Nunca
          </Link>
        </div>
  }, {
    id: "ejemplos-boton",
    title: "Apariencia de botón",
    description: "`appearance=\"button\"` habilita shape, size y variantes de Button.",
    preview: <div className="flex flex-wrap gap-3">
          <Link href="#" appearance="button" color="neutral">
            Neutral
          </Link>
          <Link href="#" appearance="button" color="slate">
            Slate
          </Link>
          <Link href="#" appearance="button" color="zinc">
            Zinc
          </Link>
          <Link href="#" appearance="button" color="primary">
            Primary
          </Link>
          <Link href="#" appearance="button" color="brand">
            Brand
          </Link>
          <Link href="#" appearance="button" color="success">
            Success
          </Link>
          <Link href="#" appearance="button" color="danger">
            Danger
          </Link>
          <Link href="#" appearance="button" color="warning">
            Warning
          </Link>
          <Link href="#" appearance="button" color="info">
            Info
          </Link>
          <Link href="#" appearance="button" color="light">
            Light
          </Link>
          <Link href="#" appearance="button" color="dark">
            Dark
          </Link>
          <Link href="#" appearance="button" color="black">
            Black
          </Link>
        </div>
  }, {
    id: "ejemplos-icono",
    title: "Icon button",
    description: "Cuando solo hay icono, añade aria-label o title.",
    preview: <div className="flex flex-wrap gap-3">
          <Link href="#" appearance="button" shape="circle" color="neutral" aria-label="Abrir menú">
            ⋯
          </Link>
          <Link href="#" appearance="button" shape="square" color="neutral" aria-label="Subir">
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
      description: "Define la variante de texto o la variante de botón cuando appearance es button."
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
    notes: ["Link acepta atributos nativos de HTMLAnchorElement.", "Si appearance es button y shape es square o circle, define aria-label, aria-labelledby o title."]
  }]
};
