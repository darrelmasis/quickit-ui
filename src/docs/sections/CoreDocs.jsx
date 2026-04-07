import { useMemo } from "react";
import {
  Button,
  QUICKIT_SEMANTIC_COLORS,
} from "@/lib";
import {
  CodeExample,
  NotesList,
  PreviewPanel,
  PropsTable,
  SectionCard,
  SectionHeading,
} from "@/docs/components/DocsPrimitives";

const buttonColors = QUICKIT_SEMANTIC_COLORS.map((color) => ({
  color,
  label: color.charAt(0).toUpperCase() + color.slice(1),
}));

const buttonApi = [
  { prop: "variant", type: "solid | outline | ghost", defaultValue: "solid", description: "Define el tratamiento visual base del botón." },
  { prop: "color", type: "neutral | slate | zinc | primary | brand | success | danger | warning | info | light | dark | black", defaultValue: "primary", description: "Aplica el color semántico dentro de la variante elegida. `neutral` mantiene la base premium de la librería; `slate` y `zinc` exponen variantes neutras más explícitas; `black` queda como la opción más densa." },
  { prop: "size", type: "sm | md | lg | xl | 2xl", defaultValue: "md", description: "Controla altura, padding y tamaño tipográfico." },
  { prop: "shape", type: "default | square | circle | pill", defaultValue: "default", description: "Cambia entre botón horizontal, icon button cuadrado, icon button circular o botón cápsula." },
  { prop: "loading", type: "boolean", defaultValue: "false", description: "Deshabilita interacción y muestra estado de carga." },
  { prop: "loadingText", type: "string", defaultValue: "children", description: "Texto alterno que se muestra únicamente durante loading." },
  { prop: "spinner", type: "boolean", defaultValue: "true", description: "Permite ocultar el spinner aunque el botón esté en loading." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Desactiva interacción manualmente." },
  { prop: "fullWidth", type: "boolean", defaultValue: "false", description: "Expande el botón a `w-full`." },
  { prop: "active", type: "boolean", defaultValue: "false", description: "Aplica un estado visual activo persistente, incluyendo cambio de color además del tratamiento de presión." },
  { prop: "pressed", type: "boolean", defaultValue: "false", description: "Marca el botón como presionado, añade `aria-pressed` y usa el mismo estado cromático activo." },
  { prop: "activeMotion", type: "boolean", defaultValue: "true, excepto en `shape=\"square\"` y `shape=\"circle\"`", description: "Permite controlar la animación nativa de `:active`. Los icon buttons `square` y `circle` la traen desactivada por defecto para una interacción más sobria." },
  { prop: "pressEffect", type: "transform | ripple", defaultValue: "transform", description: "Elige el feedback principal de presión para esta instancia. Por defecto Quickit usa `transform`." },
  { prop: "ripple", type: "boolean", defaultValue: "depende de `pressEffect`", description: "Override de bajo nivel para activar o desactivar solo el ripple en esta instancia." },
  { prop: "aria-label / aria-labelledby / title", type: "string", defaultValue: "undefined", description: "Recomendado cuando `shape=\"square\"` o `shape=\"circle\"` no tienen texto visible." },
];

const buttonNotes = [
  "Cuando `loading` es `true`, el botón se deshabilita automáticamente.",
  "En `size=\"sm\"` o `shape=\"square\"`, el estado loading muestra solo el spinner.",
  "Si `spinner={false}`, puedes mantener loading sin icono girando.",
  "El botón tiene feedback visual nativo en `:active` al presionar con puntero, con cambio real de color en borde/fondo/texto además de la animación de presión.",
  "Por defecto Quickit usa `transform` como feedback de presión. Si prefieres ripple, configúralo con `pressEffect=\"ripple\"` por instancia o desde `QuickitProvider`.",
  "Los icon buttons `shape=\"square\"` y `shape=\"circle\"` salen sin `activeMotion` por defecto; puedes reactivarlo explícitamente con `activeMotion={true}`.",
  "Los botones horizontales tienen un `min-width` por tamaño para mantener consistencia visual entre acciones.",
  "Si necesitas que sea `full width` solo en móvil, usa clases responsivas como `w-full sm:w-48`; `fullWidth` por sí solo siempre aplica `w-full`.",
  "`shape=\"pill\"` usa radio completo y funciona bien para acciones más promocionales o filtros tipo cápsula.",
  "Los botones `square` y `circle` deben incluir `aria-label`, `aria-labelledby` o `title`.",
];

export function CoreDocs({ buttonLoading, onButtonLoadingStart, ui, visibleIds }) {
  const isVisible = useMemo(
    () => !visibleIds || visibleIds.has("button"),
    [visibleIds],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <SectionCard id="button" className={ui.divider}>
      <SectionHeading
        category="Acciones"
        title="Button"
        description="Botón base de la librería. Soporta variantes visuales, colores, estados, tamaños y shapes horizontales o de icon button sin depender de CSS custom."
        ui={ui}
      />

      <div className="mt-6 space-y-4">
        <PreviewPanel
          ui={ui}
          title="Variantes"
          code={`<div className="flex flex-wrap items-center gap-3">
  <Button color="neutral">Solid</Button>
  <Button variant="outline" color="neutral">Outline</Button>
  <Button variant="ghost" color="neutral">Ghost</Button>
</div>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button color="neutral">Solid</Button>
            <Button variant="outline" color="neutral">Outline</Button>
            <Button variant="ghost" color="neutral">Ghost</Button>
          </div>
        </PreviewPanel>

        <PreviewPanel
          ui={ui}
          title="Estados"
          code={`<div className="flex flex-wrap items-center gap-3">
  <Button size="lg" color="neutral">Probar Button</Button>
  <Button disabled color="neutral">Disabled</Button>
  <Button variant="outline" color="neutral" active>
    Active
  </Button>
  <Button variant="outline" color="neutral" pressed>
    Pressed
  </Button>
  <Button loading spinner={false} loadingText="Guardando" color="neutral">
    Guardar
  </Button>
</div>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" color="neutral" loading={buttonLoading} loadingText="Cargando" onClick={onButtonLoadingStart}>
              Probar Button
            </Button>
            <Button disabled color="neutral">Disabled</Button>
            <Button variant="outline" color="neutral" active>
              Active
            </Button>
            <Button variant="outline" color="neutral" pressed>
              Pressed
            </Button>
            <Button loading spinner={false} loadingText="Guardando" color="neutral">
              Guardar
            </Button>
          </div>
        </PreviewPanel>

        <PreviewPanel
          ui={ui}
          title="Colores solid"
          code={`<div className="flex flex-wrap items-center gap-3">
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
</div>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            {buttonColors.map((item) => (
              <Button key={`solid-${item.color}`} color={item.color}>
                {item.label}
              </Button>
            ))}
          </div>
        </PreviewPanel>

        <PreviewPanel
          ui={ui}
          title="Colores outline"
          code={`<div className="flex flex-wrap items-center gap-3">
  <Button variant="outline" color="neutral">Neutral</Button>
  <Button variant="outline" color="slate">Slate</Button>
  <Button variant="outline" color="zinc">Zinc</Button>
  <Button variant="outline" color="primary">Primary</Button>
  <Button variant="outline" color="brand">Brand</Button>
  <Button variant="outline" color="success">Success</Button>
  <Button variant="outline" color="danger">Danger</Button>
  <Button variant="outline" color="warning">Warning</Button>
  <Button variant="outline" color="info">Info</Button>
  <Button variant="outline" color="light">Light</Button>
  <Button variant="outline" color="dark">Dark</Button>
  <Button variant="outline" color="black">Black</Button>
</div>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            {buttonColors.map((item) => (
              <Button key={item.color} variant="outline" color={item.color}>
                {item.label}
              </Button>
            ))}
          </div>
        </PreviewPanel>

        <div className="space-y-4">
          <PreviewPanel
            ui={ui}
            title="Caso real: toolbar de acciones"
            code={`<div className="flex flex-wrap items-center gap-3">
  <Button color="neutral">Guardar</Button>
  <Button variant="outline" color="neutral">Vista previa</Button>
  <Button variant="ghost" color="neutral">Descartar</Button>
  <Button shape="square" variant="outline" color="neutral" aria-label="Más acciones">
    +
  </Button>
</div>`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button color="neutral">Guardar</Button>
              <Button variant="outline" color="neutral">Vista previa</Button>
              <Button variant="ghost" color="neutral">Descartar</Button>
              <Button shape="square" variant="outline" color="neutral" aria-label="Más acciones">
                +
              </Button>
            </div>
          </PreviewPanel>

          <PreviewPanel
            ui={ui}
            title="Tamaños y shape"
            code={`<div className="space-y-4">
  <div className="flex flex-wrap items-center gap-3">
    <Button size="sm" color="neutral">Small</Button>
    <Button size="md" color="neutral">Medium</Button>
    <Button size="lg" color="neutral">Large</Button>
    <Button size="xl" color="neutral">XL</Button>
    <Button size="2xl" color="neutral">2XL</Button>
  </div>
  <div className="flex flex-wrap items-center gap-3">
    <Button shape="pill" size="sm" color="neutral">Filtro</Button>
    <Button shape="pill" size="md" color="neutral">Explorar</Button>
    <Button shape="pill" size="lg" color="neutral">Publicar</Button>
  </div>
  <div className="flex flex-wrap items-center gap-3">
    <Button shape="square" size="sm" color="neutral" aria-label="Agregar">+</Button>
    <Button shape="square" size="md" color="neutral" aria-label="Más">+</Button>
    <Button shape="square" size="lg" color="neutral" aria-label="Cerrar">×</Button>
  </div>
  <div className="flex flex-wrap items-center gap-3">
    <Button shape="circle" size="sm" color="neutral" aria-label="Buscar">+</Button>
    <Button shape="circle" size="md" color="neutral" aria-label="Favorito">+</Button>
    <Button shape="circle" size="lg" color="neutral" aria-label="Notificaciones">+</Button>
  </div>
</div>`}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" color="neutral">Small</Button>
                <Button size="md" color="neutral">Medium</Button>
                <Button size="lg" color="neutral">Large</Button>
                <Button size="xl" color="neutral">XL</Button>
                <Button size="2xl" color="neutral">2XL</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button shape="pill" size="sm" color="neutral">Filtro</Button>
                <Button shape="pill" size="md" color="neutral">Explorar</Button>
                <Button shape="pill" size="lg" color="neutral">Publicar</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button shape="square" size="sm" color="neutral" aria-label="Agregar">+</Button>
                <Button shape="square" size="md" color="neutral" aria-label="Más">+</Button>
                <Button shape="square" size="lg" color="neutral" aria-label="Cerrar">×</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button shape="circle" size="sm" color="neutral" aria-label="Buscar">+</Button>
                <Button shape="circle" size="md" color="neutral" aria-label="Favorito">+</Button>
                <Button shape="circle" size="lg" color="neutral" aria-label="Notificaciones">+</Button>
              </div>
            </div>
          </PreviewPanel>

          <PreviewPanel
            ui={ui}
            title="Icon buttons y activeMotion"
            code={`<div className="flex flex-wrap items-center gap-3">
  <Button shape="square" variant="outline" color="neutral" aria-label="Buscar">
    +
  </Button>
  <Button
    shape="square"
    variant="outline"
    color="neutral"
    activeMotion
    aria-label="Buscar con motion"
  >
    +
  </Button>
  <Button shape="circle" variant="outline" color="neutral" aria-label="Favorito">
    +
  </Button>
</div>

<p className="text-sm text-neutral-500">
  Los botones square y circle salen sin activeMotion por defecto. Si quieres esa animación,
  debes activarla manualmente.
</p>`}
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Button shape="square" variant="outline" color="neutral" aria-label="Buscar">
                  +
                </Button>
                <Button
                  shape="square"
                  variant="outline"
                  color="neutral"
                  activeMotion
                  aria-label="Buscar con motion"
                >
                  +
                </Button>
                <Button shape="circle" variant="outline" color="neutral" aria-label="Favorito">
                  +
                </Button>
              </div>
              <p className={`text-sm ${ui.body}`}>
                Los botones <code>square</code> y <code>circle</code> salen sin <code>activeMotion</code> por defecto.
                Si quieres ese feedback de presión, actívalo manualmente.
              </p>
            </div>
          </PreviewPanel>

          <PreviewPanel
            ui={ui}
            title="Edge case: ancho flexible y texto largo"
            code={`<div className="grid gap-3 sm:grid-cols-2">
  <Button color="neutral" className="w-full justify-center">
    Guardar cambios del entorno actual
  </Button>
  <Button variant="outline" color="neutral" className="w-full" loading loadingText="Sincronizando">
    Sincronizar configuración
  </Button>
</div>`}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Button color="neutral" className="w-full justify-center">
                Guardar cambios del entorno actual
              </Button>
              <Button variant="outline" color="neutral" className="w-full" loading loadingText="Sincronizando">
                Sincronizar configuración
              </Button>
            </div>
          </PreviewPanel>

          <PreviewPanel
            ui={ui}
            title="Responsive width"
            code={`<div className="flex flex-col gap-3 sm:flex-row">
  <Button color="neutral" className="w-full sm:w-48">
    Continuar
  </Button>
  <Button variant="outline" color="neutral" className="w-full sm:w-48">
    Cancelar
  </Button>
</div>`}
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button color="neutral" className="w-full sm:w-48">
                Continuar
              </Button>
              <Button variant="outline" color="neutral" className="w-full sm:w-48">
                Cancelar
              </Button>
            </div>
          </PreviewPanel>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <p className={`text-sm font-semibold ${ui.title}`}>API</p>
          <PropsTable rows={buttonApi} ui={ui} />
        </div>
        <div>
          <p className={`text-sm font-semibold ${ui.title}`}>Uso base</p>
          <CodeExample
            ui={ui}
            title="Uso base"
            code={`<Button
  variant="outline"
  color="neutral"
  size="lg"
  className="w-full sm:w-56"
>
  Continuar
</Button>`}
          />
        </div>
      </div>

      <div className="mt-8">
        <p className={`text-sm font-semibold ${ui.title}`}>Notas de uso</p>
        <NotesList items={buttonNotes} ui={ui} />
      </div>
    </SectionCard>
  );
}

export default CoreDocs;
