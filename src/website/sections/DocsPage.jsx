import {
  Badge,
  Button,
  Checkbox,
  Combobox,
  CommandPalette,
  DataTable,
  DatePicker,
  Default,
  Drawer,
  FormControl,
  For,
  Match,
  Modal,
  Progress,
  Input,
  InputGroup,
  Label,
  Link,
  Range,
  RenderSwitch,
  Radio,
  Select,
  Show,
  Stepper,
  Toaster,
  Switch,
  Textarea,
  Breadcrumb,
  Pagination,
  Tabs,
  Dropdown,
  Popover,
  Tooltip,
  Avatar,
  EmptyState,
  Skeleton,
} from "@/lib";
import {
  QUICKIT_BUTTON_SHAPES,
  QUICKIT_BUTTON_VARIANTS,
  QUICKIT_CONTROL_SIZES,
  QUICKIT_SEMANTIC_COLORS,
  QUICKIT_LINK_TEXT_VARIANTS,
  QUICKIT_LINK_UNDERLINES,
  QUICKIT_COMPACT_CONTROL_SIZES,
  QUICKIT_ACCENT_COLORS,
} from "@/lib/tokens";
import { WEBSITE_ROUTES, WEBSITE_SHELL } from "@/website/site-config";
import {
  WEBSITE_BUTTON_DOC,
  WEBSITE_COMPONENT_DOC_SECTIONS,
  WEBSITE_COMPONENT_GROUPS,
  WEBSITE_COMPONENT_LOOKUP,
  WEBSITE_COMPONENT_REVIEW_NOTES,
  WEBSITE_DOC_OVERVIEW_SECTIONS,
  QUICKIT_V1_MIGRATION,
  QUICKIT_V1_RELEASE,
  WEBSITE_HOOKS,
  WEBSITE_HOOK_EXAMPLES,
  INSTALL_COMMAND,
  STYLES_SNIPPET,
  QUICKIT_PROVIDER_SNIPPET,
  THEME_PROVIDER_SNIPPET,
  THEME_TOGGLE_SNIPPET,
  THEME_READ_SNIPPET,
  THEME_FOUC_VITE_SNIPPET,
  THEME_FOUC_NEXT_SNIPPET,
} from "@/website/docs-content";
import { COMPONENT_DOCS } from "@/website/component-docs";
import { hookToSlug } from "@/website/docs-navigation";
import WebsiteCodeBlock from "@/website/components/WebsiteCodeBlock";
import WebsiteDocsSidebar from "@/website/components/WebsiteDocsSidebar";
import WebsitePageToc from "@/website/components/WebsitePageToc";
import WebsitePreviewTabs from "@/website/components/WebsitePreviewTabs";
import WebsiteSection from "@/website/components/WebsiteSection";





function PropsTable({ props }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800">
      <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1fr)_8rem_minmax(0,1.4fr)] border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-950 md:grid dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
        <span>Prop</span>
        <span>Tipo</span>
        <span>Default</span>
        <span>Descripción</span>
      </div>
      <For each={props}>
        {(prop) => (
          <div
            key={prop.name}
            className="grid gap-3 border-t border-neutral-200 px-4 py-4 first:border-t-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_8rem_minmax(0,1.4fr)] dark:border-neutral-800"
          >
            <div>
              <p className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                {prop.name}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                {prop.type}
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">
                {prop.defaultValue}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {prop.description}
              </p>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}

function parseDocsRoute(pathname) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] !== "docs") {
    return { mode: "section", sectionId: "introduccion" };
  }

  if (segments[1] === "components" && segments[2]) {
    return { mode: "component", componentSlug: segments[2] };
  }

  if (segments[1] === "hooks") {
    if (segments[2]) {
      return { mode: "hook", hookSlug: segments[2] };
    }
    return { mode: "hooks-index" };
  }

  const sectionId = segments[1] || "introduccion";
  return { mode: "section", sectionId };
}

function getComponentSections(slug) {
  const doc = COMPONENT_DOCS[slug];
  const reviewNotes = WEBSITE_COMPONENT_REVIEW_NOTES[slug];

  const withReview = (sections) =>
    reviewNotes?.length
      ? [...sections, { id: "notas-revision", label: "Notas de revisión" }]
      : sections;

  if (!doc) {
    return withReview(WEBSITE_COMPONENT_DOC_SECTIONS);
  }

  const exampleChildren =
    doc.examples?.map((example) => ({
      id: example.id,
      label: example.title,
    })) ?? [];

  return withReview([
    { id: "ejemplo-visual", label: "Ejemplo visual y código" },
    { id: "instalacion", label: "Instalación" },
    { id: "uso", label: "Uso" },
    {
      id: "ejemplos",
      label: "Ejemplos",
      children: exampleChildren,
    },
  ]);
}

function ButrviewPage() {
  return (
    <>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-5xl">
          Quickit UI desde una base simple
        </h1>
        <p className="mt-5 text-base leading-8 text-neutral-600 dark:text-neutral-400 sm:text-lg">
          Quickit UI reúne componentes, hooks y utilidades lógicas para
          construir interfaces consistentes sin levantar un sistema desde cero.
          Esta guía parte del código real de la librería y se enfoca en cómo
          usarla, no en cómo leer la implementación.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={WEBSITE_ROUTES.examples}
            appearance="button"
            color="neutral"
          >
            Ver ejemplos
          </Link>
          <span className="inline-flex items-center rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
            {WEBSITE_COMPONENT_GROUPS.reduce(
              (total, group) => total + group.items.length,
              0,
            )}{" "}
            primitives públicas
          </span>
        </div>
      </div>
    </>
  );
}

function HooksIndexPage() {
  return (
    <WebsiteSection
      id="hooks"
      title="Hooks"
      description="La librería también expone hooks de tema, responsive y comportamiento global para no duplicar lógica en la app consumidora."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <For each={WEBSITE_HOOKS}>
          {(hook) => (
            <a
              key={hook.name}
              href={`/docs/hooks/${hookToSlug(hook.name)}`}
              className="rounded-2xl border border-neutral-200 p-6 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
            >
              <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                {hook.name}
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                {hook.description}
              </p>
            </a>
          )}
        </For>
      </div>
    </WebsiteSection>
  );
}

function HookDetailPage({ slug }) {
  const hook = WEBSITE_HOOKS.find((h) => hookToSlug(h.name) === slug);

  if (!hook) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">Hook no encontrado</h2>
        <p className="mt-2 text-neutral-600">El hook que buscas no existe o ha sido movido.</p>
        <a href="/docs/hooks" className="mt-4 inline-block text-brand-600 hover:underline">Volver a Hooks</a>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div id="descripcion" className="scroll-mt-28">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">
          {hook.name}
        </h1>
        <p className="mt-4 text-base leading-8 text-neutral-600 dark:text-neutral-400 sm:text-lg">
          {hook.description}
        </p>
      </div>

      <div className="space-y-10">
        <Show when={hook.parameters}>
          <div id="parametros" className="scroll-mt-28">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Parámetros
            </h4>
            <div className="mt-3">
              <PropsTable props={hook.parameters} />
            </div>
          </div>
        </Show>

        <Show when={hook.returns}>
          <div id="retorno" className="scroll-mt-28">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Valor de retorno
            </h4>
            {Array.isArray(hook.returns) ? (
              <div className="mt-3">
                <PropsTable props={hook.returns} />
              </div>
            ) : (
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {hook.returns}
              </p>
            )}
          </div>
        </Show>

        <Show when={WEBSITE_HOOK_EXAMPLES[hook.name]}>
          {(example) => (
            <div id="ejemplo" className="scroll-mt-28">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Ejemplo de uso
              </h4>
              <div className="mt-3">
                <WebsiteCodeBlock code={example.code} language="jsx" />
              </div>
            </div>
          )}
        </Show>
      </div>
    </div>
  );
}

function GenericSectionPage({ sectionId }) {
  return (
    <div className="space-y-14 sm:space-y-16">
      <Show when={sectionId === "introduccion"}>
        <WebsiteSection
          id="introduccion"
          title="Introducción"
          description="Quickit está pensado para equipos que necesitan velocidad, consistencia visual y una API suficientemente flexible para adaptar producto real."
        >
          <div className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
            Los primitives compuestos (Accordion, Tabs, Dropdown, Breadcrumb, Modal,
            Drawer, FormControl, InputGroup, Avatar, EmptyState…) exponen subcomponentes
            como <code className="font-mono text-xs">Componente.Subcomponente</code>.
            Los nombres en PascalCase sueltos (<code className="font-mono text-xs">TabsList</code>,{" "}
            <code className="font-mono text-xs">FormMessage</code>, etc.) siguen exportándose
            por compatibilidad.
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3
                id="introduccion-componentes"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Componentes de producto
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Botones, formularios, overlays, navegación, identidad y estados
                vacíos listos para integrarse en apps reales.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3
                id="introduccion-tema"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Tema y comportamiento
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Proveedor único para tema, focus ring, ripple y press effect, con
                control global y por componente.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800 sm:col-span-2 xl:col-span-1">
              <h3
                id="introduccion-utilidades"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Utilidades lógicas
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                `Show`, `RenderSwitch` y `For` están disponibles para construir
                pantallas más declarativas desde la propia librería.
              </p>
            </div>
          </div>
        </WebsiteSection>
      </Show>

      <Show when={sectionId === "instalacion"}>
        <WebsiteSection
          id="instalacion"
          title="Instalación"
          description="La integración mínima requiere instalar el paquete, importar estilos y decidir si quieres un provider estático o un controlador de tema persistente."
        >
          <div className="space-y-6">
            <WebsiteCodeBlock code={INSTALL_COMMAND} language="bash" />
            <WebsiteCodeBlock code={STYLES_SNIPPET} language="css" />
          </div>
        </WebsiteSection>
      </Show>

      <Show when={sectionId === "migracion-1-0-0"}>
        <WebsiteSection
          id="migracion-1-0-0"
          title="Migración a 1.0.0"
          description={QUICKIT_V1_MIGRATION.summary}
        >
          <div className="space-y-8">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-sm leading-7 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:text-emerald-100">
              Ruta cubierta en esta guía: <code className="font-mono text-xs">{QUICKIT_V1_MIGRATION.fromVersion}</code> →{" "}
              <code className="font-mono text-xs">{QUICKIT_V1_MIGRATION.toVersion}</code>.
            </div>

            <div className="space-y-6">
              <For each={QUICKIT_V1_MIGRATION.steps}>
                {(step, index) => (
                  <div
                    key={step.title}
                    id={`migracion-paso-${index + 1}`}
                    className="scroll-mt-28 rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-8 items-center justify-center rounded-full border border-neutral-300 text-xs font-semibold text-neutral-700 dark:border-neutral-700 dark:text-neutral-200">
                        {index + 1}
                      </span>
                      <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                      {step.description}
                    </p>
                    <div className="mt-4 grid gap-4 xl:grid-cols-2">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                          Antes ({QUICKIT_V1_MIGRATION.fromVersion})
                        </p>
                        <WebsiteCodeBlock code={step.beforeCode} language={step.language} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                          Ahora ({QUICKIT_V1_MIGRATION.toVersion})
                        </p>
                        <WebsiteCodeBlock code={step.afterCode} language={step.language} />
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>

            <div id="migracion-checklist" className="scroll-mt-28 rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                Checklist final
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                <For each={QUICKIT_V1_MIGRATION.checks}>
                  {(item) => <li key={item}>• {item}</li>}
                </For>
              </ul>
            </div>
          </div>
        </WebsiteSection>
      </Show>

      <Show when={sectionId === "changelog"}>
        <WebsiteSection
          id="changelog"
          title="Changelog"
          description={`Resumen de la release ${QUICKIT_V1_RELEASE.version} del ${QUICKIT_V1_RELEASE.date}.`}
        >
          <div className="space-y-8">
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 dark:border-brand-900/60 dark:bg-brand-950/30 dark:text-brand-200">
                  v{QUICKIT_V1_RELEASE.version}
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {QUICKIT_V1_RELEASE.date}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                {QUICKIT_V1_RELEASE.summary}
              </p>
            </div>

            <div id="changelog-highlight" className="scroll-mt-28 rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                Highlights
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                <For each={QUICKIT_V1_RELEASE.highlights}>
                  {(item) => <li key={item}>• {item}</li>}
                </For>
              </ul>
            </div>

            <div id="changelog-cambios" className="scroll-mt-28 rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                Cambios destacados
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                <For each={QUICKIT_V1_RELEASE.notableChanges}>
                  {(item) => <li key={item}>• {item}</li>}
                </For>
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-5 dark:border-neutral-800 dark:bg-neutral-900/60">
              <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                Archivo completo
              </h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                El historial completo de la release también vive en <code className="font-mono text-xs">CHANGELOG.md</code> en la raíz del repositorio.
              </p>
            </div>
          </div>
        </WebsiteSection>
      </Show>

      <Show when={sectionId === "tema"}>
        <WebsiteSection
          id="tema"
          title="Tema"
          description="Usa QuickitProvider cuando tu app ya resuelve el tema por su cuenta. Usa QuickitThemeProvider cuando quieres persistencia, soporte system y helpers de lectura."
        >
          <div className="space-y-10">
            <div className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
              QuickitThemeProvider es un wrapper con estado que controla el tema y
              luego renderiza QuickitProvider por debajo. QuickitProvider solo
              aplica la política visual; no persiste ni muta el tema.
            </div>
            <div>
              <h3
                id="tema-proveedor"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Proveedor base
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Usa QuickitProvider si tu app ya controla el tema (por ejemplo,
                con un state propio o un contexto externo).
              </p>
              <div className="mt-4">
                <WebsiteCodeBlock code={QUICKIT_PROVIDER_SNIPPET} language="jsx" />
              </div>
            </div>

            <div>
              <h3
                id="tema-controlador"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Controlador de tema
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                QuickitThemeProvider añade persistencia, soporte system y un
                hook para leer o cambiar el tema.
              </p>
              <div className="mt-4 space-y-6">
                <WebsiteCodeBlock code={THEME_PROVIDER_SNIPPET} language="jsx" />
                <WebsiteCodeBlock code={THEME_TOGGLE_SNIPPET} language="jsx" />
              </div>
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                useQuickitThemeController debe usarse dentro de QuickitThemeProvider.
              </p>
            </div>

            <div>
              <h3
                id="tema-lectura"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Lectura rápida del tema
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                useQuickitTheme devuelve el modo efectivo (light o dark) para
                ajustar pequeños detalles de UI.
              </p>
              <div className="mt-4">
                <WebsiteCodeBlock code={THEME_READ_SNIPPET} language="jsx" />
              </div>
            </div>

            <div>
              <h3
                id="tema-fouc"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Evitar parpadeo (FOUC)
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                El "Flash of Unstyled Content" ocurre porque React hidrata el tema después del primer pintado. 
                Para evitarlo, es necesario un script síncrono en el <code className="text-brand-500">&lt;head&gt;</code> que 
                bloquee el renderizado hasta que se aplique la clase correcta.
              </p>
              
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                    Vite / SPA (index.html)
                  </h4>
                  <div className="mt-2">
                    <WebsiteCodeBlock code={THEME_FOUC_VITE_SNIPPET} language="html" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                    Next.js (Root Layout)
                  </h4>
                  <div className="mt-2">
                    <WebsiteCodeBlock code={THEME_FOUC_NEXT_SNIPPET} language="jsx" />
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5 dark:border-neutral-800 dark:bg-neutral-900/50">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-950 dark:text-neutral-50">
                  Resumen de implementación
                </h4>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                  <li>
                    <strong className="text-neutral-950 dark:text-neutral-50">¿Por qué?</strong> Porque React se ejecuta después de que el navegador pinta el HTML.
                  </li>
                  <li>
                    <strong className="text-neutral-950 dark:text-neutral-50">¿Cómo?</strong> Con un script síncrono que modifique <code className="text-brand-500">documentElement</code>.
                  </li>
                  <li>
                    <strong className="text-neutral-950 dark:text-neutral-50">¿Cuándo?</strong> Inmediatamente, antes de que el navegador renderice el <code className="text-brand-500">&lt;body&gt;</code>.
                  </li>
                  <li>
                    <strong className="text-neutral-950 dark:text-neutral-50">¿Dónde?</strong> En lo más alto de tu <code className="text-brand-500">&lt;head&gt;</code>.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </WebsiteSection>
      </Show>

      <Show when={sectionId === "comportamiento"}>
        <WebsiteSection
          id="comportamiento"
          title="Comportamiento"
          description="Define políticas globales de focus ring, ripple y press effect desde el provider, con posibilidad de sobrescribirlas por componente."
        >
          <div className="space-y-6">
            <WebsiteCodeBlock code={QUICKIT_PROVIDER_SNIPPET} language="jsx" />
            <div className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
              Ajusta focusRing, ripple y pressEffect para toda la app. Luego,
              cada componente puede sobrescribir con sus props específicas si
              lo necesitas.
            </div>
          </div>
        </WebsiteSection>
      </Show>

      <Show when={sectionId === "tokens"}>
        <WebsiteSection
          id="tokens"
          title="Tokens"
          description="Listas base de tamaños, colores y radios que Quickit usa para mantener consistencia entre componentes."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3
                id="tokens-semanticos"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Colores semánticos
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {QUICKIT_SEMANTIC_COLORS.map((color) => (
                  <span
                    key={color}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3
                id="tokens-accent"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Colores accent
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {QUICKIT_ACCENT_COLORS.map((color) => (
                  <span
                    key={color}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3
                id="tokens-tamaños"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Tamaños de control
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {QUICKIT_CONTROL_SIZES.map((size) => (
                  <span
                    key={size}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3
                id="tokens-shapes"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Shapes y variants
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {QUICKIT_BUTTON_SHAPES.map((shape) => (
                  <span
                    key={shape}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {shape}
                  </span>
                ))}
                {QUICKIT_BUTTON_VARIANTS.map((variant) => (
                  <span
                    key={variant}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {variant}
                  </span>
                ))}
                {QUICKIT_LINK_TEXT_VARIANTS.map((variant) => (
                  <span
                    key={variant}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {variant}
                  </span>
                ))}
                {QUICKIT_LINK_UNDERLINES.map((variant) => (
                  <span
                    key={variant}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {variant}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </WebsiteSection>
      </Show>

      <Show when={sectionId === "componentes"}>
        <WebsiteSection
          id="componentes"
          title="Componentes"
          description="Empieza por los primitives base y después entra a cada página para ver instalación, uso, preview y API."
        >
          <div className="space-y-6">
            <For each={WEBSITE_COMPONENT_GROUPS}>
              {(group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800"
                >
                  <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                    {group.title}
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <For each={group.items}>
                      {(item) => (
                        <a
                          key={item.slug}
                          href={`/docs/components/${item.slug}`}
                          className="rounded-2xl border border-neutral-200 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                        >
                          <p className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                            {item.name}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                            {item.description}
                          </p>
                        </a>
                      )}
                    </For>
                  </div>
                </div>
              )}
            </For>
          </div>
        </WebsiteSection>
      </Show>
    </div>
  );
}

function ComponentReviewSection({ slug }) {
  const entries = WEBSITE_COMPONENT_REVIEW_NOTES[slug];

  if (!entries?.length) {
    return null;
  }

  return (
    <div className="mt-14 sm:mt-16">
      <WebsiteSection
        id="notas-revision"
        title="Notas de revisión"
        description="Revisión del código fuente de la librería: recomendaciones de uso, accesibilidad, detalles de implementación y mejoras o correcciones relevantes (versión actual del repo)."
      >
        <ul className="space-y-3">
          <For each={entries}>
            {(entry, index) => (
              <li
                key={index}
                className="rounded-2xl border border-neutral-200 px-4 py-3 dark:border-neutral-800"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  {entry.tag}
                </p>
                <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                  {entry.text}
                </p>
              </li>
            )}
          </For>
        </ul>
      </WebsiteSection>
    </div>
  );
}

function ComponentPage({ component }) {
  const doc = COMPONENT_DOCS[component.slug];

  return (
    <>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-5xl">
          {component.name}
        </h1>
        <p className="mt-5 text-base leading-8 text-neutral-600 dark:text-neutral-400 sm:text-lg">
          {doc?.description ?? component.description}
        </p>
      </div>

      <div className="mt-14 sm:mt-16">
        <Show when={doc}>
          <WebsiteSection id="ejemplo-visual" title="Ejemplo visual y código">
            <WebsitePreviewTabs code={doc.previewCode}>
              {doc.preview}
            </WebsitePreviewTabs>
          </WebsiteSection>

          <WebsiteSection id="instalacion" title="Instalación">
            <WebsiteCodeBlock code={doc.installCode} language="jsx" />
          </WebsiteSection>

          <WebsiteSection id="uso" title="Uso">
            <WebsiteCodeBlock code={doc.usageCode} language="jsx" />
          </WebsiteSection>

          <WebsiteSection id="ejemplos" title="Ejemplos">
            <div className="space-y-10">
              {doc.examples?.map((example) => (
                <div key={example.id} className={example.id === "ejemplos-props" ? "pt-2" : undefined}>
                  <h3
                    id={example.id}
                    className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
                  >
                    {example.title}
                  </h3>
                  {example.preview ? (
                    <div className="mt-4">{example.preview}</div>
                  ) : null}
                  {example.description ? (
                    <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                      {example.description}
                    </p>
                  ) : null}
                  {example.note ? (
                    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                      {example.note}
                    </p>
                  ) : null}
                  {example.props ? (
                    <div className="mt-4">
                      <PropsTable props={example.props} />
                    </div>
                  ) : null}
                  {example.notes ? (
                    <div className="mt-6 space-y-3">
                      {example.notes.map((note) => (
                        <div
                          key={note}
                          className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
                        >
                          {note}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </WebsiteSection>
        </Show>

        <Show when={!doc}>
          <WebsiteSection
            id="ejemplo-visual"
            title="Página en construcción"
            description={`La arquitectura ya está lista para ${component.name}. Lo siguiente es documentar este componente con el mismo nivel de detalle que Button: ejemplo visual, instalación, uso y ejemplos completos.`}
          >
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Esta página ya tiene ruta propia, navegación lateral y contexto
                del componente. El siguiente paso es rellenar el contenido
                específico derivado de su implementación en `src/lib`.
              </p>
            </div>
          </WebsiteSection>
        </Show>
      </div>

      <ComponentReviewSection slug={component.slug} />
    </>
  );
}

function getGenericSections(sectionId) {
  if (sectionId === "introduccion") {
    return [
      { id: "introduccion", label: "Introducción" },
      { id: "introduccion-componentes", label: "Componentes" },
      { id: "introduccion-tema", label: "Tema y comportamiento" },
      { id: "introduccion-utilidades", label: "Utilidades lógicas" },
    ];
  }
  if (sectionId === "instalacion") {
    return [{ id: "instalacion", label: "Instalación" }];
  }
  if (sectionId === "migracion-1-0-0") {
    return [
      { id: "migracion-1-0-0", label: "Migración 1.0.0" },
      { id: "migracion-paso-1", label: "Actualizar paquete" },
      { id: "migracion-paso-2", label: "Revisar overlays" },
      { id: "migracion-paso-3", label: "Alinear Breadcrumb y Link" },
      { id: "migracion-paso-4", label: "Validar formularios" },
      { id: "migracion-paso-5", label: "Correr verificación" },
      { id: "migracion-checklist", label: "Checklist final" },
    ];
  }
  if (sectionId === "changelog") {
    return [
      { id: "changelog", label: "Changelog" },
      { id: "changelog-highlight", label: "Highlights" },
      { id: "changelog-cambios", label: "Cambios destacados" },
    ];
  }
  if (sectionId === "tema") {
    return [
      { id: "tema", label: "Tema" },
      { id: "tema-proveedor", label: "Proveedor base" },
      { id: "tema-controlador", label: "Controlador de tema" },
      { id: "tema-lectura", label: "Lectura rápida" },
      { id: "tema-fouc", label: "Evitar parpadeo (FOUC)" },
    ];
  }
  if (sectionId === "comportamiento") {
    return [{ id: "comportamiento", label: "Comportamiento" }];
  }
  if (sectionId === "tokens") {
    return [
      { id: "tokens", label: "Tokens" },
      { id: "tokens-semanticos", label: "Colores semánticos" },
      { id: "tokens-accent", label: "Colores accent" },
      { id: "tokens-tamaños", label: "Tamaños de control" },
      { id: "tokens-shapes", label: "Shapes y variants" },
    ];
  }
  if (sectionId === "componentes") {
    return [{ id: "componentes", label: "Componentes" }];
  }
  return [];
}

export default function DocsPage({ currentPath }) {
  const route = parseDocsRoute(currentPath);
  const { mode, componentSlug, sectionId, hookSlug } = route;

  const currentComponent =
    mode === "component" ? WEBSITE_COMPONENT_LOOKUP[componentSlug] : null;
  const currentHook =
    mode === "hook"
      ? WEBSITE_HOOKS.find((h) => hookToSlug(h.name) === hookSlug)
      : null;

  let tocSections = [];
  if (currentComponent) {
    tocSections = getComponentSections(currentComponent.slug);
  } else if (currentHook) {
    tocSections = [
      { id: "descripcion", label: "Descripción" },
      currentHook.parameters && { id: "parametros", label: "Parámetros" },
      currentHook.returns && { id: "retorno", label: "Valor de retorno" },
      WEBSITE_HOOK_EXAMPLES[currentHook.name] && { id: "ejemplo", label: "Ejemplo" },
    ].filter(Boolean);
  } else if (mode === "section") {
    tocSections = getGenericSections(sectionId);
  } else if (mode === "hooks-index") {
    tocSections = [{ id: "hooks", label: "Hooks" }];
  }

  return (
    <main className={`${WEBSITE_SHELL} pb-20 pt-10 sm:pt-14`}>
      <Toaster />
      <div className="grid gap-12 lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)_14rem] lg:gap-16 min-w-0">
        <WebsiteDocsSidebar
          currentComponentSlug={currentComponent?.slug}
          sections={WEBSITE_DOC_OVERVIEW_SECTIONS}
          componentGroups={WEBSITE_COMPONENT_GROUPS}
          currentPath={currentPath}
        />

        <article className="min-w-0 w-full max-w-3xl justify-self-center">
          <RenderSwitch value={mode}>
            <Match when="component">
              <ComponentPage component={currentComponent} />
            </Match>
            <Match when="hook">
              <HookDetailPage slug={hookSlug} />
            </Match>
            <Match when="hooks-index">
              <HooksIndexPage />
            </Match>
            <Default>
              <GenericSectionPage sectionId={sectionId} />
            </Default>
          </RenderSwitch>
        </article>

        <WebsitePageToc sections={tocSections} />
      </div>
    </main>
  );
}
