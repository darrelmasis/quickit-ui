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
      <Container size="full" className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
        <section className="mx-auto max-w-3xl text-center">
          <div className="flex flex-col items-center gap-6">
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
                  <CheckStrokeIcon className="size-4 text-emerald-500" />
                </Show>
              </Button>
            </div>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              React 18+ &middot; Tailwind CSS v4 &middot; Open Source
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
