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
  QUICKIT_BRAND_COLORS,
  QUICKIT_CONTROL_SIZES,
  QUICKIT_LINK_TEXT_VARIANTS,
  QUICKIT_LINK_UNDERLINES,
  QUICKIT_NEUTRAL_COLORS,
  QUICKIT_STATUS_COLORS,
} from "@/lib/tokens";
import {
  WEBSITE_ROUTES,
  WEBSITE_SHELL,
  getWebsiteComponentRoute,
} from "@/website/site-config";
import {
  WEBSITE_BUTTON_DOC,
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
  TAILWIND_STYLES_SNIPPET,
  BRAND_OVERRIDE_SNIPPET,
  QUICKIT_PROVIDER_SNIPPET,
  THEME_PROVIDER_SNIPPET,
  THEME_TOGGLE_SNIPPET,
  THEME_READ_SNIPPET,
  THEME_FOUC_VITE_SNIPPET,
  THEME_FOUC_NEXT_SNIPPET,
  COMPONENT_IMPORT_SNIPPET,
  UTILS_CN_SNIPPET,
  UTILS_SCROLL_SNIPPET,
  UTILS_REFS_SNIPPET,
  UTILS_TOKENS_SNIPPET,
  UTILS_THEME_SNIPPET,
} from "@/website/docs-content";
import { COMPONENT_DOCS } from "@/website/component-docs";
import {
  getWebsiteDocsSectionIdFromSegment,
  getWebsiteHookRoute,
  hookToSlug,
} from "@/website/docs-navigation";
import WebsiteCodeBlock from "@/website/components/WebsiteCodeBlock";
import WebsiteDocsSidebar from "@/website/components/WebsiteDocsSidebar";
import WebsitePageToc from "@/website/components/WebsitePageToc";
import WebsitePreviewTabs from "@/website/components/WebsitePreviewTabs";
import WebsiteSection from "@/website/components/WebsiteSection";


const DOCS_PROPS_TABLE_COLUMNS = [
  {
    key: "name",
    header: "Prop",
    headerClassName: "normal-case tracking-normal text-sm",
    cellClassName: "align-top",
    render: (row) => (
      <p className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
        {row.name}
      </p>
    ),
  },
  {
    key: "type",
    header: "Tipo",
    headerClassName: "normal-case tracking-normal text-sm",
    cellClassName: "whitespace-normal align-top",
    render: (row) => (
      <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
        {row.type ?? "—"}
      </p>
    ),
  },
  {
    key: "defaultValue",
    header: "Default",
    headerClassName: "normal-case tracking-normal text-sm",
    cellClassName: "whitespace-normal align-top",
    render: (row) => (
      <p className="text-xs text-neutral-500 dark:text-neutral-500">
        {row.defaultValue ?? "—"}
      </p>
    ),
  },
  {
    key: "description",
    header: "Descripción",
    headerClassName: "normal-case tracking-normal text-sm",
    cellClassName: "min-w-[16rem] whitespace-normal align-top",
    render: (row) => (
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {row.description ?? "—"}
      </p>
    ),
  },
];

function PropsTable({ props, caption = "Tabla de props" }) {
  return (
    <DataTable
      caption={caption}
      columns={DOCS_PROPS_TABLE_COLUMNS}
      data={props}
      rowKey={(row, index) => row.name ?? index}
      stickyHeader={false}
    />
  );
}

function NotesList({ notes }) {
  return (
    <div className="space-y-3">
      {notes.map((note, index) => (
        <div
          key={`${note}-${index}`}
          className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
        >
          {note}
        </div>
      ))}
    </div>
  );
}

function TokenGroupsList({ groups }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.label}
          className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800"
        >
          <h4 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
            {group.label}
          </h4>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {group.values.map((value) => (
              <TokenGroupValue key={`${group.label}-${value}`} value={value} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const TOKEN_COLOR_SWATCH_CLASSES = {
  neutral: "border-neutral-200 bg-neutral-100 text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100",
  slate: "border-slate-200 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",
  zinc: "border-zinc-200 bg-zinc-100 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100",
  primary: "border-blue-200 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-100",
  brand: "border-brand-200 bg-brand-100 text-brand-800 dark:border-brand-800 dark:bg-brand-950/60 dark:text-brand-100",
  success: "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-100",
  danger: "border-red-200 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-950/60 dark:text-red-100",
  warning: "border-amber-200 bg-amber-100 text-amber-900 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-100",
  info: "border-sky-200 bg-sky-100 text-sky-800 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-100",
  light: "border-neutral-200 bg-white text-neutral-900 dark:border-neutral-700 dark:bg-neutral-100 dark:text-neutral-950",
  dark: "border-neutral-800 bg-neutral-900 text-white dark:border-neutral-500 dark:bg-neutral-900 dark:text-neutral-50",
  black: "border-black bg-black text-white dark:border-neutral-400 dark:bg-black dark:text-white",
};

const TOKEN_COLOR_GROUPS = [
  {
    id: "tokens-color-identidad",
    title: "Identidad y acción",
    description: "`primary` y `brand` cubren intención principal y marca. `brand` es el slot que puedes reemplazar por tu paleta.",
    colors: ["primary", "brand"],
  },
  {
    id: "tokens-color-estados",
    title: "Estados semánticos",
    description: "Estos colores sí comunican significado de estado: éxito, error, advertencia o información.",
    colors: ["success", "danger", "warning", "info"],
  },
  {
    id: "tokens-color-neutrales",
    title: "Neutrales",
    description: "Neutrales para superficies, jerarquía visual y acciones sin intención semántica fuerte.",
    colors: ["neutral", "slate", "zinc", "light", "dark", "black"],
  },
];

const TOKEN_COLOR_VALUES = new Set([
  ...QUICKIT_BRAND_COLORS,
  ...QUICKIT_STATUS_COLORS,
  ...QUICKIT_NEUTRAL_COLORS,
]);

function TokenGroupValue({ value }) {
  if (TOKEN_COLOR_VALUES.has(value)) {
    return <TokenColorChip color={value} />;
  }

  if (QUICKIT_CONTROL_SIZES.includes(value)) {
    return <TokenSizeSample size={value} />;
  }

  if (QUICKIT_BUTTON_SHAPES.includes(value)) {
    return <TokenShapeSample shape={value} />;
  }

  if (QUICKIT_BUTTON_VARIANTS.includes(value)) {
    return <TokenVariantSample variant={value} />;
  }

  if (QUICKIT_LINK_TEXT_VARIANTS.includes(value)) {
    return <TokenLinkVariantSample variant={value} />;
  }

  if (QUICKIT_LINK_UNDERLINES.includes(value)) {
    return <TokenUnderlineSample underline={value} />;
  }

  return (
    <Badge color="neutral" variant="soft">
      {value}
    </Badge>
  );
}

function TokenColorChip({ color }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium ${TOKEN_COLOR_SWATCH_CLASSES[color] ?? TOKEN_COLOR_SWATCH_CLASSES.neutral}`}
    >
      {color}
    </span>
  );
}

function TokenSizeSample({ size }) {
  return (
    <Button size={size} variant="outline" color="neutral">
      {size}
    </Button>
  );
}

function TokenShapeSample({ shape }) {
  const compact = shape === "square" || shape === "circle";

  return (
    <Button
      size="md"
      shape={shape}
      variant="outline"
      color="neutral"
      aria-label={compact ? `Shape ${shape}` : undefined}
    >
      {compact ? shape.slice(0, 1).toUpperCase() : shape}
    </Button>
  );
}

function TokenVariantSample({ variant }) {
  return (
    <Button size="sm" variant={variant} color="brand">
      {variant}
    </Button>
  );
}

function TokenLinkVariantSample({ variant }) {
  return (
    <Link href="/docs/components/link" variant={variant} onClick={(event) => event.preventDefault()}>
      {variant}
    </Link>
  );
}

function TokenUnderlineSample({ underline }) {
  return (
    <Link href="/docs/components/link" underline={underline} onClick={(event) => event.preventDefault()}>
      {underline}
    </Link>
  );
}

function ReviewNotesList({ notes }) {
  return (
    <div className="space-y-3">
      {notes.map((note, index) => (
        <div
          key={`${note.tag ?? "nota"}-${index}`}
          className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800"
        >
          <div className="flex flex-wrap items-center gap-3">
            {note.tag ? (
              <Badge color="neutral" variant="soft">
                {note.tag}
              </Badge>
            ) : null}
            <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              {note.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function parseDocsRoute(pathname) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] !== "docs") {
    return { mode: "section", sectionId: "introduccion" };
  }

  if (segments[1] === "components") {
    if (segments[2]) {
      return { mode: "component", componentSlug: segments[2] };
    }

    return { mode: "section", sectionId: "componentes" };
  }

  if (segments[1] === "hooks") {
    if (segments[2]) {
      return { mode: "hook", hookSlug: segments[2] };
    }
    return { mode: "hooks-index" };
  }

  const sectionId = getWebsiteDocsSectionIdFromSegment(
    segments[1] || "introduccion",
  );
  return { mode: "section", sectionId };
}

function getComponentSections(slug) {
  const doc = COMPONENT_DOCS[slug];
  const reviewNotes = WEBSITE_COMPONENT_REVIEW_NOTES[slug] ?? [];

  if (!doc) {
    return [{ id: "componente-no-encontrado", label: "Componente no encontrado" }];
  }

  const exampleChildren =
    doc.examples?.map((example) => ({
      id: example.id,
      label: example.title,
    })) ?? [];

  const sections = [
    { id: "ejemplo-visual", label: "Ejemplo visual y código" },
    { id: "instalacion", label: "Instalación" },
    { id: "uso", label: "Uso" },
  ];

  if (doc.props?.length) {
    sections.push({ id: "api", label: "API" });
  }

  if (doc.tokenGroups?.length) {
    sections.push({ id: "tokens-y-variantes", label: "Tokens y variantes" });
  }

  if (doc.notes?.length) {
    sections.push({ id: "notas", label: "Notas" });
  }

  if (reviewNotes.length) {
    sections.push({ id: "notas-de-revision", label: "Notas de revisión" });
  }

  sections.push({
    id: "ejemplos",
    label: "Ejemplos",
    children: exampleChildren,
  });

  return sections;
}

function OverviewPage() {
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
              href={getWebsiteHookRoute(hook.name)}
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
            <div className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
              Si tu app no usa Tailwind, importa los estilos de Quickit una sola vez. Ese archivo contiene los estilos base de componentes, tokens <code className="font-mono text-xs">brand</code>, variables CSS y variantes dark compiladas.
            </div>
            <WebsiteCodeBlock code={STYLES_SNIPPET} language="css" />
            <WebsiteCodeBlock code={COMPONENT_IMPORT_SNIPPET} language="jsx" />
            <div className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
              Si tu app también usa Tailwind CSS 4, importa primero <code className="font-mono text-xs">quickit-ui/styles.css</code> y después <code className="font-mono text-xs">tailwindcss</code>. Así Tailwind y los tokens de tu app quedan al final de la cascada y pueden sobrescribir lo necesario.
            </div>
            <WebsiteCodeBlock code={TAILWIND_STYLES_SNIPPET} language="css" />
            <div className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
              <code className="font-mono text-xs">brand</code> es reemplazable. Declara tu escala dentro de <code className="font-mono text-xs">@theme</code> al final del archivo para que <code className="font-mono text-xs">color="brand"</code> use la identidad visual de tu producto.
            </div>
            <WebsiteCodeBlock code={BRAND_OVERRIDE_SNIPPET} language="css" />
          </div>
        </WebsiteSection>
      </Show>

      <Show when={sectionId === "migracion"}>
        <WebsiteSection
          id="migracion"
          title={`Migración a ${QUICKIT_V1_MIGRATION.toVersion}`}
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
                    <div className="mt-4">
                      <Tabs
                        defaultValue={`antes-${index + 1}`}
                        size="sm"
                        color="neutral"
                      >
                        <Tabs.List>
                          <Tabs.Trigger value={`antes-${index + 1}`}>
                            Antes ({QUICKIT_V1_MIGRATION.fromVersion})
                          </Tabs.Trigger>
                          <Tabs.Trigger value={`ahora-${index + 1}`}>
                            Ahora ({QUICKIT_V1_MIGRATION.toVersion})
                          </Tabs.Trigger>
                        </Tabs.List>
                        <div className="mt-4">
                          <Tabs.Content value={`antes-${index + 1}`}>
                            <WebsiteCodeBlock
                              code={step.beforeCode}
                              language={step.language}
                            />
                          </Tabs.Content>
                          <Tabs.Content value={`ahora-${index + 1}`}>
                            <WebsiteCodeBlock
                              code={step.afterCode}
                              language={step.language}
                            />
                          </Tabs.Content>
                        </div>
                      </Tabs>
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
          description="Referencia visual rápida de colores, tamaños, shapes y variants disponibles en Quickit."
        >
          <div className="space-y-6">
            <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3
                id="tokens-colores"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Colores de componentes
              </h3>
              <div className="mt-4 grid gap-5 md:grid-cols-3">
                {TOKEN_COLOR_GROUPS.map((group) => (
                  <div key={group.id} id={group.id} className="scroll-mt-28">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                      {group.title}
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.colors.map((color) => (
                        <TokenColorChip key={color} color={color} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div
                id="tokens-brand"
                className="mt-5 scroll-mt-28 rounded-xl border border-brand-200 bg-brand-50/60 p-4 text-sm leading-7 text-brand-900 dark:border-brand-900/60 dark:bg-brand-950/20 dark:text-brand-100"
              >
                <p>
                  <strong>brand es reemplazable.</strong> En proyectos con Tailwind CSS 4, importa primero <code className="font-mono text-xs">quickit-ui/styles.css</code>, luego <code className="font-mono text-xs">tailwindcss</code> y declara <code className="font-mono text-xs">--color-brand-50</code> a <code className="font-mono text-xs">--color-brand-950</code> dentro de <code className="font-mono text-xs">@theme</code> al final del archivo.
                </p>
                <div className="mt-3">
                  <WebsiteCodeBlock code={BRAND_OVERRIDE_SNIPPET} language="css" />
                </div>
              </div>
              <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500">
                El tipo público aún se llama <code className="font-mono">QuickitSemanticColor</code> por compatibilidad, aunque la taxonomía visual separa identidad, estados y neutrales.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
                <h3
                  id="tokens-accent"
                  className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
                >
                  Colecciones exportadas
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                      Brand / acción
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {QUICKIT_BRAND_COLORS.map((color) => (
                        <TokenColorChip key={color} color={color} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                      Estados
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {QUICKIT_STATUS_COLORS.map((color) => (
                        <TokenColorChip key={color} color={color} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                      Neutrales
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {QUICKIT_NEUTRAL_COLORS.map((color) => (
                        <TokenColorChip key={color} color={color} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
                <h3
                  id="tokens-tamaños"
                  className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
                >
                  Tamaños
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {QUICKIT_CONTROL_SIZES.map((size) => (
                    <TokenSizeSample key={size} size={size} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
                <h3
                  id="tokens-shapes"
                  className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
                >
                  Shapes
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {QUICKIT_BUTTON_SHAPES.map((shape) => (
                    <TokenShapeSample key={shape} shape={shape} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
                <h3
                  id="tokens-variants"
                  className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
                >
                  Button variants
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {QUICKIT_BUTTON_VARIANTS.map((variant) => (
                    <TokenVariantSample key={variant} variant={variant} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800 lg:col-span-2">
                <h3
                  id="tokens-link"
                  className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
                >
                  Link
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  {QUICKIT_LINK_TEXT_VARIANTS.map((variant) => (
                    <TokenLinkVariantSample key={variant} variant={variant} />
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  {QUICKIT_LINK_UNDERLINES.map((underline) => (
                    <TokenUnderlineSample key={underline} underline={underline} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </WebsiteSection>
      </Show>

      <Show when={sectionId === "utilidades"}>
        <WebsiteSection
          id="utilidades"
          title="Utilidades"
          description="Quickit también exporta helpers de clases, radios, scroll, refs, tema y resolución de tokens para construir wrappers o componentes propios sin copiar lógica interna."
        >
          <div className="space-y-10">
            <div id="utilidades-clases" className="scroll-mt-28 space-y-3">
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Clases y radios
              </h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Usa <code className="font-mono text-xs">cn</code>, <code className="font-mono text-xs">getControlRadius</code> y <code className="font-mono text-xs">getAvatarRadius</code> cuando construyas wrappers que deban seguir la geometría visual de Quickit.
              </p>
              <WebsiteCodeBlock code={UTILS_CN_SNIPPET} language="jsx" />
            </div>

            <div id="utilidades-scroll" className="scroll-mt-28 space-y-3">
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Bloqueo de scroll
              </h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                <code className="font-mono text-xs">lockAppScroll</code> y <code className="font-mono text-xs">unlockAppScroll</code> sirven para overlays o paneles custom que no usan `Modal` o `Drawer` pero necesitan el mismo comportamiento de bloqueo del body.
              </p>
              <WebsiteCodeBlock code={UTILS_SCROLL_SNIPPET} language="jsx" />
            </div>

            <div id="utilidades-refs" className="scroll-mt-28 space-y-3">
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Merge de refs
              </h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                <code className="font-mono text-xs">useMergeRefs</code> evita helpers ad hoc cuando un wrapper necesita combinar su ref local con la ref del consumidor.
              </p>
              <WebsiteCodeBlock code={UTILS_REFS_SNIPPET} language="jsx" />
            </div>

            <div id="utilidades-tokens" className="scroll-mt-28 space-y-3">
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Resolución de tokens
              </h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                <code className="font-mono text-xs">resolveQuickitToken</code> e <code className="font-mono text-xs">isQuickitTokenValue</code> son útiles cuando aceptas configuraciones dinámicas y quieres normalizarlas contra las listas oficiales de Quickit.
              </p>
              <WebsiteCodeBlock code={UTILS_TOKENS_SNIPPET} language="jsx" />
            </div>

            <div id="utilidades-tema" className="scroll-mt-28 space-y-3">
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Tema resuelto
              </h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                <code className="font-mono text-xs">resolveQuickitThemeMode</code> normaliza valores dinámicos a <code className="font-mono text-xs">light</code> o <code className="font-mono text-xs">dark</code>. No detecta <code className="font-mono text-xs">system</code> por sí sola; para eso usa <code className="font-mono text-xs">QuickitThemeProvider</code> o <code className="font-mono text-xs">useQuickitThemeController</code>.
              </p>
              <WebsiteCodeBlock code={UTILS_THEME_SNIPPET} language="jsx" />
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
                          href={getWebsiteComponentRoute(item.slug)}
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

function ComponentPage({ component }) {
  const doc = COMPONENT_DOCS[component.slug];
  const reviewNotes = WEBSITE_COMPONENT_REVIEW_NOTES[component.slug] ?? [];

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

          <Show when={doc.tokenGroups?.length}>
            <WebsiteSection
              id="tokens-y-variantes"
              title="Tokens y variantes"
              description="Resumen rápido de tamaños, variantes, colores o shapes útiles antes de entrar a la tabla completa de props."
            >
              <TokenGroupsList groups={doc.tokenGroups} />
            </WebsiteSection>
          </Show>

          <Show when={doc.props?.length}>
            <WebsiteSection
              id="api"
              title="API"
              description="Props y valores más relevantes para integrar el componente en proyectos reales."
            >
              <PropsTable props={doc.props} />
            </WebsiteSection>
          </Show>

          <Show when={doc.notes?.length}>
            <WebsiteSection
              id="notas"
              title="Notas"
              description="Detalles de uso, composición y comportamiento que conviene tener presentes al integrar este componente."
            >
              <NotesList notes={doc.notes} />
            </WebsiteSection>
          </Show>

          <Show when={reviewNotes.length}>
            <WebsiteSection
              id="notas-de-revision"
              title="Notas de revisión"
              description="Hallazgos editoriales y técnicos para evitar integraciones ambiguas o frágiles."
            >
              <ReviewNotesList notes={reviewNotes} />
            </WebsiteSection>
          </Show>

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
                  {example.notes ? <div className="mt-6"><NotesList notes={example.notes} /></div> : null}
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

    </>
  );
}

function ComponentNotFoundPage({ componentSlug }) {
  return (
    <WebsiteSection
      id="componente-no-encontrado"
      title="Componente no encontrado"
      description={`No existe un componente documentado con el slug "${componentSlug}".`}
    >
      <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
        <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
          Revisa la URL o vuelve al índice de componentes para abrir una página
          válida de la librería.
        </p>
        <div className="mt-4">
          <Link href={WEBSITE_ROUTES.components} appearance="button" color="neutral">
            Ver componentes
          </Link>
        </div>
      </div>
    </WebsiteSection>
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
  if (sectionId === "migracion") {
    return [
      { id: "migracion", label: `Migración ${QUICKIT_V1_MIGRATION.toVersion}` },
      { id: "migracion-paso-1", label: "Actualiza el paquete" },
      { id: "migracion-paso-2", label: "Simplifica Breadcrumb" },
      { id: "migracion-paso-3", label: "Usa APIs compuestas" },
      { id: "migracion-paso-4", label: "CommandPalette y EmptyState" },
      { id: "migracion-paso-5", label: "Verificación final" },
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
      { id: "tokens-colores", label: "Colores de componentes" },
      { id: "tokens-brand", label: "Reemplazar brand" },
      { id: "tokens-accent", label: "Accent" },
      { id: "tokens-tamaños", label: "Tamaños" },
      { id: "tokens-shapes", label: "Shapes" },
      { id: "tokens-variants", label: "Button variants" },
      { id: "tokens-link", label: "Link" },
    ];
  }
  if (sectionId === "utilidades") {
    return [
      { id: "utilidades", label: "Utilidades" },
      { id: "utilidades-clases", label: "Clases y radios" },
      { id: "utilidades-scroll", label: "Bloqueo de scroll" },
      { id: "utilidades-refs", label: "Merge de refs" },
      { id: "utilidades-tokens", label: "Resolución de tokens" },
      { id: "utilidades-tema", label: "Tema resuelto" },
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
  } else if (mode === "component") {
    tocSections = [{ id: "componente-no-encontrado", label: "Componente no encontrado" }];
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
              {currentComponent ? (
                <ComponentPage component={currentComponent} />
              ) : (
                <ComponentNotFoundPage componentSlug={componentSlug} />
              )}
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
