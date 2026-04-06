import {
  Badge,
  Button,
  Link,
  QUICKIT_BUTTON_SHAPES,
  QUICKIT_CONTROL_SIZES,
  QUICKIT_SEMANTIC_COLORS,
  QuickitProvider,
  useBreakpoint,
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

const foundationApis = {
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
};

const foundationNotes = {
  provider: [
    "QuickitProvider expone el tema actual mediante contexto, sin acoplar la app a una solucion externa.",
    "Si no envuelves la aplicacion, el tema por defecto es light.",
    "El proveedor es liviano: sirve para consistencia, no para manejar estado global de la app.",
  ],
  theme: [
    "La libreria trabaja con dos modos base: light y dark.",
    "Los componentes priorizan defaults neutros y dejan los colores semanticos como decision explicita del producto.",
    "useQuickitTheme te permite reaccionar al tema actual desde cualquier componente descendiente.",
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
  colors: [
    "La API actual sigue siendo semántica: `neutral`, `primary`, `brand`, `success`, `danger`, `warning`, `info`, `light` y `dark`.",
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
            description="Quickit UI parte de dos modos base y usa el mismo contexto para que botones, overlays y formularios respondan de forma consistente."
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
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>Notas</p>
            <NotesList items={foundationNotes.theme} ui={ui} />
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
  <Button color="primary">Primary</Button>
  <Button color="brand">Brand</Button>
  <Button color="success">Success</Button>
  <Button color="danger">Danger</Button>
  <Button color="warning">Warning</Button>
  <Button color="info">Info</Button>
  <Button color="light">Light</Button>
  <Button color="dark">Dark</Button>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button color="neutral">Neutral</Button>
                <Button color="primary">Primary</Button>
                <Button color="brand">Brand</Button>
                <Button color="success">Success</Button>
                <Button color="danger">Danger</Button>
                <Button color="warning">Warning</Button>
                <Button color="info">Info</Button>
                <Button color="light">Light</Button>
                <Button color="dark">Dark</Button>
              </div>
            </PreviewPanel>

            <CodeExample
              ui={ui}
              title="2. Qué familia usa cada color semántico"
              language="jsx"
              code={`// Mapeo actual de la librería
neutral -> neutral-*
primary -> blue-*
brand   -> brand-*
success -> emerald-*
danger  -> red-*
warning -> amber-*
info    -> sky-*

// Resultado práctico:
// si reemplazas blue-*, cambias color="primary"
// si reemplazas brand-*, cambias color="brand"
// si reemplazas neutral-*, cambias color="neutral"`}
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
  /* primary sigue consumiendo blue-* */
  --color-blue-300: oklch(0.86 0.19 126);
  --color-blue-400: oklch(0.8 0.2 126);
  --color-blue-500: oklch(0.74 0.2 126);
  --color-blue-600: oklch(0.68 0.19 126);
  --color-blue-700: oklch(0.62 0.18 126);
  --color-blue-800: oklch(0.55 0.16 126);
}`}
            />

            <CodeExample
              ui={ui}
              title="5. Reemplazar neutral con tu propia escala"
              language="css"
              code={`:root {
  --color-neutral-50: oklch(0.985 0.002 247);
  --color-neutral-100: oklch(0.97 0.004 247);
  --color-neutral-200: oklch(0.93 0.01 252);
  --color-neutral-300: oklch(0.87 0.018 253);
  --color-neutral-700: oklch(0.37 0.03 257);
  --color-neutral-800: oklch(0.28 0.028 260);
  --color-neutral-900: oklch(0.21 0.026 265);
}`}
            />

            <CodeExample
              ui={ui}
              title="6. Reutilizar otro slot semántico"
              language="css"
              code={`/* Si prefieres que tu marca viva en color="info" */
:root {
  --color-sky-600: oklch(62% 0.19 330);
  --color-sky-700: oklch(55% 0.18 330);
  --color-sky-300: oklch(83% 0.09 330);
  --color-sky-100: oklch(95% 0.03 330);
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
// reemplaza blue-* si ese es tu criterio de producto

// Quieres cambiar neutral en toda la librería:
// reemplaza neutral-*

// Quieres un slot semántico distinto para tu marca:
// remapea sky-*, emerald-*, etc.

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
        aria-label={shape === "square" ? "Abrir atajo" : undefined}
        title={shape === "square" ? "Abrir atajo" : undefined}
      >
        {shape === "square" ? "+" : shape}
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
                      aria-label={shape === "square" ? "Abrir atajo" : undefined}
                      title={shape === "square" ? "Abrir atajo" : undefined}
                    >
                      {shape === "square" ? "+" : shape}
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
