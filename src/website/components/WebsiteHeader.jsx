import { useMemo, useState, useRef, useEffect } from "react";
import {
  Button,
  For,
  Input,
  Link,
  Show,
  useQuickitThemeController,
} from "@/lib";
import { cn } from "@/lib/utils";
import {
  WEBSITE_NAV,
  WEBSITE_ROUTES,
} from "@/website/site-config";
import { buildWebsiteSearchIndex } from "@/website/docs-search";
import WebsiteLogo from "@/website/components/WebsiteLogo";

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

export default function WebsiteHeader({ activePath }) {
  const { resolvedTheme, toggleTheme } = useQuickitThemeController();
  const isDark = resolvedTheme === "dark";
  const searchIndex = useMemo(() => buildWebsiteSearchIndex(), []);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchIndex
      .filter(
        (entry) =>
          entry.label.toLowerCase().includes(q) ||
          entry.keywords.some((k) => k.toLowerCase().includes(q)),
      )
      .slice(0, 10);
  }, [query, searchIndex]);

  const groupedResults = useMemo(() => {
    const groups = new Map();
    filteredResults.forEach((entry) => {
      if (!groups.has(entry.group)) groups.set(entry.group, []);
      groups.get(entry.group).push(entry);
    });
    return Array.from(groups.entries());
  }, [filteredResults]);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800/40 dark:bg-neutral-950/95 dark:supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="flex h-14 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href={WEBSITE_ROUTES.landing}
          className="flex items-center shrink-0"
          aria-label="Ir al inicio de Quickit UI"
        >
          <WebsiteLogo className="h-5 w-auto text-neutral-950 dark:text-neutral-50" />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          <For each={WEBSITE_NAV.filter((item) => item.href !== WEBSITE_ROUTES.examples)}>
            {(item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  activePath === item.href
                    ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
                )}
              >
                {item.label}
              </a>
            )}
          </For>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <div className="relative hidden md:block w-60">
            <Input
              ref={inputRef}
              type="search"
              placeholder="Buscar documentos..."
              size="sm"
              color="neutral"
              clearButton={false}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              rightElement={
                <kbd className="text-[10px] text-neutral-400 dark:text-neutral-500">Ctrl+K</kbd>
              }
            />
            {isOpen && query.trim() && filteredResults.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute left-0 top-full mt-1 w-full max-h-72 overflow-y-auto rounded-md border border-neutral-200 bg-white p-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
              >
                {groupedResults.map(([group, items]) => (
                  <div key={group}>
                    <div className="px-2 py-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      {group}
                    </div>
                    {items.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        className="block rounded-md px-2 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            href="https://github.com/darrelmasis/quickit-ui"
            target="_blank"
            appearance="button"
            size="sm"
            shape="circle"
            color="neutral"
            variant="ghost"
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

    </header>
  );
}
