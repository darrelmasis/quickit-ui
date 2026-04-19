import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  CommandPalette,
  For,
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
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                Buscar en docs
              </span>
              <Badge color="neutral" variant="soft">
                Ctrl+K
              </Badge>
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
