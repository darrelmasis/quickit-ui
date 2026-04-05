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
  tokens: [
    "Los componentes repiten contratos visuales consistentes: color, variant, size, shape y estados.",
    "No todos los componentes exponen exactamente las mismas props, pero el vocabulario visual se mantiene estable.",
    "Antes de crear estilos ad hoc, conviene verificar si la necesidad ya entra en los tokens existentes.",
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
                <Badge color="dark" variant="solid">dark</Badge>
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

      {isVisible(visibleIds, "tokens") ? (
        <SectionCard id="tokens" className={ui.divider}>
          <SectionHeading
            category="Fundamentos"
            title="Tokens y contratos"
            description="La libreria no expone un archivo publico de tokens de diseno todavia, pero si mantiene contratos de props y estados que actuan como base del sistema."
            ui={ui}
          />

          <div className="mt-6 space-y-4">
            <PreviewPanel
              ui={ui}
              title="Color semantico"
              code={`<div className="flex flex-wrap items-center gap-3">
  <Button variant="outline" color="neutral">Neutral</Button>
  <Button variant="outline" color="success">Success</Button>
  <Button variant="outline" color="danger">Danger</Button>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" color="neutral">Neutral</Button>
                <Button variant="outline" color="success">Success</Button>
                <Button variant="outline" color="danger">Danger</Button>
              </div>
            </PreviewPanel>

            <PreviewPanel
              ui={ui}
              title="Densidad y tamanos"
              code={`<div className="flex flex-wrap items-center gap-3">
  <Button size="sm" color="neutral">Small</Button>
  <Button size="md" color="neutral">Medium</Button>
  <Button size="lg" color="neutral">Large</Button>
  <Badge size="sm" color="neutral">sm</Badge>
  <Badge size="md" color="neutral">md</Badge>
</div>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" color="neutral">Small</Button>
                <Button size="md" color="neutral">Medium</Button>
                <Button size="lg" color="neutral">Large</Button>
                <Badge size="sm" color="neutral">sm</Badge>
                <Badge size="md" color="neutral">md</Badge>
              </div>
            </PreviewPanel>
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>Notas</p>
            <NotesList items={foundationNotes.tokens} ui={ui} />
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
