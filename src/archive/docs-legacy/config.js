export const STORAGE_KEY = "quickit-ui-docs-theme";
export const LANDING_SECTION = "/";
export const DEFAULT_INTRO_SECTION = "/docs/getting-started";
export const DEFAULT_COMPONENT_SECTION = "/docs/components";
export const DEFAULT_EXAMPLES_SECTION = "/docs/examples";
export const DOCS_SHELL_WIDTH_CLASS = "max-w-[1600px]";

export const LANDING_ITEM = { href: "/", label: "Inicio", id: "landing" };

export const INTRO_ITEMS = [
  { href: "/docs/getting-started", label: "Primeros pasos", id: "getting-started" },
  { href: "/docs/installation", label: "Instalación", id: "instalacion" },
  { href: "/docs/compatibility", label: "Compatibilidad", id: "compatibilidad" },
];

export const EXAMPLE_NAV_ITEMS = [
  { href: "/docs/examples", label: "Ejemplos", id: "examples" },
];

export const EXAMPLE_GROUPS = [
  {
    id: "acceso",
    label: "Acceso",
    items: [
      { href: "/docs/examples/login", label: "Inicio de sesión", id: "login-example" },
      { href: "/docs/examples/signup", label: "Registro", id: "signup-example" },
      { href: "/docs/examples/recovery", label: "Recuperar acceso", id: "recovery-example" },
    ],
  },
  {
    id: "formularios",
    label: "Formularios",
    items: [
      { href: "/docs/examples/contact", label: "Formulario de contacto", id: "contact-form-example" },
      { href: "/docs/examples/profile", label: "Configuración de perfil", id: "profile-settings-example" },
      { href: "/docs/examples/plans", label: "Selección de plan", id: "plan-selector-example" },
    ],
  },
  {
    id: "producto",
    label: "Producto",
    items: [
      { href: "/docs/examples/dashboard", label: "Panel de revisiones", id: "dashboard-example" },
      { href: "/docs/examples/help-center", label: "Centro de ayuda", id: "help-center-example" },
      { href: "/docs/examples/data-states", label: "Carga y estado vacío", id: "states-example" },
    ],
  },
];

export const EXAMPLE_ITEMS = [
  ...EXAMPLE_NAV_ITEMS,
  ...EXAMPLE_GROUPS.flatMap((group) => group.items),
];

export const COMPONENT_NAV_ITEMS = [
  { href: "/docs/components", label: "Resumen", id: "components-home" },
];

export const COMPONENT_GROUPS = [
  {
    label: "Fundamentos",
    items: [
      { href: "/docs/foundations/provider", label: "QuickitProvider", id: "provider" },
      { href: "/docs/foundations/theme", label: "useQuickitTheme", id: "theme" },
      { href: "/docs/foundations/use-breakpoint", label: "useBreakpoint", id: "use-breakpoint" },
      { href: "/docs/foundations/use-media-query", label: "useMediaQuery", id: "use-media-query" },
      { href: "/docs/foundations/use-focus-ring", label: "useQuickitFocusRing", id: "use-focus-ring" },
      { href: "/docs/foundations/use-ripple", label: "useQuickitRipple", id: "use-ripple" },
      { href: "/docs/foundations/colors", label: "Colores", id: "colors" },
      { href: "/docs/foundations/states", label: "Estados", id: "states" },
    ],
  },
  {
    label: "Acciones",
    items: [
      { href: "/docs/components/button", label: "Button", id: "button" },
      { href: "/docs/components/link", label: "Link", id: "link" },
    ],
  },
  {
    label: "Formularios",
    items: [
      { href: "/docs/components/checkbox", label: "Checkbox", id: "checkbox" },
      { href: "/docs/components/form-control", label: "FormControl", id: "form-control" },
      { href: "/docs/components/input", label: "Input", id: "input" },
      { href: "/docs/components/label", label: "Label", id: "label" },
      { href: "/docs/components/radio", label: "Radio", id: "radio" },
      { href: "/docs/components/select", label: "Select", id: "select" },
      { href: "/docs/components/switch", label: "Switch", id: "switch" },
      { href: "/docs/components/textarea", label: "Textarea", id: "textarea" },
    ],
  },
  {
    label: "Overlays",
    items: [
      { href: "/docs/components/dropdown", label: "Dropdown", id: "dropdown" },
      { href: "/docs/components/modal", label: "Modal", id: "modal" },
      { href: "/docs/components/popover", label: "Popover", id: "popover" },
      { href: "/docs/components/tooltip", label: "Tooltip", id: "tooltip" },
    ],
  },
  {
    label: "Navegación",
    items: [
      { href: "/docs/components/accordion", label: "Accordion", id: "accordion" },
      { href: "/docs/components/breadcrumb", label: "Breadcrumb", id: "breadcrumb" },
      { href: "/docs/components/pagination", label: "Pagination", id: "pagination" },
      { href: "/docs/components/tabs", label: "Tabs", id: "tabs" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { href: "/docs/components/badge", label: "Badge", id: "badge" },
      { href: "/docs/components/empty-state", label: "EmptyState", id: "empty-state" },
      { href: "/docs/components/skeleton", label: "Skeleton", id: "skeleton" },
    ],
  },
  {
    label: "Lógica",
    items: [
      { href: "/docs/components/show", label: "Show", id: "show" },
      { href: "/docs/components/render-switch", label: "RenderSwitch", id: "render-switch" },
      { href: "/docs/components/for", label: "For", id: "for" },
    ],
  },
  {
    label: "Identidad",
    items: [
      { href: "/docs/components/avatar", label: "Avatar", id: "avatar" },
      { href: "/docs/components/initials", label: "Initials", id: "initials" },
      { href: "/docs/components/avatar-presence", label: "AvatarPresence", id: "avatar-presence" },
      { href: "/docs/components/user-chip", label: "UserChip", id: "user-chip" },
    ],
  },
];

export const COMPONENT_ITEMS = [
  ...COMPONENT_NAV_ITEMS,
  ...COMPONENT_GROUPS.flatMap((group) => group.items),
];
export const ALL_ITEMS = [LANDING_ITEM, ...INTRO_ITEMS, ...EXAMPLE_ITEMS, ...COMPONENT_ITEMS];

export const docsConventions = [
  "Cada sección muestra primero el caso de uso principal y luego la API.",
  "Las variantes, colores, tamaños y estados se muestran con ejemplos reales antes de la tabla de props.",
  "Las props compartidas como `className`, `disabled`, `invalid` o controlado/no controlado siguen el mismo criterio en toda la librería.",
];

export const docsTheme = {
  light: {
    mode: "light",
    page: "bg-stone-50 text-zinc-950",
    header: "border-zinc-200/80 bg-white/90",
    surface: "border-zinc-200 bg-white",
    sidebar: "border-zinc-200 bg-white",
    drawer: "border-zinc-200 bg-white",
    drawerCard: "border-zinc-200 bg-zinc-50",
    intro: "border-zinc-200 bg-white",
    panel: "border-zinc-200 bg-white",
    divider: "border-zinc-200",
    title: "text-zinc-950",
    body: "text-zinc-600",
    muted: "text-zinc-500",
    accent: "text-zinc-700",
    sidebarLabel: "text-zinc-400",
    navActive: "bg-zinc-900/8 text-zinc-950",
    navIdle: "text-zinc-600 hover:bg-zinc-900/5 hover:text-zinc-900",
    tocActive: "border-zinc-950 text-zinc-950",
    tocIdle: "border-transparent text-zinc-500 hover:text-zinc-900",
    code: "border-zinc-200 bg-white text-zinc-900 shadow-sm",
    codeMuted: "text-zinc-500",
    preview: "border-zinc-200 bg-zinc-50/80",
    badge: "border-zinc-200 bg-zinc-100 text-zinc-700",
    introCard: "border-zinc-200 bg-zinc-50/70",
  },
  dark: {
    mode: "dark",
    page: "bg-[#09090b] text-zinc-100",
    header: "border-zinc-800/80 bg-zinc-950/90",
    surface: "border-zinc-800 bg-[#0b0b0d]",
    sidebar: "border-zinc-800 bg-[#09090b]",
    drawer: "border-zinc-800 bg-zinc-950",
    drawerCard: "border-zinc-800 bg-zinc-900",
    intro: "border-zinc-800 bg-[#09090b]",
    panel: "border-zinc-800 bg-[#09090b]",
    divider: "border-zinc-800",
    title: "text-zinc-50",
    body: "text-zinc-400",
    muted: "text-zinc-500",
    accent: "text-zinc-300",
    sidebarLabel: "text-zinc-500",
    navActive: "bg-white/8 text-zinc-50",
    navIdle: "text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
    tocActive: "border-zinc-50 text-zinc-50",
    tocIdle: "border-transparent text-zinc-400 hover:text-zinc-50",
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
  if (!pathname) {
    return DEFAULT_INTRO_SECTION;
  }

  if (pathname === "/") {
    return LANDING_SECTION;
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
