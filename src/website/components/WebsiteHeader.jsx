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
      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.5v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.96c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.04.36.32.68.95.68 1.92v2.78c0 .28.18.6.69.5A10.14 10.14 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function NpmIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M3 7h18v10H12v-2H9v2H3V7Zm2 2v6h2v-4h2v4h2V9H5Zm8 0v6h2v-4h2v4h2V9h-6Z" />
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
              variant={isDark ? "solid" : "outline"}
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
