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
    id: "ejemplos-formulario",
    title: "Formulario de acción",
    description: "Ejemplo realista de botones en un formulario con acciones primaria y secundaria.",
    preview: <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Nombre</label>
          <input type="text" placeholder="Tu nombre" className="rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
          <input type="email" placeholder="tu@email.com" className="rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100" />
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button color="neutral" variant="ghost">Cancelar</Button>
          <Button color="primary" variant="solid">Guardar cambios</Button>
        </div>
      </div>,
    code: `import { Button } from "quickit-ui";

export function ButtonFormulario() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Nombre</label>
        <input type="text" placeholder="Tu nombre" className="rounded-lg border px-3 py-2 text-sm" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Email</label>
        <input type="email" placeholder="tu@email.com" className="rounded-lg border px-3 py-2 text-sm" />
      </div>
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button color="neutral" variant="ghost">Cancelar</Button>
        <Button color="primary" variant="solid">Guardar cambios</Button>
      </div>
    </div>
  );
}`
  }, {
    id: "ejemplos-toolbar",
    title: "Toolbar de acciones",
    description: "Ejemplo de toolbar con botones de acción e iconos.",
    preview: <div className="flex items-center gap-2 rounded-lg border border-neutral-200 p-2 dark:border-neutral-800">
        <Button color="neutral" size="sm" shape="square" aria-label="Nuevo">+</Button>
        <Button color="neutral" size="sm" shape="square" aria-label="Editar">✎</Button>
        <Button color="neutral" size="sm" shape="square" aria-label="Eliminar">🗑</Button>
        <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700" />
        <Button color="primary" size="sm" variant="solid">Exportar</Button>
        <Button color="neutral" size="sm" variant="outline">Configurar</Button>
      </div>,
    code: `import { Button } from "quickit-ui";

export function ButtonToolbar() {
  return (
    <div className="flex items-center gap-2 rounded-lg border p-2">
      <Button color="neutral" size="sm" shape="square" aria-label="Nuevo">+</Button>
      <Button color="neutral" size="sm" shape="square" aria-label="Editar">✎</Button>
      <Button color="neutral" size="sm" shape="square" aria-label="Eliminar">🗑</Button>
      <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700" />
      <Button color="primary" size="sm" variant="solid">Exportar</Button>
      <Button color="neutral" size="sm" variant="outline">Configurar</Button>
    </div>
  );
}`
  }, {
    id: "ejemplos-navegacion",
    title: "Navegación",
    description: "Ejemplo de botones de navegación con diferentes variantes.",
    preview: <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">Configuración</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Ajusta tus preferencias</p>
          </div>
          <Button color="primary" size="sm" variant="solid">Ir</Button>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">Perfil</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Edita tu información</p>
          </div>
          <Button color="neutral" size="sm" variant="outline">Editar</Button>
        </div>
      </div>,
    code: `import { Button } from "quickit-ui";

export function ButtonNavegacion() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <p className="text-sm font-semibold">Configuración</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Ajusta tus preferencias</p>
        </div>
        <Button color="primary" size="sm" variant="solid">Ir</Button>
      </div>
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <p className="text-sm font-semibold">Perfil</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Edita tu información</p>
        </div>
        <Button color="neutral" size="sm" variant="outline">Editar</Button>
      </div>
    </div>
  );
}`
  }, {
    id: "ejemplos-variantes",
    title: "Variantes",
    description: `Variantes disponibles: ${QUICKIT_BUTTON_VARIANTS.join(", ")}.`,
    preview: <div className="flex flex-wrap gap-3">
          <Button color="neutral">Soft</Button>
          <Button color="neutral" variant="solid">Solid</Button>
           <Button color="neutral" variant="outline">Outline</Button>
           <Button color="neutral" variant="ghost">Ghost</Button>
        </div>,
    code: `import { Button } from "quickit-ui";

export function ButtonVariantes() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button color="neutral">Soft</Button>
      <Button color="neutral" variant="solid">Solid</Button>
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
          <Button color="neutral" size="xs">XS</Button>
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
      <Button color="neutral" size="xs">XS</Button>
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
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="danger">Danger</Button>
          <Button color="warning">Warning</Button>
          <Button color="info">Info</Button>
          <Button color="light">Light</Button>
          <Button color="dark">Dark</Button>
        </div>,
    code: `import { Button } from "quickit-ui";

export function ButtonColores() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button color="neutral">Neutral</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="danger">Danger</Button>
      <Button color="warning">Warning</Button>
      <Button color="info">Info</Button>
      <Button color="light">Light</Button>
      <Button color="dark">Dark</Button>
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
    description: "pressEffect controla el feedback en presión. \"none\" desactiva todo (sin scale, sin ripple).",
    preview: <div className="flex flex-wrap gap-3">
          <Button color="neutral" pressEffect="none">None</Button>
          <Button color="neutral" pressEffect="transform">Transform</Button>
          <Button color="neutral" pressEffect="ripple" ripple>Ripple</Button>
        </div>,
    code: `import { Button } from "quickit-ui";

export function ButtonPressEffect() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button color="neutral" pressEffect="none">None</Button>
      <Button color="neutral" pressEffect="transform">Transform</Button>
      <Button color="neutral" pressEffect="ripple" ripple>Ripple</Button>
    </div>
  );
}`,
    note: "pressEffect=\"none\" elimina cualquier feedback visual al presionar. pressEffect=\"ripple\" requiere ripple habilitado en QuickitProvider o activado por instancia con ripple."
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: WEBSITE_BUTTON_DOC.props,
    notes: WEBSITE_BUTTON_DOC.notes
  }]
};
