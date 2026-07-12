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
            <header className="flex flex-col gap-3">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
                Ejemplos de producto reales
              </h1>
              <p className="max-w-3xl text-base leading-7 text-neutral-500 dark:text-neutral-400">
                Layouts y organismos funcionales para inspirar implementación real:
                onboarding, dashboards, settings, checkout y command center.
              </p>
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
