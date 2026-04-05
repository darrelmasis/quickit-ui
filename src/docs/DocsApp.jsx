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
  COMPONENT_ITEMS,
  COMPONENT_GROUPS,
  DEFAULT_INTRO_SECTION,
  docsTheme,
  getInitialTheme,
  INTRO_ITEMS,
  STORAGE_KEY,
} from "@/docs/config";
import QuickitLogo from "@/docs/components/QuickitLogo";
import IntroductionDocs from "@/docs/sections/IntroductionDocs";
import FoundationsDocs from "@/docs/sections/FoundationsDocs";
import CoreDocs from "@/docs/sections/CoreDocs";
import FormDocs from "@/docs/sections/FormDocs";
import OverlayDocs from "@/docs/sections/OverlayDocs";
import NavigationDocs from "@/docs/sections/NavigationDocs";
import UtilityDocs from "@/docs/sections/UtilityDocs";
import { cn } from "@/lib/utils";
import packageMeta from "../../package.json";

const ALL_ITEMS = [...INTRO_ITEMS, ...COMPONENT_ITEMS];

function findSection(hash, fallback = DEFAULT_INTRO_SECTION) {
  return ALL_ITEMS.some((item) => item.href === hash) ? hash : fallback;
}

function getInitialActiveSection() {
  if (typeof window === "undefined") {
    return DEFAULT_INTRO_SECTION;
  }

  return findSection(window.location.hash, DEFAULT_INTRO_SECTION);
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
  const activeIntroItem =
    INTRO_ITEMS.find((item) => item.href === activeSection) ?? null;
  const activeComponentGroup =
    COMPONENT_GROUPS.find((group) =>
      group.items.some((item) => item.href === activeSection),
    ) ?? null;
  const activeSectionId = activeSection.slice(1);
  const activeVisibleSet = useMemo(
    () => new Set([activeSectionId]),
    [activeSectionId],
  );

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
    const handleHashChange = () => {
      setActiveSection(
        findSection(window.location.hash, DEFAULT_INTRO_SECTION),
      );
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigateToSection = (href) => {
    setActiveSection(href);
    setMobileMenuOpen(false);
    window.history.replaceState(null, "", href);
  };

  const handleButtonLoadingStart = () => {
    setButtonLoading(true);
    window.setTimeout(() => {
      setButtonLoading(false);
    }, 1800);
  };

  const renderNavItem = (item) => (
    <button
      key={item.href}
      type="button"
      className={cn(
        "w-full cursor-pointer rounded-xl border px-3 py-2 text-left text-sm font-medium transition-colors",
        activeSection === item.href ? navUi.itemActive : navUi.itemIdle,
      )}
      onClick={() => navigateToSection(item.href)}
    >
      {item.label}
    </button>
  );

  const renderActivePage = () => {
    if (activeIntroItem) {
      return <IntroductionDocs ui={ui} visibleIds={activeVisibleSet} />;
    }

    switch (activeSection) {
      case "#provider":
      case "#theme":
      case "#tokens":
      case "#states":
        return <FoundationsDocs ui={ui} visibleIds={activeVisibleSet} />;
      case "#accordion":
      case "#breadcrumb":
      case "#pagination":
      case "#tabs":
        return <NavigationDocs ui={ui} visibleIds={activeVisibleSet} />;
      case "#avatar":
      case "#badge":
      case "#empty-state":
      case "#link":
      case "#skeleton":
        return <UtilityDocs ui={ui} visibleIds={activeVisibleSet} />;
      case "#button":
        return (
          <CoreDocs
            ui={ui}
            visibleIds={activeVisibleSet}
            buttonLoading={buttonLoading}
            onButtonLoadingStart={handleButtonLoadingStart}
          />
        );
      case "#checkbox":
      case "#form-control":
      case "#input":
      case "#label":
      case "#radio":
      case "#select":
      case "#switch":
      case "#textarea":
        return <FormDocs ui={ui} visibleIds={activeVisibleSet} />;
      case "#dropdown":
      case "#modal":
      case "#popover":
      case "#tooltip":
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
          <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
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
                  Introducción, componentes y tema en una sola navegación
                  lateral.
                </p>
              </div>

              <div
                className="min-h-0 flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
                    Introducción
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
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.18em] ${ui.accent}`}
                    >
                      Componentes
                    </p>
                    <span className={`text-xs ${navUi.helper}`}>
                      {filteredComponents.length}
                    </span>
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

        <div className="mx-auto w-full max-w-[1800px] lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8 lg:px-8">
          <aside className="hidden py-6 lg:py-8 lg:block">
            <div className={cn("rounded-[1.5rem] border p-4", navUi.card)}>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.18em] ${ui.accent}`}
              >
                Introducción
              </p>
              <div className="mt-3 space-y-2">
                {INTRO_ITEMS.map(renderNavItem)}
              </div>
            </div>

            <div className="sticky top-[89px] mt-4">
              <div
                className={cn(
                  "flex max-h-[calc(100vh-89px-1.5rem)] min-h-0 flex-col overflow-hidden rounded-[1.5rem] border",
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
                    <span className={`text-xs ${navUi.helper}`}>
                      {filteredComponents.length}
                    </span>
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
                  className="min-h-0 flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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

          <section className="min-w-0 px-4 py-6 sm:px-6 lg:px-0 lg:py-8">
            <div
              className={cn(
                "rounded-[1.75rem] border p-5 sm:p-6",
                ui.introCard,
              )}
            >
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${ui.badge}`}
                >
                  Quickit UI
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${ui.badge}`}
                >
                  {activeIntroItem
                    ? "Guía"
                    : (activeComponentGroup?.label ?? "Componente")}
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${ui.badge}`}
                >
                  Ejemplos + API
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.18em] ${ui.accent}`}
                  >
                    {activeIntroItem ? "Introducción" : "Componente"}
                  </p>
                  <h1
                    className={`mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl ${ui.title}`}
                  >
                    {activeIntroItem?.label ??
                      activeComponentItem?.label ??
                      "Quickit UI"}
                  </h1>
                  <p className={`mt-3 max-w-3xl text-sm leading-6 ${ui.body}`}>
                    {activeIntroItem
                      ? "Guías de arranque, instalación y compatibilidad para empezar a usar la librería sin ruido visual ni navegación duplicada."
                      : "Referencia del componente seleccionado con ejemplos reales, props y notas de integración en una estructura más compacta."}
                  </p>
                </div>

                <Button
                  size="sm"
                  color="neutral"
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  Ver navegación
                </Button>
              </div>
            </div>

            <div className="mt-8">{renderActivePage()}</div>

            {!activeIntroItem &&
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
