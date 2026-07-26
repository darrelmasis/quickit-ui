/* eslint-disable react-refresh/only-export-components */
import { Badge, Button } from "@/lib";
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
    id: "ejemplos-estados",
    title: "Estados de pedido",
    description: "Ejemplo realista de badges para estados de pedidos.",
    preview: <div className="flex flex-wrap gap-3">
          <Badge color="success" variant="soft">Entregado</Badge>
          <Badge color="primary" variant="soft">En proceso</Badge>
          <Badge color="warning" variant="soft">Pendiente</Badge>
          <Badge color="danger" variant="soft">Cancelado</Badge>
        </div>,
    code: `import { Badge } from "quickit-ui";

export function BadgeEstados() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge color="success" variant="soft">Entregado</Badge>
      <Badge color="primary" variant="soft">En proceso</Badge>
      <Badge color="warning" variant="soft">Pendiente</Badge>
      <Badge color="danger" variant="soft">Cancelado</Badge>
    </div>
  );
}`
  }, {
    id: "ejemplos-categorias",
    title: "Categorías de producto",
    description: "Ejemplo realista de badges para categorías.",
    preview: <div className="flex flex-wrap gap-3">
          <Badge color="neutral" variant="outline">Electrónicos</Badge>
          <Badge color="neutral" variant="outline">Ropa</Badge>
          <Badge color="neutral" variant="outline">Hogar</Badge>
          <Badge color="neutral" variant="outline">Deportes</Badge>
        </div>,
    code: `import { Badge } from "quickit-ui";

export function BadgeCategorias() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge color="neutral" variant="outline">Electrónicos</Badge>
      <Badge color="neutral" variant="outline">Ropa</Badge>
      <Badge color="neutral" variant="outline">Hogar</Badge>
      <Badge color="neutral" variant="outline">Deportes</Badge>
    </div>
  );
}`
  }, {
    id: "ejemplos-notificaciones",
    title: "Indicador de notificaciones",
    description: "Badge como contador, dot de estado y alerta sobre iconos.",
    preview: <div className="flex flex-wrap items-center gap-6">
          <div className="relative">
            <Button shape="circle" variant="soft" color="neutral" size="md" aria-label="Notificaciones">
              <svg aria-hidden="true" viewBox="0 0 448 512" className="size-5">
                <path fill="currentColor" d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377.4C-14.5 399.9 1.2 438 30.5 438l387 0c29.3 0 45-38.1 25.2-60.6l-14.9-17.1C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 512c35.3 0 64-28.7 64-64l-128 0c0 35.3 28.7 64 64 64z"/>
              </svg>
            </Button>
            <Badge color="danger" variant="solid" className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full px-1 text-[0.625rem] leading-none ring-2 ring-white dark:ring-neutral-950">3</Badge>
          </div>
          <div className="relative">
            <Button shape="circle" variant="soft" color="neutral" size="md" aria-label="Mensajes">
              <svg aria-hidden="true" viewBox="0 0 512 512" className="size-5">
                <path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"/>
              </svg>
            </Button>
            <Badge color="primary" variant="solid" className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full px-1 text-[0.625rem] leading-none ring-2 ring-white dark:ring-neutral-950">12</Badge>
          </div>
          <div className="relative">
            <Button shape="circle" variant="soft" color="neutral" size="md" aria-label="Configuración">
              <svg aria-hidden="true" viewBox="0 0 512 512" className="size-5">
                <path fill="currentColor" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-14.2 10-22.8 8.3l-52.2-10.8c-14.1 10.4-29.4 18.8-45.8 25l-11.3 52.9c-1.9 8.7-8.5 15.2-17.1 17.1c-12.2 2.7-24.6 4-37.2 4s-25.1-1.3-37.2-4c-8.7-1.9-15.2-8.5-17.1-17.1l-11.3-52.9c-16.4-6.2-31.7-14.6-45.8-25L108.2 432.7c-8.6 1.7-16.9-1.1-22.8-8.3c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C90.6 273.1 90 264.6 90 256s.6-17.1 1.7-25.4L48.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 14.2-10 22.8-8.3l52.2 10.8c14.1-10.4 29.4-18.8 45.8-25l11.3-52.9c1.9-8.7 8.5-15.2 17.1-17.1c12.2-2.7 24.6-4 37.2-4s25.1 1.3 37.2 4c8.7 1.9 15.2 8.5 17.1 17.1l11.3 52.9c16.4 6.2 31.7 14.6 45.8 25l52.2-10.8c8.6-1.7 16.9 1.1 22.8 8.3c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
              </svg>
            </Button>
            <Badge color="warning" variant="solid" className="absolute -top-0.5 -right-0.5 size-3.5 rounded-full ring-2 ring-white dark:ring-neutral-950" />
          </div>
          <div className="relative">
            <Button shape="circle" variant="soft" color="neutral" size="md" aria-label="Perfil">
              <svg aria-hidden="true" viewBox="0 0 448 512" className="size-5">
                <path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
              </svg>
            </Button>
            <Badge color="success" variant="solid" className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full ring-2 ring-white dark:ring-neutral-950" />
          </div>
        </div>,
    code: `import { Badge, Button } from "quickit-ui";

export function BadgeNotificaciones() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Contador de notificaciones */}
      <div className="relative">
        <Button shape="circle" variant="soft" color="neutral" size="md" aria-label="Notificaciones">
          <svg aria-hidden="true" viewBox="0 0 448 512" className="size-5">
            <path fill="currentColor" d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377.4C-14.5 399.9 1.2 438 30.5 438l387 0c29.3 0 45-38.1 25.2-60.6l-14.9-17.1C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 512c35.3 0 64-28.7 64-64l-128 0c0 35.3 28.7 64 64 64z"/>
          </svg>
        </Button>
        <Badge color="danger" variant="solid" className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full px-1 text-[0.625rem] leading-none ring-2 ring-white dark:ring-neutral-950">3</Badge>
      </div>

      {/* Contador de mensajes */}
      <div className="relative">
        <Button shape="circle" variant="soft" color="neutral" size="md" aria-label="Mensajes">
          <svg aria-hidden="true" viewBox="0 0 512 512" className="size-5">
            <path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"/>
          </svg>
        </Button>
        <Badge color="primary" variant="solid" className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full px-1 text-[0.625rem] leading-none ring-2 ring-white dark:ring-neutral-950">12</Badge>
      </div>

      {/* Dot de alerta */}
      <div className="relative">
        <Button shape="circle" variant="soft" color="neutral" size="md" aria-label="Configuración">
          <svg aria-hidden="true" viewBox="0 0 512 512" className="size-5">
            <path fill="currentColor" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2-5.9 7.2-14.2 10-22.8 8.3l-52.2-10.8c-14.1 10.4-29.4 18.8-45.8 25l-11.3 52.9c-1.9 8.7-8.5 15.2-17.1 17.1-12.2 2.7-24.6 4-37.2 4s-25.1-1.3-37.2-4c-8.7-1.9-15.2-8.5-17.1-17.1l-11.3-52.9c-16.4-6.2-31.7-14.6-45.8-25L108.2 432.7c-8.6 1.7-16.9-1.1-22.8-8.3-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C90.6 273.1 90 264.6 90 256s.6-17.1 1.7-25.4L48.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6 4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2 5.9-7.2 14.2-10 22.8-8.3l52.2 10.8c14.1-10.4 29.4-18.8 45.8-25l11.3-52.9c1.9-8.7 8.5-15.2 17.1-17.1 12.2-2.7 24.6-4 37.2-4s25.1 1.3 37.2 4c8.7 1.9 15.2 8.5 17.1 17.1l11.3 52.9c16.4 6.2 31.7 14.6 45.8 25l52.2-10.8c8.6-1.7 16.9 1.1 22.8 8.3 8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
          </svg>
        </Button>
        <Badge color="warning" variant="solid" className="absolute -top-0.5 -right-0.5 size-3.5 rounded-full ring-2 ring-white dark:ring-neutral-950" />
      </div>

      {/* Dot de presencia */}
      <div className="relative">
        <Button shape="circle" variant="soft" color="neutral" size="md" aria-label="Perfil">
          <svg aria-hidden="true" viewBox="0 0 448 512" className="size-5">
            <path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
          </svg>
        </Button>
        <Badge color="success" variant="solid" className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full ring-2 ring-white dark:ring-neutral-950" />
      </div>
    </div>
  );
}`
  }, {
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
