import { Container, Link } from "@/lib";
import { WEBSITE_ROUTES } from "@/website/site-config";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden">
      {/* Esfera decorativa azul */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full opacity-[0.08] blur-3xl dark:opacity-[0.1]"
        style={{
          background:
            "radial-gradient(circle, rgb(59 130 246 / 0.5), transparent 60%)",
        }}
      />

      {/* Esfera decorativa purpura */}
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-[24rem] w-[24rem] rounded-full opacity-[0.06] blur-3xl dark:opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle, rgb(168 85 247 / 0.4), transparent 60%)",
        }}
      />

      <Container size="full" className="relative flex items-center justify-center">
        <section className="mx-auto max-w-md text-center">
          <div className="flex flex-col items-center gap-5">
            {/* 404 decorativo con gradiente */}
            <p
              className="text-[6rem] font-black leading-none sm:text-[8rem]"
              style={{
                background:
                  "linear-gradient(135deg, rgb(163 163 163), rgb(115 115 115), rgb(163 163 163))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </p>

            <h1 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
              Página no encontrada
            </h1>

            <p className="max-w-sm text-sm leading-6 text-neutral-500 dark:text-neutral-400">
              La ruta que buscas no existe o fue movida. Revisa la URL o vuelve al inicio.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href={WEBSITE_ROUTES.docs}
                appearance="button"
                color="neutral"
                size="md"
              >
                Ir a documentación
              </Link>
              <Link
                href={WEBSITE_ROUTES.landing}
                appearance="button"
                color="neutral"
                variant="outline"
                size="md"
                activeMotion={false}
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
