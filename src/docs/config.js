export const STORAGE_KEY = "quickit-ui-docs-theme";
export const DEFAULT_INTRO_SECTION = "#getting-started";
export const DEFAULT_COMPONENT_SECTION = "#button";

export const INTRO_ITEMS = [
  { href: "#getting-started", label: "Getting started" },
  { href: "#instalacion", label: "Instalación" },
  { href: "#compatibilidad", label: "Compatibilidad" },
];

export const COMPONENT_ITEMS = [
  { href: "#accordion", label: "Accordion" },
  { href: "#avatar", label: "Avatar" },
  { href: "#badge", label: "Badge" },
  { href: "#breadcrumb", label: "Breadcrumb" },
  { href: "#button", label: "Button" },
  { href: "#checkbox", label: "Checkbox" },
  { href: "#dropdown", label: "Dropdown" },
  { href: "#empty-state", label: "EmptyState" },
  { href: "#form-control", label: "FormControl" },
  { href: "#input", label: "Input" },
  { href: "#label", label: "Label" },
  { href: "#link", label: "Link" },
  { href: "#modal", label: "Modal" },
  { href: "#pagination", label: "Pagination" },
  { href: "#popover", label: "Popover" },
  { href: "#radio", label: "Radio" },
  { href: "#select", label: "Select" },
  { href: "#skeleton", label: "Skeleton" },
  { href: "#switch", label: "Switch" },
  { href: "#tabs", label: "Tabs" },
  { href: "#textarea", label: "Textarea" },
  { href: "#tooltip", label: "Tooltip" },
];

export const docsConventions = [
  "Cada sección muestra primero el caso de uso principal y luego la API.",
  "Las variantes, colores, tamaños y estados se muestran con ejemplos reales antes de la tabla de props.",
  "Las props compartidas como `className`, `disabled`, `invalid` o controlado/no controlado siguen el mismo criterio en toda la librería.",
];

export const docsTheme = {
  light: {
    mode: "light",
    page: "bg-slate-50 text-slate-950",
    surface: "border-slate-200 bg-white",
    sidebar: "border-slate-200 bg-white",
    intro: "border-slate-200 bg-white",
    panel: "border-slate-200 bg-white",
    divider: "border-slate-200",
    title: "text-slate-950",
    body: "text-slate-600",
    muted: "text-slate-500",
    accent: "text-blue-700",
    code: "border-slate-200 bg-slate-950 text-slate-100",
    codeMuted: "text-slate-400",
    preview: "border-slate-200 bg-slate-50/80",
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    introCard: "border-slate-200 bg-slate-50/70",
  },
  dark: {
    mode: "dark",
    page: "bg-stone-950 text-stone-100",
    surface: "border-zinc-800 bg-zinc-950",
    sidebar: "border-zinc-800 bg-zinc-950",
    intro: "border-zinc-800 bg-zinc-950",
    panel: "border-zinc-800 bg-zinc-950",
    divider: "border-zinc-800",
    title: "text-stone-50",
    body: "text-stone-300",
    muted: "text-stone-400",
    accent: "text-zinc-300",
    code: "border-zinc-700 bg-black text-stone-100",
    codeMuted: "text-stone-500",
    preview: "border-zinc-800 bg-zinc-900/60",
    badge: "border-zinc-700 bg-zinc-900 text-zinc-200",
    introCard: "border-zinc-800 bg-zinc-900/60",
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
