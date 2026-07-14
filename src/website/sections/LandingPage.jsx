import { Container, Link, Show } from "@/lib";
import { WEBSITE_ROUTES } from "@/website/site-config";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { Button } from "@/lib";
import { CheckStrokeIcon, CopyIcon } from "@/lib/assets/icons";

const INSTALL_SNIPPET = "npm install quickit-ui";

export default function LandingPage() {
  const { copy, copied } = useCopyToClipboard(2000);

  return (
    <main className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Fondo base con gradiente más contrastado */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50/80 to-white dark:from-neutral-950 dark:via-neutral-900/70 dark:to-neutral-950" />

      {/* Gradiente de malla decorativa — más visible */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgb(59 130 246 / 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgb(168 85 247 / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgb(34 211 238 / 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Patrón de puntos — visibles */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.2]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(163 163 163) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Esfera azul grande — arriba a la derecha */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-[36rem] w-[36rem] animate-[landing-float_8s_ease-in-out_infinite] rounded-full opacity-[0.12] blur-3xl dark:opacity-[0.15]"
        style={{
          background:
            "radial-gradient(circle, rgb(59 130 246 / 0.6), rgb(99 102 241 / 0.25), transparent 60%)",
        }}
      />

      {/* Esfera púrpura — abajo a la izquierda */}
      <div
        className="pointer-events-none absolute -bottom-40 -left-32 h-[30rem] w-[30rem] animate-[landing-float_10s_ease-in-out_infinite_reverse] rounded-full opacity-[0.1] blur-3xl dark:opacity-[0.13]"
        style={{
          background:
            "radial-gradient(circle, rgb(168 85 247 / 0.5), rgb(236 72 153 / 0.2), transparent 60%)",
        }}
      />

      {/* Esfera cyan — centro-derecha */}
      <div
        className="pointer-events-none absolute top-[15%] right-[10%] h-80 w-80 animate-[landing-float_12s_ease-in-out_infinite_1s] rounded-full opacity-[0.08] blur-2xl dark:opacity-[0.1]"
        style={{
          background:
            "radial-gradient(circle, rgb(34 211 238 / 0.45), transparent 60%)",
        }}
      />

      {/* Anillo decorativo detrás del contenido */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full opacity-[0.03] dark:opacity-[0.04]"
        style={{
          border: "1px solid rgb(163 163 163 / 0.3)",
          background: "radial-gradient(circle, rgb(255 255 255 / 0.02), transparent 70%)",
        }}
      />


      {/* Contenido principal */}
      <Container size="full" className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
        <section className="mx-auto max-w-3xl text-center">
          <div className="flex flex-col items-center gap-6">
            {/* Insignia */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/60 bg-blue-50/70 px-3.5 py-1 text-[0.7rem] font-medium tracking-wide text-blue-700 shadow-xs backdrop-blur-sm dark:border-blue-800/40 dark:bg-blue-950/40 dark:text-blue-300">
              <span className="size-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
              Tailwind CSS v4 — Componentes accesibles
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl xl:text-6xl dark:text-neutral-50">
              Construye interfaces{" "}
              <span className="text-neutral-500 dark:text-neutral-400">
                con Quickit UI
              </span>
            </h1>

            <p className="max-w-2xl text-pretty text-base leading-7 text-neutral-500 sm:text-lg dark:text-neutral-400">
              Componentes React accesibles y personalizables. Construidos con Tailwind CSS v4.
              Listos para producción.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href={WEBSITE_ROUTES.docs}
                appearance="button"
                color="neutral"
                size="md"
              >
                Documentación
              </Link>
              <Button
                color="neutral"
                variant="outline"
                size="md"
                activeMotion={false}
                onClick={() => copy(INSTALL_SNIPPET)}
              >
                <code className="font-mono text-sm">{INSTALL_SNIPPET}</code>
                <Show when={copied} fallback={<CopyIcon className="size-4 text-neutral-400" />}>
                  <CheckStrokeIcon className="size-4 text-green-500" />
                </Show>
              </Button>
            </div>

            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              React 18+ &middot; Tailwind CSS v4 &middot; Open Source
            </p>
          </div>
        </section>
      </Container>

      {/* Keyframes para animaciones flotantes */}
      <style>{`
        @keyframes landing-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(2%, -2%) rotate(1deg); }
          66% { transform: translate(-1%, 1%) rotate(-0.5deg); }
        }
      `}</style>
    </main>
  );
}
