export const INSTALL_COMMAND = `npm install quickit-ui`;

export const STYLES_SNIPPET = `@import "quickit-ui/styles.css";
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));`;

export const QUICKIT_PROVIDER_SNIPPET = `import { QuickitProvider } from "quickit-ui";

export function AppRoot({ theme }) {
  return (
    <QuickitProvider
      theme={theme}
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
          })();\`.replace(/\n/g, ''),
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}`;

export const QUICKIT_V1_RELEASE = {
  version: "1.0.9",
  date: "22 de abril de 2026",
  summary:
    "Quickit UI 1.0.9 añade un parche de publicación para que el subpath de estilos del paquete se resuelva correctamente en proyectos consumidores.",
  highlights: [
    "Se corrigió la exportación de `styles.css` para que `@import \"quickit-ui/styles.css\";` funcione de forma fiable.",
    "El paquete ahora publica un archivo físico `dist/styles.css` además del CSS principal generado por Vite.",
    "La release queda validada con build y pack check del paquete.",
  ],
  notableChanges: [
    "El campo `style` del paquete y el export map `./styles.css` ahora apuntan a `dist/styles.css`.",
    "El script de build copia el CSS generado a `dist/styles.css` durante la preparación del paquete.",
  ],
};

export const QUICKIT_V1_MIGRATION = {
  fromVersion: "0.2.4",
  toVersion: "1.0.9",
  summary:
    "La migración desde 0.2.4 a 1.0.9 sigue siendo directa en la mayoría de proyectos. El objetivo principal es alinear tu código con la API estable, las composiciones recomendadas y el parche final de publicación de estilos.",
  steps: [
    {
      title: "Actualiza el paquete",
      description:
        "Sube directamente a `quickit-ui@1.0.9` y vuelve a instalar dependencias para asegurar que paquete, tipos y estilos generados queden sincronizados.",
      beforeCode: "npm install quickit-ui@0.2.4",
      afterCode: "npm install quickit-ui@1.0.9",
      language: "bash",
    },
    {
      title: "Simplifica Breadcrumb",
      description:
        "La forma recomendada ahora es usar `Breadcrumb.Item` con `href` o `current` para el caso común, en vez de combinar primitives más verbosas.",
      beforeCode: `import { Breadcrumb } from "quickit-ui";

export function Navigation() {
  return (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Current>Productos</Breadcrumb.Current>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  );
}`,
      afterCode: `import { Breadcrumb } from "quickit-ui";

export function Navigation() {
  return (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item current>Productos</Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  );
}`,
      language: "jsx",
    },
    {
      title: "Prefiere la API compuesta de Tabs y FormControl",
      description:
        "La documentación oficial ahora prioriza subcomponentes compuestos como `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`, `FormControl.Description` y `FormControl.Message`.",
      beforeCode: `import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  FormControl,
  FormDescription,
  FormMessage,
  Label,
  Input,
} from "quickit-ui";

export function Settings() {
  return (
    <>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">Equipo</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Resumen</TabsContent>
        <TabsContent value="team">Miembros</TabsContent>
      </Tabs>

      <FormControl invalid required>
        <Label htmlFor="email">Correo</Label>
        <Input id="email" type="email" />
        <FormDescription>Usa tu correo principal.</FormDescription>
        <FormMessage>El correo es obligatorio.</FormMessage>
      </FormControl>
    </>
  );
}`,
      afterCode: `import { Tabs, FormControl, Label, Input } from "quickit-ui";

export function Settings() {
  return (
    <>
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="team">Equipo</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">Resumen</Tabs.Content>
        <Tabs.Content value="team">Miembros</Tabs.Content>
      </Tabs>

      <FormControl invalid required>
        <Label htmlFor="email">Correo</Label>
        <Input id="email" type="email" />
        <FormControl.Description>
          Usa tu correo principal.
        </FormControl.Description>
        <FormControl.Message>
          El correo es obligatorio.
        </FormControl.Message>
      </FormControl>
    </>
  );
}`,
      language: "jsx",
    },
    {
      title: "Revisa tus CommandPalette y EmptyState",
      description:
        "Si montas varias `CommandPalette`, deja una sola con el shortcut global. Y si usas `EmptyState`, revisa el layout mobile-first y el uso de `EmptyState.Icon`.",
      beforeCode: `import { CommandPalette, EmptyState, Button } from "quickit-ui";

export function Page() {
  return (
    <>
      <CommandPalette />
      <CommandPalette />

      <EmptyState
        title="Sin resultados"
        description="No hay elementos por mostrar."
        actions={<Button>Recargar</Button>}
      />
    </>
  );
}`,
      afterCode: `import { CommandPalette, EmptyState, Button } from "quickit-ui";
import { CopyIcon } from "quickit-ui/icons";

export function Page() {
  return (
    <>
      <CommandPalette />
      <CommandPalette shortcutEnabled={false} />

      <EmptyState>
        <EmptyState.Icon>
          <CopyIcon />
        </EmptyState.Icon>
        <EmptyState.Title>Sin resultados</EmptyState.Title>
        <EmptyState.Description>
          No hay elementos por mostrar.
        </EmptyState.Description>
        <EmptyState.Actions>
          <Button>Recargar</Button>
        </EmptyState.Actions>
      </EmptyState>
    </>
  );
}`,
      language: "jsx",
    },
    {
      title: "Verifica formularios, overlays y visuales",
      description:
        "Haz una pasada final a formularios, pickers, overlays y componentes que dependen de tokens `brand` o fills de `Range`.",
      beforeCode: "npm run test",
      afterCode:
        "npm run test && npm run test:types && npm run build && npm run build:docs",
      language: "bash",
    },
  ],
  checks: [
    "Revisa formularios que usen `Select`, `Combobox`, `DatePicker`, `TimePicker`, `Checkbox`, `Radio`, `Switch` y `Range`.",
    "Verifica `Modal`, `Drawer`, `Dropdown`, `Popover` y `CommandPalette` en teclado y cierre.",
    "Haz smoke test visual de `Button`, `Badge`, `Alert`, `Range` y `EmptyState` si dependen de tokens `brand` o nuevos layouts.",
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
      className={focusRingEnabled ? "focus:ring-2 focus:ring-brand-500 outline-none" : "outline-none"}
    >
      Control personalizado con foco Quickit
    </div>
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
};

export const WEBSITE_DOC_OVERVIEW_SECTIONS = [
  { id: "introduccion", label: "Introducción" },
  { id: "instalacion", label: "Instalación" },
  { id: "migracion-1-0-7", label: "Migración 1.0.9" },
  { id: "changelog", label: "Changelog" },
  { id: "tema", label: "Tema" },
  { id: "comportamiento", label: "Comportamiento" },
  { id: "tokens", label: "Tokens" },
  {
    id: "hooks",
    label: "Hooks",
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
      { id: "hook-use-quickit-press-effect", label: "useQuickitPressEffect" },
      { id: "hook-use-quickit-ripple", label: "useQuickitRipple" },
    ],
  },
  { id: "componentes", label: "Componentes" },
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
    name: "useQuickitPressEffect",
    description: "Consulta el efecto visual preferido (transform o ripple) para interacciones táctiles o click.",
    returns: "El valor 'transform' o 'ripple' configurado globalmente."
  },
  {
    name: "useQuickitRipple",
    description: "Verifica si el efecto de ondas (ripple) está activo para un componente dado, respetando la política de pressEffect y el listado de componentes integrados.",
    parameters: [
      { name: "component", type: "string", description: "Opcional. Nombre del componente para revisar excepciones." }
    ],
    returns: "Boolean que indica si se debe renderizar el ripple."
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
    ],
  },
  {
    title: "Formularios",
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
        slug: "input-group",
        name: "InputGroup",
        description: "Contenedor para inputs, addons y acciones acopladas.",
      },
      {
        slug: "range",
        name: "Range",
        isNew: true,
        description: "Slider nativo con tokens de color y tamaño.",
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
        slug: "combobox",
        name: "Combobox",
        isNew: true,
        description: "Lista filtrable con campo de búsqueda integrado.",
      },
      {
        slug: "date-picker",
        name: "DatePicker",
        isNew: true,
        description: "Selector de fecha con calendario en popover.",
      },
      {
        slug: "time-picker",
        name: "TimePicker",
        isNew: true,
        description: "Selector de hora con listas de horas y minutos.",
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
        isNew: true,
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
        isNew: true,
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
      {
        slug: "command-palette",
        name: "CommandPalette",
        isNew: true,
        description: "Paleta de comandos con búsqueda y atajo Ctrl+K.",
      },
    ],
  },
  {
    title: "Tablas",
    items: [
      {
        slug: "data-table",
        name: "DataTable",
        isNew: true,
        description: "Tabla con ordenación por columnas y cabecera sticky.",
      },
    ],
  },
  {
    title: "Estado e identidad",
    items: [
      {
        slug: "alert",
        name: "Alert",
        isNew: true,
        description: "Mensaje inline con dismiss manual y auto-dismiss opcional.",
      },
      {
        slug: "avatar",
        name: "Avatar",
        description: "Avatar base con grupo, presencia, initials y chip.",
      },
      {
        slug: "progress",
        name: "Progress",
        isNew: true,
        description: "Indicador de progreso lineal con color y tamaño.",
      },
      {
        slug: "toaster",
        name: "Toaster",
        isNew: true,
        description: "Toasts con portal; monta `<Toaster />` y usa `toast()`.",
      },
      {
        slug: "empty-state",
        name: "EmptyState",
        description: "Estado vacío con título, descripción y acciones.",
      },
      {
        slug: "skeleton",
        name: "Skeleton",
        description: "Marcador de carga para line, rect y circle.",
      },
    ],
  },
  {
    title: "Utilidades lógicas",
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
      values: ["solid", "outline", "ghost"],
    },
    {
      label: "Tamaños",
      values: ["sm", "md", "lg", "xl", "2xl"],
    },
    {
      label: "Shapes",
      values: ["default", "square", "circle", "pill"],
    },
    {
      label: "Colores",
      values: [
        "neutral",
        "slate",
        "zinc",
        "primary",
        "brand",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
        "black",
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
      type: `"solid" | "outline" | "ghost"`,
      defaultValue: `"solid"`,
      description: "Define el tratamiento visual principal del botón.",
    },
    {
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"primary"`,
      description: "Selecciona la paleta aplicada a fondo, borde y texto.",
    },
    {
      name: "size",
      type: `"sm" | "md" | "lg" | "xl" | "2xl"`,
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
      type: `"transform" | "ripple"`,
      defaultValue: "provider",
      description: "Permite sobrescribir el efecto de presión por instancia.",
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
