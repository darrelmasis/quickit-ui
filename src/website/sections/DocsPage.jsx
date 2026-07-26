import { useRef, useState, useEffect } from "react";
import WebsiteLayout from "@/website/components/WebsiteLayout";
import {
  Badge,
  Button,
  Checkbox,
  DataTable,
  DatePicker,
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
  Default,
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
  QUICKIT_LINK_TEXT_VARIANTS,
  QUICKIT_LINK_UNDERLINES,
  QUICKIT_NEUTRAL_COLORS,
  QUICKIT_SEMANTIC_COLORS,
  QUICKIT_STATUS_COLORS,
} from "@/lib/tokens";
import {
  WEBSITE_ROUTES,
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
  ACCENT_OVERRIDE_SNIPPET,
  QUICKIT_PROVIDER_SNIPPET,
  THEME_PROVIDER_SNIPPET,
  THEME_TOGGLE_SNIPPET,
  THEME_READ_SNIPPET,
  THEME_FOUC_VITE_SNIPPET,
  THEME_FOUC_NEXT_SNIPPET,
  THEME_COLOR_MAP_SNIPPET,
  THEME_CUSTOMIZE_SNIPPET,
  THEME_CLASSES_PATTERN_SNIPPET,
  THEME_CLASSES_USAGE_SNIPPET,
  THEME_CLASSES_INDEX_SNIPPET,
  COMPONENT_IMPORT_SNIPPET,
  UTILS_CN_SNIPPET,
  UTILS_SCROLL_SNIPPET,
  UTILS_REFS_SNIPPET,
  UTILS_TOKENS_SNIPPET,
  UTILS_THEME_SNIPPET,
  RADIUS_PROVIDER_SNIPPET,
  RADIUS_RAW_CSS_SNIPPET,
  RADIUS_CSS_VARIABLE_SNIPPET,
  CUSTOM_SCROLLBAR_SNIPPET,
} from "@/website/docs-content";
import { COMPONENT_DOCS } from "@/website/component-docs";
import {
  getWebsiteDocsSectionIdFromSegment,
  getWebsiteDocsSectionRoute,
  getWebsiteHookRoute,
  hookToSlug,
} from "@/website/docs-navigation";
import WebsiteCodeBlock from "@/website/components/WebsiteCodeBlock";
import WebsiteDocsSidebar from "@/website/components/WebsiteDocsSidebar";
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
    <div className="flex flex-col gap-3">
      <For each={notes}>
        {(note, index) => (
          <div
            key={`${note}-${index}`}
            className="rounded-xl border border-neutral-200 px-4 py-3 text-sm leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
          >
            {note}
          </div>
        )}
      </For>
    </div>
  );
}

function TokenGroupsList({ groups }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <For each={groups}>
        {(group) => (
          <div
            key={group.label}
            className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
          >
            <h4 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
              {group.label}
            </h4>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <For each={group.values}>
                {(value) => (
                  <TokenGroupValue
                    key={`${group.label}-${value}`}
                    value={value}
                  />
                )}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}

const TOKEN_COLOR_SWATCH_CLASSES = {
  neutral:
    "border-neutral-200 bg-neutral-100 text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100",
  primary:
    "border-blue-200 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-100",
  secondary:
    "border-purple-200 bg-purple-100 text-purple-800 dark:border-purple-800 dark:bg-purple-950/60 dark:text-purple-100",
  success:
    "border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-950/60 dark:text-green-100",
  danger:
    "border-red-200 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-950/60 dark:text-red-100",
  warning:
    "border-amber-200 bg-amber-100 text-amber-900 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-100",
  info: "border-cyan-200 bg-cyan-100 text-cyan-800 dark:border-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-100",
  light:
    "border-neutral-200 bg-white text-neutral-900 dark:border-neutral-700 dark:bg-neutral-100 dark:text-neutral-950",
  dark: "border-neutral-800 bg-neutral-900 text-white dark:border-neutral-500 dark:bg-neutral-900 dark:text-neutral-50",
};

const TOKEN_COLOR_GROUPS = [
  {
    id: "tokens-color-identidad",
    title: "Identidad y acción",
    description:
      "Primary y secondary cubren la intención principal y secundaria de marca.",
    colors: ["primary", "secondary"],
  },
  {
    id: "tokens-color-estados",
    title: "Estados semánticos",
    description:
      "Estos colores sí comunican significado de estado: éxito, error, advertencia o información.",
    colors: ["success", "danger", "warning", "info"],
  },
  {
    id: "tokens-color-neutrales",
    title: "Neutrales",
    description:
      "Neutrales para superficies, jerarquía visual y acciones sin intención semántica fuerte.",
    colors: ["neutral", "light", "dark"],
  },
];

const TOKEN_COLOR_VALUES = new Set([
  ...QUICKIT_SEMANTIC_COLORS,
  ...QUICKIT_NEUTRAL_COLORS,
]);

const PALETTE_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const COLOR_PALETTES = [
  { tw: "neutral", label: "Neutral", desc: "Superficies y jerarquía" },
  { tw: "blue", label: "Blue", desc: "Primary (identidad)", token: "primary" },
  {
    tw: "purple",
    label: "Purple",
    desc: "Secondary (acento)",
    token: "secondary",
  },
  { tw: "green", label: "Green", desc: "Success (éxito)", token: "success" },
  { tw: "red", label: "Red", desc: "Danger (peligro)", token: "danger" },
  {
    tw: "amber",
    label: "Amber",
    desc: "Warning (advertencia)",
    token: "warning",
  },
  { tw: "cyan", label: "Cyan", desc: "Info (información)", token: "info" },
];

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
    <Button size="sm" variant={variant} color="primary">
      {variant}
    </Button>
  );
}

function TokenLinkVariantSample({ variant }) {
  return (
    <Link
      href="/docs/components/link"
      variant={variant}
      onClick={(event) => event.preventDefault()}
    >
      {variant}
    </Link>
  );
}

function TokenUnderlineSample({ underline }) {
  return (
    <Link
      href="/docs/components/link"
      underline={underline}
      onClick={(event) => event.preventDefault()}
    >
      {underline}
    </Link>
  );
}

function PaletteSwatch({ tw, shade }) {
  const [copied, setCopied] = useState(false);
  const className = `bg-${tw}-${shade}`;
  const swatchStyle = { backgroundColor: `var(--color-${tw}-${shade})` };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(className);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback silencioso
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative flex flex-col items-center gap-1"
      title={`Copiar ${className}`}
      type="button"
    >
      <div
        style={swatchStyle}
        className={`h-10 w-full min-w-[2.75rem] rounded-md border border-neutral-200/40 transition-all duration-150 group-hover:scale-110 group-hover:shadow-lg group-hover:border-neutral-300 dark:border-white/10 dark:group-hover:border-white/20`}
      />
      <span className="text-[10px] font-medium leading-none text-neutral-500 dark:text-neutral-400">
        {shade}
      </span>
      {copied && (
        <span className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-0.5 text-[10px] text-white dark:bg-white dark:text-neutral-900">
          Copiado
        </span>
      )}
    </button>
  );
}

function ColorPaletteShowcase() {
  return (
    <div className="flex flex-col gap-4">
      <For each={COLOR_PALETTES}>
        {(palette) => (
          <div
            key={palette.tw}
            className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                {palette.label}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {palette.desc}
              </span>
              <Show when={palette.token}>
                <Badge color="primary" variant="soft" size="sm">
                  → {palette.token}
                </Badge>
              </Show>
            </div>
            <div className="flex gap-3 overflow-x-auto px-2 py-2">
              <For each={PALETTE_SHADES}>
                {(shade) => (
                  <PaletteSwatch
                    key={`${palette.tw}-${shade}`}
                    tw={palette.tw}
                    shade={shade}
                  />
                )}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}

function ReviewNotesList({ notes }) {
  return (
    <div className="flex flex-col gap-3">
      <For each={notes}>
        {(note, index) => (
          <div
            key={`${note.tag ?? "nota"}-${index}`}
            className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Show when={note.tag}>
                <Badge color="neutral" variant="soft">
                  {note.tag}
                </Badge>
              </Show>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                {note.text}
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

function OverviewPage() {
  return (
    <>
      <div className="max-w-3xl">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
          Quickit UI desde una base simple
        </h1>
        <p className="mt-4 text-base leading-7 text-neutral-500 dark:text-neutral-400">
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
            <Link
              key={hook.name}
              href={getWebsiteHookRoute(hook.name)}
              className="rounded-xl border border-neutral-200 p-6 transition-colors hover:bg-neutral-50 no-underline dark:border-neutral-800 dark:hover:bg-neutral-900"
            >
              <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                {hook.name}
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                {hook.description}
              </p>
            </Link>
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
        <p className="mt-2 text-neutral-600">
          El hook que buscas no existe o ha sido movido.
        </p>
        <Link
          href="/docs/hooks"
          className="mt-4 inline-block text-primary-600 hover:underline"
        >
          Volver a Hooks
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div id="descripcion" className="scroll-mt-28">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
          {hook.name}
        </h1>
        <p className="mt-4 text-base leading-7 text-neutral-500 dark:text-neutral-400">
          {hook.description}
        </p>
      </div>

      <div className="flex flex-col gap-8">
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
    <div className="flex flex-col">
      <Show when={sectionId === "introduccion"}>
        <WebsiteSection
          id="introduccion"
          title="Introducción"
          description="Componentes de UI para React, copy-pasteados en tu proyecto."
        >
          <div className="flex flex-col gap-6 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
            <p>
              <strong className="font-semibold text-neutral-950 dark:text-neutral-50">
                Esto no es una librería de componentes.
              </strong>{" "}
              Es la forma de construir tu propia librería. Copias el código, lo
              tienes completo y lo modificas como necesites.
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <strong className="font-semibold text-neutral-950 dark:text-neutral-50">
                  Código abierto.
                </strong>{" "}
                Tienes el código completo de cada componente. Modifícalo,
                extiéndelo, úsalo como base para tu propio design system.
              </li>
              <li>
                <strong className="font-semibold text-neutral-950 dark:text-neutral-50">
                  Composición.
                </strong>{" "}
                Cada componente usa una interfaz común y composable. Si un
                componente no existe, lo traemos, lo hacemos composable y ajustamos
                su estilo para que funcione con el resto del sistema.
              </li>
              <li>
                <strong className="font-semibold text-neutral-950 dark:text-neutral-50">
                  Defaults hermosos.
                </strong>{" "}
                Estilos por defecto cuidadosamente elegidos para que tu UI se vea
                bien desde el primer día, sin trabajo extra.
              </li>
              <li>
                <strong className="font-semibold text-neutral-950 dark:text-neutral-50">
                  Tema persistente.
                </strong>{" "}
                Proveedor único para tema, focus ring, ripple y radius. Control
                global con posibilidad de sobrescribir por componente.
              </li>
            </ul>
            <p className="text-neutral-500 dark:text-neutral-500">
              Los primitives compuestos (Accordion, Tabs, Dropdown, Breadcrumb,
              Modal, Drawer, FormControl, InputGroup, Avatar, EmptyState…) exponen
              subcomponentes como{" "}
              <code className="font-mono text-xs">Componente.Subcomponente</code>.
              Los nombres en PascalCase sueltos (
              <code className="font-mono text-xs">TabsList</code>,{" "}
              <code className="font-mono text-xs">FormMessage</code>, etc.) siguen
              exportándose por compatibilidad.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3
                id="introduccion-componentes"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Componentes de producto
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-500 dark:text-neutral-400">
                Botones, formularios, overlays, navegación, identidad y estados
                vacíos listos para integrarse en apps reales.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
              <h3
                id="introduccion-tema"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Tema y comportamiento
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-500 dark:text-neutral-400">
                Proveedor único para tema, focus ring, ripple y press effect,
                con control global y por componente.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800 sm:col-span-2 xl:col-span-1">
              <h3
                id="introduccion-utilidades"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Utilidades lógicas
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-500 dark:text-neutral-400">
                <code className="font-mono text-xs">Show</code>,{" "}
                <code className="font-mono text-xs">RenderSwitch</code> y{" "}
                <code className="font-mono text-xs">For</code> disponibles para
                construir pantallas más declarativas desde la propia librería.
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
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Instala el paquete con tu gestor de dependencias favorito.
              </p>
              <div className="mt-3">
                <WebsiteCodeBlock code={INSTALL_COMMAND} language="bash" />
              </div>
            </div>

            <div>
              <h3
                id="instalacion-estilos"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Importar estilos
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Si tu app no usa Tailwind, importa los estilos de Quickit una
                sola vez. Ese archivo contiene los estilos base de componentes,
                tokens de color, variables CSS y variantes dark compiladas.
              </p>
              <div className="mt-3">
                <WebsiteCodeBlock code={STYLES_SNIPPET} language="css" />
              </div>
            </div>

            <div>
              <h3
                id="instalacion-imports"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Importar componentes
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Importa directamente desde{" "}
                <code className="font-mono text-xs">quickit-ui</code>. Cada
                componente incluye sus estilos.
              </p>
              <div className="mt-3">
                <WebsiteCodeBlock
                  code={COMPONENT_IMPORT_SNIPPET}
                  language="jsx"
                />
              </div>
            </div>

            <div>
              <h3
                id="instalacion-tailwind"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Orden de imports con Tailwind CSS 4
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Si tu app también usa Tailwind CSS 4, importa primero{" "}
                <code className="font-mono text-xs">quickit-ui/styles.css</code>{" "}
                y después <code className="font-mono text-xs">tailwindcss</code>.
                Así Tailwind y los tokens de tu app quedan al final de la cascada
                y pueden sobrescribir lo necesario.
              </p>
              <div className="mt-3">
                <WebsiteCodeBlock
                  code={TAILWIND_STYLES_SNIPPET}
                  language="css"
                />
              </div>
            </div>

            <div>
              <h3
                id="instalacion-colores"
                className="scroll-mt-28 text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Sobrescribir colores de acento
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Todos los colores de acento (
                <code className="font-mono text-xs">primary</code>,{" "}
                <code className="font-mono text-xs">secondary</code>,{" "}
                <code className="font-mono text-xs">success</code>,{" "}
                <code className="font-mono text-xs">danger</code>,{" "}
                <code className="font-mono text-xs">warning</code>,{" "}
                <code className="font-mono text-xs">info</code>) son
                reemplazables porque se mapean directamente a colores nativos de
                Tailwind. Solo sobrescribe el color Tailwind subyacente en{" "}
                <code className="font-mono text-xs">@theme</code>.
              </p>
              <div className="mt-3">
                <WebsiteCodeBlock
                  code={ACCENT_OVERRIDE_SNIPPET}
                  language="css"
                />
              </div>
            </div>
          </div>
        </WebsiteSection>
      </Show>

      <Show when={sectionId === "migracion"}>
        <WebsiteSection
          id="migracion"
          title={`Migración a ${QUICKIT_V1_MIGRATION.toVersion}`}
          description={QUICKIT_V1_MIGRATION.summary}
        >
          <div className="flex flex-col gap-8">
            <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              Ruta cubierta en esta guía:{" "}
              <code className="font-mono text-xs">
                {QUICKIT_V1_MIGRATION.fromVersion}
              </code>{" "}
              →{" "}
              <code className="font-mono text-xs">
                {QUICKIT_V1_MIGRATION.toVersion}
              </code>
              .
            </p>

            <div className="flex flex-col gap-10">
              <For each={QUICKIT_V1_MIGRATION.steps}>
                {(step, index) => (
                  <div
                    key={step.title}
                    id={`migracion-paso-${index + 1}`}
                    className="scroll-mt-28"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white dark:bg-neutral-100 dark:text-neutral-900">
                        {index + 1}
                      </span>
                      <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 ml-10 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                      {step.description}
                    </p>
                    <div className="mt-4 ml-10">
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

            <div id="migracion-checklist" className="scroll-mt-28">
              <h3
                id="migracion-checklist-title"
                className="text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Checklist final
              </h3>
              <ul className="mt-3 flex flex-col gap-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                <For each={QUICKIT_V1_MIGRATION.checks}>
                  {(item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                      {item}
                    </li>
                  )}
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
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700 dark:bg-primary-900/30 dark:text-primary-200">
                v{QUICKIT_V1_RELEASE.version}
              </span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {QUICKIT_V1_RELEASE.date}
              </span>
            </div>
            <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              {QUICKIT_V1_RELEASE.summary}
            </p>

            <div id="changelog-highlight" className="scroll-mt-28">
              <h3
                id="changelog-highlight-title"
                className="text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Highlights
              </h3>
              <ul className="mt-3 flex flex-col gap-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                <For each={QUICKIT_V1_RELEASE.highlights}>
                  {(item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                      {item}
                    </li>
                  )}
                </For>
              </ul>
            </div>

            <div id="changelog-cambios" className="scroll-mt-28">
              <h3
                id="changelog-cambios-title"
                className="text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Cambios destacados
              </h3>
              <ul className="mt-3 flex flex-col gap-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                <For each={QUICKIT_V1_RELEASE.notableChanges}>
                  {(item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                      {item}
                    </li>
                  )}
                </For>
              </ul>
            </div>

            <div>
              <h3
                id="changelog-archivo"
                className="text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Archivo completo
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                El historial completo de la release también vive en{" "}
                <code className="font-mono text-xs">CHANGELOG.md</code> en la
                raíz del repositorio.
              </p>
            </div>
          </div>
        </WebsiteSection>
      </Show>

      <Show when={sectionId === "tema"}>
        <WebsiteSection
          id="tema"
          title="Tema"
          description="Usa QuickitProvider cuando tu app ya resuelve el tema por su cuenta. Usa QuickitThemeProvider cuando quieres persistencia, soporte system y helpers de lectura. radius controla el border-radius global."
        >
          <div className="flex flex-col gap-8">
            <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              QuickitThemeProvider es un wrapper con estado que controla el tema
              y luego renderiza QuickitProvider por debajo. QuickitProvider solo
              aplica la política visual; no persiste ni muta el tema.
            </p>
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
                <WebsiteCodeBlock
                  code={QUICKIT_PROVIDER_SNIPPET}
                  language="jsx"
                />
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
              <div className="mt-4 flex flex-col gap-6">
                <WebsiteCodeBlock
                  code={THEME_PROVIDER_SNIPPET}
                  language="jsx"
                />
                <WebsiteCodeBlock code={THEME_TOGGLE_SNIPPET} language="jsx" />
              </div>
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                useQuickitThemeController debe usarse dentro de
                QuickitThemeProvider.
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
                El "Flash of Unstyled Content" ocurre porque React hidrata el
                tema después del primer pintado. Para evitarlo, es necesario un
                script síncrono en el{" "}
                <code className="text-primary-500">&lt;head&gt;</code> que
                bloquee el renderizado hasta que se aplique la clase correcta.
              </p>

              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                    Vite / SPA (index.html)
                  </h4>
                  <div className="mt-2">
                    <WebsiteCodeBlock
                      code={THEME_FOUC_VITE_SNIPPET}
                      language="html"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                    Next.js (Root Layout)
                  </h4>
                  <div className="mt-2">
                    <WebsiteCodeBlock
                      code={THEME_FOUC_NEXT_SNIPPET}
                      language="jsx"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4
                  id="tema-fouc-resumen"
                  className="text-sm font-semibold text-neutral-950 dark:text-neutral-50"
                >
                  Resumen de implementación
                </h4>
                <ul className="mt-3 flex flex-col gap-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                    <span>
                      <strong className="text-neutral-950 dark:text-neutral-50">
                        ¿Por qué?
                      </strong>{" "}
                      Porque React se ejecuta después de que el navegador pinta
                      el HTML.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                    <span>
                      <strong className="text-neutral-950 dark:text-neutral-50">
                        ¿Cómo?
                      </strong>{" "}
                      Con un script síncrono que modifique{" "}
                      <code className="font-mono text-xs">documentElement</code>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                    <span>
                      <strong className="text-neutral-950 dark:text-neutral-50">
                        ¿Cuándo?
                      </strong>{" "}
                      Inmediatamente, antes de que el navegador renderice el{" "}
                      <code className="font-mono text-xs">&lt;body&gt;</code>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                    <span>
                      <strong className="text-neutral-950 dark:text-neutral-50">
                        ¿Dónde?
                      </strong>{" "}
                      En lo más alto de tu{" "}
                      <code className="font-mono text-xs">&lt;head&gt;</code>.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3
                id="tema-arquitectura-colores"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Arquitectura de colores
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Todos los componentes consumen colores semánticos que se mapean
                directamente a colores nativos de Tailwind v4. Esto permite
                sobrescribir cualquier tono desde{" "}
                <code className="text-primary-500">@theme</code> sin variables
                CSS intermedias ni capas de indirección.
              </p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800">
                      <th className="px-4 py-3 font-semibold text-neutral-950 dark:text-neutral-50">
                        Semántico
                      </th>
                      <th className="px-4 py-3 font-semibold text-neutral-950 dark:text-neutral-50">
                        Color Tailwind
                      </th>
                      <th className="px-4 py-3 font-semibold text-neutral-950 dark:text-neutral-50">
                        Ejemplo de uso
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {[
                      ["neutral", "neutral", "color=&quot;neutral&quot;"],
                      ["primary", "blue", "color=&quot;primary&quot;"],
                      ["secondary", "purple", "color=&quot;secondary&quot;"],
                      ["success", "green", "color=&quot;success&quot;"],
                      ["danger", "red", "color=&quot;danger&quot;"],
                      ["warning", "amber", "color=&quot;warning&quot;"],
                      ["info", "cyan", "color=&quot;info&quot;"],
                      ["light", "neutral", "color=&quot;light&quot;"],
                      ["dark", "neutral", "color=&quot;dark&quot;"],
                    ].map(([semantic, twColor, example]) => (
                      <tr
                        key={semantic}
                        className="text-neutral-600 dark:text-neutral-400"
                      >
                        <td className="px-4 py-2.5 font-mono text-xs">
                          {semantic}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-xs">
                          {twColor}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-xs">
                          {example}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                <strong className="text-neutral-950 dark:text-neutral-50">
                  Nota:
                </strong>{" "}
                <code className="text-primary-500">light</code> y{" "}
                <code className="text-primary-500">dark</code> son neutros
                porque representan fondos extremos, no acentos de estado.
              </p>
            </div>

            <div>
              <h3
                id="tema-personalizar"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Personalizar colores
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Como no hay variables CSS intermedias (
                <code className="text-primary-500">--color-primary</code>),
                cambiar el tono de un color semántico es tan simple como
                sobrescribir el color Tailwind subyacente en{" "}
                <code className="text-primary-500">@theme</code>:
              </p>
              <div className="mt-4">
                <WebsiteCodeBlock
                  code={QUICKIT_PROVIDER_SNIPPET}
                  language="jsx"
                />
              </div>

              <div className="mt-6">
                <PropsTable
                  caption="Props de QuickitProvider"
                  props={[
                    {
                      name: "theme",
                      type: '"light" | "dark"',
                      defaultValue: '"light"',
                      description: "Modo de tema forzado.",
                    },
                    {
                      name: "radius",
                      type: '"sharp" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | string',
                      defaultValue: '"sm"',
                      description: "Radio base del que se derivan todos los border-radius de la librería. Acepta también un valor CSS directo (ej: \"1rem\").",
                    },
                    {
                      name: "focusRing",
                      type: "boolean | { enabled: boolean; disabledComponents: string[] }",
                      defaultValue: "true",
                      description: "Activa/desactiva el anillo de foco global, o por listado de componentes.",
                    },
                    {
                      name: "ripple",
                      type: "boolean | { enabled: boolean; disabledComponents: string[] }",
                      defaultValue: "true",
                      description: "Activa/desactiva el efecto ripple global. Solo aplica cuando pressEffect=\"ripple\".",
                    },
                    {
                      name: "pressEffect",
                      type: '"none" | "transform" | "ripple"',
                      defaultValue: '"transform"',
                      description: "Efecto visual al presionar: \"none\" desactiva todo, \"transform\" aplica escala, \"ripple\" activa ondas.",
                    },
                    {
                      name: "customScrollbar",
                      type: "boolean",
                      defaultValue: "true",
                      description: "Aplica un scrollbar personalizado con los colores del tema.",
                    },
                  ]}
                />
              </div>
              <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Al cambiar{" "}
                <code className="text-primary-500">--color-blue-600</code>,
                todos los componentes con{" "}
                <code className="text-primary-500">
                  color=&quot;primary&quot;
                </code>{" "}
                reflejan el nuevo tono automáticamente. No necesitas tocar las
                definiciones de los componentes.
              </p>
            </div>

            <div>
              <h3
                id="tema-theme-classes"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Sistema theme-classes
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Internamente, cada componente de quickit resuelve sus clases CSS
                desde archivos dedicados en{" "}
                <code className="text-primary-500">
                  src/lib/theme/theme-classes/
                </code>
                . Ningún componente JSX contiene literales como{" "}
                <code className="text-primary-500">blue-600</code> o{" "}
                <code className="text-primary-500">hover:bg-red-500</code>.
              </p>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Cada archivo exporta un objeto con dos variantes —
                <code className="text-primary-500">light</code> y{" "}
                <code className="text-primary-500">dark</code>— y dentro de cada
                una, una entrada por color semántico:
              </p>
              <div className="mt-4">
                <WebsiteCodeBlock
                  code={THEME_CLASSES_PATTERN_SNIPPET}
                  language="js"
                />
              </div>
              <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                El componente recibe el tema vía{" "}
                <code className="text-primary-500">useTheme</code> y selecciona
                el set de clases correspondiente:
              </p>
              <div className="mt-4">
                <WebsiteCodeBlock
                  code={THEME_CLASSES_USAGE_SNIPPET}
                  language="jsx"
                />
              </div>
              <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Los archivos existentes son:
              </p>
              <div className="mt-4">
                <WebsiteCodeBlock
                  code={THEME_CLASSES_INDEX_SNIPPET}
                  language=""
                />
              </div>
            </div>

            <div>
              <h3
                id="tema-modo-oscuro"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Modo oscuro
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Quickit no usa{" "}
                <code className="text-primary-500">
                  @media (prefers-color-scheme: dark)
                </code>{" "}
                ni la clase <code className="text-primary-500">.dark</code> de
                Tailwind para cambiar colores. En su lugar, cada theme-classes
                file define explícitamente los valores{" "}
                <code className="text-primary-500">light</code> y{" "}
                <code className="text-primary-500">dark</code>. El{" "}
                <code className="text-primary-500">ThemeController</code>{" "}
                persiste la preferencia y los componentes leen el tema actual
                para seleccionar el set de clases adecuado en tiempo real.
              </p>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Esto permite cambiar entre modo claro y oscuro sin depender de
                selectores CSS, y funciona correctamente en entornos SPA donde
                la clase <code className="text-primary-500">.dark</code> no está
                disponible.
              </p>
            </div>
          </div>
        </WebsiteSection>
      </Show>

      <Show when={sectionId === "comportamiento"}>
        <WebsiteSection
          id="comportamiento"
          title="Comportamiento"
          description="Define políticas globales de focus ring, ripple, press effect y scrollbar desde el provider, con posibilidad de sobrescribirlas por componente."
        >
          <div className="flex flex-col gap-8">
            <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              Ajusta <code className="font-mono text-xs">focusRing</code>,{" "}
              <code className="font-mono text-xs">ripple</code>,{" "}
              <code className="font-mono text-xs">pressEffect</code>,{" "}
              <code className="font-mono text-xs">customScrollbar</code> y{" "}
              <code className="font-mono text-xs">radius</code> para toda la
              app. Luego, cada componente puede sobrescribir con sus props
              específicas si lo necesitas.
            </p>

            <div>
              <h3
                id="comportamiento-provider"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Configuración completa del Provider
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Todas las props de comportamiento disponibles en QuickitProvider
                y QuickitThemeProvider.
              </p>
              <div className="mt-4">
                <WebsiteCodeBlock
                  code={QUICKIT_PROVIDER_SNIPPET}
                  language="jsx"
                />
              </div>
            </div>

            <div>
              <h3
                id="comportamiento-scrollbar"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Scrollbar custom
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Por defecto, Quickit aplica un scrollbar themado con colores del
                tema en todos los scrollable internals. Desactívalo con{" "}
                <code className="font-mono text-xs">
                  customScrollbar={"{"}false{"}"}
                </code>{" "}
                si prefieres el scrollbar nativo del sistema.
              </p>
              <div className="mt-4">
                <WebsiteCodeBlock
                  code={CUSTOM_SCROLLBAR_SNIPPET}
                  language="jsx"
                />
              </div>
            </div>
          </div>
        </WebsiteSection>
      </Show>

      <Show when={sectionId === "radio"}>
        <WebsiteSection
          id="radio"
          title="Radio (border-radius)"
          description="Configura el border-radius global de todos los componentes desde QuickitProvider o CSS variables."
        >
          <div className="flex flex-col gap-8">
            <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              Quickit usa una variable CSS base (
              <code className="font-mono text-xs">--qk-radius</code>) de la cual
              se derivan todos los radios de la librería. Puedes configurarla
              con la prop <code className="font-mono text-xs">radius</code> del
              provider o directamente en CSS.
            </p>

            <div>
              <h3
                id="radio-provider"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Configuración vía Provider
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Acepta valores semánticos o CSS raw. El default es{" "}
                <code className="font-mono text-xs">"sm"</code> (0.75rem).
              </p>
              <div className="mt-4">
                <WebsiteCodeBlock
                  code={RADIUS_PROVIDER_SNIPPET}
                  language="jsx"
                />
              </div>
            </div>

            <div>
              <h3
                id="radio-semanticos"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Valores semánticos
              </h3>
              <div className="mt-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <div className="grid grid-cols-[auto_1fr_auto] gap-x-6 gap-y-2 px-5 py-4 text-sm">
                  <span className="font-mono text-xs text-neutral-500">
                    sharp
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Sin radio (0)
                  </span>
                  <span className="font-mono text-xs text-neutral-400">0</span>

                  <span className="font-mono text-xs text-neutral-500">xs</span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Muy pequeño
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    0.625rem
                  </span>

                  <span className="font-mono text-xs text-neutral-500">sm</span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Pequeño (default)
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    0.75rem
                  </span>

                  <span className="font-mono text-xs text-neutral-500">md</span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Medio
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    0.875rem
                  </span>

                  <span className="font-mono text-xs text-neutral-500">lg</span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Grande
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    1rem
                  </span>

                  <span className="font-mono text-xs text-neutral-500">xl</span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Extra grande
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    1.25rem
                  </span>

                  <span className="font-mono text-xs text-neutral-500">
                    2xl
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Doble extra
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    1.5rem
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3
                id="radio-css-raw"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                CSS raw
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Pasa cualquier valor CSS válido directamente como string.
              </p>
              <div className="mt-4">
                <WebsiteCodeBlock
                  code={RADIUS_RAW_CSS_SNIPPET}
                  language="jsx"
                />
              </div>
            </div>

            <div>
              <h3
                id="radio-css-variable"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Override vía CSS
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Si no usas el provider, puedes overridear directamente la
                variable CSS. Los radios derivados (
                <code className="font-mono text-xs">--qk-radius-xl</code>,{" "}
                <code className="font-mono text-xs">--qk-radius-2xl</code>,
                etc.) se recalculan automáticamente con{" "}
                <code className="font-mono text-xs">calc()</code>.
              </p>
              <div className="mt-4">
                <WebsiteCodeBlock
                  code={RADIUS_CSS_VARIABLE_SNIPPET}
                  language="css"
                />
              </div>
            </div>

            <div>
              <h3
                id="radio-variables-derivadas"
                className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Variables CSS derivadas
              </h3>
              <div className="mt-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <div className="grid grid-cols-[auto_1fr_auto] gap-x-6 gap-y-2 px-5 py-4 text-sm">
                  <span className="font-mono text-xs text-neutral-500">
                    --qk-radius
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Base (se setea vía provider)
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    0.75rem
                  </span>

                  <span className="font-mono text-xs text-neutral-500">
                    --qk-radius-xs
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Base × 0.833
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    0.625rem
                  </span>

                  <span className="font-mono text-xs text-neutral-500">
                    --qk-radius-lg
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Base × 1.167
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    0.875rem
                  </span>

                  <span className="font-mono text-xs text-neutral-500">
                    --qk-radius-xl
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Base × 1.333
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    1rem
                  </span>

                  <span className="font-mono text-xs text-neutral-500">
                    --qk-radius-2xl
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Base × 1.5
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    1.125rem
                  </span>

                  <span className="font-mono text-xs text-neutral-500">
                    --qk-radius-3xl
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Base × 1.667
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    1.25rem
                  </span>
                </div>
              </div>
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
          <div className="flex flex-col gap-8">
            <div id="tokens-paletas" className="scroll-mt-28">
              <h3
                id="tokens-paletas-title"
                className="text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Paletas de color
              </h3>
              <p className="mt-2 text-xs leading-6 text-neutral-500 dark:text-neutral-400">
                Referencia visual de todos los shades disponibles. Haz clic en
                un swatch para copiar la clase Tailwind.
              </p>
              <div className="mt-4">
                <ColorPaletteShowcase />
              </div>
            </div>

            <div id="tokens-colores" className="scroll-mt-28">
              <h3
                id="tokens-colores-title"
                className="text-sm font-semibold text-neutral-950 dark:text-neutral-50"
              >
                Colores de componentes
              </h3>
              <div className="mt-4 grid gap-5 md:grid-cols-3">
                <For each={TOKEN_COLOR_GROUPS}>
                  {(group) => (
                    <div key={group.id} id={group.id} className="scroll-mt-28">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                        {group.title}
                      </h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <For each={group.colors}>
                          {(color) => (
                            <TokenColorChip key={color} color={color} />
                          )}
                        </For>
                      </div>
                    </div>
                  )}
                </For>
              </div>
              <div
                id="tokens-primary"
                className="mt-5 scroll-mt-28 rounded-xl bg-primary-50/60 p-4 text-sm leading-7 text-primary-900 dark:bg-primary-950/20 dark:text-primary-100"
              >
                <p>
                  <strong>
                    Todos los colores de acento son reemplazables.
                  </strong>{" "}
                  Como quickit mapea cada color semántico a un color Tailwind
                  nativo, sobrescribes cualquier tono desde{" "}
                  <code className="font-mono text-xs">@theme</code>. Por
                  ejemplo,{" "}
                  <code className="font-mono text-xs">--color-blue-600</code>{" "}
                  cambia <code className="font-mono text-xs">primary</code> y{" "}
                  <code className="font-mono text-xs">--color-purple-500</code>{" "}
                  cambia <code className="font-mono text-xs">secondary</code>.
                </p>
                <div className="mt-3">
                  <WebsiteCodeBlock
                    code={ACCENT_OVERRIDE_SNIPPET}
                    language="css"
                  />
                </div>
              </div>
              <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500">
                Incluye <code className="font-mono">secondary</code> disponible
                desde v1.2.0. El tipo público{" "}
                <code className="font-mono">QuickitSemanticColor</code> agrupa
                todos los valores semánticos; la taxonomía visual separa
                identidad (primary, secondary), estados (success, danger,
                warning, info) y neutros (neutral, light, dark). También se usa
                en <code className="font-mono">QUICKIT_ACCENT_COLORS</code> para
                componentes que aceptan toda la gama cromática.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div id="tokens-accent" className="scroll-mt-28">
                <h3
                  id="tokens-accent-title"
                  className="text-sm font-semibold text-neutral-950 dark:text-neutral-50"
                >
                  Colecciones exportadas
                </h3>
                <div className="mt-4 flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                      Acción
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <TokenColorChip color="primary" />
                      <TokenColorChip color="secondary" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                      Estados
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <For each={QUICKIT_STATUS_COLORS}>
                        {(color) => (
                          <TokenColorChip key={color} color={color} />
                        )}
                      </For>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                      Neutrales
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <For each={QUICKIT_NEUTRAL_COLORS}>
                        {(color) => (
                          <TokenColorChip key={color} color={color} />
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              </div>

              <div id="tokens-tamaños" className="scroll-mt-28">
                <h3
                  id="tokens-tamaños-title"
                  className="text-sm font-semibold text-neutral-950 dark:text-neutral-50"
                >
                  Tamaños
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <For each={QUICKIT_CONTROL_SIZES}>
                    {(size) => <TokenSizeSample key={size} size={size} />}
                  </For>
                </div>
              </div>

              <div id="tokens-shapes" className="scroll-mt-28">
                <h3
                  id="tokens-shapes-title"
                  className="text-sm font-semibold text-neutral-950 dark:text-neutral-50"
                >
                  Shapes
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <For each={QUICKIT_BUTTON_SHAPES}>
                    {(shape) => <TokenShapeSample key={shape} shape={shape} />}
                  </For>
                </div>
              </div>

              <div id="tokens-variants" className="scroll-mt-28">
                <h3
                  id="tokens-variants-title"
                  className="text-sm font-semibold text-neutral-950 dark:text-neutral-50"
                >
                  Button variants
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <For each={QUICKIT_BUTTON_VARIANTS}>
                    {(variant) => (
                      <TokenVariantSample key={variant} variant={variant} />
                    )}
                  </For>
                </div>
              </div>

              <div
                id="tokens-link"
                className="scroll-mt-28 lg:col-span-2"
              >
                <h3
                  id="tokens-link-title"
                  className="text-sm font-semibold text-neutral-950 dark:text-neutral-50"
                >
                  Link
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <For each={QUICKIT_LINK_TEXT_VARIANTS}>
                    {(variant) => (
                      <TokenLinkVariantSample key={variant} variant={variant} />
                    )}
                  </For>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <For each={QUICKIT_LINK_UNDERLINES}>
                    {(underline) => (
                      <TokenUnderlineSample
                        key={underline}
                        underline={underline}
                      />
                    )}
                  </For>
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
          <div className="flex flex-col gap-8">
            <div
              id="utilidades-clases"
              className="scroll-mt-28 flex flex-col gap-3"
            >
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Clases y radios
              </h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                Usa <code className="font-mono text-xs">cn</code>,{" "}
                <code className="font-mono text-xs">getControlRadius</code> y{" "}
                <code className="font-mono text-xs">getAvatarRadius</code>{" "}
                cuando construyas wrappers que deban seguir la geometría visual
                de Quickit.
              </p>
              <WebsiteCodeBlock code={UTILS_CN_SNIPPET} language="jsx" />
            </div>

            <div
              id="utilidades-scroll"
              className="scroll-mt-28 flex flex-col gap-3"
            >
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Bloqueo de scroll
              </h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                <code className="font-mono text-xs">lockAppScroll</code> y{" "}
                <code className="font-mono text-xs">unlockAppScroll</code>{" "}
                sirven para overlays o paneles custom que no usan `Modal` o
                `Drawer` pero necesitan el mismo comportamiento de bloqueo del
                body.
              </p>
              <WebsiteCodeBlock code={UTILS_SCROLL_SNIPPET} language="jsx" />
            </div>

            <div
              id="utilidades-refs"
              className="scroll-mt-28 flex flex-col gap-3"
            >
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Merge de refs
              </h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                <code className="font-mono text-xs">useMergeRefs</code> evita
                helpers ad hoc cuando un wrapper necesita combinar su ref local
                con la ref del consumidor.
              </p>
              <WebsiteCodeBlock code={UTILS_REFS_SNIPPET} language="jsx" />
            </div>

            <div
              id="utilidades-tokens"
              className="scroll-mt-28 flex flex-col gap-3"
            >
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Resolución de tokens
              </h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                <code className="font-mono text-xs">resolveQuickitToken</code> e{" "}
                <code className="font-mono text-xs">isQuickitTokenValue</code>{" "}
                son útiles cuando aceptas configuraciones dinámicas y quieres
                normalizarlas contra las listas oficiales de Quickit.
              </p>
              <WebsiteCodeBlock code={UTILS_TOKENS_SNIPPET} language="jsx" />
            </div>

            <div
              id="utilidades-tema"
              className="scroll-mt-28 flex flex-col gap-3"
            >
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                Tema resuelto
              </h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                <code className="font-mono text-xs">
                  resolveQuickitThemeMode
                </code>{" "}
                normaliza valores dinámicos a{" "}
                <code className="font-mono text-xs">light</code> o{" "}
                <code className="font-mono text-xs">dark</code>. No detecta{" "}
                <code className="font-mono text-xs">system</code> por sí sola;
                para eso usa{" "}
                <code className="font-mono text-xs">QuickitThemeProvider</code>{" "}
                o{" "}
                <code className="font-mono text-xs">
                  useQuickitThemeController
                </code>
                .
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
          <div className="flex flex-col gap-8">
            <For each={WEBSITE_COMPONENT_GROUPS}>
              {(group) => (
                <div
                  key={group.title}
                  className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
                >
                  <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                    {group.title}
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <For each={group.items}>
                      {(item) => (
                        <Link
                          key={item.slug}
                          href={getWebsiteComponentRoute(item.slug)}
                          className="rounded-xl border border-neutral-200 p-4 transition-colors hover:bg-neutral-50 no-underline dark:border-neutral-800 dark:hover:bg-neutral-900"
                        >
                          <p className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                            {item.name}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                            {item.description}
                          </p>
                        </Link>
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
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
          {component.name}
        </h1>
        <p className="mt-4 text-base leading-7 text-neutral-500 dark:text-neutral-400">
          {doc?.description ?? component.description}
        </p>
      </div>

      <div className="flex flex-col">
        <Show when={doc}>
          <WebsiteSection id="ejemplo-visual" title="Ejemplo visual y código">
            <WebsitePreviewTabs code={doc.previewCode}>
              {doc.preview}
            </WebsitePreviewTabs>
          </WebsiteSection>

          <WebsiteSection id="instalacion" title="Instalación">
            <WebsiteCodeBlock code={doc.installCode} language="jsx" />
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
            <div className="flex flex-col gap-8">
              <For each={doc.examples ?? []}>
                {(example) => (
                  <div
                    key={example.id}
                    className={
                      example.id === "ejemplos-props" ? "pt-2" : undefined
                    }
                  >
                    <h3
                      id={example.id}
                      className="scroll-mt-28 text-base font-semibold text-neutral-950 dark:text-neutral-50"
                    >
                      {example.title}
                    </h3>
                    <Show when={example.preview}>
                      <div className="mt-4">
                        <Show when={example.code} fallback={example.preview}>
                          <WebsitePreviewTabs code={example.code}>
                            {example.preview}
                          </WebsitePreviewTabs>
                        </Show>
                      </div>
                    </Show>
                    <Show when={example.description}>
                      <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                        {example.description}
                      </p>
                    </Show>
                    <Show when={example.note}>
                      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                        {example.note}
                      </p>
                    </Show>
                    <Show when={example.props}>
                      <div className="mt-4">
                        <PropsTable props={example.props} />
                      </div>
                    </Show>
                    <Show when={example.notes}>
                      <div className="mt-6">
                        <NotesList notes={example.notes} />
                      </div>
                    </Show>
                  </div>
                )}
              </For>
            </div>
          </WebsiteSection>
        </Show>

        <Show when={!doc}>
          <WebsiteSection
            id="ejemplo-visual"
            title="Página en construcción"
            description={`La arquitectura ya está lista para ${component.name}. Lo siguiente es documentar este componente con el mismo nivel de detalle que Button: ejemplo visual, instalación, uso y ejemplos completos.`}
          >
            <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
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
      <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
        <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
          Revisa la URL o vuelve al índice de componentes para abrir una página
          válida de la librería.
        </p>
        <div className="mt-4">
          <Link href={getWebsiteDocsSectionRoute("componentes")}>
            Ver componentes
          </Link>
        </div>
      </div>
    </WebsiteSection>
  );
}

export default function DocsPage({ currentPath }) {
  const route = parseDocsRoute(currentPath);
  const { mode, componentSlug, sectionId, hookSlug } = route;

  const currentComponent =
    mode === "component" ? WEBSITE_COMPONENT_LOOKUP[componentSlug] : null;

  const contentRef = useRef(null);
  const [tocSections, setTocSections] = useState([]);

  useEffect(() => {
    if (!contentRef.current) return;
    const timer = setTimeout(() => {
      const content = contentRef.current;
      const result = [];
      const sections = content.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const id = section.getAttribute("id");
        const h2 = section.querySelector("h2");
        if (!id || !h2) return;
        const entry = { id, label: h2.textContent.trim(), children: [] };
        const h3s = section.querySelectorAll("h3[id]");
        h3s.forEach((h3) => {
          const childId = h3.getAttribute("id");
          if (childId) {
            entry.children.push({ id: childId, label: h3.textContent.trim() });
          }
        });
        result.push(entry);
      });
      setTocSections(result);
    }, 0);
    return () => clearTimeout(timer);
  }, [mode, componentSlug, sectionId, hookSlug]);

  return (
    <WebsiteLayout
      sidebar={
        <WebsiteDocsSidebar
          currentComponentSlug={currentComponent?.slug}
          sections={WEBSITE_DOC_OVERVIEW_SECTIONS}
          componentGroups={WEBSITE_COMPONENT_GROUPS}
          currentPath={currentPath}
        />
      }
      tocSections={tocSections}
    >
      <div ref={contentRef}>
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
      </div>
    </WebsiteLayout>
  );
}
