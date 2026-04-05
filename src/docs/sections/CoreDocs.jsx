import { useMemo } from "react";
import { Button } from "@/lib";
import {
  CodeExample,
  NotesList,
  PreviewPanel,
  PropsTable,
  SectionCard,
  SectionHeading,
} from "@/docs/components/DocsPrimitives";

const buttonColors = [
  { label: "Neutral", color: "neutral" },
  { label: "Primary", color: "primary" },
  { label: "Success", color: "success" },
  { label: "Danger", color: "danger" },
  { label: "Warning", color: "warning" },
  { label: "Info", color: "info" },
  { label: "Light", color: "light" },
  { label: "Dark", color: "dark" },
];

const buttonApi = [
  { prop: "variant", type: "solid | outline | ghost", defaultValue: "solid", description: "Define el tratamiento visual base del botón." },
  { prop: "color", type: "neutral | primary | success | danger | warning | info | light | dark", defaultValue: "primary", description: "Aplica el color semántico dentro de la variante elegida. En la documentación se usa `neutral` por defecto para mantener la UI base más sobria." },
  { prop: "size", type: "sm | md | lg | xl | 2xl", defaultValue: "md", description: "Controla altura, padding y tamaño tipográfico." },
  { prop: "shape", type: "default | square | pill", defaultValue: "default", description: "Cambia entre botón horizontal, icon button cuadrado o botón cápsula." },
  { prop: "loading", type: "boolean", defaultValue: "false", description: "Deshabilita interacción y muestra estado de carga." },
  { prop: "loadingText", type: "string", defaultValue: "children", description: "Texto alterno que se muestra únicamente durante loading." },
  { prop: "spinner", type: "boolean", defaultValue: "true", description: "Permite ocultar el spinner aunque el botón esté en loading." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Desactiva interacción manualmente." },
  { prop: "fullWidth", type: "boolean", defaultValue: "false", description: "Expande el botón a `w-full`." },
  { prop: "active", type: "boolean", defaultValue: "false", description: "Aplica un estado visual activo persistente." },
  { prop: "pressed", type: "boolean", defaultValue: "false", description: "Marca el botón como presionado y añade `aria-pressed`." },
  { prop: "aria-label / aria-labelledby / title", type: "string", defaultValue: "undefined", description: "Recomendado cuando `shape=\"square\"` no tiene texto visible." },
];

const buttonNotes = [
  "Cuando `loading` es `true`, el botón se deshabilita automáticamente.",
  "En `size=\"sm\"` o `shape=\"square\"`, el estado loading muestra solo el spinner.",
  "Si `spinner={false}`, puedes mantener loading sin icono girando.",
  "El botón tiene feedback visual nativo en `:active` al presionar con puntero, además de los estados controlados `active` y `pressed`.",
  "Los botones horizontales tienen un `min-width` por tamaño para mantener consistencia visual entre acciones.",
  "`shape=\"pill\"` usa radio completo y funciona bien para acciones más promocionales o filtros tipo cápsula.",
  "Los botones `square` deben incluir `aria-label`, `aria-labelledby` o `title`.",
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
        description="Botón base de la librería. Soporta variantes visuales, colores, estados, tamaños y shape cuadrado sin depender de CSS custom."
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
          title="Colores"
          code={`<div className="flex flex-wrap items-center gap-3">
  <Button variant="outline" color="neutral">Neutral</Button>
  <Button variant="outline" color="primary">Primary</Button>
  <Button variant="outline" color="success">Success</Button>
  <Button variant="outline" color="danger">Danger</Button>
  <Button variant="outline" color="warning">Warning</Button>
  <Button variant="outline" color="info">Info</Button>
  <Button variant="outline" color="light">Light</Button>
  <Button variant="outline" color="dark">Dark</Button>
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
            </div>
          </PreviewPanel>

          <PreviewPanel
            ui={ui}
            title="Full width"
            code={`<Button fullWidth color="neutral">Continuar</Button>`}
          >
            <Button fullWidth color="neutral">Continuar</Button>
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
  fullWidth
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
