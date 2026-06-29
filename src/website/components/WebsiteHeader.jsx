import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  CommandPalette,
  For,
  Link,
  Show,
  useQuickitThemeController,
} from "@/lib";
import { cn } from "@/lib/utils";
import { getWebsiteSearchGroups } from "@/website/docs-search";
import {
  WEBSITE_NAV,
  WEBSITE_ROUTES,
  WEBSITE_SHELL,
} from "@/website/site-config";
import WebsiteLogo from "@/website/components/WebsiteLogo";
import { navigateWebsiteToHref } from "@/website/router";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23 5.46 5.46"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
      <path
        d="M20 14.2A8 8 0 1 1 9.8 4 6.5 6.5 0 0 0 20 14.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function NpmIcon() {
  return (
    <svg viewBox="0 0 250 250" className="size-4" aria-hidden="true">
      <path fill="currentColor" d="M0,200h100V50h50v150h50V0H0V200z" strokeWidth="5" stroke="currentColor" />
    </svg>
  );
}

export default function WebsiteHeader({ activePath }) {
  const { resolvedTheme, toggleTheme } = useQuickitThemeController();
  const [searchOpen, setSearchOpen] = useState(false);
  const isDark = resolvedTheme === "dark";
  const searchGroups = useMemo(
    () =>
      getWebsiteSearchGroups((href) => {
        navigateWebsiteToHref(href);
        setSearchOpen(false);
      }),
    [],
  );

  return (
    <header className="sticky top-0 z-50 bg-white/88 backdrop-blur-xl dark:bg-neutral-950/88">
      <div className={WEBSITE_SHELL}>
        <div className="flex h-[60px] items-center gap-4">
          <a
            href={WEBSITE_ROUTES.landing}
            className="flex items-center"
            aria-label="Ir al inicio de Quickit UI"
          >
            <WebsiteLogo className="h-5 w-auto text-neutral-950 dark:text-neutral-50" />
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            <For each={WEBSITE_NAV}>
              {(item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    activePath === item.href
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950"
                      : "text-neutral-900 hover:bg-neutral-900/5 hover:text-neutral-950 dark:text-white dark:hover:bg-white/5 dark:hover:text-neutral-100",
                  )}
                >
                  {item.label}
                </a>
              )}
            </For>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Button
              size="sm"
              color="neutral"
              variant="outline"
              activeMotion={false}
              className="hidden min-w-[15rem] justify-between md:inline-flex"
              onClick={() => setSearchOpen(true)}
            >
              <span className="flex flex-1 items-center justify-between gap-2">
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  Buscar en docs
                </span>
                <Badge color="neutral" variant="soft">
                  <kbd className="text-xs text-neutral-500 dark:text-neutral-500">
                    Ctrl+K
                  </kbd>
                </Badge>
              </span>
            </Button>

            <Button
              size="sm"
              color="neutral"
              variant="outline"
              activeMotion={false}
              className="md:hidden"
              onClick={() => setSearchOpen(true)}
            >
              Buscar
            </Button>

            <Link
              href="https://www.npmjs.com/package/quickit-ui"
              target="_blank"
              appearance="button"
              size="sm"
              shape="circle"
              color="neutral"
              variant="outline"
              activeMotion={false}
              aria-label="Abrir Quickit UI en npm"
              title="npm"
            >
              <NpmIcon />
            </Link>

            <Link
              href="https://github.com/darrelmasis/quickit-ui"
              target="_blank"
              appearance="button"
              size="sm"
              shape="circle"
              color="neutral"
              variant="outline"
              activeMotion={false}
              aria-label="Abrir repositorio de Quickit UI en GitHub"
              title="GitHub"
            >
              <GithubIcon />
            </Link>

            <Button
              size="sm"
              shape="circle"
              color="neutral"
              variant="ghost"
              activeMotion={false}
              aria-label={isDark ? "Activar tema claro" : "Activar tema oscuro"}
              onClick={toggleTheme}
            >
              <Show when={isDark} fallback={<MoonIcon />}>
                <SunIcon />
              </Show>
            </Button>
          </div>
        </div>
      </div>

      <CommandPalette
        open={searchOpen}
        onOpenChange={setSearchOpen}
        groups={searchGroups}
        placeholder="Buscar componentes, hooks o guías…"
        emptyText="No encontré resultados en la documentación"
      />
    </header>
  );
}
