import {
  Badge,
  Button,
  Input,
  Link,
  QuickitProvider,
  QuickitThemeProvider,
} from "@/lib";
import {
  CodeExample,
  NotesList,
  PreviewPanel,
  SectionCard,
  SectionHeading,
} from "@/docs/components/DocsPrimitives";

const isVisible = (visibleIds, id) => !visibleIds || visibleIds.has(id);

const quickStartNotes = [
  "Empieza por instalar el paquete e importar `quickit-ui/styles.css` una sola vez.",
  "Si ya gestionas el tema en tu app, usa `QuickitProvider`. Si quieres persistencia y modo `system`, usa `QuickitThemeProvider`.",
  "Después ve directo a los componentes que necesitas: formularios, acciones, overlays o navegación.",
];

const installNotes = [
  "Quickit está pensado para que puedas montar una pantalla útil en pocos minutos, no para obligarte a armar una infraestructura antes de usar un botón.",
  "El patrón recomendado es: importar estilos, envolver tu app con el provider y empezar por un caso real como login, búsqueda o toolbar.",
  "Si tu app también usa utilidades `dark:` fuera de Quickit, añade `@custom-variant dark (&:where(.dark, .dark *));` para que todo responda al mismo switch.",
];

const compatibilityNotes = [
  "Quickit funciona mejor en proyectos React actuales con Tailwind CSS 4 y módulos ES.",
  "No necesitas migrar toda tu UI para adoptarlo; puedes introducir Quickit por pantalla, flujo o componente.",
  "Los ejemplos de esta documentación están pensados para que copies patrones completos, no solo props sueltas.",
];

export function IntroductionDocs({ ui, visibleIds }) {
  return (
    <div className="space-y-8">
      {isVisible(visibleIds, "getting-started") ? (
        <SectionCard id="getting-started" className={ui.divider}>
          <SectionHeading
            category="Primeros pasos"
            title="Empieza por una pantalla, no por la teoría"
            description="Quickit UI está pensado para que puedas montar una interfaz consistente desde el primer día: formularios, acciones, navegación, overlays y tema compartido sin tener que diseñar cada pieza desde cero."
            ui={ui}
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              [
                "Arranque rápido",
                "Instala el paquete, importa estilos y envuelve tu app con el provider. Con eso ya puedes empezar a usar los componentes.",
              ],
              [
                "Tema consistente",
                "Puedes conectar Quickit al tema de tu app o dejar que Quickit gestione `light`, `dark` y `system` por ti.",
              ],
              [
                "Casos reales",
                "La documentación prioriza patrones listos para usar: login, formularios, paneles, filtros, estados y composición.",
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className={`rounded-[1.25rem] border p-5 ${ui.introCard}`}
              >
                <p className={`text-sm font-semibold ${ui.title}`}>{title}</p>
                <p className={`mt-3 text-sm leading-6 ${ui.body}`}>
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/ejemplos" appearance="button" color="brand">
              Ver ejemplos reales
            </Link>
            <Link
              href="/compatibilidad"
              appearance="button"
              color="neutral"
              variant="outline"
            >
              Revisar compatibilidad
            </Link>
          </div>

          <PreviewPanel
            ui={ui}
            title="Qué se ve como “empezar rápido”"
            className="mt-6"
            code={`import "quickit-ui/styles.css";
import {
  Button,
  FormControl,
  Input,
  Label,
  QuickitThemeProvider,
} from "quickit-ui";

export function App() {
  return (
    <QuickitThemeProvider defaultTheme="system">
      <div className="mx-auto max-w-md space-y-4 p-6">
        <FormControl>
          <Label>Correo</Label>
          <Input type="email" placeholder="equipo@empresa.com" />
        </FormControl>

        <FormControl>
          <Label>Contraseña</Label>
          <Input type="password" placeholder="••••••••" />
        </FormControl>

        <Button color="brand" fullWidth>
          Entrar
        </Button>
      </div>
    </QuickitThemeProvider>
  );
}`}
          >
            <QuickitThemeProvider
              defaultTheme="system"
              storageKey="docs-intro-preview-theme"
            >
              <div
                className={`mx-auto max-w-md rounded-[1.5rem] border p-5 sm:p-6 ${ui.introCard}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className={`text-lg font-semibold ${ui.title}`}>
                      Acceso rápido
                    </p>
                    <p className={`mt-2 text-sm leading-6 ${ui.body}`}>
                      Un flujo básico con tema, campos y acción principal.
                    </p>
                  </div>
                  <Badge color="brand" variant="soft">
                    Quickit
                  </Badge>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${ui.title}`}>
                      Correo
                    </label>
                    <Input type="email" placeholder="equipo@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${ui.title}`}>
                      Contraseña
                    </label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button color="brand" fullWidth>
                    Entrar
                  </Button>
                </div>
              </div>
            </QuickitThemeProvider>
          </PreviewPanel>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>
              Ruta recomendada
            </p>
            <NotesList items={quickStartNotes} ui={ui} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/ejemplos" appearance="button" color="brand">
              Ver ejemplos reales
            </Link>
            <Link
              href="/formularios/input"
              appearance="button"
              color="neutral"
              variant="outline"
            >
              Empezar por formularios
            </Link>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "instalacion") ? (
        <SectionCard id="instalacion" className={ui.divider}>
          <SectionHeading
            category="Instalación"
            title="Instala, importa estilos y elige cómo manejar el tema"
            description="Ese es el flujo real. No necesitas aprender toda la librería para usarla: instala el paquete, conecta el provider y empieza por la pantalla que estás construyendo."
            ui={ui}
          />

          <CodeExample
            ui={ui}
            title="1. Instalar el paquete"
            language="bash"
            code={`npm install quickit-ui react react-dom`}
          />

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <CodeExample
              ui={ui}
              title="2. Si tu app ya controla el tema"
              code={`import "quickit-ui/styles.css";
import { Button, QuickitProvider } from "quickit-ui";

export function App() {
  return (
    <QuickitProvider theme="dark">
      <Button color="brand">Guardar</Button>
    </QuickitProvider>
  );
}`}
            />

            <CodeExample
              ui={ui}
              title="3. Si quieres persistencia y modo system"
              code={`import "quickit-ui/styles.css";
import { Button, QuickitThemeProvider } from "quickit-ui";

export function App() {
  return (
    <QuickitThemeProvider defaultTheme="system">
      <Button color="brand">Guardar</Button>
    </QuickitThemeProvider>
  );
}`}
            />
          </div>

          <div className="mt-4">
            <CodeExample
              ui={ui}
              title="4. Si también usas Tailwind dark mode en tu app"
              language="css"
              code={`@import "tailwindcss";
@import "quickit-ui/styles.css";

@custom-variant dark (&:where(.dark, .dark *));`}
            />
          </div>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>
              Qué necesitas recordar
            </p>
            <NotesList items={installNotes} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "compatibilidad") ? (
        <SectionCard id="compatibilidad" className={ui.divider}>
          <SectionHeading
            category="Compatibilidad"
            title="Qué necesitas para usar Quickit con comodidad"
            description="Quickit se integra mejor en proyectos React actuales, pero no exige que reescribas toda tu app. Puedes adoptarlo por flujo, por pantalla o por componente."
            ui={ui}
          />

          <div className="mt-6 grid gap-3">
            {[
              ["React", "19+"],
              ["React DOM", "19+"],
              ["Tailwind CSS", "4+"],
              ["Módulos", "ESM"],
              ["Overlays", "@floating-ui/react"],
            ].map(([label, value]) => (
              <div
                key={label}
                className={`flex items-center justify-between rounded-[1rem] border px-4 py-3 ${ui.introCard}`}
              >
                <p className={`text-sm font-medium ${ui.title}`}>{label}</p>
                <Badge color="neutral" variant="outline">
                  {value}
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              [
                "Encaja bien si...",
                "Quieres una base coherente para formularios, acciones, overlays y ejemplos reales sin montar tu design system completo desde cero.",
              ],
              [
                "Te va a rendir más si...",
                "Tu equipo ya trabaja con React moderno y quiere una capa visual consistente, documentada y fácil de extender por composición.",
              ],
              [
                "Debes revisar esto antes si...",
                "Tu app usa un sistema de tema propio o clases `dark:` fuera de Quickit. En ese caso, conecta `QuickitThemeProvider` y declara el custom variant de Tailwind.",
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className={`rounded-[1.25rem] border p-5 ${ui.introCard}`}
              >
                <p className={`text-sm font-semibold ${ui.title}`}>{title}</p>
                <p className={`mt-3 text-sm leading-6 ${ui.body}`}>
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/ejemplos" appearance="button" color="brand">
              Abrir biblioteca de ejemplos
            </Link>
            <Link
              href="/fundamentos/theme"
              appearance="button"
              color="neutral"
              variant="outline"
            >
              Ver tema y modo system
            </Link>
          </div>

          <PreviewPanel
            ui={ui}
            title="Comparación simple entre claro y oscuro"
            className="mt-6"
            code={`<QuickitProvider theme="light">
  <Button color="neutral">Claro</Button>
</QuickitProvider>

<QuickitProvider theme="dark">
  <Button color="neutral">Oscuro</Button>
</QuickitProvider>`}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <QuickitProvider theme="light">
                  <Button color="neutral">Claro</Button>
                </QuickitProvider>
                <QuickitProvider theme="dark">
                  <Button color="neutral">Oscuro</Button>
                </QuickitProvider>
              </div>
              <p className={`text-sm leading-6 ${ui.body}`}>
                Puedes empezar con algo tan simple como esto y luego moverte a
                los ejemplos completos de login, filtros, paneles o formularios.
              </p>
            </div>
          </PreviewPanel>

          <div className="mt-8">
            <p className={`text-sm font-semibold ${ui.title}`}>
              Siguiente paso sugerido
            </p>
            <NotesList items={compatibilityNotes} ui={ui} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/ejemplos" appearance="button" color="brand">
              Ver ejemplos reales
            </Link>
            <Link
              href="/formularios/input"
              appearance="button"
              color="neutral"
              variant="outline"
            >
              Empezar por formularios
            </Link>
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}

export default IntroductionDocs;
