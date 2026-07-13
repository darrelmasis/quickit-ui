import { Container, Link } from "@/lib";
import { WEBSITE_ROUTES } from "@/website/site-config";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <Container size="full" className="flex items-center justify-center">
        <section className="mx-auto max-w-md text-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-[5rem] font-bold leading-none text-neutral-200 dark:text-neutral-800">
              404
            </p>
            <h1 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
              Página no encontrada
            </h1>
            <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
              La ruta que buscas no existe o fue movida. Revisa la URL o vuelve al inicio.
            </p>
            <Link
              href={WEBSITE_ROUTES.docs}
              appearance="button"
              color="neutral"
              size="sm"
              className="mt-2"
            >
              Ir a documentación
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
