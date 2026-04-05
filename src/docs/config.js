export const STORAGE_KEY = "quickit-ui-docs-theme";
export const DEFAULT_INTRO_SECTION = "#getting-started";
export const DEFAULT_COMPONENT_SECTION = "#provider";

export const INTRO_ITEMS = [
  { href: "#getting-started", label: "Getting started" },
  { href: "#instalacion", label: "Instalación" },
  { href: "#compatibilidad", label: "Compatibilidad" },
];

export const COMPONENT_GROUPS = [
  {
    label: "Fundamentos",
    items: [
      { href: "#provider", label: "QuickitProvider" },
      { href: "#theme", label: "Tema" },
      { href: "#colors", label: "Colores" },
      { href: "#states", label: "Estados" },
    ],
  },
  {
    label: "Acciones",
    items: [
      { href: "#button", label: "Button" },
      { href: "#link", label: "Link" },
    ],
  },
  {
    label: "Formularios",
    items: [
      { href: "#checkbox", label: "Checkbox" },
      { href: "#form-control", label: "FormControl" },
      { href: "#input", label: "Input" },
      { href: "#label", label: "Label" },
      { href: "#radio", label: "Radio" },
      { href: "#select", label: "Select" },
      { href: "#switch", label: "Switch" },
      { href: "#textarea", label: "Textarea" },
    ],
  },
  {
    label: "Overlays",
    items: [
      { href: "#dropdown", label: "Dropdown" },
      { href: "#modal", label: "Modal" },
      { href: "#popover", label: "Popover" },
      { href: "#tooltip", label: "Tooltip" },
    ],
  },
  {
    label: "Navegación",
    items: [
      { href: "#accordion", label: "Accordion" },
      { href: "#breadcrumb", label: "Breadcrumb" },
      { href: "#pagination", label: "Pagination" },
      { href: "#tabs", label: "Tabs" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { href: "#badge", label: "Badge" },
      { href: "#empty-state", label: "EmptyState" },
      { href: "#skeleton", label: "Skeleton" },
    ],
  },
  {
    label: "Identidad",
    items: [{ href: "#avatar", label: "Avatar" }],
  },
];

export const COMPONENT_ITEMS = COMPONENT_GROUPS.flatMap((group) => group.items);

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

function findSection(hash, items, fallback) {
  return items.some((item) => item.href === hash) ? hash : fallback;
}

export function getInitialIntroSection() {
  if (typeof window === "undefined") {
    return DEFAULT_INTRO_SECTION;
  }

  return findSection(window.location.hash, INTRO_ITEMS, DEFAULT_INTRO_SECTION);
}

export function getInitialComponentSection() {
  if (typeof window === "undefined") {
    return DEFAULT_COMPONENT_SECTION;
  }

  return findSection(
    window.location.hash,
    COMPONENT_ITEMS,
    DEFAULT_COMPONENT_SECTION,
  );
}
