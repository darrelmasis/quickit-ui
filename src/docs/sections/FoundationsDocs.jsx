import {
  Badge,
  Button,
  Checkbox,
  Input,
  Link,
  QUICKIT_BUTTON_SHAPES,
  QUICKIT_CONTROL_SIZES,
  QUICKIT_SEMANTIC_COLORS,
  QuickitProvider,
  QuickitThemeProvider,
  Radio,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  useBreakpoint,
  useQuickitFocusRing,
  useQuickitThemeController,
  useQuickitPressEffect,
  useQuickitRipple,
  useMediaQuery,
  useQuickitTheme,
} from "@/lib";
import {
  CodeExample,
  NotesList,
  PreviewPanel,
  PropsTable,
  SectionCard,
  SectionHeading,
} from "@/docs/components/DocsPrimitives";

function ThemeHookPreview() {
  const theme = useQuickitTheme();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge color="neutral" variant="outline">
        theme: {theme}
      </Badge>
      <Button color="neutral" size="sm">
        Accion
      </Button>
    </div>
  );
}

function ThemeControllerPreview() {
  const { resolvedTheme, setTheme, systemTheme, theme, toggleTheme } =
    useQuickitThemeController();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Badge color="neutral" variant="outline">
          preferencia: {theme}
        </Badge>
        <Badge color="neutral" variant="outline">
          resuelto: {resolvedTheme}
        </Badge>
        <Badge color="neutral" variant="outline">
          sistema: {systemTheme}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          color="neutral"
          size="sm"
          variant={theme === "system" ? "solid" : "outline"}
          onClick={() => setTheme("system")}
        >
          Sistema
        </Button>
        <Button
          color="neutral"
          size="sm"
          variant={theme === "light" ? "solid" : "outline"}
          onClick={() => setTheme("light")}
        >
          Claro
        </Button>
        <Button
          color="neutral"
          size="sm"
          variant={theme === "dark" ? "solid" : "outline"}
          onClick={() => setTheme("dark")}
        >
          Oscuro
        </Button>
        <Button color="brand" variant="outline" onClick={toggleTheme}>
          Alternar desde {resolvedTheme}
        </Button>
      </div>
    </div>
  );
}

function ThemeControllerSwitchPreview() {
  const { resolvedTheme, theme, toggleTheme } = useQuickitThemeController();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Badge color="neutral" variant="outline">
        tema: {theme}
      </Badge>
      <Badge color="neutral" variant="outline">
        resuelto: {resolvedTheme}
      </Badge>
      <Tooltip content="Alternar tema">
        <Switch
          color="brand"
          size="md"
          checked={resolvedTheme === "dark"}
          onCheckedChange={toggleTheme}
        />
      </Tooltip>
    </div>
  );
}

function BreakpointHookPreview() {
  const { breakpoint, isDesktop, isMobile, isTablet, ready, width } =
    useBreakpoint();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge color="neutral" variant="outline">
        {ready ? `breakpoint: ${breakpoint}` : "breakpoint: pending"}
      </Badge>
      <Badge color={isMobile ? "brand" : "neutral"} variant="outline">
        isMobile: {String(isMobile)}
      </Badge>
      <Badge color={isTablet ? "warning" : "neutral"} variant="outline">
        isTablet: {String(isTablet)}
      </Badge>
      <Badge color={isDesktop ? "success" : "neutral"} variant="outline">
        isDesktop: {String(isDesktop)}
      </Badge>
      <Badge color="neutral" variant="outline">
        width: {width ?? "null"}
      </Badge>
    </div>
  );
}

function MediaQueryHookPreview() {
  const prefersDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge color={prefersDesktop ? "success" : "neutral"} variant="outline">
        desktop query: {String(prefersDesktop)}
      </Badge>
      <Badge
        color={prefersReducedMotion ? "warning" : "neutral"}
        variant="outline"
      >
        reduced motion: {String(prefersReducedMotion)}
      </Badge>
    </div>
  );
}

function FocusRingHookPreview() {
  const buttonFocusRing = useQuickitFocusRing("button");
  const inputFocusRing = useQuickitFocusRing("input");
  const linkFocusRing = useQuickitFocusRing("link");
  const checkboxFocusRing = useQuickitFocusRing("checkbox");
  const radioFocusRing = useQuickitFocusRing("radio");
  const tabsFocusRing = useQuickitFocusRing("tabs");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge color={buttonFocusRing ? "success" : "neutral"} variant="outline">
        button focus: {String(buttonFocusRing)}
      </Badge>
      <Badge color={inputFocusRing ? "warning" : "neutral"} variant="outline">
        input focus: {String(inputFocusRing)}
      </Badge>
      <Badge color={linkFocusRing ? "info" : "neutral"} variant="outline">
        link focus: {String(linkFocusRing)}
      </Badge>
      <Badge
        color={checkboxFocusRing ? "success" : "neutral"}
        variant="outline"
      >
        checkbox focus: {String(checkboxFocusRing)}
      </Badge>
      <Badge color={radioFocusRing ? "brand" : "neutral"} variant="outline">
        radio focus: {String(radioFocusRing)}
      </Badge>
      <Badge color={tabsFocusRing ? "warning" : "neutral"} variant="outline">
        tabs focus: {String(tabsFocusRing)}
      </Badge>
    </div>
  );
}

function FocusRingSearchToolbarPreview({ ui }) {
  const buttonFocusRing = useQuickitFocusRing("button");
  const inputFocusRing = useQuickitFocusRing("input");

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="search"
          placeholder="Buscar componente, hook o token"
          defaultValue="focus ring"
        />
        <Button color="brand">Buscar</Button>
      </div>
      <p className={`text-sm ${ui.body}`}>
        En este toolbar el input no muestra focus ring, pero el botón sí.
        input: {String(inputFocusRing)}. button: {String(buttonFocusRing)}.
      </p>
    </div>
  );
}

function FocusRingEditorialPreview({ ui }) {
  const textareaFocusRing = useQuickitFocusRing("textarea");
  const buttonFocusRing = useQuickitFocusRing("button");

  return (
    <div className="space-y-3">
      <Textarea
        minRows={4}
        defaultValue="Notas de revisión para la próxima release."
      />
      <div className="flex flex-wrap items-center gap-3">
        <Button color="neutral" variant="outline">
          Cancelar
        </Button>
        <Button color="neutral">Guardar cambios</Button>
      </div>
      <p className={`text-sm ${ui.body}`}>
        Este panel editorial desactiva el focus ring solo en campos de texto.
        textarea: {String(textareaFocusRing)}. button: {String(buttonFocusRing)}.
      </p>
    </div>
  );
}

function FocusRingChoiceControlsPreview({ ui }) {
  const linkFocusRing = useQuickitFocusRing("link");
  const checkboxFocusRing = useQuickitFocusRing("checkbox");
  const radioFocusRing = useQuickitFocusRing("radio");
  const buttonFocusRing = useQuickitFocusRing("button");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Link href="#" variant="default">
          Ver términos
        </Link>
        <Checkbox label="Recordarme" defaultChecked />
        <Radio name="focus-ring-choice" label="Modo manual" defaultChecked />
        <Button color="neutral" variant="outline">
          Continuar
        </Button>
      </div>
      <p className={`text-sm ${ui.body}`}>
        Aquí se desactiva el focus ring solo en enlaces y controles de opción.
        link: {String(linkFocusRing)}. checkbox: {String(checkboxFocusRing)}.
        radio: {String(radioFocusRing)}. button: {String(buttonFocusRing)}.
      </p>
    </div>
  );
}

function FocusRingTabsPreview({ ui }) {
  const tabsFocusRing = useQuickitFocusRing("tabs");
  const buttonFocusRing = useQuickitFocusRing("button");

  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview" color="neutral">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p className={`text-sm ${ui.body}`}>
            Resumen general del workspace activo.
          </p>
        </TabsContent>
        <TabsContent value="activity">
          <p className={`text-sm ${ui.body}`}>
            Actividad reciente del equipo y componentes.
          </p>
        </TabsContent>
        <TabsContent value="settings">
          <p className={`text-sm ${ui.body}`}>
            Configuración avanzada del workspace.
          </p>
        </TabsContent>
      </Tabs>
      <div className="flex flex-wrap items-center gap-3">
        <Button color="neutral" variant="outline">
          Aplicar filtros
        </Button>
      </div>
      <p className={`text-sm ${ui.body}`}>
        Aquí se desactiva el focus ring solo en tabs. tabs: {String(tabsFocusRing)}.
        button: {String(buttonFocusRing)}.
      </p>
    </div>
  );
}

function RippleHookPreview() {
  const pressEffect = useQuickitPressEffect();
  const buttonRipple = useQuickitRipple("button");
  const linkRipple = useQuickitRipple("link");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge color="warning" variant="outline">
        pressEffect: {pressEffect}
      </Badge>
      <Badge color={buttonRipple ? "success" : "neutral"} variant="outline">
        button ripple: {String(buttonRipple)}
      </Badge>
      <Badge color={linkRipple ? "info" : "neutral"} variant="outline">
        link ripple: {String(linkRipple)}
      </Badge>
      <Button color="brand">Ripple demo</Button>
      <Link href="#" appearance="button" variant="outline" color="neutral">
        Link ripple
      </Link>
    </div>
  );
}

function RippleToolbarPreview({ ui }) {
  const buttonRipple = useQuickitRipple("button");
  const linkRipple = useQuickitRipple("link");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button color="neutral">Guardar</Button>
        <Button color="brand" variant="outline">
          Publicar
        </Button>
        <Link href="#" appearance="button" color="neutral" variant="ghost">
          Vista previa
        </Link>
      </div>
      <p className={`text-sm ${ui.body}`}>
        Aquí el ripple queda activo solo en botones. button: {String(buttonRipple)}.
        link: {String(linkRipple)}.
      </p>
    </div>
  );
}

const foundationApis = {
  theme: [
    { prop: "theme", type: "light | dark", defaultValue: "light", description: "Valor actual del tema cuando consumes `useQuickitTheme()` dentro de `QuickitProvider` o `QuickitThemeProvider`." },
  ],
  quickitThemeProvider: [
    { prop: "defaultTheme", type: "system | light | dark", defaultValue: "system", description: "Preferencia inicial cuando no existe una persistida en `localStorage`." },
    { prop: "storageKey", type: "string", defaultValue: "quickit-ui-theme", description: "Clave usada para persistir el tema actual." },
    { prop: "focusRing / pressEffect / ripple", type: "mismas props de QuickitProvider", defaultValue: "defaults de Quickit", description: "Se reenvían internamente a `QuickitProvider` para que el tema gestionado y la política visual vivan en el mismo árbol." },
    { prop: "return", type: "React provider", defaultValue: "-", description: "Envuelve a `QuickitProvider`, persiste el tema y aplica la clase `dark` al `documentElement`." },
  ],
  useQuickitThemeController: [
    { prop: "theme", type: "system | light | dark", defaultValue: "-", description: "Preferencia persistida del usuario." },
    { prop: "resolvedTheme", type: "light | dark", defaultValue: "-", description: "Tema efectivo que Quickit está aplicando realmente al árbol actual." },
    { prop: "systemTheme", type: "light | dark", defaultValue: "-", description: "Resultado actual de `prefers-color-scheme` cuando la preferencia es `system`." },
    { prop: "setTheme", type: "(theme) => void", defaultValue: "-", description: "Permite fijar `system`, `light` o `dark` explícitamente." },
    { prop: "toggleTheme", type: "() => void", defaultValue: "-", description: "Alterna entre `light` y `dark`. Si estabas en `system`, sale de ese modo usando el tema resuelto actual como base." },
  ],
  useBreakpoint: [
    { prop: "breakpoint", type: "xs | sm | md | lg | xl | 2xl | null", defaultValue: "null en SSR", description: "Breakpoint actual resuelto con los tokens de Quickit o con el override que pases." },
    { prop: "isMobile / isTablet / isDesktop", type: "boolean", defaultValue: "false en SSR", description: "Flags derivados. `mobile < md`, `tablet >= md && < lg`, `desktop >= lg`." },
    { prop: "width / height", type: "number | null", defaultValue: "null en SSR", description: "Dimensiones actuales del viewport." },
    { prop: "ready", type: "boolean", defaultValue: "false en SSR", description: "Indica si el hook ya tiene medidas reales del navegador." },
    { prop: "options.breakpoints", type: "Partial<{ sm, md, lg, xl, 2xl }>", defaultValue: "QUICKIT_BREAKPOINTS", description: "Permite sobreescribir el mapa de breakpoints sin salirte de la API del hook." },
  ],
  useMediaQuery: [
    { prop: "query", type: "string", defaultValue: "required", description: "Media query nativa que quieres observar, por ejemplo `(min-width: 1024px)` o `(prefers-reduced-motion: reduce)`." },
    { prop: "options.defaultValue", type: "boolean", defaultValue: "false", description: "Fallback usado durante SSR o cuando `matchMedia` no está disponible." },
    { prop: "return", type: "boolean", defaultValue: "-", description: "Devuelve `true` cuando la query coincide y se actualiza automáticamente al cambiar." },
  ],
  useQuickitFocusRing: [
    { prop: "component", type: "button | link | input | textarea | select | checkbox | radio | switch | tabs | accordion | dropdown | modal", defaultValue: "required", description: "Nombre del componente cuya política de focus ring quieres consultar." },
    { prop: "return", type: "boolean", defaultValue: "-", description: "Devuelve `true` cuando ese componente mantiene focus ring activo según la configuración actual del provider." },
  ],
  useQuickitRipple: [
    { prop: "component", type: "button | link", defaultValue: "required", description: "Nombre del componente cuya política de ripple quieres consultar." },
    { prop: "return", type: "boolean", defaultValue: "-", description: "Devuelve `true` cuando ese componente mantiene el ripple activo según la configuración actual del provider." },
  ],
};

const foundationNotes = {
  provider: [
    "QuickitProvider expone el tema actual mediante contexto, sin acoplar la app a una solucion externa.",
    "Si no envuelves la aplicacion, el tema por defecto es light.",
    "El proveedor es liviano: sirve para consistencia, no para manejar estado global de la app.",
    "También centraliza la política de focus visible mediante `focusRing`, para desactivar todos los focus rings o solo componentes específicos.",
    "También centraliza la política de interacción de presión mediante `pressEffect`, que puede ser `transform` o `ripple`.",
    "La política de `ripple` solo aplica cuando `pressEffect=\"ripple\"`, y permite apagarlo globalmente o por componente.",
  ],
  theme: [
    "La libreria trabaja con dos modos base: light y dark.",
    "Los componentes priorizan defaults neutros y dejan los colores semanticos como decision explicita del producto.",
    "useQuickitTheme te permite reaccionar al tema actual desde cualquier componente descendiente.",
    "Si quieres que la librería gestione persistencia y toggle, usa `QuickitThemeProvider` junto con `useQuickitThemeController`.",
    "El storage key por defecto es `quickit-ui-theme`, pero puedes sobrescribirlo con `storageKey`.",
    "QuickitThemeProvider también soporta `system`, así que puede seguir `prefers-color-scheme` y exponer al mismo tiempo el tema resuelto mediante `resolvedTheme`.",
    "`theme` representa la preferencia guardada del usuario y `resolvedTheme` el modo efectivo que realmente se aplica al árbol actual.",
    "Si tu UI propia también cambia con el tema, consume `useQuickitThemeController` y usa `dark:` en tus layouts, cabeceras y shells, no solo en los componentes de Quickit.",
    "Si también usas utilidades propias de Tailwind con `dark:`, agrega `@custom-variant dark (&:where(.dark, .dark *));` en tu CSS global para que tu app y Quickit lean la misma clase `dark`.",
  ],
  useBreakpoint: [
    "useBreakpoint es seguro para SSR: en servidor devuelve `ready: false` y medidas nulas hasta que el navegador hidrata.",
    "El criterio por defecto es pragmático y simple: mobile bajo `md`, tablet entre `md` y `lg`, desktop desde `lg`.",
    "También exporta `QUICKIT_BREAKPOINTS` para que puedas alinear tus wrappers, layouts o ejemplos con los mismos cortes de la librería.",
  ],
  useMediaQuery: [
    "useMediaQuery es el nivel más bajo: sirve cuando no quieres breakpoint semántico, sino consultar una media query exacta.",
    "Es útil no solo para ancho de viewport, sino también para preferencias del usuario como `prefers-reduced-motion` o `prefers-color-scheme`.",
    "Si tu caso es estrictamente responsive de layout, `useBreakpoint` suele ser más cómodo; si necesitas precisión, usa `useMediaQuery`.",
  ],
  useQuickitFocusRing: [
    "Quickit mantiene focus visible accesible por defecto en sus componentes interactivos.",
    "Puedes apagarlo globalmente con `focusRing={false}` o solo en ciertos componentes con `focusRing={{ disabledComponents: [...] }}`.",
    "Los nombres válidos hoy son `button`, `link`, `input`, `textarea`, `select`, `checkbox`, `radio`, `switch`, `tabs`, `accordion`, `dropdown` y `modal`.",
    "El hook te permite leer esa política desde wrappers o shells propios sin duplicar configuración.",
  ],
  useQuickitRipple: [
    "Quickit usa `pressEffect=\"transform\"` por defecto, así que el ripple permanece apagado hasta que el provider o la instancia cambien a `pressEffect=\"ripple\"`.",
    "Cuando `pressEffect=\"ripple\"`, puedes apagarlo globalmente con `ripple={false}` o solo en ciertos componentes con `ripple={{ disabledComponents: [...] }}`.",
    "Los nombres válidos hoy son `button` y `link`.",
    "A nivel de instancia, `Button` y `Link` aceptan `pressEffect=\"ripple\"` o `ripple={false}` para forzarlo o anularlo puntualmente.",
  ],
  colors: [
    "La API actual sigue siendo semántica: `neutral`, `slate`, `zinc`, `primary`, `brand`, `success`, `danger`, `warning`, `info`, `light`, `dark` y `black`.",
    "`neutral` mantiene la base premium de la librería: usa un neutral más frío en light y uno más denso en dark, en lugar de exponer una sola familia plana.",
    "`dark` es una variante oscura intermedia y `black` queda como la opción de mayor contraste.",
    "Cada color semántico se apoya en una familia Tailwind interna. Si reemplazas esa familia, cambias el color semántico en toda la librería.",
    "El slot recomendado para la marca es `brand`, y por debajo consume `brand-*`. Así puedes conectar tu identidad visual sin mezclarla con `primary`.",
    "Crear una familia nueva como `gray-*` no hace que aparezca `color=\"gray\"` en la API. Para eso hace falta ampliar el mapa de colores del componente.",
    "Si necesitas un color nuevo solo en un caso puntual, usa `className` para sobreescribir ese componente.",
  ],
  states: [
    "disabled bloquea interaccion y comunica el estado con feedback visual consistente.",
    "Props como loading, invalid, pressed o active solo aparecen donde tienen sentido semantico.",
    "La documentacion muestra los estados cerca del caso real para evitar props sin contexto.",
    "Quickit UI ahora exporta tokens publicos como `QUICKIT_SEMANTIC_COLORS`, `QUICKIT_CONTROL_SIZES` y `QUICKIT_BUTTON_SHAPES` para alinear tus galerias, wrappers y helpers con la API real.",
  ],
};

const isVisible = (visibleIds, id) => !visibleIds || visibleIds.has(id);

export function FoundationsDocs({ ui, visibleIds }) {
  const previewTheme = ui.mode === "dark" ? "dark" : "light";

  return (
    <>
      {isVisible(visibleIds, "provider") ? (
        <SectionCard id="provider" className={ui.divider}>
          <SectionHeading
            category="Fundamentos"
            title="QuickitProvider"
            description="Proveedor base del sistema. Define el tema activo y asegura que todos los componentes lean el mismo contexto visual."
            ui={ui}
          />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Uso minimo"
              code={`<QuickitProvider theme="dark">
  <Button color="neutral">Guardar cambios</Button>
</QuickitProvider>`}
            >
              <QuickitProvider theme="dark">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" color="neutral">
                    theme="dark"
                  </Badge>
                  <Button color="neutral">Guardar cambios</Button>
                </div>
              </QuickitProvider>
            </PreviewPanel>

            <CodeExample
              ui={ui}
              title="App shell"
              code={`import { QuickitProvider } from "quickit-ui";
import "quickit-ui/styles.css";

export function App() {
  return (
    <QuickitProvider theme="light">
      <Routes />
    </QuickitProvider>
  );
}`}
            />

            <CodeExample
              ui={ui}
              title="Configurar focus ring"
              code={`<QuickitProvider
  theme="dark"
  focusRing={{ disabledComponents: ["input", "textarea"] }}
>
  <App />
</QuickitProvider>`}
            />

            <CodeExample
              ui={ui}
              title="Configurar pressEffect"
              code={`<QuickitProvider
  theme="dark"
  pressEffect="ripple"
  ripple={{ disabledComponents: ["link"] }}
>
  <App />
</QuickitProvider>`}
            />
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>Notas</p>
            <NotesList items={foundationNotes.provider} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "theme") ? (
        <SectionCard id="theme" className={ui.divider}>
          <SectionHeading
            category="Fundamentos"
            title="Tema"
            description="Quickit UI usa el mismo contexto para que componentes, hooks y tu propio layout respondan al tema de forma consistente, ya sea con control externo o con persistencia integrada."
            ui={ui}
          />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Lectura del tema actual"
              code={`function ThemeBadge() {
  const theme = useQuickitTheme();

  return <Badge variant="outline">theme: {theme}</Badge>;
}`}
            >
              <QuickitProvider theme="dark">
                <ThemeHookPreview />
              </QuickitProvider>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Cambio desde la app consumidora"
              code={`const [theme, setTheme] = useState("light");

return (
  <QuickitProvider theme={theme}>
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Alternar tema
    </Button>
  </QuickitProvider>
);`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge color="neutral">light</Badge>
                <Badge color="neutral" variant="solid">dark</Badge>
                <span className={`text-sm ${ui.body}`}>
                  El estado del tema vive en tu app; el provider solo lo distribuye.
                </span>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Controlador persistente desde Quickit"
              code={`function ThemeControls() {
  const { resolvedTheme, setTheme, systemTheme, theme, toggleTheme } =
    useQuickitThemeController();

  return (
    <div className="space-y-4">
      <p>
        Preferencia: {theme}. Sistema: {systemTheme}. Tema aplicado: {resolvedTheme}.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setTheme("system")}>Sistema</Button>
        <Button onClick={() => setTheme("light")}>Claro</Button>
        <Button onClick={() => setTheme("dark")}>Oscuro</Button>
        <Button variant="outline" color="brand" onClick={toggleTheme}>
          Alternar desde {resolvedTheme}
        </Button>
      </div>
    </div>
  );
}

<QuickitThemeProvider
  defaultTheme="system"
  storageKey="ava-quickit-theme"
>
  <ThemeControls />
</QuickitThemeProvider>`}
            >
              <QuickitThemeProvider
                defaultTheme="system"
                storageKey="docs-quickit-theme-preview"
              >
                <ThemeControllerPreview />
              </QuickitThemeProvider>
            </PreviewPanel>

            <CodeExample
              ui={ui}
              title="API recomendada"
              code={`import {
  Button,
  QuickitThemeProvider,
  useQuickitThemeController,
} from "quickit-ui";

function ThemeControls() {
  const { resolvedTheme, setTheme, systemTheme, theme, toggleTheme } =
    useQuickitThemeController();

  return (
    <div className="space-y-4">
      <p>
        Preferencia: {theme}. Sistema: {systemTheme}. Tema activo: {resolvedTheme}.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setTheme("system")}>Sistema</Button>
        <Button onClick={() => setTheme("light")}>Claro</Button>
        <Button onClick={() => setTheme("dark")}>Oscuro</Button>
        <Button color="brand" variant="outline" onClick={toggleTheme}>
          Alternar desde {resolvedTheme}
        </Button>
      </div>
    </div>
  );
}

export function App() {
  return (
    <QuickitThemeProvider
      defaultTheme="system"
      storageKey="ava-quickit-theme"
    >
      <ThemeControls />
      <Routes />
    </QuickitThemeProvider>
  );
}`}
            />

            <CodeExample
              ui={ui}
              title="Tailwind dark mode en la app consumidora"
              language="css"
              code={`@import "tailwindcss";
@import "quickit-ui/styles.css";

@custom-variant dark (&:where(.dark, .dark *));`}
            />

            <CodeExample
              ui={ui}
              title="Usar el tema también fuera de Quickit"
              code={`function Shell() {
  const { theme, resolvedTheme } = useQuickitThemeController();

  return (
    <div className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <header className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        Preferencia: {theme}. Tema efectivo: {resolvedTheme}
      </header>
      <main className="p-6">
        <CardGrid />
      </main>
    </div>
  );
}`}
            />

            <PreviewPanel
              ui={ui}
              title="Caso real: switch de tema"
              code={`function ToggleTheme() {
  const { resolvedTheme, theme, toggleTheme } = useQuickitThemeController();

  return (
    <Tooltip content="Alternar tema">
      <Switch
        color="brand"
        size="md"
        checked={resolvedTheme === "dark"}
        onCheckedChange={toggleTheme}
      />
    </Tooltip>
  );
}

<QuickitThemeProvider storageKey="ava-quickit-theme">
  <ToggleTheme />
</QuickitThemeProvider>`}
            >
              <QuickitThemeProvider
                defaultTheme="system"
                storageKey="docs-quickit-theme-switch"
              >
                <ThemeControllerSwitchPreview />
              </QuickitThemeProvider>
            </PreviewPanel>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>API de Tema</p>
              <PropsTable rows={foundationApis.theme} ui={ui} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>API de QuickitThemeProvider</p>
              <PropsTable rows={foundationApis.quickitThemeProvider} ui={ui} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>API de useQuickitThemeController</p>
              <PropsTable rows={foundationApis.useQuickitThemeController} ui={ui} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>Notas</p>
              <NotesList items={foundationNotes.theme} ui={ui} />
            </div>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "use-breakpoint") ? (
        <SectionCard id="use-breakpoint" className={ui.divider}>
          <SectionHeading
            category="Fundamentos"
            title="useBreakpoint"
            description="Hook responsivo para leer el viewport actual y derivar flags útiles como `isMobile`, `isTablet` o `isDesktop` sin repetir media queries en cada app."
            ui={ui}
          />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Lectura básica del viewport"
              code={`function ResponsiveState() {
  const { breakpoint, isMobile, isTablet, isDesktop, width } = useBreakpoint();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="outline">breakpoint: {breakpoint}</Badge>
      <Badge variant="outline">isMobile: {String(isMobile)}</Badge>
      <Badge variant="outline">isTablet: {String(isTablet)}</Badge>
      <Badge variant="outline">isDesktop: {String(isDesktop)}</Badge>
      <Badge variant="outline">width: {width}</Badge>
    </div>
  );
}`}
            >
              <BreakpointHookPreview />
            </PreviewPanel>

            <CodeExample
              ui={ui}
              title="Uso típico en layout"
              code={`import { QUICKIT_BREAKPOINTS, useBreakpoint } from "quickit-ui";

function SidebarLayout() {
  const { isDesktop, ready } = useBreakpoint();

  if (!ready) {
    return null;
  }

  return isDesktop ? <DesktopSidebar /> : <MobileSheet />;
}`}
            />

            <CodeExample
              ui={ui}
              title="Sobrescribir breakpoints"
              code={`const responsive = useBreakpoint({
  breakpoints: {
    md: 820,
    lg: 1180,
  },
});

responsive.isTablet;
responsive.breakpoint;`}
            />

            <CodeExample
              ui={ui}
              title="Tokens públicos"
              code={`import { QUICKIT_BREAKPOINTS } from "quickit-ui";

QUICKIT_BREAKPOINTS.sm;   // 640
QUICKIT_BREAKPOINTS.md;   // 768
QUICKIT_BREAKPOINTS.lg;   // 1024
QUICKIT_BREAKPOINTS.xl;   // 1280
QUICKIT_BREAKPOINTS["2xl"]; // 1536`}
            />
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>API</p>
              <PropsTable rows={foundationApis.useBreakpoint} ui={ui} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>Notas</p>
              <NotesList items={foundationNotes.useBreakpoint} ui={ui} />
            </div>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "use-media-query") ? (
        <SectionCard id="use-media-query" className={ui.divider}>
          <SectionHeading
            category="Fundamentos"
            title="useMediaQuery"
            description="Hook de bajo nivel para escuchar media queries nativas y reaccionar a cambios del viewport o a preferencias del sistema."
            ui={ui}
          />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Lectura de queries exactas"
              code={`function MotionAndDesktopFlags() {
  const prefersDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="outline">
        desktop query: {String(prefersDesktop)}
      </Badge>
      <Badge variant="outline">
        reduced motion: {String(prefersReducedMotion)}
      </Badge>
    </div>
  );
}`}
            >
              <MediaQueryHookPreview />
            </PreviewPanel>

            <CodeExample
              ui={ui}
              title="Fallback para SSR"
              code={`const prefersDark = useMediaQuery(
  "(prefers-color-scheme: dark)",
  { defaultValue: false },
);`}
            />

            <CodeExample
              ui={ui}
              title="Uso típico"
              code={`function CommandPalette() {
  const isCompact = useMediaQuery("(max-width: 767px)");

  return isCompact ? <MobilePalette /> : <DesktopPalette />;
}`}
            />
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>API</p>
              <PropsTable rows={foundationApis.useMediaQuery} ui={ui} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>Notas</p>
              <NotesList items={foundationNotes.useMediaQuery} ui={ui} />
            </div>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "use-focus-ring") ? (
        <SectionCard id="use-focus-ring" className={ui.divider}>
          <SectionHeading
            category="Fundamentos"
            title="useQuickitFocusRing"
            description="Hook para consultar si un componente debe mantener su focus ring activo según la configuración actual de `QuickitProvider`."
            ui={ui}
          />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Lectura de la política actual"
              code={`function FocusPolicy() {
  const buttonFocusRing = useQuickitFocusRing("button");
  const inputFocusRing = useQuickitFocusRing("input");
  const linkFocusRing = useQuickitFocusRing("link");
  const checkboxFocusRing = useQuickitFocusRing("checkbox");
  const radioFocusRing = useQuickitFocusRing("radio");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="outline">
        button focus: {String(buttonFocusRing)}
      </Badge>
      <Badge variant="outline">
        input focus: {String(inputFocusRing)}
      </Badge>
      <Badge variant="outline">
        link focus: {String(linkFocusRing)}
      </Badge>
      <Badge variant="outline">
        checkbox focus: {String(checkboxFocusRing)}
      </Badge>
      <Badge variant="outline">
        radio focus: {String(radioFocusRing)}
      </Badge>
      <Badge variant="outline">
        tabs focus: {String(tabsFocusRing)}
      </Badge>
    </div>
  );
}`}
            >
              <QuickitProvider
                theme={previewTheme}
                focusRing={{ disabledComponents: ["input", "link"] }}
              >
                <FocusRingHookPreview />
              </QuickitProvider>
            </PreviewPanel>

            <CodeExample
              ui={ui}
              title="Uso típico"
              code={`function CustomShell() {
  const buttonFocusRing = useQuickitFocusRing("button");

  return (
    <div data-button-focus={buttonFocusRing ? "on" : "off"}>
      <Toolbar />
    </div>
  );
}`}
            />

            <PreviewPanel
              ui={ui}
              title="Caso real: toolbar de búsqueda"
              className="max-w-3xl"
              code={`<QuickitProvider
  theme="${previewTheme}"
  focusRing={{ disabledComponents: ["input"] }}
>
  <div className="space-y-3">
    <div className="flex flex-col gap-3 sm:flex-row">
      <Input
        type="search"
        placeholder="Buscar componente, hook o token"
        defaultValue="focus ring"
      />
      <Button color="brand">Buscar</Button>
    </div>
    <p className="text-sm text-neutral-500">
      Aquí el input pierde el focus ring, pero el botón mantiene el suyo.
    </p>
  </div>
</QuickitProvider>`}
            >
              <QuickitProvider
                theme={previewTheme}
                focusRing={{ disabledComponents: ["input"] }}
              >
                <FocusRingSearchToolbarPreview ui={ui} />
              </QuickitProvider>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Caso real: panel editorial"
              className="max-w-3xl"
              code={`<QuickitProvider
  theme="${previewTheme}"
  focusRing={{ disabledComponents: ["textarea"] }}
>
  <div className="space-y-3">
    <Textarea
      minRows={4}
      defaultValue="Notas de revisión para la próxima release."
    />
    <div className="flex flex-wrap items-center gap-3">
      <Button color="neutral" variant="outline">Cancelar</Button>
      <Button color="neutral">Guardar cambios</Button>
    </div>
  </div>
</QuickitProvider>`}
            >
              <QuickitProvider
                theme={previewTheme}
                focusRing={{ disabledComponents: ["textarea"] }}
              >
                <FocusRingEditorialPreview ui={ui} />
              </QuickitProvider>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Caso real: login con enlaces y choice controls"
              className="max-w-3xl"
              code={`<QuickitProvider
  theme="${previewTheme}"
  focusRing={{ disabledComponents: ["link", "checkbox", "radio"] }}
>
  <div className="space-y-4">
    <div className="flex flex-wrap items-center gap-4">
      <Link href="#">Ver términos</Link>
      <Checkbox label="Recordarme" defaultChecked />
      <Radio name="focus-ring-choice" label="Modo manual" defaultChecked />
      <Button color="neutral" variant="outline">Continuar</Button>
    </div>
  </div>
</QuickitProvider>`}
            >
              <QuickitProvider
                theme={previewTheme}
                focusRing={{
                  disabledComponents: ["link", "checkbox", "radio"],
                }}
              >
                <FocusRingChoiceControlsPreview ui={ui} />
              </QuickitProvider>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Caso real: navegación por tabs"
              className="max-w-3xl"
              code={`<QuickitProvider
  theme="${previewTheme}"
  focusRing={{ disabledComponents: ["tabs"] }}
>
  <Tabs defaultValue="overview" color="neutral">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="activity">Activity</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">
      Resumen general del workspace activo.
    </TabsContent>
    <TabsContent value="activity">
      Actividad reciente del equipo y componentes.
    </TabsContent>
    <TabsContent value="settings">
      Configuración avanzada del workspace.
    </TabsContent>
  </Tabs>
</QuickitProvider>`}
            >
              <QuickitProvider
                theme={previewTheme}
                focusRing={{ disabledComponents: ["tabs"] }}
              >
                <FocusRingTabsPreview ui={ui} />
              </QuickitProvider>
            </PreviewPanel>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>API</p>
              <PropsTable rows={foundationApis.useQuickitFocusRing} ui={ui} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>Notas</p>
              <NotesList items={foundationNotes.useQuickitFocusRing} ui={ui} />
            </div>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "use-ripple") ? (
        <SectionCard id="use-ripple" className={ui.divider}>
          <SectionHeading
            category="Fundamentos"
            title="useQuickitRipple"
            description="Hook para consultar si `Button` o `Link` con apariencia botón deben mantener el ripple activo según `pressEffect` y la configuración actual de `QuickitProvider`."
            ui={ui}
          />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Lectura de la política actual"
              code={`function RipplePolicy() {
  const buttonRipple = useQuickitRipple("button");
  const linkRipple = useQuickitRipple("link");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="outline">
        pressEffect: ripple
      </Badge>
      <Badge variant="outline">
        button ripple: {String(buttonRipple)}
      </Badge>
      <Badge variant="outline">
        link ripple: {String(linkRipple)}
      </Badge>
    </div>
  );
}`}
            >
              <QuickitProvider
                theme={previewTheme}
                pressEffect="ripple"
                ripple={{ disabledComponents: ["link"] }}
              >
                <RippleHookPreview />
              </QuickitProvider>
            </PreviewPanel>

            <CodeExample
              ui={ui}
              title="Uso típico"
              code={`<QuickitProvider
  theme="dark"
  pressEffect="ripple"
  ripple={{ disabledComponents: ["link"] }}
>
  <App />
</QuickitProvider>`}
            />

            <PreviewPanel
              ui={ui}
              title="Caso real: barra de acciones"
              className="max-w-3xl"
              code={`<QuickitProvider
  theme="${previewTheme}"
  pressEffect="ripple"
  ripple={{ disabledComponents: ["link"] }}
>
  <div className="flex flex-wrap items-center gap-3">
    <Button color="neutral">Guardar</Button>
    <Button color="brand" variant="outline">Publicar</Button>
    <Link href="#" appearance="button" color="neutral" variant="ghost">
      Vista previa
    </Link>
  </div>
</QuickitProvider>`}
            >
              <QuickitProvider
                theme={previewTheme}
                pressEffect="ripple"
                ripple={{ disabledComponents: ["link"] }}
              >
                <RippleToolbarPreview ui={ui} />
              </QuickitProvider>
            </PreviewPanel>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>API</p>
              <PropsTable rows={foundationApis.useQuickitRipple} ui={ui} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${ui.title}`}>Notas</p>
              <NotesList items={foundationNotes.useQuickitRipple} ui={ui} />
            </div>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "colors") ? (
        <SectionCard id="colors" className={ui.divider}>
          <SectionHeading
            category="Fundamentos"
            title="Colores"
            description="La API es semántica, pero por debajo consume familias Tailwind concretas. `brand` existe precisamente para que el usuario conecte su marca con una paleta propia `brand-*`."
            ui={ui}
          />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="1. Qué colores soporta hoy la API"
              code={`<div className="flex flex-wrap items-center gap-3">
  <Button color="neutral">Neutral</Button>
  <Button color="slate">Slate</Button>
  <Button color="zinc">Zinc</Button>
  <Button color="primary">Primary</Button>
  <Button color="brand">Brand</Button>
  <Button color="success">Success</Button>
  <Button color="danger">Danger</Button>
  <Button color="warning">Warning</Button>
  <Button color="info">Info</Button>
  <Button color="light">Light</Button>
  <Button color="dark">Dark</Button>
  <Button color="black">Black</Button>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button color="neutral">Neutral</Button>
                <Button color="slate">Slate</Button>
                <Button color="zinc">Zinc</Button>
                <Button color="primary">Primary</Button>
                <Button color="brand">Brand</Button>
                <Button color="success">Success</Button>
                <Button color="danger">Danger</Button>
                <Button color="warning">Warning</Button>
                <Button color="info">Info</Button>
                <Button color="light">Light</Button>
                <Button color="dark">Dark</Button>
                <Button color="black">Black</Button>
              </div>
            </PreviewPanel>

            <CodeExample
              ui={ui}
              title="2. Qué familia usa cada color semántico"
              language="jsx"
              code={`// Mapeo actual de la librería
neutral -> base premium curada
slate   -> slate-*
zinc    -> zinc-*
primary -> sky-*
brand   -> brand-*
success -> emerald-*
danger  -> rose-*
warning -> amber-*
info    -> cyan-*
light   -> stone-*
dark    -> zinc de alto contraste
black   -> negro / contraste máximo

// Resultado práctico:
// si reemplazas sky-*, cambias color="primary"
// si reemplazas brand-*, cambias color="brand"
// si necesitas un neutral explícito, usa color="slate" o color="zinc"`}
            />

            <CodeExample
              ui={ui}
              title="3. Usar tu color de marca con el slot brand"
              language="css"
              code={`/* app.css */
@import "quickit-ui/styles.css";

:root {
  /* Reemplazas brand-* porque color="brand" usa brand-* */
  --color-brand-300: oklch(0.86 0.19 126);
  --color-brand-400: oklch(0.8 0.2 126);
  --color-brand-500: oklch(0.74 0.2 126);
  --color-brand-600: oklch(0.68 0.19 126);
  --color-brand-700: oklch(0.62 0.18 126);
  --color-brand-800: oklch(0.55 0.16 126);
}

.dark {
  --color-brand-300: oklch(0.84 0.17 126);
  --color-brand-400: oklch(0.78 0.18 126);
  --color-brand-500: oklch(0.72 0.18 126);
}`}
            />

            <CodeExample
              ui={ui}
              title="4. Si aún quieres que tu marca viva en primary"
              language="css"
              code={`:root {
  /* primary consume sky-* */
  --color-sky-300: oklch(0.86 0.19 126);
  --color-sky-400: oklch(0.8 0.2 126);
  --color-sky-500: oklch(0.74 0.2 126);
  --color-sky-600: oklch(0.68 0.19 126);
  --color-sky-700: oklch(0.62 0.18 126);
  --color-sky-800: oklch(0.55 0.16 126);
}`}
            />

            <CodeExample
              ui={ui}
              title="5. Trabajar con neutrales explícitos"
              language="css"
              code={`:root {
  /* Para color="slate" */
  --color-slate-300: oklch(0.9 0.018 255);
  --color-slate-400: oklch(0.82 0.025 255);
  --color-slate-700: oklch(0.44 0.03 257);

  /* Para color="zinc" */
  --color-zinc-300: oklch(0.88 0.01 255);
  --color-zinc-400: oklch(0.8 0.014 255);
  --color-zinc-800: oklch(0.27 0.01 255);
}`}
            />

            <CodeExample
              ui={ui}
              title="6. Reutilizar otro slot semántico"
              language="css"
              code={`/* Si prefieres que tu marca viva en color="info" */
:root {
  --color-cyan-600: oklch(62% 0.19 330);
  --color-cyan-700: oklch(55% 0.18 330);
  --color-cyan-300: oklch(83% 0.09 330);
  --color-cyan-100: oklch(95% 0.03 330);
}`}
            />

            <CodeExample
              ui={ui}
              title="7. Crear una paleta nueva no habilita un color nuevo en props"
              language="css"
              code={`@theme {
  --color-gray-50: oklch(0.984 0.003 247.858);
  --color-gray-100: oklch(0.968 0.007 247.896);
  --color-gray-200: oklch(0.929 0.013 255.508);
  --color-gray-300: oklch(0.869 0.022 252.894);
  --color-gray-400: oklch(0.704 0.04 256.788);
  --color-gray-500: oklch(0.554 0.046 257.417);
  --color-gray-600: oklch(0.446 0.043 257.281);
  --color-gray-700: oklch(0.372 0.044 257.287);
  --color-gray-800: oklch(0.279 0.041 260.031);
  --color-gray-900: oklch(0.208 0.042 265.755);
  --color-gray-950: oklch(0.129 0.042 264.695);
}

/* Esto crea gray-* en Tailwind, pero no habilita color="gray" en Quickit */`}
            />

            <CodeExample
              ui={ui}
              title="8. Usar un color nuevo solo en un componente"
              code={`<Button
  color="neutral"
  className="border-fuchsia-600 bg-fuchsia-600 text-white hover:border-fuchsia-700 hover:bg-fuchsia-700 focus-visible:outline-fuchsia-600"
>
  Magenta
</Button>`}
            />

            <CodeExample
              ui={ui}
              title="Qué significa cada camino"
              language="jsx"
              code={`// Quieres un slot dedicado para tu marca:
// reemplaza brand-*

// Quieres que primary use tu marca:
// reemplaza sky-* si ese es tu criterio de producto

// Quieres neutrales explícitos y fáciles de tunear:
// usa color="slate" o color="zinc"

// Quieres un slot semántico distinto para tu marca:
// remapea cyan-*, emerald-*, etc.

// Quieres crear gray-*:
// puedes usar bg-gray-500 o text-gray-700 en className
// pero no aparece color="gray" automáticamente

// Quieres soportar color="gray" en la API:
// eso requiere ampliar el mapa de colores del componente`}
            />
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>Notas</p>
            <NotesList items={foundationNotes.colors} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "states") ? (
        <SectionCard id="states" className={ui.divider}>
          <SectionHeading
            category="Fundamentos"
            title="Estados compartidos"
            description="Una parte importante de la consistencia no esta en la estetica, sino en que los componentes reaccionen igual frente a carga, deshabilitado o validacion."
            ui={ui}
          />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Disabled y loading"
              code={`<div className="flex flex-wrap items-center gap-3">
  <Button color="neutral" disabled>Disabled</Button>
  <Button color="neutral" loading loadingText="Guardando">
    Guardar
  </Button>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button color="neutral" disabled>Disabled</Button>
                <Button color="neutral" loading loadingText="Guardando">
                  Guardar
                </Button>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="API compartida entre controles"
              className="space-y-4"
              code={`<div className="space-y-4">
  <div className="flex flex-wrap items-center gap-3">
    {QUICKIT_CONTROL_SIZES.map((size) => (
      <Button key={size} size={size} color="neutral">
        {size}
      </Button>
    ))}
  </div>

  <div className="flex flex-wrap items-center gap-3">
    {QUICKIT_BUTTON_SHAPES.map((shape) => (
      <Link
        key={shape}
        href="#"
        appearance="button"
        shape={shape}
        color="neutral"
        aria-label={shape === "square" || shape === "circle" ? "Abrir atajo" : undefined}
        title={shape === "square" || shape === "circle" ? "Abrir atajo" : undefined}
      >
        {shape === "square" || shape === "circle" ? "+" : shape}
      </Link>
    ))}
  </div>
</div>`}
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  {QUICKIT_CONTROL_SIZES.map((size) => (
                    <Button key={size} size={size} color="neutral">
                      {size}
                    </Button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {QUICKIT_BUTTON_SHAPES.map((shape) => (
                    <Link
                      key={shape}
                      href="#"
                      appearance="button"
                      shape={shape}
                      color="neutral"
                      aria-label={shape === "square" || shape === "circle" ? "Abrir atajo" : undefined}
                      title={shape === "square" || shape === "circle" ? "Abrir atajo" : undefined}
                    >
                      {shape === "square" || shape === "circle" ? "+" : shape}
                    </Link>
                  ))}
                </div>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Tokens exportados"
              className="space-y-3"
              code={`<div className="flex flex-wrap items-center gap-2">
  {QUICKIT_SEMANTIC_COLORS.map((color) => (
    <Badge key={color} color={color === "light" || color === "dark" ? "neutral" : color}>
      {color}
    </Badge>
  ))}
</div>`}
            >
              <div className="flex flex-wrap items-center gap-2">
                {QUICKIT_SEMANTIC_COLORS.map((color) => (
                  <Badge
                    key={color}
                    color={color === "light" || color === "dark" ? "neutral" : color}
                  >
                    {color}
                  </Badge>
                ))}
              </div>
            </PreviewPanel>

            <CodeExample
              ui={ui}
              title="Criterio recomendado"
              code={`// Usa estados semanticos antes que clases sueltas.
<Button loading={isSaving} disabled={isLocked}>
  Guardar
</Button>`}
            />

            <CodeExample
              ui={ui}
              title="Consumir tokens publicos"
              code={`import {
  QUICKIT_BUTTON_SHAPES,
  QUICKIT_CONTROL_SIZES,
  QUICKIT_SEMANTIC_COLORS,
} from "quickit-ui";

// Sirven para documentacion, wrappers o validacion propia
const safeColor = QUICKIT_SEMANTIC_COLORS.includes(color)
  ? color
  : "neutral";`}
            />
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>Notas</p>
            <NotesList items={foundationNotes.states} ui={ui} />
          </div>
        </SectionCard>
      ) : null}
    </>
  );
}

export default FoundationsDocs;
