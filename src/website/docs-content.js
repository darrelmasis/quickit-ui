export const WEBSITE_DOC_OVERVIEW_SECTIONS = [
  { id: "introduccion", label: "Introducción" },
  { id: "instalacion", label: "Instalación" },
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
      { id: "hook-use-quickit-focus-ring-config", label: "useQuickitFocusRingConfig" },
      { id: "hook-use-quickit-press-effect", label: "useQuickitPressEffect" },
      { id: "hook-use-quickit-ripple", label: "useQuickitRipple" },
      { id: "hook-use-quickit-ripple-config", label: "useQuickitRippleConfig" },
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
    description: "Lee el tema efectivo que está consumiendo la librería.",
  },
  {
    name: "useQuickitThemeController",
    description:
      "Expone theme, resolvedTheme, systemTheme, setTheme y toggleTheme.",
  },
  {
    name: "useFormControl",
    description:
      "Accede al contexto de FormControl para IDs, disabled e invalid.",
  },
  {
    name: "useBreakpoint",
    description:
      "Devuelve breakpoint actual y flags como isMobile, isTablet e isDesktop.",
  },
  {
    name: "useMediaQuery",
    description:
      "Evalúa media queries concretas cuando necesitas control más fino.",
  },
  {
    name: "useTabs",
    description:
      "Accede al contexto de Tabs para leer value, size y orientación.",
  },
  {
    name: "useDropdown",
    description:
      "Accede al estado interno de Dropdown para control avanzado.",
  },
  {
    name: "useModal",
    description:
      "Accede al estado interno de Modal para cierres programáticos.",
  },
  {
    name: "useFloatingLayer",
    description:
      "Utilidad avanzada para overlays personalizados (Dropdown, Tooltip, etc).",
  },
  {
    name: "useQuickitFocusRing",
    description:
      "Permite consultar si un tipo de componente debe mostrar focus ring.",
  },
  {
    name: "useQuickitFocusRingConfig",
    description: "Lee la configuración global de focus ring.",
  },
  {
    name: "useQuickitPressEffect",
    description:
      "Lee la política global de presión: transform o ripple.",
  },
  {
    name: "useQuickitRipple",
    description:
      "Indica si ripple está activo para botones y links tipo botón.",
  },
  {
    name: "useQuickitRippleConfig",
    description: "Lee la configuración global de ripple.",
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
    ],
  },
  {
    title: "Estado e identidad",
    items: [
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
      text: "Es un `input type=\"range\"` estilizado: `min`, `max`, `step`, `value` / `defaultValue` numéricos y `onChange` como en el elemento nativo. `color` y `size` aplican tokens Quickit.",
    },
    {
      tag: "Accesibilidad",
      text: "Comportamiento estándar del range nativo. Enlaza un `Label` visible si lo necesitas.",
    },
    {
      tag: "Implementación",
      text: "Track y accent siguen el tema claro/oscuro; el focus ring usa la política del token `input`.",
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
      text: "`type=\"single\"` vs `multiple` cambia el tipo de `value`/`defaultValue` (string vs array). Con `collapsible={false}` en single, un ítem permanece abierto.",
    },
    {
      tag: "Accesibilidad",
      text: "Triggers y regiones colapsables siguen un patrón de encabezado + panel; evita anidar controles interactivos complejos dentro del trigger sin probar teclado.",
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
  drawer: [
    {
      tag: "Corregido",
      text: "La apertura/cierre animado ya no dispara `setState` síncrono en el cuerpo del efecto (evita renders en cascada y cumple la regla `react-hooks/set-state-in-effect`).",
    },
    {
      tag: "Accesibilidad",
      text: "El panel usa `role=\"dialog\"` y `aria-modal`. Conviene enlazar `aria-labelledby` al `DrawerTitle` desde tu markup o una mejora futura en la librería. `onBeforeClose` permite bloquear cierre async.",
    },
    {
      tag: "Implementación",
      text: "Pila global de drawers para Escape y z-index incremental; `lockAppScroll` evita scroll del body mientras está abierto.",
    },
  ],
  popover: [
    {
      tag: "Uso",
      text: "Soporta disparadores por click u hover según API; ajusta retrasos si los usuarios atraviesan el trigger con el puntero hacia otro control.",
    },
    {
      tag: "Implementación",
      text: "Comparte patrones de lista/superficie con Dropdown para consistencia visual.",
    },
  ],
  tooltip: [
    {
      tag: "Uso",
      text: "Contenido breve; para textos largos o interactivos usa `Popover` en su lugar.",
    },
    {
      tag: "Accesibilidad",
      text: "Asegura que el trigger sea enfocable o tenga nombre accesible; el tooltip complementa, no sustituye, la etiqueta visible.",
    },
  ],
  modal: [
    {
      tag: "Accesibilidad",
      text: "`role=\"dialog\"` sin `aria-labelledby` automático: enlaza el título visible con el diálogo vía `aria-labelledby` en tu app si el lector debe anunciar el propósito al abrir. Solo el modal superior recibe Escape.",
    },
    {
      tag: "Implementación",
      text: "Patrón `rendered = open || visible` para animar salida; misma pila de z-index que Drawer conceptualmente pero contadores independientes.",
    },
  ],
  avatar: [
    {
      tag: "Uso",
      text: "`AvatarImage` debe llevar `alt` descriptivo o vacío si es puramente decorativo junto a texto que ya nombra al usuario.",
    },
    {
      tag: "Implementación",
      text: "`AvatarGroup`, `Initials`, `UserChip` y `AvatarPresence` componen casos de equipo y estado; revisa recortes y máscaras en temas claros/oscuros.",
    },
  ],
  progress: [
    {
      tag: "Accesibilidad",
      text: "Expone `role=\"progressbar\"` con `aria-valuenow/min/max`. No hay modo indeterminado nativo: si lo necesitas, habría que extender el componente.",
    },
    {
      tag: "Implementación",
      text: "Valor clampado entre `min` y `max`; porcentaje de ancho derivado de forma segura ante `max <= min`.",
    },
  ],
  toaster: [
    {
      tag: "API",
      text: "`toast` y `dismiss` salen de `toast-store` vía el índice del módulo; `Toaster.jsx` solo exporta el componente (Fast Refresh / `react-refresh/only-export-components`).",
    },
    {
      tag: "Uso",
      text: "Monta `<Toaster />` una vez cerca de la raíz. `toast()` usa un store en memoria compartido con ese contenedor.",
    },
    {
      tag: "UX",
      text: "Como máximo `visibleToasts` (3) en pantalla; el resto en cola y entra al liberar hueco. Hover solo afina espaciado y pausa timers. `toast.promise` para async.",
    },
    {
      tag: "Tipos",
      text: "`kind`: `default`, `loading`, `success`, `error`. Iconos integrados salvo en `default`. No existe `info`; usa `default` + `icon` o `icons` / `defaultIcon` en el Toaster.",
    },
  ],
  "empty-state": [
    {
      tag: "Uso",
      text: "Compone título, descripción y acciones para pantallas sin datos; alinea con `align` según layout.",
    },
    {
      tag: "Documentación",
      text: "Documentado en el sitio con props y layout; también aparece en la página de ejemplos.",
    },
  ],
  skeleton: [
    {
      tag: "Uso",
      text: "Formas `line`, `rect` y `circle` para placeholders; combina con `aria-busy` en el contenedor de datos en la app cuando tenga sentido.",
    },
    {
      tag: "Implementación",
      text: "Mantén estructura de layout estable entre loading y contenido para evitar saltos (CLS).",
    },
  ],
  show: [
    {
      tag: "Uso",
      text: "`when` acepta condición truthy; `fallback` cubre loading o vacío sin ternarios anidados.",
    },
    {
      tag: "Implementación",
      text: "Utilidad ligera; no sustituye a suspense de datos: sigue manejando errores en el padre.",
    },
  ],
  "render-switch": [
    {
      tag: "Uso",
      text: "`RenderSwitch` + `Match` + `Default` para ramas por valor; evita encadenar muchos ternarios en vistas.",
    },
    {
      tag: "Documentación",
      text: "Guía en el sitio con props y notas; `Match` y `Default` se importan junto a `RenderSwitch` desde `quickit-ui`.",
    },
  ],
  for: [
    {
      tag: "Uso",
      text: "Devuelve `fallback` si la colección está vacía o es null; el callback de hijos debe seguir las reglas de `key` de React (p. ej. `key={item.id}`).",
    },
    {
      tag: "Implementación",
      text: "Iteración declarativa alineada con el estilo de `Show`/`RenderSwitch`.",
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
