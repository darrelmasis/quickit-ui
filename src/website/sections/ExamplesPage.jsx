import FlowErrorBoundary from "@/website/examples/components/FlowErrorBoundary";
import FlowSection from "@/website/examples/components/FlowSection";
import { EXAMPLE_FLOWS } from "@/website/examples/flows";

const WEBSITE_SHELL = "mx-auto w-full max-w-7xl px-6 lg:px-8";

function ExamplesSidebar() {
  return (
    <aside className="hidden self-start lg:sticky lg:top-24 lg:block">
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Flujos reales
        </p>
        <div className="mt-3 space-y-1">
          {EXAMPLE_FLOWS.map((flow) => (
            <a
              key={flow.id}
              href={`#${flow.id}`}
              className="block rounded-lg px-2 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
            >
              {flow.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default function ExamplesPage() {
  return (
    <main className={`${WEBSITE_SHELL} pb-20 pt-10 sm:pt-14`}>
      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <ExamplesSidebar />

        <div className="space-y-8">
          <header className="space-y-3">
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Documentacion
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">
              Ejemplos de producto reales
            </h1>
            <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
              Layouts y organismos funcionales para inspirar implementación real:
              onboarding, dashboards, settings, checkout y command center.
            </p>
          </header>

          {EXAMPLE_FLOWS.map((flow) => {
            const FlowComponent = flow.Component;
            return (
              <FlowSection
                key={flow.id}
                id={flow.id}
                title={flow.title}
                description={flow.description}
              >
                <FlowErrorBoundary flowId={flow.id}>
                  <FlowComponent />
                </FlowErrorBoundary>
              </FlowSection>
            );
          })}
        </div>
      </div>
    </main>
  );
}
