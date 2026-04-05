import { Badge, Button, Link, QuickitProvider } from "@/lib";
import {
  CodeExample,
  NotesList,
  PreviewPanel,
  SectionCard,
  SectionHeading,
} from "@/docs/components/DocsPrimitives";
import { docsConventions } from "@/docs/config";

const isVisible = (visibleIds, id) => !visibleIds || visibleIds.has(id);

export function IntroductionDocs({ ui, visibleIds }) {
  return (
    <div className="space-y-8">
      {isVisible(visibleIds, "getting-started") ? (
      <SectionCard id="getting-started" className={ui.divider}>
        <SectionHeading
          category="Getting started"
          title="Introducción"
          description="Quickit UI es una librería de componentes React enfocada en reuso, consistencia visual y una base escalable. El stack actual usa Vite, React, JavaScript, Tailwind CSS y Floating UI."
          ui={ui}
        />

        <div className="mt-6 grid gap-4">
          <div className={`rounded-[1.25rem] border p-4 ${ui.introCard}`}>
            <p className={`text-sm font-semibold ${ui.title}`}>Base</p>
            <p className={`mt-2 text-sm leading-6 ${ui.body}`}>
              React 19, Vite 8, Tailwind CSS 4 y una librería pensada para
              escalar por composición.
            </p>
          </div>
          <div className={`rounded-[1.25rem] border p-4 ${ui.introCard}`}>
            <p className={`text-sm font-semibold ${ui.title}`}>Tema</p>
            <p className={`mt-2 text-sm leading-6 ${ui.body}`}>
              Light y dark mode mediante <code>QuickitProvider</code>, con
              defaults neutros y colores semánticos opcionales.
            </p>
          </div>
          <div className={`rounded-[1.25rem] border p-4 ${ui.introCard}`}>
            <p className={`text-sm font-semibold ${ui.title}`}>Objetivo</p>
            <p className={`mt-2 text-sm leading-6 ${ui.body}`}>
              Documentar cada componente con ejemplos reales, variantes y API
              útil, sin convertir la docs en una landing decorativa.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className={`text-sm font-semibold ${ui.title}`}>
            Cómo leer esta documentación
          </p>
          <NotesList items={docsConventions} ui={ui} />
        </div>
      </SectionCard>
      ) : null}

      {isVisible(visibleIds, "instalacion") ? (
      <SectionCard id="instalacion" className={ui.divider}>
        <SectionHeading
          category="Instalación"
          title="Uso base"
          description="Cuando la librería se consuma como paquete, el flujo base de instalación y uso será este."
          ui={ui}
        />

        <CodeExample
          ui={ui}
          title="Instalación"
          language="bash"
          code={`npm install quickit-ui react react-dom`}
        />

        <div className="mt-4">
          <CodeExample
            ui={ui}
            title="Uso"
            code={`import { Button, QuickitProvider } from "quickit-ui";
import "quickit-ui/styles.css";

export function Example() {
  return (
    <QuickitProvider theme="dark">
      <Button color="neutral">Guardar</Button>
    </QuickitProvider>
  );
}`}
          />
        </div>
      </SectionCard>
      ) : null}

      {isVisible(visibleIds, "compatibilidad") ? (
      <SectionCard id="compatibilidad" className={ui.divider}>
        <SectionHeading
          category="Compatibilidad"
          title="Stack soportado actualmente"
          description="La librería está pensada para integrarse de forma simple en proyectos React actuales."
          ui={ui}
        />

        <div className="mt-6 grid gap-3">
          {[
            ["React", "19+"],
            ["React DOM", "19+"],
            ["Tailwind CSS", "4+"],
            ["Floating UI", "@floating-ui/react"],
            ["Runtime", "ES modules"],
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

        <PreviewPanel
          ui={ui}
          title="Integración mínima con tema"
          className="mt-6"
          code={`<QuickitProvider theme="light">
  <Button color="neutral">Claro</Button>
</QuickitProvider>

<QuickitProvider theme="dark">
  <Button color="neutral">Oscuro</Button>
</QuickitProvider>`}
        >
          <div className="space-y-3">
            <p className={`text-sm font-semibold ${ui.title}`}>
              Integración mínima con tema
            </p>
            <div className="flex flex-wrap gap-3">
              <QuickitProvider theme="light">
                <Button color="neutral">Claro</Button>
              </QuickitProvider>
              <QuickitProvider theme="dark">
                <Button color="neutral">Oscuro</Button>
              </QuickitProvider>
            </div>
            <p className={`text-sm leading-6 ${ui.body}`}>
              Si necesitas detalles de instalación dentro de una app real,
              puedes partir de esta base y luego revisar componentes específicos
              en la columna principal.
            </p>
            <Link href="#accordion" underline="hover">
              Ir al primer componente
            </Link>
          </div>
        </PreviewPanel>
      </SectionCard>
      ) : null}
    </div>
  );
}

export default IntroductionDocs;
