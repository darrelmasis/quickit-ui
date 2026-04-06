export const STORAGE_KEY = "quickit-ui-docs-theme";
export const DEFAULT_INTRO_SECTION = "/getting-started";
export const DEFAULT_COMPONENT_SECTION = "/fundamentos/provider";
export const DEFAULT_EXAMPLES_SECTION = "/ejemplos";

export const INTRO_ITEMS = [
  { href: "/getting-started", label: "Getting started", id: "getting-started" },
  { href: "/instalacion", label: "Instalación", id: "instalacion" },
  { href: "/compatibilidad", label: "Compatibilidad", id: "compatibilidad" },
];

export const EXAMPLE_ITEMS = [
  { href: "/ejemplos", label: "Ejemplos", id: "examples" },
];

export const COMPONENT_GROUPS = [
  {
    label: "Fundamentos",
    items: [
      { href: "/fundamentos/provider", label: "QuickitProvider", id: "provider" },
      { href: "/fundamentos/theme", label: "Tema", id: "theme" },
      { href: "/fundamentos/use-breakpoint", label: "useBreakpoint", id: "use-breakpoint" },
      { href: "/fundamentos/use-media-query", label: "useMediaQuery", id: "use-media-query" },
      { href: "/fundamentos/use-focus-ring", label: "useQuickitFocusRing", id: "use-focus-ring" },
      { href: "/fundamentos/colores", label: "Colores", id: "colors" },
      { href: "/fundamentos/estados", label: "Estados", id: "states" },
    ],
  },
  {
    label: "Acciones",
    items: [
      { href: "/acciones/button", label: "Button", id: "button" },
      { href: "/acciones/link", label: "Link", id: "link" },
    ],
  },
  {
    label: "Formularios",
    items: [
      { href: "/formularios/checkbox", label: "Checkbox", id: "checkbox" },
      { href: "/formularios/form-control", label: "FormControl", id: "form-control" },
      { href: "/formularios/input", label: "Input", id: "input" },
      { href: "/formularios/label", label: "Label", id: "label" },
      { href: "/formularios/radio", label: "Radio", id: "radio" },
      { href: "/formularios/select", label: "Select", id: "select" },
      { href: "/formularios/switch", label: "Switch", id: "switch" },
      { href: "/formularios/textarea", label: "Textarea", id: "textarea" },
    ],
  },
  {
    label: "Overlays",
    items: [
      { href: "/overlays/dropdown", label: "Dropdown", id: "dropdown" },
      { href: "/overlays/modal", label: "Modal", id: "modal" },
      { href: "/overlays/popover", label: "Popover", id: "popover" },
      { href: "/overlays/tooltip", label: "Tooltip", id: "tooltip" },
    ],
  },
  {
    label: "Navegación",
    items: [
      { href: "/navegacion/accordion", label: "Accordion", id: "accordion" },
      { href: "/navegacion/breadcrumb", label: "Breadcrumb", id: "breadcrumb" },
      { href: "/navegacion/pagination", label: "Pagination", id: "pagination" },
      { href: "/navegacion/tabs", label: "Tabs", id: "tabs" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { href: "/feedback/badge", label: "Badge", id: "badge" },
      { href: "/feedback/empty-state", label: "EmptyState", id: "empty-state" },
      { href: "/feedback/skeleton", label: "Skeleton", id: "skeleton" },
    ],
  },
  {
    label: "Logica",
    items: [
      { href: "/logica/show", label: "Show", id: "show" },
      { href: "/logica/render-switch", label: "RenderSwitch", id: "render-switch" },
      { href: "/logica/for", label: "For", id: "for" },
    ],
  },
  {
    label: "Identidad",
    items: [
      { href: "/identidad/avatar", label: "Avatar", id: "avatar" },
      { href: "/identidad/initials", label: "Initials", id: "initials" },
      { href: "/identidad/avatar-presence", label: "AvatarPresence", id: "avatar-presence" },
      { href: "/identidad/user-chip", label: "UserChip", id: "user-chip" },
    ],
  },
];

export const COMPONENT_ITEMS = COMPONENT_GROUPS.flatMap((group) => group.items);
export const ALL_ITEMS = [...INTRO_ITEMS, ...EXAMPLE_ITEMS, ...COMPONENT_ITEMS];

export const docsConventions = [
  "Cada sección muestra primero el caso de uso principal y luego la API.",
  "Las variantes, colores, tamaños y estados se muestran con ejemplos reales antes de la tabla de props.",
  "Las props compartidas como `className`, `disabled`, `invalid` o controlado/no controlado siguen el mismo criterio en toda la librería.",
];

export const docsTheme = {
  light: {
    mode: "light",
    page: "bg-stone-50 text-zinc-950",
    surface: "border-zinc-200 bg-white",
    sidebar: "border-zinc-200 bg-white",
    intro: "border-zinc-200 bg-white",
    panel: "border-zinc-200 bg-white",
    divider: "border-zinc-200",
    title: "text-zinc-950",
    body: "text-zinc-600",
    muted: "text-zinc-500",
    accent: "text-zinc-700",
    code: "border-zinc-200 bg-white text-zinc-900 shadow-sm",
    codeMuted: "text-zinc-500",
    preview: "border-zinc-200 bg-zinc-50/80",
    badge: "border-zinc-200 bg-zinc-100 text-zinc-700",
    introCard: "border-zinc-200 bg-zinc-50/70",
  },
  dark: {
    mode: "dark",
    page: "bg-[#09090b] text-zinc-100",
    surface: "border-zinc-800 bg-[#0b0b0d]",
    sidebar: "border-zinc-800 bg-[#09090b]",
    intro: "border-zinc-800 bg-[#09090b]",
    panel: "border-zinc-800 bg-[#09090b]",
    divider: "border-zinc-800",
    title: "text-zinc-50",
    body: "text-zinc-400",
    muted: "text-zinc-500",
    accent: "text-zinc-300",
    code: "border-zinc-800 bg-[#0d0f12] text-zinc-100",
    codeMuted: "text-zinc-500",
    preview: "border-zinc-800 bg-[#111113]",
    badge: "border-zinc-800 bg-[#151518] text-zinc-300",
    introCard: "border-zinc-800 bg-[#111113]",
  },
};

export function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function normalizePathname(pathname) {
  if (!pathname || pathname === "/") {
    return DEFAULT_INTRO_SECTION;
  }

  return pathname.endsWith("/") && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;
}

function findSection(pathname, items, fallback) {
  const normalizedPathname = normalizePathname(pathname);

  return items.some((item) => item.href === normalizedPathname)
    ? normalizedPathname
    : fallback;
}

export function getInitialIntroSection() {
  if (typeof window === "undefined") {
    return DEFAULT_INTRO_SECTION;
  }

  return findSection(window.location.pathname, INTRO_ITEMS, DEFAULT_INTRO_SECTION);
}

export function getInitialComponentSection() {
  if (typeof window === "undefined") {
    return DEFAULT_COMPONENT_SECTION;
  }

  return findSection(
    window.location.pathname,
    COMPONENT_ITEMS,
    DEFAULT_COMPONENT_SECTION,
  );
}
