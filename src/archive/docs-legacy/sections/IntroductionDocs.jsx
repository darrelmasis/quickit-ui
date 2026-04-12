import {
  Badge,
  Button,
  Input,
  Link,
  QuickitThemeProvider,
} from "@/lib";
import { cn } from "@/lib/utils";
import { COMPONENT_GROUPS } from "@/docs/config";
import {
  CodeExample,
  NotesList,
  PreviewPanel,
  SectionCard,
  SectionHeading,
} from "@/docs/components/DocsPrimitives";

const isVisible = (visibleIds, id) => !visibleIds || visibleIds.has(id);

const gettingStartedNotes = [
  "Instala el paquete e importa `quickit-ui/styles.css` una sola vez.",
  "Si quieres persistencia y modo `system`, usa `QuickitThemeProvider`. Si tu app ya controla el tema, usa `QuickitProvider`.",
  "Empieza por una pantalla real: acceso, búsqueda, filtros o formularios. La librería está pensada para crecer desde esos casos.",
];

const installationNotes = [
  "Quickit ya incluye sus estilos base. No hace falta preparar una capa visual antes de usar el primer componente.",
  "El orden recomendado con Tailwind 4 es: primero `quickit-ui/styles.css`, luego `tailwindcss` y después el `@custom-variant dark`.",
  "El camino más simple para una app nueva es `QuickitThemeProvider` con `defaultTheme=\"system\"`.",
];

const compatibilityNotes = [
  "Quickit encaja mejor en proyectos React modernos con módulos ES y Tailwind CSS 4.",
  "Puedes adoptarlo por flujo o por pantalla. No hace falta migrar toda tu interfaz a la vez.",
  "La documentación está pensada para copiar patrones completos, no solo props aisladas.",
];

export function IntroductionDocs({ ui, visibleIds }) {
  return (
    <div className="space-y-10">
      {isVisible(visibleIds, "landing") ? (
        <SectionCard id="landing" className="">
          <div
            className={cn(
              "overflow-hidden rounded-[2.25rem] border px-5 py-10 sm:px-8 sm:py-12 xl:px-10 xl:py-14",
              ui.panel,
            )}
          >
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <Badge color="brand" variant="soft">
                Quickit UI
              </Badge>

              <h1
                className={cn(
                  "mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl xl:text-[4.5rem]",
                  ui.title,
                )}
              >
                La base para construir interfaces consistentes con velocidad real
              </h1>

              <p className={cn("mt-6 max-w-3xl text-base leading-8 sm:text-lg", ui.body)}>
                Componentes, patrones, tema, hooks y ejemplos completos para que
                empieces por una pantalla útil y no por una hoja en blanco. Quickit
                está pensado para crecer desde producto real, no desde demos
                aisladas.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/docs/getting-started" appearance="button" color="brand">
                  Empezar ahora
                </Link>
                <Link
                  href="/docs/components"
                  appearance="button"
                  color="neutral"
                  variant="outline"
                >
                  Ver componentes
                </Link>
                <Link
                  href="/docs/examples"
                  appearance="button"
                  color="neutral"
                  variant="ghost"
                >
                  Abrir ejemplos
                </Link>
              </div>

              <div className="mt-12 grid w-full gap-3 sm:grid-cols-3">
                {[
                  ["Instalación clara", "Providers, estilos y tema listos desde el arranque."],
                  ["Sistema unificado", "Tamaños, colores, states y comportamiento alineados."],
                  ["Ejemplos reales", "Acceso, formularios, overlays y pantallas completas."],
                ].map(([title, description]) => (
                  <div
                    key={title}
                    className={cn("rounded-[1.4rem] border px-4 py-4 text-left", ui.preview)}
                  >
                    <p className={cn("text-sm font-semibold", ui.title)}>{title}</p>
                    <p className={cn("mt-2 text-sm leading-6", ui.body)}>{description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 grid gap-4 xl:grid-cols-[1fr_0.95fr_1.05fr]">
              <div className={cn("rounded-[1.8rem] border p-5", ui.introCard)}>
                <div className="space-y-2">
                  <p className={cn("text-lg font-semibold", ui.title)}>Acceso</p>
                  <p className={cn("text-sm leading-6", ui.body)}>
                    Construye un flujo base con tema, formularios y acción principal.
                  </p>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="space-y-2">
                    <label className={cn("text-sm font-medium", ui.title)}>Correo</label>
                    <Input type="email" placeholder="equipo@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <label className={cn("text-sm font-medium", ui.title)}>Contraseña</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button color="brand" fullWidth>
                    Continuar
                  </Button>
                </div>
              </div>

              <div className={cn("rounded-[1.8rem] border p-5", ui.introCard)}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className={cn("text-lg font-semibold", ui.title)}>Ruta recomendada</p>
                    <p className={cn("mt-2 text-sm leading-6", ui.body)}>
                      Empieza por setup, sigue por componentes y luego baja a ejemplos.
                    </p>
                  </div>
                  <Badge color="neutral" variant="outline">
                    Docs
                  </Badge>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    ["/docs/getting-started", "Primeros pasos"],
                    ["/docs/components", "Componentes"],
                    ["/docs/examples", "Ejemplos"],
                  ].map(([href, label]) => (
                    <Link
                      key={href}
                      href={href}
                      appearance="button"
                      color="neutral"
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className={cn("rounded-[1.8rem] border p-5", ui.introCard)}>
                <div className="space-y-2">
                  <p className={cn("text-lg font-semibold", ui.title)}>Sistema</p>
                  <p className={cn("text-sm leading-6", ui.body)}>
                    Una capa única para color, interacción, tema y composición.
                  </p>
                </div>

                <div className="mt-5 space-y-4">
                  <div className={cn("rounded-[1.25rem] border px-4 py-3", ui.preview)}>
                    <p className={cn("text-sm font-semibold", ui.title)}>Tema</p>
                    <p className={cn("mt-1 text-sm", ui.body)}>
                      `light`, `dark` y `system` desde un solo punto.
                    </p>
                  </div>
                  <div className={cn("rounded-[1.25rem] border px-4 py-3", ui.preview)}>
                    <p className={cn("text-sm font-semibold", ui.title)}>Componentes</p>
                    <p className={cn("mt-1 text-sm", ui.body)}>
                      Formularios, overlays, navegación, identidad y lógica.
                    </p>
                  </div>
                  <div className={cn("rounded-[1.25rem] border px-4 py-3", ui.preview)}>
                    <p className={cn("text-sm font-semibold", ui.title)}>Ejemplos</p>
                    <p className={cn("mt-1 text-sm", ui.body)}>
                      Previews responsivos con código alineado a lo visible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "getting-started") ? (
        <SectionCard id="getting-started" className={ui.divider}>
          <SectionHeading
            category="Primeros pasos"
            title="Empieza por una pantalla útil, no por la infraestructura"
            description="Quickit UI está pensado para que montes una interfaz consistente desde el primer día: acciones, formularios, overlays, navegación y tema compartido con un flujo claro de adopción."
            ui={ui}
            actions={
              <>
                <Link href="/docs/examples" appearance="button" color="brand">
                  Ver ejemplos reales
                </Link>
                <Link
                  href="/docs/installation"
                  appearance="button"
                  color="neutral"
                  variant="outline"
                >
                  Instalar Quickit
                </Link>
              </>
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              [
                "Instala y arranca",
                "Importa estilos, conecta el provider y ya puedes usar acciones, campos y overlays sin montar un sistema visual previo.",
              ],
              [
                "Tema resuelto",
                "Quickit puede seguir el tema de tu app o gestionar `light`, `dark` y `system` con persistencia desde un solo punto.",
              ],
              [
                "Patrones listos",
                "La docs prioriza casos completos como acceso, filtros, paneles y formularios, no solo listas de props.",
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className={cn(
                  "rounded-[1.5rem] border p-5",
                  ui.panel,
                )}
              >
                <p className={cn("text-sm font-semibold", ui.title)}>{title}</p>
                <p className={cn("mt-3 text-sm leading-6", ui.body)}>
                  {description}
                </p>
              </div>
            ))}
          </div>

          <PreviewPanel
            ui={ui}
            title="Así se ve un arranque rápido"
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
              storageKey="quickit-docs-intro-preview-theme"
            >
              <div
                className={cn(
                  "mx-auto max-w-md rounded-[1.75rem] border p-5 sm:p-6",
                  ui.panel,
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className={cn("text-lg font-semibold", ui.title)}>
                      Acceso rápido
                    </p>
                    <p className={cn("mt-2 text-sm leading-6", ui.body)}>
                      Un flujo básico con tema, campos y acción principal.
                    </p>
                  </div>
                  <Badge color="brand" variant="soft">
                    Quickit
                  </Badge>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <label className={cn("text-sm font-medium", ui.title)}>
                      Correo
                    </label>
                    <Input type="email" placeholder="equipo@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <label className={cn("text-sm font-medium", ui.title)}>
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

          <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <div>
              <h2 className={cn("text-lg font-semibold", ui.title)}>
                Ruta recomendada
              </h2>
              <NotesList items={gettingStartedNotes} ui={ui} />
            </div>

            <div className={cn("rounded-[1.5rem] border p-5", ui.panel)}>
              <p className={cn("text-sm font-semibold", ui.title)}>
                Siguiente paso sugerido
              </p>
              <p className={cn("mt-3 text-sm leading-6", ui.body)}>
                Si ya quieres ver Quickit en contexto, salta a la biblioteca de
                ejemplos. Si prefieres entender primero el setup, sigue con la
                instalación y el sistema de tema.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/docs/examples" appearance="button" color="brand">
                  Ir a ejemplos
                </Link>
                <Link
                  href="/docs/foundations/theme"
                  appearance="button"
                  color="neutral"
                  variant="outline"
                >
                  Ver tema
                </Link>
              </div>
            </div>
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "components-home") ? (
        <SectionCard id="components" className={ui.divider}>
          <SectionHeading
            category="Componentes"
            title="Directorio de componentes y utilidades"
            description="Quickit agrupa la librería por función real: fundamentos, acciones, formularios, overlays, navegación, feedback, lógica e identidad."
            ui={ui}
            actions={
              <>
                <Link href="/docs/components/button" appearance="button" color="brand">
                  Ver Button
                </Link>
                <Link
                  href="/docs/examples"
                  appearance="button"
                  color="neutral"
                  variant="outline"
                >
                  Ver ejemplos
                </Link>
              </>
            }
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {COMPONENT_GROUPS.map((group) => (
              <div key={group.label} className={cn("rounded-[1.5rem] border p-5", ui.panel)}>
                <p className={cn("text-sm font-semibold", ui.title)}>{group.label}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.slice(0, 5).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      appearance="button"
                      color="neutral"
                      variant="outline"
                      size="sm"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "instalacion") ? (
        <SectionCard id="instalacion" className={ui.divider}>
          <SectionHeading
            category="Instalación"
            title="Instala Quickit y elige quién controla el tema"
            description="Ese es el flujo real de arranque. Instalas el paquete, importas estilos y decides si Quickit solo consume el tema o también lo persiste por ti."
            ui={ui}
          />

          <div className="space-y-5">
            <CodeExample
              ui={ui}
              title="1. Instala el paquete"
              language="bash"
              code={`npm install quickit-ui react react-dom`}
            />

            <CodeExample
              ui={ui}
              title="2. Importa estilos en tu app"
              language="css"
              code={`@import "quickit-ui/styles.css";
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));`}
            />

            <div className="grid gap-5 xl:grid-cols-2">
              <CodeExample
                ui={ui}
                title="3. Si tu app ya controla el tema"
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
                title="4. Si quieres persistencia y modo system"
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
          </div>

          <div className="mt-8">
            <h2 className={cn("text-lg font-semibold", ui.title)}>
              Qué debes recordar
            </h2>
            <NotesList items={installationNotes} ui={ui} />
          </div>
        </SectionCard>
      ) : null}

      {isVisible(visibleIds, "compatibilidad") ? (
        <SectionCard id="compatibilidad" className={ui.divider}>
          <SectionHeading
            category="Compatibilidad"
            title="Quickit funciona mejor en proyectos React actuales"
            description="No necesitas reescribir tu app completa para adoptarlo, pero sí conviene tener claro el terreno ideal para que la experiencia sea fluida y consistente."
            ui={ui}
          />

          <div className="grid gap-3">
            {[
              ["React", "19+"],
              ["React DOM", "19+"],
              ["Tailwind CSS", "4+"],
              ["Módulos", "ESM"],
              ["Overlays", "@floating-ui/react"],
            ].map(([label, value]) => (
              <div
                key={label}
                className={cn(
                  "flex items-center justify-between rounded-[1rem] border px-4 py-3",
                  ui.panel,
                )}
              >
                <p className={cn("text-sm font-medium", ui.title)}>{label}</p>
                <Badge color="neutral" variant="outline">
                  {value}
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {[
              [
                "Encaja bien si…",
                "Quieres una base consistente para formularios, overlays, acciones y ejemplos reales sin levantar un design system desde cero.",
              ],
              [
                "Te va a rendir más si…",
                "Tu equipo ya trabaja con React moderno, composición de componentes y una capa de tema compartida entre UI y layout propio.",
              ],
              [
                "Debes revisar antes si…",
                "Tu app tiene un sistema de tema propio o usa `dark:` fuera de Quickit. En ese caso necesitas alinear el provider y el custom variant.",
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className={cn("rounded-[1.5rem] border p-5", ui.panel)}
              >
                <p className={cn("text-sm font-semibold", ui.title)}>{title}</p>
                <p className={cn("mt-3 text-sm leading-6", ui.body)}>
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className={cn("text-lg font-semibold", ui.title)}>
              Compatibilidad práctica
            </h2>
            <NotesList items={compatibilityNotes} ui={ui} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/docs/examples" appearance="button" color="brand">
              Abrir ejemplos
            </Link>
            <Link
              href="/docs/foundations/provider"
              appearance="button"
              color="neutral"
              variant="outline"
            >
              Revisar providers
            </Link>
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}

export default IntroductionDocs;
