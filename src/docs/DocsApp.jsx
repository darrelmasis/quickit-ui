import { useEffect, useMemo, useState } from "react";
import {
  Button,
  EmptyState,
  EmptyStateDescription,
  EmptyStateTitle,
  Input,
  QuickitProvider,
  Link,
} from "@/lib";
import {
  ALL_ITEMS,
  COMPONENT_ITEMS,
  COMPONENT_GROUPS,
  DEFAULT_COMPONENT_SECTION,
  DEFAULT_INTRO_SECTION,
  docsTheme,
  EXAMPLE_ITEMS,
  getInitialTheme,
  INTRO_ITEMS,
  STORAGE_KEY,
} from "@/docs/config";
import QuickitLogo from "@/docs/components/QuickitLogo";
import IntroductionDocs from "@/docs/sections/IntroductionDocs";
import FoundationsDocs from "@/docs/sections/FoundationsDocs";
import CoreDocs from "@/docs/sections/CoreDocs";
import FormDocs from "@/docs/sections/FormDocs";
import ExamplesDocs from "@/docs/sections/ExamplesDocs";
import OverlayDocs from "@/docs/sections/OverlayDocs";
import NavigationDocs from "@/docs/sections/NavigationDocs";
import UtilityDocs from "@/docs/sections/UtilityDocs";
import { cn } from "@/lib/utils";
import packageMeta from "../../package.json";

function normalizePathname(pathname) {
  if (!pathname || pathname === "/") {
    return DEFAULT_INTRO_SECTION;
  }

  return pathname.endsWith("/") && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;
}

function findSection(pathname, fallback = DEFAULT_INTRO_SECTION) {
  const normalizedPathname = normalizePathname(pathname);

  return ALL_ITEMS.some((item) => item.href === normalizedPathname)
    ? normalizedPathname
    : fallback;
}

function getInitialActiveSection() {
  if (typeof window === "undefined") {
    return DEFAULT_INTRO_SECTION;
  }

  return findSection(window.location.pathname, DEFAULT_INTRO_SECTION);
}

function scrollPageToTop(behavior = "smooth") {
  if (typeof window === "undefined") {
    return;
  }

  const scrollOptions = { top: 0, left: 0, behavior };

  window.scrollTo(scrollOptions);
  document.documentElement.scrollTo?.(scrollOptions);
  document.body.scrollTo?.(scrollOptions);

  window.requestAnimationFrame(() => {
    window.scrollTo(scrollOptions);
    document.documentElement.scrollTo?.(scrollOptions);
    document.body.scrollTo?.(scrollOptions);
  });
}

const NAV_THEME_CLASSES = {
  light: {
    card: "border-zinc-200 bg-zinc-50/80",
    itemIdle:
      "border-transparent text-zinc-600 hover:border-zinc-200 hover:bg-white hover:text-zinc-950",
    itemActive: "border-zinc-200 bg-white text-zinc-950 shadow-sm",
    sectionLabel: "text-zinc-700",
    helper: "text-zinc-500",
  },
  dark: {
    card: "border-zinc-800 bg-[#111113]",
    itemIdle:
      "border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-950 hover:text-zinc-50",
    itemActive: "border-zinc-800 bg-zinc-950 text-zinc-50",
    sectionLabel: "text-zinc-300",
    helper: "text-zinc-500",
  },
};

const SIDEBAR_SCROLLBAR_CLASSES = [
  "overflow-y-auto [scrollbar-width:thin]",
  "[scrollbar-color:rgba(113,113,122,0.55)_transparent]",
  "[&::-webkit-scrollbar]:w-2",
  "[&::-webkit-scrollbar-track]:bg-transparent",
  "[&::-webkit-scrollbar-thumb]:rounded-full",
  "[&::-webkit-scrollbar-thumb]:border-[3px]",
  "[&::-webkit-scrollbar-thumb]:border-transparent",
  "[&::-webkit-scrollbar-thumb]:bg-zinc-500/55",
  "[&::-webkit-scrollbar-thumb:hover]:bg-zinc-500/75",
].join(" ");

export default function DocsApp() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeSection, setActiveSection] = useState(getInitialActiveSection);
  const [componentQuery, setComponentQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [dropdownMessage, setDropdownMessage] = useState(
    "Selecciona una acción del menú.",
  );
  const [controlledModalOpen, setControlledModalOpen] = useState(false);
  const ui = docsTheme[theme];
  const navUi = NAV_THEME_CLASSES[theme];

  const filteredComponents = useMemo(() => {
    const query = componentQuery.trim().toLowerCase();

    if (!query) {
      return COMPONENT_ITEMS;
    }

    return COMPONENT_ITEMS.filter((item) =>
      item.label.toLowerCase().includes(query),
    );
  }, [componentQuery]);
  const filteredComponentGroups = useMemo(
    () =>
      COMPONENT_GROUPS.map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          filteredComponents.some(
            (filteredItem) => filteredItem.href === item.href,
          ),
        ),
      })).filter((group) => group.items.length > 0),
    [filteredComponents],
  );

  const activeComponentItem =
    COMPONENT_ITEMS.find((item) => item.href === activeSection) ?? null;
  const activeExamplePage =
    EXAMPLE_ITEMS.find((item) => item.href === activeSection) ?? null;
  const activeIntroItem =
    INTRO_ITEMS.find((item) => item.href === activeSection) ?? null;
  const activeSectionId =
    activeIntroItem?.id ??
    activeExamplePage?.id ??
    activeComponentItem?.id ??
    "getting-started";
  const activeVisibleSet = new Set([activeSectionId]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setActiveSection(findSection(window.location.pathname));
    };

    handlePopState();
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigateToSection = (href, { scrollToTop = false } = {}) => {
    if (href !== activeSection) {
      window.history.pushState(null, "", href);
    }

    setActiveSection(href);
    setMobileMenuOpen(false);

    if (scrollToTop) {
      scrollPageToTop("smooth");
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = event.target.closest('a[href]');

      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");

      if (!href) {
        return;
      }

      if (href.startsWith("#")) {
        event.preventDefault();
        return;
      }

      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      const url = new URL(anchor.href, window.location.origin);

      if (url.origin !== window.location.origin) {
        return;
      }

      const nextSection = findSection(url.pathname);

      if (nextSection !== url.pathname && url.pathname !== "/") {
        return;
      }

      event.preventDefault();

      if (nextSection !== activeSection) {
        window.history.pushState(null, "", nextSection);
      }

      setActiveSection(nextSection);
      setMobileMenuOpen(false);
      scrollPageToTop("smooth");
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [activeSection]);

  const handleButtonLoadingStart = () => {
    setButtonLoading(true);
    window.setTimeout(() => {
      setButtonLoading(false);
    }, 1800);
  };

  const renderNavItem = (item) => {
    const isActive = activeSection === item.href;

    return (
      <Button
        key={item.href}
        size="sm"
        color="neutral"
        variant={isActive ? "solid" : "ghost"}
        fullWidth
        disabled={isActive}
        className={cn(
          "justify-start text-left disabled:cursor-default disabled:opacity-100",
          isActive ? navUi.itemActive : navUi.itemIdle,
        )}
        onClick={() =>
          navigateToSection(item.href, { scrollToTop: true })
        }
      >
        {item.label}
      </Button>
    );
  };

  const renderHeaderNavLink = ({ href, label, isActive, color = "neutral" }) => (
    <Link
      key={href}
      href={href}
      appearance="button"
      activeMotion={false}
      size="sm"
      color={color}
      variant={isActive ? "solid" : "ghost"}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "min-w-0 shrink-0 whitespace-nowrap px-3",
        !isActive && navUi.itemIdle,
      )}
    >
      {label}
    </Link>
  );

  const renderActivePage = () => {
    if (activeIntroItem) {
      return <IntroductionDocs ui={ui} visibleIds={activeVisibleSet} />;
    }

    if (activeExamplePage) {
      return <ExamplesDocs ui={ui} />;
    }

    switch (activeSectionId) {
      case "provider":
      case "theme":
      case "use-breakpoint":
      case "colors":
      case "states":
        return <FoundationsDocs ui={ui} visibleIds={activeVisibleSet} />;
      case "accordion":
      case "breadcrumb":
      case "pagination":
      case "tabs":
        return <NavigationDocs ui={ui} visibleIds={activeVisibleSet} />;
      case "avatar":
      case "avatar-presence":
      case "badge":
      case "empty-state":
      case "for":
      case "initials":
      case "link":
      case "render-switch":
      case "show":
      case "skeleton":
      case "user-chip":
        return <UtilityDocs ui={ui} visibleIds={activeVisibleSet} />;
      case "button":
        return (
          <CoreDocs
            ui={ui}
            visibleIds={activeVisibleSet}
            buttonLoading={buttonLoading}
            onButtonLoadingStart={handleButtonLoadingStart}
          />
        );
      case "checkbox":
      case "form-control":
      case "input":
      case "label":
      case "radio":
      case "select":
      case "switch":
      case "textarea":
        return <FormDocs ui={ui} visibleIds={activeVisibleSet} />;
      case "dropdown":
      case "modal":
      case "popover":
      case "tooltip":
        return (
          <OverlayDocs
            ui={ui}
            visibleIds={activeVisibleSet}
            dropdownMessage={dropdownMessage}
            onDropdownMessageChange={setDropdownMessage}
            controlledModalOpen={controlledModalOpen}
            onControlledModalChange={setControlledModalOpen}
          />
        );
      default:
        return (
          <IntroductionDocs ui={ui} visibleIds={new Set(["getting-started"])} />
        );
    }
  };

  return (
    <QuickitProvider theme={theme}>
      <main className={`min-h-screen ${ui.page}`}>
        <header
          className={`sticky top-0 z-50 border-b backdrop-blur ${ui.surface}`}
        >
          <div className="mx-auto max-w-[1800px] px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <Link
                  href="/"
                  className={`flex min-w-0 items-center gap-2 ${theme === "dark" ? "text-white" : "text-neutral-900"}`}
                >
                  <span className="flex h-8 items-center justify-center px-1">
                    <QuickitLogo className="h-4 w-auto sm:h-5" />
                  </span>
                </Link>

                <span className="text-sm font-medium text-neutral-500">{`v${packageMeta.version}`}</span>

                <div className="hidden min-w-0 items-center gap-3 lg:flex">
                  <div className="flex min-w-0 items-center gap-2 overflow-x-auto">
                    {INTRO_ITEMS.map((item) =>
                      renderHeaderNavLink({
                        href: item.href,
                        label: item.label,
                        isActive: activeSection === item.href,
                      }),
                    )}
                  </div>
                  <div className={`h-6 w-px shrink-0 ${ui.divider}`} />
                  <div className="flex min-w-0 items-center gap-2 overflow-x-auto">
                    {EXAMPLE_ITEMS.map((item) =>
                      renderHeaderNavLink({
                        href: item.href,
                        label: item.label,
                        isActive: activeSection === item.href,
                        color: "brand",
                      }),
                    )}
                    {renderHeaderNavLink({
                      href: activeComponentItem?.href ?? DEFAULT_COMPONENT_SECTION,
                      label: "Componentes",
                      isActive: Boolean(activeComponentItem),
                    })}
                  </div>
                </div>
              </div>

              <div className="flex min-w-0 items-center gap-2">
                <div className="hidden items-center gap-2 md:flex">
                  <Button
                    size="sm"
                    color="neutral"
                    variant={theme === "light" ? "solid" : "ghost"}
                    pressed={theme === "light"}
                    onClick={() => setTheme("light")}
                  >
                    Claro
                  </Button>
                  <Button
                    size="sm"
                    color="neutral"
                    variant={theme === "dark" ? "solid" : "ghost"}
                    pressed={theme === "dark"}
                    onClick={() => setTheme("dark")}
                  >
                    Oscuro
                  </Button>
                </div>

                <div className="flex items-center gap-2 lg:hidden">
                  <Button
                    size="sm"
                    color="neutral"
                    variant="outline"
                    pressed={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen((current) => !current)}
                  >
                    Menú
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </header>

        {mobileMenuOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              aria-label="Cerrar menú"
              className="absolute inset-0 bg-black/60"
              onClick={() => setMobileMenuOpen(false)}
            />

            <div
              className={`absolute inset-y-0 left-0 flex w-full max-w-[23rem] flex-col border-r ${ui.sidebar}`}
            >
              <div className={`border-b px-4 py-4 ${ui.surface}`}>
                <div className="flex items-center justify-between gap-3">
                  <p className={`text-sm font-semibold ${ui.title}`}>
                    Navegación
                  </p>
                  <Button
                    size="sm"
                    color="neutral"
                    variant="ghost"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cerrar
                  </Button>
                </div>
                  <p className={`mt-2 text-xs leading-5 ${ui.body}`}>
                    Navega entre guía, ejemplos y el área de componentes con
                    una estructura más clara.
                  </p>
                </div>

              <div
                className={cn(
                  "min-h-0 flex-1 p-4",
                  SIDEBAR_SCROLLBAR_CLASSES,
                )}
                >
                  <div className={cn("rounded-[1.25rem] border p-4", navUi.card)}>
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.18em] ${ui.accent}`}
                  >
                    Tema
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      color="neutral"
                      fullWidth
                      variant={theme === "light" ? "solid" : "ghost"}
                      pressed={theme === "light"}
                      onClick={() => setTheme("light")}
                    >
                      Claro
                    </Button>
                    <Button
                      size="sm"
                      color="neutral"
                      fullWidth
                      variant={theme === "dark" ? "solid" : "ghost"}
                      pressed={theme === "dark"}
                      onClick={() => setTheme("dark")}
                    >
                      Oscuro
                    </Button>
                  </div>
                  </div>

                  <div
                    className={cn(
                      "mt-4 rounded-[1.25rem] border p-4",
                      navUi.card,
                    )}
                  >
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.18em] ${ui.accent}`}
                  >
                    Guía
                  </p>
                    <div className="mt-3 space-y-2">
                      {INTRO_ITEMS.map(renderNavItem)}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "mt-4 rounded-[1.25rem] border p-4",
                      navUi.card,
                    )}
                  >
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.18em] ${ui.accent}`}
                    >
                      Ejemplos
                    </p>
                    <div className="mt-3 space-y-2">
                      {EXAMPLE_ITEMS.map(renderNavItem)}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "mt-4 rounded-[1.25rem] border p-4",
                      navUi.card,
                    )}
                  >
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.18em] ${ui.accent}`}
                    >
                      Área de componentes
                    </p>
                    <div className="mt-3 space-y-2">
                      {renderHeaderNavLink({
                        href: activeComponentItem?.href ?? DEFAULT_COMPONENT_SECTION,
                        label: "Componentes",
                        isActive: Boolean(activeComponentItem),
                      })}
                    </div>
                  </div>

                  <div
                    className={cn(
                    "mt-4 rounded-[1.25rem] border p-4",
                    navUi.card,
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.18em] ${ui.accent}`}
                    >
                      Componentes
                    </p>
                  </div>
                  <div className="mt-3">
                    <Input
                      size="sm"
                      value={componentQuery}
                      onChange={(event) =>
                        setComponentQuery(event.target.value)
                      }
                      placeholder="Buscar componente"
                    />
                  </div>

                  {filteredComponentGroups.length ? (
                    <div className="mt-4 space-y-4">
                      {filteredComponentGroups.map((group) => (
                        <div key={group.label}>
                          <p
                            className={`mb-2 text-xs font-semibold uppercase tracking-[0.16em] ${navUi.sectionLabel}`}
                          >
                            {group.label}
                          </p>
                          <div className="space-y-2">
                            {group.items.map(renderNavItem)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`mt-4 text-sm leading-6 ${navUi.helper}`}>
                      No hay componentes que coincidan con la búsqueda.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            "mx-auto w-full max-w-[1800px] lg:px-8",
            activeComponentItem &&
              "lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8",
          )}
        >
          {activeComponentItem ? (
          <aside className="hidden lg:sticky lg:top-[61px] lg:block lg:h-[calc(100vh-61px)] lg:py-8">
            <div className="h-full">
              <div
                className={cn(
                  "flex h-full min-h-0 flex-col overflow-hidden rounded-[1.5rem] border",
                  navUi.card,
                )}
              >
                <div
                  className={cn(
                    "z-10 border-b px-4 py-4 backdrop-blur",
                    ui.divider,
                    navUi.card,
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.18em] ${ui.accent}`}
                    >
                      Componentes
                    </p>
                  </div>
                  <div className="mt-3">
                    <Input
                      size="sm"
                      value={componentQuery}
                      onChange={(event) => setComponentQuery(event.target.value)}
                      placeholder="Buscar componente"
                    />
                  </div>
                </div>

                <div
                  className={cn(
                    "min-h-0 flex-1 p-4",
                    SIDEBAR_SCROLLBAR_CLASSES,
                  )}
                >
                  {filteredComponentGroups.length ? (
                    <div className="space-y-4">
                      {filteredComponentGroups.map((group) => (
                        <div key={group.label}>
                          <p
                            className={`mb-2 text-xs font-semibold uppercase tracking-[0.16em] ${navUi.sectionLabel}`}
                          >
                            {group.label}
                          </p>
                          <div className="space-y-2">
                            {group.items.map(renderNavItem)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-sm leading-6 ${navUi.helper}`}>
                      No hay componentes que coincidan con la búsqueda.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </aside>
          ) : null}

          <section
            className={cn(
              "min-w-0 px-4 py-6 sm:px-6 lg:py-8",
              activeComponentItem
                ? "lg:px-0"
                : activeExamplePage
                  ? "mx-auto max-w-[1400px]"
                  : "mx-auto max-w-6xl",
            )}
          >
            <div>{renderActivePage()}</div>

            {activeComponentItem &&
            !filteredComponents.some((item) => item.href === activeSection) ? (
              <div className="pt-8">
                <EmptyState>
                  <EmptyStateTitle>
                    El buscador no muestra este componente
                  </EmptyStateTitle>
                  <EmptyStateDescription>
                    La página actual sigue visible, pero puedes limpiar el
                    filtro para volver a verla en la navegación lateral.
                  </EmptyStateDescription>
                </EmptyState>
              </div>
            ) : null}
          </section>
        </div>
      </main>
    </QuickitProvider>
  );
}
