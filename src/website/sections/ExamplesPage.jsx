import { Container, For, Link } from "@/lib";
import FlowErrorBoundary from "@/website/examples/components/FlowErrorBoundary";
import FlowSection from "@/website/examples/components/FlowSection";
import { EXAMPLE_FLOWS } from "@/website/examples/flows";

function ExamplesSidebar() {
  return (
    <aside className="hidden self-start lg:sticky lg:top-20 lg:block">
      <div className="w-56 max-w-full">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Flujos reales
        </p>
        <div className="mt-3 flex flex-col">
          <For each={EXAMPLE_FLOWS}>
            {(flow) => (
              <Link
                key={flow.id}
                href={`#${flow.id}`}
                className="block py-1 text-[0.8125rem] text-neutral-500 transition-colors hover:text-neutral-900 no-underline dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {flow.label}
              </Link>
            )}
          </For>
        </div>
      </div>
    </aside>
  );
}

export default function ExamplesPage() {
  return (
    <main className="pb-16">
      <Container size="xl" className="min-h-0">
        <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <ExamplesSidebar />

          <div className="flex flex-col gap-8 pt-6 lg:pt-10">
            <header className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-neutral-200/60 bg-gradient-to-br from-white via-neutral-50/50 to-white p-8 dark:border-neutral-800/40 dark:from-neutral-950 dark:via-neutral-900/40 dark:to-neutral-950">
              {/* Esfera decorativa tenue */}
              <div
                className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-[0.06] blur-2xl dark:opacity-[0.08]"
                style={{
                  background:
                    "radial-gradient(circle, rgb(59 130 246 / 0.5), transparent 60%)",
                }}
              />

              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/50 bg-blue-50/60 px-3 py-0.5 text-[0.65rem] font-medium tracking-wide text-blue-600 dark:border-blue-800/40 dark:bg-blue-950/30 dark:text-blue-400">
                  <span className="size-1.5 rounded-full bg-blue-500" />
                  {EXAMPLE_FLOWS.length} flujos funcionales
                </span>
              </div>

              <div className="relative flex flex-col gap-3">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
                  Ejemplos de producto reales
                </h1>
                <p className="max-w-3xl text-base leading-7 text-neutral-500 dark:text-neutral-400">
                  Layouts y organismos funcionales para inspirar implementación real:
                  onboarding, dashboards, settings, checkout y command center.
                </p>
              </div>
            </header>

            <For each={EXAMPLE_FLOWS}>
              {(flow) => {
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
              }}
            </For>
          </div>
        </div>
      </Container>
    </main>
  );
}
