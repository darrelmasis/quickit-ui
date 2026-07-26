export const INSTALL_COMMAND = `npm install quickit-ui`;

export const STYLES_SNIPPET = `@import "quickit-ui/styles.css";`;

export const TAILWIND_STYLES_SNIPPET = `@import "quickit-ui/styles.css";
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));`;

export const ACCENT_OVERRIDE_SNIPPET = `@import "quickit-ui/styles.css";
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-blue-600: oklch(0.5 0.22 260);
  --color-purple-500: oklch(0.62 0.24 300);
  --color-green-500: oklch(0.62 0.2 150);
}`;

export const COMPONENT_IMPORT_SNIPPET = `import { Button } from "quickit-ui";

export function SaveAction() {
  return <Button color="primary">Guardar</Button>;
}`;

export const QUICKIT_PROVIDER_SNIPPET = `import { QuickitProvider } from "quickit-ui";

export function AppRoot({ theme }) {
  return (
    <QuickitProvider
      theme={theme}
      radius="md"
      customScrollbar={true}
      focusRing={{ enabled: true, disabledComponents: ["dropdown"] }}
      ripple={{ enabled: true, disabledComponents: ["link"] }}
      pressEffect="transform"
    >
      <App />
    </QuickitProvider>
  );
}`;

export const THEME_PROVIDER_SNIPPET = `import { QuickitThemeProvider } from "quickit-ui";

createRoot(document.getElementById("root")).render(
  <QuickitThemeProvider
    defaultTheme="system"
    storageKey="quickit-ui-theme"
    radius="md"
    customScrollbar={true}
    focusRing={true}
    ripple={true}
    pressEffect="transform"
  >
    <App />
  </QuickitThemeProvider>,
);`;

export const THEME_TOGGLE_SNIPPET = `import { Switch, useQuickitThemeController } from "quickit-ui";

function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useQuickitThemeController();

  return (
    <Switch
      checked={resolvedTheme === "dark"}
      onCheckedChange={toggleTheme}
      label={\`Tema: \${resolvedTheme}\`}
    />
  );
}`;

export const THEME_READ_SNIPPET = `import { useQuickitTheme } from "quickit-ui";

function ThemeBadge() {
  const theme = useQuickitTheme();

  return <span>Tema activo: {theme}</span>;
}`;

export const UTILS_CN_SNIPPET = `import { cn, getControlRadius, getAvatarRadius } from "quickit-ui";

function Card({ active }) {
  return (
    <div
      className={cn(
        "border p-4 transition-colors",
        getControlRadius("lg"),
        active ? "border-primary-500 bg-primary-50" : "border-neutral-200",
      )}
    >
      Radio de avatar: {getAvatarRadius("rounded", "md")}
    </div>
  );
}`;

export const UTILS_SCROLL_SNIPPET = `import { lockAppScroll, unlockAppScroll } from "quickit-ui";

function openCustomOverlay() {
  lockAppScroll();
}

function closeCustomOverlay() {
  unlockAppScroll();
}`;

export const UTILS_REFS_SNIPPET = `import { useMergeRefs } from "quickit-ui";
import { forwardRef, useRef } from "react";

const SearchInput = forwardRef(function SearchInput(props, ref) {
  const localRef = useRef(null);
  const mergedRef = useMergeRefs(ref, localRef);

  return <input ref={mergedRef} {...props} />;
});`;

export const UTILS_TOKENS_SNIPPET = `import {
  QUICKIT_ACCENT_COLORS,
  QUICKIT_NEUTRAL_COLORS,
  QUICKIT_SEMANTIC_COLORS,
  QUICKIT_STATUS_COLORS,
  isQuickitTokenValue,
  resolveQuickitToken,
} from "quickit-ui";

const color = resolveQuickitToken(
  QUICKIT_SEMANTIC_COLORS,
  userColor,
  "neutral",
);

const isKnownColor = isQuickitTokenValue(QUICKIT_SEMANTIC_COLORS, color);
const statusColors = QUICKIT_STATUS_COLORS;
const accentColors = QUICKIT_ACCENT_COLORS;
const neutralColors = QUICKIT_NEUTRAL_COLORS;`;

export const UTILS_THEME_SNIPPET = `import { resolveQuickitThemeMode } from "quickit-ui";

const mode = resolveQuickitThemeMode(themeFromConfig);
// Devuelve "dark" solo si themeFromConfig === "dark"; cualquier otro valor cae a "light".`;

export const THEME_COLOR_MAP_SNIPPET = `| Color semántico | Color Tailwind |
|-----------------|---------------|
| neutral         | neutral       |
| primary         | blue          |
| secondary       | purple        |
| success         | green         |
| danger          | red           |
| warning         | amber         |
| info            | cyan          |
| light           | neutral       |
| dark            | neutral       |`;

export const THEME_CUSTOMIZE_SNIPPET = `@import "tailwindcss";
@import "quickit-ui/styles.css";

@theme {
  --color-blue-600: oklch(0.5 0.22 260);
  --color-purple-500: oklch(0.62 0.24 300);
  --color-green-500: oklch(0.62 0.2 150);
}`;

export const THEME_CLASSES_PATTERN_SNIPPET = `// src/lib/theme/theme-classes/mi-componente.js
export const MI_COMPONENTE_THEME_CLASSES = {
  light: {
    primary:   "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-purple-600 text-white hover:bg-purple-700",
    success:   "bg-green-600 text-white hover:bg-green-700",
    danger:    "bg-red-600 text-white hover:bg-red-700",
    neutral:   "bg-neutral-900 text-white hover:bg-neutral-800",
  },
  dark: {
    primary:   "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-purple-500 text-white hover:bg-purple-600",
    success:   "bg-green-500 text-white hover:bg-green-600",
    danger:    "bg-red-500 text-white hover:bg-red-600",
    neutral:   "bg-neutral-100 text-neutral-900 hover:bg-white",
  },
};`;

export const THEME_CLASSES_USAGE_SNIPPET = `import { useTheme } from "quickit-ui";
import { MI_COMPONENTE_THEME_CLASSES } from "quickit-ui/theme-classes";

function MiComponente({ color = "primary" }) {
  const { theme } = useTheme();
  const classes = MI_COMPONENTE_THEME_CLASSES[theme][color];
  return <button className={classes}>{color}</button>;
}`;

export const THEME_CLASSES_INDEX_SNIPPET = `src/lib/theme/theme-classes/
├── index.js              # Barrel — re-exporta todos los módulos
├── action-control.js
├── action-control-active.js
├── accordion.js
├── alert.js
├── avatar.js
├── badge.js
├── breadcrumb.js
├── card.js
├── checkbox.js
├── data-table.js
├── date-picker.js
├── drawer.js
├── empty-state.js
├── form-control.js
├── form-field.js
├── form-field-autofill.js
├── input-affix.js
├── input-group.js
├── label.js
├── link-text.js
├── modal.js
├── popover.js
├── progress.js
├── radio.js
├── range.js
├── select.js
├── skeleton.js
├── switch.js
├── tabs.js
└── toaster.js`;

export const THEME_FOUC_VITE_SNIPPET = `<script>
  (function() {
    try {
      var key = 'quickit-ui-theme'; // Tu storageKey
      var theme = localStorage.getItem(key);
      var supportDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (theme === 'dark' || (!theme && supportDark)) {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })();
</script>`;

export const THEME_FOUC_NEXT_SNIPPET = `// En app/layout.tsx o app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: \`(function() {
            try {
              var theme = localStorage.getItem('quickit-ui-theme');
              var supportDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (theme === 'dark' || (!theme && supportDark)) {
                document.documentElement.classList.add('dark');
              }
            } catch (e) {}
          })();\`.replace(/\\n/g, ''),
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}`;

export const RADIUS_PROVIDER_SNIPPET = `import { QuickitProvider } from "quickit-ui";

export function AppRoot() {
  return (
    <QuickitProvider radius="lg">
      <App />
    </QuickitProvider>
  );
}`;

export const RADIUS_RAW_CSS_SNIPPET = `import { QuickitProvider } from "quickit-ui";

export function AppRoot() {
  return (
    <QuickitProvider radius="1rem">
      <App />
    </QuickitProvider>
  );
}`;

export const RADIUS_CSS_VARIABLE_SNIPPET = `/* Override directo en CSS */
:root {
  --qk-radius: 1rem;
}`;

export const RADIUS_HOOK_SNIPPET = `import { useQuickitRadius } from "quickit-ui";

function BadgeWithRadius() {
  const radius = useQuickitRadius();

  return (
    <div style={{ borderRadius: radius }}>
      Radio actual: {radius}
    </div>
  );
}`;

export const CUSTOM_SCROLLBAR_SNIPPET = `import { QuickitThemeProvider } from "quickit-ui";

// Desactiva el scrollbar custom global (usa el nativo del SO)
<QuickitThemeProvider customScrollbar={false}>
  <App />
</QuickitThemeProvider>`;

export const CUSTOM_SCROLLBAR_HOOK_SNIPPET = `import { useQuickitCustomScrollbar } from "quickit-ui";

function ScrollbarInfo() {
  const enabled = useQuickitCustomScrollbar();

  return (
    <span>
      Scrollbar custom: {enabled ? "activo" : "inactivo"}
    </span>
  );
}`;

export const QUICKIT_V1_RELEASE = {
  version: "1.2.0",
  date: "12 de julio de 2026",
  summary:
    "Quickit UI 1.2.0 reestructura el sistema de colores semánticos: primary→blue, secondary→purple, success→green, danger→red. Todas las clases de color se centralizan en theme-classes y el modo oscuro se maneja con objetos light/dark sin selectores CSS.",
  highlights: [
    "Nuevo color semántico `secondary` mapeado a purple.",
    "Mapa de colores reorganizado: primary→blue, success→green, danger→red, warning→amber, info→cyan.",
    "31 archivos theme-classes centralizan todas las clases de color; ningún componente JSX contiene literales de color.",
  ],
  notableChanges: [
    "Modo oscuro vía objetos light/dark explícitos en cada theme-classes file, sin depender de la clase `.dark` de Tailwind.",
    "Personalización vía `@theme` sobrescribiendo colores nativos de Tailwind (ej. `--color-blue-600`) sin variables intermedias.",
    "5 nuevos theme-classes: input-group, input-affix, date-picker, avatar, toaster.",
  ],
};

export const QUICKIT_V1_MIGRATION = {
  fromVersion: "1.0.17",
  toVersion: "1.2.0",
  summary:
    "La migración desde 1.0.17 a 1.2.0 cubre dos releases. Los cambios principales son los nuevos defaults globales (variant=\"soft\", color=\"neutral\") y la reorganización del mapa de colores semánticos.",
  steps: [
    {
      title: "Actualiza el paquete",
      description:
        "Sube directamente a `quickit-ui@1.2.0` y vuelve a instalar dependencias.",
      beforeCode: "npm install quickit-ui@1.0.17",
      afterCode: "npm install quickit-ui@1.2.0",
      language: "bash",
    },
    {
      title: "Defaults globales: variant=\"soft\", color=\"neutral\"",
      description:
        "Todos los componentes ahora usan `variant=\"soft\"` y `color=\"neutral\"` por defecto. Si tu código dependía del comportamiento anterior, agrega props explícitas para mantener la apariencia anterior.",
      beforeCode: `<Button>Guardar</Button>
<Alert title="Info" />
<Progress value={60} />`,
      afterCode: `<Button variant="solid" color="primary">Guardar</Button>
<Alert color="info" title="Info" />
<Progress color="primary" value={60} />`,
      language: "jsx",
    },
    {
      title: "Nueva variante soft",
      description:
        "La variante `soft` ya está disponible en todos los action controls (Button, ButtonGroup, Link button). Combina borde + fondo sutil del color en reposo y se vuelve sólido en hover.",
      beforeCode: `<Button variant="outline">Acción</Button>`,
      afterCode: `<Button variant="soft">Acción</Button>`,
      language: "jsx",
    },
    {
      title: "Colores semánticos reorganizados",
      description:
        "v1.2.0 actualiza el mapa de colores semánticos. Los tonos `sky`, `emerald` y `rose` fueron reemplazados por `blue`, `green` y `red` respectivamente. Además se agrega `secondary` (purple). Si tu código usaba strings de color Tailwind directamente (ej. `border-sky-200`), debes actualizarlos.",
      beforeCode: `<Badge color="primary">Etiqueta</Badge>
{/* Antes: primary usaba sky */}
<span className="border-sky-200 bg-sky-50">Personalizado</span>`,
      afterCode: `<Badge color="primary">Etiqueta</Badge>
{/* Ahora: primary usa blue. secondary está disponible */}
<Badge color="secondary">Nuevo</Badge>
<span className="border-blue-200 bg-blue-50">Personalizado</span>`,
      language: "jsx",
    },
    {
      title: "Personalización vía @theme",
      description:
        "Ya no existen variables CSS intermedias `--color-primary-*`. Para cambiar colores, sobrescribe directamente los colores nativos de Tailwind en `@theme`: `--color-blue-600` para primary, `--color-purple-500` para secondary, etc.",
      beforeCode: `@theme {
  --color-primary-500: oklch(0.64 0.18 202);
}`,
      afterCode: `@theme {
  --color-blue-600: oklch(0.5 0.22 260);
}`,
      language: "css",
    },
  ],
  checks: [
    "Revisa componentes sin props explícitas de variant/color — ahora se renderizan con soft/neutral.",
    "Si usabas Button solid primary como default, agrega variant=\"solid\" color=\"primary\" explícito.",
    "Si tenías clases CSS con sky, emerald o rose, migra a blue, green, red.",
    "Si sobrescribías --color-primary-* en @theme, ahora sobrescribe --color-blue-* (o el color Tailwind correspondiente).",
    "Reemplaza referencias directas a --color-primary-* por --color-blue-* en tu CSS personalizado.",
  ],
};

export const WEBSITE_HOOK_EXAMPLES = {
  useQuickitTheme: {
    code: THEME_READ_SNIPPET,
  },
  useQuickitThemeController: {
    code: THEME_TOGGLE_SNIPPET,
  },
  useFormControl: {
    code: `import { FormControl, Label, Input, useFormControl } from "quickit-ui";

function FormIds() {
  const control = useFormControl();

  if (!control) {
    return null;
  }

  return <span>Control ID: {control.controlId}</span>;
}

export function Field() {
  return (
    <FormControl>
      <Label>Nombre</Label>
      <Input placeholder="Quickit" />
      <FormIds />
    </FormControl>
  );
}`,
  },
  useBreakpoint: {
    code: `import { useBreakpoint } from "quickit-ui";

function ResponsiveHeader() {
  const { isMobile, breakpoint } = useBreakpoint();

  return (
    <span>
      {isMobile ? "Mobile" : \`Breakpoint: \${breakpoint}\`}
    </span>
  );
}`,
  },
  useMediaQuery: {
    code: `import { useMediaQuery } from "quickit-ui";

function LayoutHint() {
  const isWide = useMediaQuery("(min-width: 1024px)");

  return <span>{isWide ? "Layout amplio" : "Layout compacto"}</span>;
}`,
  },
  useTabs: {
    code: `import { Tabs, useTabs } from "quickit-ui";

function TabsMeta() {
  const { value, size } = useTabs();

  return <span>Tab activa: {value} (size {size})</span>;
}

export function TabsUsage() {
  return (
    <Tabs defaultValue="overview">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="team">Equipo</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview"><TabsMeta /></Tabs.Content>
      <Tabs.Content value="team">Equipo</Tabs.Content>
    </Tabs>
  );
}`,
  },
  useDropdown: {
    code: `import { Dropdown, useDropdown } from "quickit-ui";

function DropdownState() {
  const { open } = useDropdown();

  return (
    <Dropdown.Item as="div" disabled>
      {open ? "Abierto" : "Cerrado"}
    </Dropdown.Item>
  );
}

export function DropdownUsage() {
  return (
    <Dropdown>
      <Dropdown.Trigger>Opciones</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Editar</Dropdown.Item>
        <Dropdown.Item>Eliminar</Dropdown.Item>
        <DropdownState />
      </Dropdown.Content>
    </Dropdown>
  );
}`,
  },
  useModal: {
    code: `import { Modal, Button, useModal } from "quickit-ui";

function CloseAction() {
  const { close } = useModal();

  return <Button variant="outline" onClick={close}>Cerrar</Button>;
}

export function ModalUsage() {
  return (
    <Modal>
      <Modal.Trigger>Abrir modal</Modal.Trigger>
      <Modal.Content>
        <Modal.Body>
          <CloseAction />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}`,
  },
  useFloatingLayer: {
    code: `import { useFloatingLayer } from "quickit-ui";

export function FloatingLayerUsage() {
  const { refs, floatingStyles } = useFloatingLayer({ placement: "bottom-start" });

  return (
    <>
      <button ref={refs.setReference} className="px-4 py-2 border rounded">
        Abrir
      </button>
      <div ref={refs.setFloating} style={floatingStyles} className="bg-white p-4 shadow-lg border rounded">
        Panel flotante
      </div>
    </>
  );
}`,
  },
  useQuickitFocusRing: {
    code: `import { useQuickitFocusRing } from "quickit-ui";

function CustomControl() {
  const focusRingEnabled = useQuickitFocusRing("button");
  
  return (
    <div 
      tabIndex={0}
      className={focusRingEnabled ? "focus:ring-2 focus:ring-primary-500 outline-none" : "outline-none"}
    >
      Control personalizado con foco Quickit
    </div>
  );
}`,
  },
  useQuickitFocusRingConfig: {
    code: `import { useQuickitFocusRingConfig } from "quickit-ui";

function FocusPolicyMeta() {
  const config = useQuickitFocusRingConfig();

  return (
    <pre className="rounded-xl border p-3 text-xs">
      {JSON.stringify(config, null, 2)}
    </pre>
  );
}`,
  },
  useQuickitRipple: {
    code: `import { useQuickitRipple } from "quickit-ui";

function RippleBox() {
  const rippleEnabled = useQuickitRipple("button");
  
  return (
    <div className="p-10 border rounded relative overflow-hidden">
      {rippleEnabled ? "Ripple activo globalmente" : "Ripple desactivado"}
    </div>
  );
}`,
  },
  useQuickitRippleConfig: {
    code: `import { useQuickitRippleConfig } from "quickit-ui";

function RipplePolicyMeta() {
  const config = useQuickitRippleConfig();

  return (
    <pre className="rounded-xl border p-3 text-xs">
      {JSON.stringify(config, null, 2)}
    </pre>
  );
}`,
  },
  useQuickitPressEffect: {
    code: `import { useQuickitPressEffect } from "quickit-ui";

function PressFeedback() {
  const effect = useQuickitPressEffect();
  
  return (
    <div className="p-4 border rounded">
      Efecto de presión preferido: <span className="font-bold">{effect}</span>
    </div>
  );
}`,
  },
  useQuickitRadius: {
    code: RADIUS_HOOK_SNIPPET,
  },
  useQuickitCustomScrollbar: {
    code: CUSTOM_SCROLLBAR_HOOK_SNIPPET,
  },
};

export const WEBSITE_DOC_OVERVIEW_SECTIONS = [
  { id: "introduccion", label: "Introducción", group: "Primeros pasos" },
  { id: "instalacion", label: "Instalación", group: "Primeros pasos" },
  { id: "migracion", label: "Migración 1.0.17 → 1.2.0", group: "Primeros pasos" },
  { id: "changelog", label: "Changelog", group: "Primeros pasos" },
  { id: "tema", label: "Tema", group: "Personalización" },
  { id: "comportamiento", label: "Comportamiento", group: "Personalización" },
  { id: "radio", label: "Radio (border-radius)", group: "Personalización" },
  { id: "tokens", label: "Tokens", group: "Personalización" },
  { id: "utilidades", label: "Utilidades", group: "Referencia" },
  {
    id: "hooks",
    label: "Hooks",
    group: "Referencia",
    children: [
      { id: "hook-use-quickit-theme", label: "useQuickitTheme" },
      { id: "hook-use-quickit-theme-controller", label: "useQuickitThemeController" },
      { id: "hook-use-form-control", label: "useFormControl" },
      { id: "hook-use-breakpoint", label: "useBreakpoint" },
      { id: "hook-use-media-query", label: "useMediaQuery" },
      { id: "hook-use-tabs", label: "useTabs" },
      { id: "hook-use-dropdown", label: "useDropdown" },
      { id: "hook-use-modal", label: "useModal" },
      { id: "hook-use-floating-layer", label: "useFloatingLayer" },
      { id: "hook-use-quickit-focus-ring", label: "useQuickitFocusRing" },
      { id: "hook-use-quickit-focus-ring-config", label: "useQuickitFocusRingConfig" },
      { id: "hook-use-quickit-press-effect", label: "useQuickitPressEffect" },
      { id: "hook-use-quickit-radius", label: "useQuickitRadius" },
      { id: "hook-use-quickit-custom-scrollbar", label: "useQuickitCustomScrollbar" },
      { id: "hook-use-quickit-ripple", label: "useQuickitRipple" },
      { id: "hook-use-quickit-ripple-config", label: "useQuickitRippleConfig" },
    ],
  },
  { id: "componentes", label: "Componentes", group: "Referencia" },
];

export const WEBSITE_COMPONENT_DOC_SECTIONS = [
  { id: "ejemplo-visual", label: "Ejemplo visual y código" },
  { id: "instalacion", label: "Instalación" },
  { id: "uso", label: "Uso" },
  { id: "ejemplos", label: "Ejemplos" },
];

export const WEBSITE_HOOKS = [
  {
    name: "useQuickitTheme",
    description: "Lee el modo efectivo (light o dark) que consume la librería tras resolver el caso 'system'.",
    returns: "Modo de tema efectivo resuelto por el provider.",
  },
  {
    name: "useQuickitThemeController",
    description: "Permite leer la preferencia del usuario, el tema del sistema y cambiar entre ellos con persistencia.",
    returns: [
      { name: "theme", type: "\"system\" | \"light\" | \"dark\"", description: "Preferencia de tema actual." },
      { name: "resolvedTheme", type: "\"light\" | \"dark\"", description: "Tema efectivo aplicado a la UI." },
      { name: "systemTheme", type: "\"light\" | \"dark\"", description: "Tema detectado en el sistema operativo." },
      { name: "setTheme", type: "(theme: string) => void", description: "Cambia el tema a un valor específico." },
      { name: "toggleTheme", type: "() => void", description: "Alterna entre light y dark." },
    ],
  },
  {
    name: "useFormControl",
    description: "Accede al contexto compartido de un formulario para enlazar labels, inputs y mensajes de error.",
    returns: [
      { name: "controlId", type: "string", description: "ID único para el control del campo." },
      { name: "descriptionId", type: "string | null", description: "ID para el texto de descripción/ayuda cuando existe un FormControl.Description montado." },
      { name: "messageId", type: "string | null", description: "ID para el mensaje de validación cuando existe un FormControl.Message montado." },
      { name: "invalid", type: "boolean", description: "Indica si el campo tiene errores." },
      { name: "disabled", type: "boolean", description: "Indica si el campo está inactivo." },
      { name: "required", type: "boolean", description: "Indica si el campo es obligatorio." },
    ],
  },
  {
    name: "useBreakpoint",
    description: "Informa sobre el tamaño del viewport y provee banderas convenientes para layouts adaptables.",
    returns: [
      { name: "breakpoint", type: "\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\" | \"2xl\"", description: "Corte detectado." },
      { name: "width", type: "number | null", description: "Ancho actual del viewport." },
      { name: "isMobile", type: "boolean", description: "Cierto si width < md." },
      { name: "isTablet", type: "boolean", description: "Cierto si width entre md y lg." },
      { name: "isDesktop", type: "boolean", description: "Cierto si width >= lg." },
      { name: "ready", type: "boolean", description: "Falso durante el render inicial en servidor (SSR)." },
    ],
  },
  {
    name: "useMediaQuery",
    description: "Evalúa una consulta de medios y se suscribe a sus cambios de forma eficiente.",
    parameters: [
      { name: "query", type: "string", description: "Media query a evaluar (ej: '(min-width: 768px)')." },
      { name: "options.defaultValue", type: "boolean", description: "Valor devuelto antes de la hidratación (default: false)." },
    ],
  },
  {
    name: "useTabs",
    description: "Expone el estado sincronizado de una región de pestañas (Tabs).",
    returns: [
      { name: "value", type: "string | string[]", description: "Valor(es) de la pestaña activa." },
      { name: "size", type: "string", description: "Tamaño (xs, sm, md, lg)." },
      { name: "orientation", type: "\"horizontal\" | \"vertical\"", description: "Eje de disposición." },
      { name: "setValue", type: "(val: any) => void", description: "Cambia la pestaña activa." },
    ],
  },
  {
    name: "useDropdown",
    description: "Hook interno expuesto para crear disparadores o paneles personalizados dentro de un Dropdown.",
  },
  {
    name: "useModal",
    description: "Permite gestionar el cierre de un diálogo modal desde componentes internos profundos.",
    returns: [
      { name: "open", type: "boolean", description: "Estado de apertura." },
      { name: "close", type: "() => void", description: "Función para cerrar el modal." },
    ],
  },
  {
    name: "useFloatingLayer",
    description: "Utilidad avanzada basada en Floating UI para gestionar el posicionamiento de capas flotantes.",
    parameters: [
      { name: "options", type: "object", description: "Configuración de posicionamiento (placement, offset, middleware)." }
    ],
    returns: "Objeto con refs (setReference, setFloating) y floatingStyles."
  },
  {
    name: "useQuickitFocusRing",
    description: "Determina si un componente debe mostrar el anillo de enfoque según la política global del provider.",
    parameters: [
      { name: "component", type: "string", description: "Opcional. Nombre del componente para revisar excepciones en disabledComponents." }
    ],
    returns: "Boolean que indica si el foco debe ser visible."
  },
  {
    name: "useQuickitFocusRingConfig",
    description: "Expone la política global de focus ring ya normalizada por el provider.",
    returns: [
      { name: "enabled", type: "boolean", description: "Indica si el focus ring está activo globalmente." },
      { name: "disabledComponents", type: "QuickitFocusRingComponent[]", description: "Listado de componentes que ignoran el focus ring aunque esté activo." },
    ],
  },
  {
    name: "useQuickitPressEffect",
    description: "Consulta el efecto visual preferido (none, transform o ripple) para interacciones táctiles o click.",
    returns: "El valor 'none', 'transform' o 'ripple' configurado globalmente."
  },
  {
    name: "useQuickitRadius",
    description: "Devuelve el valor CSS del radio base (--qk-radius) configurado en QuickitProvider.",
    returns: "String con el valor CSS del radio (ej: '0.75rem', '1rem')."
  },
  {
    name: "useQuickitCustomScrollbar",
    description: "Indica si el scrollbar custom global está activo según la prop customScrollbar de QuickitProvider.",
    returns: "Boolean que indica si el scrollbar theming está habilitado."
  },
  {
    name: "useQuickitRipple",
    description: "Verifica si el efecto de ondas (ripple) está activo para un componente dado, respetando la política de pressEffect y el listado de componentes integrados.",
    parameters: [
      { name: "component", type: "string", description: "Opcional. Nombre del componente para revisar excepciones." }
    ],
    returns: "Boolean que indica si se debe renderizar el ripple."
  },
  {
    name: "useQuickitRippleConfig",
    description: "Expone la política global de ripple ya normalizada por el provider.",
    returns: [
      { name: "enabled", type: "boolean", description: "Indica si el ripple está activo globalmente." },
      { name: "disabledComponents", type: "QuickitRippleComponent[]", description: "Listado de componentes que no deben mostrar ripple aunque el provider lo tenga activo." },
    ],
  },
];

export const WEBSITE_COMPONENT_GROUPS = [
  {
    title: "Acciones",
    items: [
      {
        slug: "button",
        name: "Button",
        description: "Acción base para triggers, CTA e icon buttons.",
      },
      {
        slug: "link",
        name: "Link",
        description: "Enlace de texto o enlace con apariencia de botón.",
      },
      {
        slug: "badge",
        name: "Badge",
        description: "Etiqueta compacta para estado, categoría o recuento.",
      },
      {
        slug: "button-group",
        name: "ButtonGroup",
        isNew: true,
        description: "Agrupa botones en un contenedor visual conectado.",
      },
    ],
  },
  {
    title: "Campos",
    items: [
      {
        slug: "form-control",
        name: "FormControl",
        description: "Contexto compartido para label, descripción y mensajes.",
      },
      {
        slug: "label",
        name: "Label",
        description: "Etiqueta accesible para campos y controles.",
      },
      {
        slug: "input",
        name: "Input",
        description: "Campo base con support para search, password y addons.",
      },
      {
        slug: "textarea",
        name: "Textarea",
        description: "Área de texto multi línea alineada con Input.",
      },
      {
        slug: "select",
        name: "Select",
        description: "Selector composable con trigger y panel flotante.",
      },
      {
        slug: "checkbox",
        name: "Checkbox",
        description: "Control binario con label y handlers explícitos.",
      },
      {
        slug: "radio",
        name: "Radio",
        description: "Selección exclusiva con API coherente con Checkbox.",
      },
      {
        slug: "switch",
        name: "Switch",
        description: "Toggle visual para estados activado/desactivado.",
      },
      {
        slug: "range",
        name: "Range",
        description: "Slider nativo con tokens de color y tamaño.",
      },
    ],
  },
  {
    title: "Visuales",
    items: [
      {
        slug: "avatar",
        name: "Avatar",
        description: "Avatar base con grupo, presencia, initials y chip.",
      },
      {
        slug: "progress",
        name: "Progress",
        description: "Indicador de progreso lineal con color y tamaño.",
      },
      {
        slug: "skeleton",
        name: "Skeleton",
        description: "Marcador de carga para line, rect y circle.",
      },
      {
        slug: "user-chip",
        name: "UserChip",
        description: "Chip de usuario con avatar, nombre y presencia.",
      },
      {
        slug: "divider",
        name: "Divider",
        isNew: true,
        description: "Línea separadora horizontal o vertical con label opcional.",
      },
    ],
  },
  {
    title: "Lógicas",
    items: [
      {
        slug: "show",
        name: "Show",
        description: "Render condicional simple con fallback.",
      },
      {
        slug: "render-switch",
        name: "RenderSwitch",
        description: "Control declarativo para varios estados posibles.",
      },
      {
        slug: "for",
        name: "For",
        description: "Iteración declarativa con fallback vacío.",
      },

    ],
  },
  {
    title: "Selectores compuestos",
    items: [
      {
        slug: "input-group",
        name: "InputGroup",
        description: "Contenedor para inputs, addons y acciones acopladas.",
      },
      {
        slug: "date-picker",
        name: "DatePicker",
        description: "Selector de fecha con calendario en popover.",
      },
      {
        slug: "time-picker",
        name: "TimePicker",
        description: "Selector de hora con listas de horas y minutos.",
      },
    ],
  },
  {
    title: "Navegación",
    items: [
      {
        slug: "accordion",
        name: "Accordion",
        description: "Secciones colapsables con soporte single o multiple.",
      },
      {
        slug: "breadcrumb",
        name: "Breadcrumb",
        description: "Ruta jerárquica con links y current item.",
      },
      {
        slug: "pagination",
        name: "Pagination",
        description: "Paginación controlada o no controlada.",
      },
      {
        slug: "tabs",
        name: "Tabs",
        description: "Navegación por paneles con teclado y modo manual.",
      },
      {
        slug: "stepper",
        name: "Stepper",
        description: "Pasos numerados para flujos guiados.",
      },
    ],
  },
  {
    title: "Overlays",
    items: [
      {
        slug: "dropdown",
        name: "Dropdown",
        description: "Menú flotante composable con items y separadores.",
      },
      {
        slug: "drawer",
        name: "Drawer",
        description: "Panel lateral o inferior con overlay y acciones.",
      },
      {
        slug: "popover",
        name: "Popover",
        description: "Capa contextual flotante con trigger click u hover.",
      },
      {
        slug: "tooltip",
        name: "Tooltip",
        description: "Ayuda contextual breve sobre hover o focus.",
      },
      {
        slug: "modal",
        name: "Modal",
        description: "Overlay con trigger, contenido y acciones compuestas.",
      },


    ],
  },
  {
    title: "Estado",
    items: [
      {
        slug: "alert",
        name: "Alert",
        description: "Mensaje inline con dismiss manual y auto-dismiss opcional.",
      },
      {
        slug: "toaster",
        name: "Toaster",
        description: "Toasts con portal; monta `<Toaster />` y usa `toast()`.",
      },
      {
        slug: "empty-state",
        name: "EmptyState",
        description: "Estado vacío con título, descripción y acciones.",
      },
    ],
  },
  {
    title: "Tablas",
    items: [
      {
        slug: "data-table",
        name: "DataTable",
        description: "Tabla con ordenación por columnas y cabecera sticky.",
      },
    ],
  },
  {
    title: "Layout",
    items: [
      {
        slug: "container",
        name: "Container",
        isNew: true,
        description: "Contenedor centrado con max-width responsivo y padding.",
      },
      {
        slug: "card",
        name: "Card",
        isNew: true,
        description: "Contenedor versátil con header, body y footer.",
      },
    ],
  },
];

export const WEBSITE_COMPONENT_LOOKUP = Object.fromEntries(
  WEBSITE_COMPONENT_GROUPS.flatMap((group) =>
    group.items.map((item) => [item.slug, { ...item, group: group.title }]),
  ),
);

/**
 * Notas de revisión por componente (código en `src/lib/components`).
 * Cada entrada aparece en la documentación del sitio bajo «Notas de revisión».
 * @type {Record<string, Array<{ tag: string, text: string }>>}
 */
export const WEBSITE_COMPONENT_REVIEW_NOTES = {
  button: [
    {
      tag: "Uso",
      text: "El tipo por defecto es `button`; en formularios usa `type=\"submit\"` solo cuando corresponda. Con `loading`, el control queda no interactivo: evita duplicar submits en el padre.",
    },
    {
      tag: "Accesibilidad",
      text: "Con `shape=\"square\"` o `circle` y solo icono, define `aria-label` o `aria-labelledby`. `pressed` enlaza correctamente con `aria-pressed`.",
    },
    {
      tag: "Implementación",
      text: "Ripple y press effect se integran con `QuickitProvider`; si el feedback no aparece, revisa `ripple`, `pressEffect` y componentes deshabilitados en el provider.",
    },
  ],
  link: [
    {
      tag: "Uso",
      text: "Con `appearance=\"button\"` heredas tamaños y variantes de botón; mantén `href` válido o usa un wrapper con routing (React Router, etc.) si navegas con `onClick`.",
    },
    {
      tag: "Accesibilidad",
      text: "Enlaces que abren ventana nueva deberían usar `target=\"_blank\"` y `rel=\"noreferrer noopener\"` desde la app. Icon-only: mismo criterio de nombre accesible que Button.",
    },
    {
      tag: "Implementación",
      text: "El componente evita ripple por defecto en modo texto; en modo botón respeta la política global de ripple.",
    },
  ],
  badge: [
    {
      tag: "Uso",
      text: "Pensado para etiquetas estáticas. Si comunicas estado en vivo (p. ej. contador que cambia solo), valora `aria-live` en el contenedor padre.",
    },
    {
      tag: "Implementación",
      text: "API pequeña y predecible; combina con `Button` o `Link` si necesitas una píldora interactiva.",
    },
  ],
  "form-control": [
    {
      tag: "Uso",
      text: "Envuelve cada campo con `FormControl` para compartir `id`, `disabled`, `invalid` y textos de ayuda entre `Label`, input y `FormMessage`.",
    },
    {
      tag: "API",
      text: "En la guía del sitio hay página dedicada con ejemplos. `useFormControl()` exportado desde `quickit-ui` expone el mismo contexto para controles custom.",
    },
  ],
  label: [
    {
      tag: "Accesibilidad",
      text: "Usa `htmlFor` alineado con el `id` del control (o el generado por `FormControl`). No sustituye a un texto visible para grupos complejos: combina con `fieldset`/`legend` si aplica.",
    },
    {
      tag: "Implementación",
      text: "Se integra con el contexto de `FormControl` para enlazar automáticamente con el control hijo.",
    },
  ],
  input: [
    {
      tag: "Uso",
      text: "`type=\"search\"` y `type=\"password\"` activan ayudas (limpiar, alternar visibilidad) de forma opt-out mediante props. Revisa `autoComplete` si el valor por defecto de contraseña no encaja con tu flujo (login vs registro).",
    },
    {
      tag: "Accesibilidad",
      text: "Los botones internos llevan etiquetas por defecto en español; sobrescríbelas con `clearButtonLabel`, `showPasswordLabel`, etc., si tu UI es multilidioma.",
    },
    {
      tag: "Implementación",
      text: "Mide elementos laterales para el padding del campo; evita árboles que cambien el ancho de `leftElement`/`rightElement` en cada tecla sin necesidad.",
    },
  ],
  "input-group": [
    {
      tag: "Uso",
      text: "Agrupa addons y acciones con `InputGroup`, `InputGroup.Addon`, `InputGroup.Item` y `InputGroup.Action` (o los exports con nombre equivalentes) para bordes compartidos y tamaño unificado.",
    },
    {
      tag: "Implementación",
      text: "El contexto de grupo propaga `size`, `color` y `shape` a los hijos compatibles.",
    },
  ],
  range: [
    {
      tag: "Uso",
      text: "Soporta modo simple y doble (`range`) con `value/defaultValue` numérico o tuple `[inicio, fin]`. También acepta `orientation=\"vertical\"` y `allowWheel` para interacción con rueda.",
    },
    {
      tag: "Accesibilidad",
      text: "Comportamiento estándar del range nativo. Enlaza un `Label` visible si lo necesitas; en modo doble, prioriza thumb en hover/activo para interacción más predecible.",
    },
    {
      tag: "Implementación",
      text: "Track y thumbs mantienen el mismo estilo en horizontal/vertical. `showValueTooltip` permite mostrar valor en tooltip con `tooltipFormatter` opcional.",
    },
  ],
  textarea: [
    {
      tag: "Uso",
      text: "Alineado con `Input` en tokens y estados (`invalid`, `disabled`). Controla altura con `rows` o clases según diseño.",
    },
    {
      tag: "Implementación",
      text: "Comparte utilidades de formulario y tema con el resto de campos.",
    },
  ],
  select: [
    {
      tag: "Uso",
      text: "Las opciones se declaran con hijos `<option>` (API similar al select nativo). El panel usa Floating UI: revisa `collisionPadding` y scroll en listas largas.",
    },
    {
      tag: "Accesibilidad",
      text: "Incluye rol de lista y navegación por teclado vía `@floating-ui/react`. Mantén etiquetas de opción legibles y valores estables.",
    },
    {
      tag: "Implementación",
      text: "Se integra con `FormControl` e `InputGroup` para IDs y estilos coherentes.",
    },
  ],
  checkbox: [
    {
      tag: "Accesibilidad",
      text: "Asocia siempre `label` o `aria-label` al control. El estado checked debe reflejarse en la prop `checked` en modo controlado.",
    },
    {
      tag: "Implementación",
      text: "Handlers explícitos y API paralela a `Radio` y `Switch` para formularios consistentes.",
    },
  ],
  radio: [
    {
      tag: "Uso",
      text: "Agrupa varios `Radio` con el mismo `name` para exclusión mutua a nivel de formulario nativo.",
    },
    {
      tag: "Accesibilidad",
      text: "En grupos grandes, un `fieldset` con `legend` mejora la navegación con lector de pantalla.",
    },
  ],
  switch: [
    {
      tag: "Accesibilidad",
      text: "Usa `label` o `aria-label` para describir qué se activa o desactiva (no solo «on/off» genérico).",
    },
    {
      tag: "Implementación",
      text: "`onCheckedChange` y estado controlado siguen el patrón de Radix-like usado en otros toggles de la librería.",
    },
  ],
  accordion: [
    {
      tag: "Uso",
      text: "`type=\"single\"` vs `multiple` cambia el tipo de `value`/`defaultValue` (string vs array). Con `collapsible={false}` en single, un ítem permanece abierto. En single, si llega un array por error, solo cuenta el primer valor.",
    },
    {
      tag: "Accesibilidad",
      text: "Triggers y regiones colapsables siguen un patrón de encabezado + panel; el panel usa `inert` al estar cerrado. Evita anidar controles complejos en el trigger sin probar teclado.",
    },
    {
      tag: "Implementación",
      text: "Animación de altura con CSS grid (`0fr`/`1fr`) y clase `.qk-accordion-panel`; respeta `prefers-reduced-motion`.",
    },
  ],
  breadcrumb: [
    {
      tag: "Accesibilidad",
      text: "Usa `nav` con `aria-label` descriptivo (p. ej. «Ruta») y marca el ítem actual sin `href` (`BreadcrumbCurrent`).",
    },
    {
      tag: "Implementación",
      text: "Primitives composables (`BreadcrumbList`, `BreadcrumbItem`, etc.) para máxima flexibilidad de markup.",
    },
  ],
  pagination: [
    {
      tag: "Uso",
      text: "Soporta modo controlado y no controlado; sincroniza `page` con datos remotos para evitar desalineo entre UI y resultados.",
    },
    {
      tag: "Accesibilidad",
      text: "Los botones de página deberían tener texto o `aria-label` comprensible; personaliza hijos si tus diseños son solo iconos.",
    },
  ],
  tabs: [
    {
      tag: "Uso",
      text: "`activationMode` y orientación vertical u horizontal cubren patrones distintos; prueba foco y flechas con tu contenido real.",
    },
    {
      tag: "Accesibilidad",
      text: "Basado en roles de pestaña; mantén `value` estable por pestaña y contenido visible alineado con `TabsContent`.",
    },
  ],
  dropdown: [
    {
      tag: "Uso",
      text: "`closeOnScroll` y `closeOnClickOutside` ajustan el cierre en layouts con scroll interno o tablas.",
    },
    {
      tag: "Implementación",
      text: "Portal opcional, flecha y posicionamiento Floating UI; revisa z-index si convive con otros overlays.",
    },
  ],
  toaster: [
    {
      tag: "Arquitectura",
      text: "Se ha migrado a resolveQuickitThemeMode para asegurar consistencia visual con el resto de la librería. Los nombres de utilidades se han estandarizado (dismissToast).",
    },
    {
      tag: "UX",
      text: "Como máximo 3 toasts visibles; el resto espera en cola. El hover pausa los temporizadores y expande el stack para facilitar la lectura.",
    },
    {
      tag: "Tipos",
      text: "`kind`: `default`, `loading`, `success`, `error`. No existe `info`; usa `default` con un `icon` personalizado si lo necesitas.",
    },
  ],
  drawer: [
    {
      tag: "Corregido",
      text: "Se eliminó el renderizado en cascada causado por actualizar el estado de visibilidad directamente en el renderizado; ahora sigue el flujo de efectos estándar.",
    },
    {
      tag: "Arquitectura",
      text: "Utiliza un sistema de pila (stack) global para gestionar el foco y el cierre con la tecla Escape de forma jerárquica.",
    },
    {
      tag: "Accesibilidad",
      text: "El body se bloquea automáticamente al abrir. Asegúrate de usar Drawer.Title para que el propósito del diálogo sea anunciado por lectores de pantalla.",
    },
  ],
  modal: [
    {
      tag: "Arquitectura",
      text: "Centralización de tema completada. Ahora usa la utilidad universal de resolución para evitar inconsistencias en modo dark.",
    },
    {
      tag: "Uso",
      text: "A diferencia de Drawer, el Modal centra el contenido por defecto. Solo el modal superior en el stack responde a la tecla Escape.",
    },
  ],
};

export const WEBSITE_BUTTON_DOC = {
  slug: "button",
  title: "Button",
  description:
    "Button es la acción base de Quickit. Soporta variantes visuales, tamaños, formas, loading, active states, press effects y ripple sin cambiar de componente.",
  installCode: `import { Button } from "quickit-ui";`,
  usageCode: `import { Button } from "quickit-ui";

export function SaveAction() {
  return (
    <Button color="neutral" size="lg">
      Guardar cambios
    </Button>
  );
}`,
  previewCode: `import { Button } from "quickit-ui";

export function ButtonPreview() {
  return <Button color="neutral">Guardar cambios</Button>;
}`,
  tokenGroups: [
    {
      label: "Variantes",
      values: ["soft", "solid", "outline", "ghost"],
    },
    {
      label: "Tamaños",
      values: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    {
      label: "Shapes",
      values: ["default", "square", "circle", "pill"],
    },
    {
      label: "Colores compatibles",
      values: [
        "neutral",
        "primary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
      ],
    },
  ],
  props: [
    {
      name: "children",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Contenido visual que renderiza el botón en estado normal.",
    },
    {
      name: "variant",
      type: `"solid" | "outline" | "soft" | "ghost"`,
      defaultValue: `"soft"`,
      description: "Define el tratamiento visual principal del botón.",
    },
    {
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "`QuickitSemanticColor` se mantiene por compatibilidad; conceptualmente `primary` es acento, `success`/`danger`/`warning`/`info` son estados y el resto son neutros/superficies.",
    },
    {
      name: "size",
      type: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl"`,
      defaultValue: `"md"`,
      description: "Controla altura, padding y tipografía del botón.",
    },
    {
      name: "shape",
      type: `"default" | "square" | "circle" | "pill"`,
      defaultValue: `"default"`,
      description: "Ajusta la geometría del control según el caso de uso.",
    },
    {
      name: "type",
      type: `"button" | "submit" | "reset"`,
      defaultValue: `"button"`,
      description: "Tipo nativo del elemento button.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Deshabilita interacción, foco y puntero.",
    },
    {
      name: "fullWidth",
      type: "boolean",
      defaultValue: "false",
      description: "Hace que el botón ocupe el ancho completo del contenedor.",
    },
    {
      name: "align",
      type: `"left" | "center" | "right"`,
      defaultValue: `"center"`,
      description: "Alineación del contenido interno del botón.",
    },
    {
      name: "loading",
      type: "boolean",
      defaultValue: "false",
      description: "Deshabilita la interacción y muestra spinner opcional.",
    },
    {
      name: "loadingText",
      type: "ReactNode",
      defaultValue: "undefined",
      description: "Contenido mostrado mientras loading está activo.",
    },
    {
      name: "spinner",
      type: "boolean",
      defaultValue: "true",
      description: "Muestra u oculta el spinner interno en loading.",
    },
    {
      name: "active",
      type: "boolean",
      defaultValue: "false",
      description: "Fuerza el estado visual activo sin depender del pointer.",
    },
    {
      name: "pressed",
      type: "boolean",
      defaultValue: "false",
      description: "Marca el botón como presionado y activa aria-pressed.",
    },
    {
      name: "pressEffect",
      type: `"none" | "transform" | "ripple"`,
      defaultValue: "provider",
      description: "Permite sobrescribir el efecto de presión por instancia. Con \"none\" se desactiva todo feedback de presión (ni scale, ni ripple).",
    },
    {
      name: "ripple",
      type: "boolean",
      defaultValue: "provider",
      description: "Activa o desactiva el ripple manualmente en ese botón.",
    },
    {
      name: "activeMotion",
      type: "boolean",
      defaultValue: "auto",
      description:
        "Habilita o deshabilita el motion de presión cuando el effect es transform.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: "undefined",
      description: "Extiende las clases calculadas por Quickit para el botón.",
    },
    {
      name: "style",
      type: "CSSProperties",
      defaultValue: "undefined",
      description: "Permite inyectar estilos inline adicionales.",
    },
    {
      name: "aria-label",
      type: "string",
      defaultValue: "undefined",
      description:
        "Necesario sobre todo en shape square o circle cuando no hay texto visible.",
    },
    {
      name: "aria-labelledby",
      type: "string",
      defaultValue: "undefined",
      description: "Alternativa accesible para nombrar el botón desde otro nodo.",
    },
    {
      name: "title",
      type: "string",
      defaultValue: "undefined",
      description: "Tooltip nativo y fallback accesible adicional.",
    },
    {
      name: "onClick",
      type: "(event) => void",
      defaultValue: "undefined",
      description: "Handler nativo de click del botón.",
    },
    {
      name: "onPointerDown",
      type: "(event) => void",
      defaultValue: "undefined",
      description:
        "Se ejecuta antes de que Quickit resuelva ripple o press effect.",
    },
    {
      name: "onKeyDown",
      type: "(event) => void",
      defaultValue: "undefined",
      description:
        "Permite interceptar teclado antes de que Quickit active ripple desde teclado.",
    },
  ],
  notes: [
    "Además de estas props, Button acepta el resto de atributos nativos de HTMLButtonElement.",
    "Cuando uses shape=\"square\" o shape=\"circle\", añade aria-label, aria-labelledby o title.",
  ],
};
