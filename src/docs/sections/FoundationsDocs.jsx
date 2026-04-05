import { Badge, Button, QuickitProvider, useQuickitTheme } from "@/lib";
import {
  CodeExample,
  NotesList,
  PreviewPanel,
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
  colors: [
    "La API actual sigue siendo semántica: `neutral`, `primary`, `success`, `danger`, `warning`, `info`, `light` y `dark`.",
    "Si quieres cambiar cómo se ve uno de esos colores en toda la librería, sobrescribe las variables CSS correspondientes después de cargar `quickit-ui/styles.css`.",
    "Si quieres reutilizar un color de marca con la API existente, remapea uno de los slots semánticos a tu paleta.",
    "Si necesitas un color nuevo solo en un caso puntual, usa `className` para sobreescribir ese componente.",
    "Si quieres un nuevo valor de `color` reutilizable en toda la librería, eso ya requiere ampliar la API del componente.",
  ],
  states: [
    "disabled bloquea interaccion y comunica el estado con feedback visual consistente.",
    "Props como loading, invalid, pressed o active solo aparecen donde tienen sentido semantico.",
    "La documentacion muestra los estados cerca del caso real para evitar props sin contexto.",
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

      {isVisible(visibleIds, "colors") ? (
        <SectionCard id="colors" className={ui.divider}>
          <SectionHeading
            category="Fundamentos"
            title="Colores"
            description="La librería ya expone colores semánticos. Lo normal no es inventar nuevos nombres desde CSS, sino decidir cómo quieres que se vea cada slot y remapear su paleta."
            ui={ui}
          />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="1. Qué colores soporta hoy la API"
              code={`<div className="flex flex-wrap items-center gap-3">
  <Button color="neutral">Neutral</Button>
  <Button color="primary">Primary</Button>
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
              title="2. Cambiar un color existente en toda la librería"
              language="css"
              code={`/* app.css */
@import "quickit-ui/styles.css";

:root {
  /* color="neutral" en light */
  --color-neutral-700: oklch(46% 0 0);
  --color-neutral-800: oklch(39% 0 0);
  --color-neutral-300: oklch(88% 0 0);
  --color-neutral-100: oklch(96% 0 0);

  /* color="primary" en light */
  --color-blue-700: oklch(58% 0.18 275);
  --color-blue-800: oklch(51% 0.17 275);
  --color-blue-300: oklch(82% 0.08 275);
  --color-blue-100: oklch(95% 0.02 275);
}

.dark {
  /* color="neutral" en dark */
  --color-neutral-200: oklch(90% 0 0);
  --color-neutral-900: oklch(21% 0 0);

  /* color="primary" en dark */
  --color-blue-400: oklch(72% 0.15 275);
  --color-blue-300: oklch(79% 0.12 275);
}`}
            />

            <CodeExample
              ui={ui}
              title="3. Reutilizar un slot semántico como color de marca"
              language="css"
              code={`/* Si quieres que color="info" use tu color de marca */
:root {
  --color-sky-600: oklch(62% 0.19 330);
  --color-sky-700: oklch(55% 0.18 330);
  --color-sky-300: oklch(83% 0.09 330);
  --color-sky-100: oklch(95% 0.03 330);
}`}
            />

            <CodeExample
              ui={ui}
              title="4. Usar un color nuevo solo en un componente"
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
              code={`// Quieres cambiar toda la familia neutral:
// sobrescribe variables --color-neutral-*

// Quieres que "info" sea tu color de marca:
// remapea variables --color-sky-*

// Quieres un botón especial solo en un lugar:
// usa className

// Quieres soportar color="brand" en toda la librería:
// eso requiere ampliar la API de los componentes`}
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

            <CodeExample
              ui={ui}
              title="Criterio recomendado"
              code={`// Usa estados semanticos antes que clases sueltas.
<Button loading={isSaving} disabled={isLocked}>
  Guardar
</Button>`}
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
