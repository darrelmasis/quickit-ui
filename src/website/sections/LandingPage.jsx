import { Link } from "@/lib";
import { WEBSITE_ROUTES, WEBSITE_SHELL } from "@/website/site-config";

export default function LandingPage() {
  return (
    <main
      className={`min-h-[calc(100vh-4rem)] pb-16 pt-12 sm:pb-24 sm:pt-20 ${WEBSITE_SHELL}`}
    >
      <section className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl xl:text-6xl dark:text-neutral-50">
          Componentes para construir producto más rápido
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-600 sm:text-lg dark:text-neutral-400">
          Quickit UI reúne acciones, formularios, overlays, navegación, hooks y
          patrones listos para que tu equipo construya pantallas consistentes
          con una base simple.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={WEBSITE_ROUTES.docs}
            appearance="button"
            size="2xl"
            color="neutral"
          >
            Empezar
          </Link>
          <Link
            href={WEBSITE_ROUTES.examples}
            appearance="button"
            size="2xl"
            color="neutral"
            variant="ghost"
          >
            Ver ejemplos
          </Link>
        </div>
      </section>
    </main>
  );
}
