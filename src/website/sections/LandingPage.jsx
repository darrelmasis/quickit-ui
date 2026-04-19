import { Badge, Link } from "@/lib";
import { WEBSITE_ROUTES, WEBSITE_SHELL } from "@/website/site-config";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { Button, Tooltip, useBreakpoint } from "@/lib";
import { CheckStrokeIcon, CopyIcon } from "@/lib/assets/icons";

const INSTALL_SNIPPET = "npm install quickit-ui";

export default function LandingPage() {
  const { copy, copied } = useCopyToClipboard(2000);
  const { isDesktop } = useBreakpoint();

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden pb-20 pt-10 sm:pb-28 sm:pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -top-32 left-1/2 h-[min(520px,90vw)] w-[min(900px,140%)] -translate-x-1/2 rounded-[50%] bg-neutral-400/20 blur-3xl dark:bg-neutral-500/15" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-neutral-800" />
      </div>

      <div className={`${WEBSITE_SHELL} space-y-20 sm:space-y-24`}>
        <section className="mx-auto max-w-5xl text-center">
          <div className="flex flex-col items-center gap-6">
            <Badge color="neutral" variant="soft" size="sm">
              React 18+ · Tailwind CSS v4
            </Badge>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl xl:text-[3.25rem] xl:leading-[1.1] dark:text-neutral-50">
              La forma más{" "}
              <span className="bg-gradient-to-r italic from-neutral-800 via-neutral-600 to-neutral-800 bg-clip-text text-transparent dark:from-neutral-200 dark:via-neutral-400 dark:to-neutral-200">
                rapida
              </span>{" "}
              de construir una interfaz de usuario
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8 dark:text-neutral-400">
              <span className="font-medium text-neutral-950 dark:text-neutral-100">
                Quickit UI
              </span>{" "}
              une acciones, formularios, navegación, overlays y utilidades
              lógicas en una API predecible. Light y dark coherentes desde el
              primer pantallazo.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Link
                href={WEBSITE_ROUTES.docs}
                appearance="button"
                size="md"
                color="light"
                fullWidth={isDesktop ? false : true}
              >
                Empezar
              </Link>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <code className={copied ? "text-neutral-500" : ""}>
                {INSTALL_SNIPPET}
              </code>
              <Tooltip
                content={copied ? "¡Copiado!" : "Copiar al portapapeles"}
                showArrow={false}
                color={copied ? "success" : "neutral"}
              >
                <Button
                  color="neutral"
                  size="sm"
                  variant="ghost"
                  shape="square"
                  aria-label="Copiar comando de instalación"
                  disabled={copied}
                  onClick={() => copy(INSTALL_SNIPPET)}
                >
                  {copied ? (
                    <CheckStrokeIcon className="size-5" />
                  ) : (
                    <CopyIcon className="size-5" />
                  )}
                </Button>
              </Tooltip>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
