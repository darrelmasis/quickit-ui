import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  EmptyState,
  EmptyStateDescription,
  EmptyStateTitle,
  Input,
  Link,
  Switch,
  useQuickitThemeController,
} from "@/lib";
import {
  ALL_ITEMS,
  COMPONENT_NAV_ITEMS,
  COMPONENT_GROUPS,
  COMPONENT_ITEMS,
  DEFAULT_COMPONENT_SECTION,
  DEFAULT_EXAMPLES_SECTION,
  DEFAULT_INTRO_SECTION,
  EXAMPLE_GROUPS,
  EXAMPLE_ITEMS,
  EXAMPLE_NAV_ITEMS,
  INTRO_ITEMS,
  LANDING_ITEM,
  LANDING_SECTION,
  docsTheme,
} from "@/docs/config";
import QuickitLogo from "@/docs/components/QuickitLogo";
import CoreDocs from "@/docs/sections/CoreDocs";
import ExamplesDocs from "@/docs/sections/ExamplesDocs";
import FormDocs from "@/docs/sections/FormDocs";
import FoundationsDocs from "@/docs/sections/FoundationsDocs";
import IntroductionDocs from "@/docs/sections/IntroductionDocs";
import NavigationDocs from "@/docs/sections/NavigationDocs";
import OverlayDocs from "@/docs/sections/OverlayDocs";
import UtilityDocs from "@/docs/sections/UtilityDocs";
import { cn } from "@/lib/utils";
import packageMeta from "../../package.json";
import "@/styles/docs.css";

function normalizePathname(pathname) {
  if (!pathname) {
    return DEFAULT_INTRO_SECTION;
  }

  if (pathname === "/") {
    return LANDING_SECTION;
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

  const options = { top: 0, left: 0, behavior };
  window.scrollTo(options);
  document.documentElement.scrollTo?.(options);
  document.body.scrollTo?.(options);
}

function GitHubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function MenuIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SidebarNavItem({ item, isActive, onClick, ui }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "docs-nav-link",
        isActive && "docs-nav-link-active",
        isActive ? ui.navActive : ui.navIdle,
      )}
    >
      {item.label}
    </button>
  );
}

function SidebarGroup({ label, items, activeSection, onNavigate, ui }) {
  const resolvedUi = ui ?? docsTheme.light;

  if (!items.length) {
    return null;
  }

  return (
    <section className="space-y-2">
      <p
        className={cn(
          "px-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]",
          resolvedUi.sidebarLabel,
        )}
      >
        {label}
      </p>
      <div className="grid gap-0.5">
        {items.map((item) => (
          <SidebarNavItem
            key={item.href}
            item={item}
            isActive={activeSection === item.href}
            onClick={() => onNavigate(item.href)}
            ui={resolvedUi}
          />
        ))}
      </div>
    </section>
  );
}

function DocsSidebar({
  activeSection,
  componentQuery,
  filteredComponentGroups,
  onComponentQueryChange,
  onNavigate,
  ui,
}) {
  return (
    <div className="docs-scrollbar h-full pr-3">
      <div className="flex flex-col gap-6 py-6">
        <div className="space-y-4">
          <div className="space-y-1 px-1">
            <p className={cn("text-sm font-medium", ui.title)}>Documentación</p>
            <p className={cn("text-sm leading-6", ui.body)}>
              Guías, componentes y ejemplos en una sola navegación.
            </p>
          </div>

          <SidebarGroup
            label="Primeros pasos"
            items={INTRO_ITEMS}
            activeSection={activeSection}
            onNavigate={onNavigate}
            ui={ui}
          />
          <SidebarGroup
            label="Ejemplos"
            items={EXAMPLE_NAV_ITEMS}
            activeSection={activeSection}
            onNavigate={onNavigate}
            ui={ui}
          />
          {EXAMPLE_GROUPS.map((group) => (
            <SidebarGroup
              key={group.id}
              label={group.label}
              items={group.items}
              activeSection={activeSection}
              onNavigate={onNavigate}
              ui={ui}
            />
          ))}
        </div>

        <div className={cn("border-t pt-6", ui.divider)}>
          <div className="space-y-3">
            <div className="space-y-1 px-1">
              <p
                className={cn(
                  "text-[0.68rem] font-semibold uppercase tracking-[0.14em]",
                  ui.sidebarLabel,
                )}
              >
                Componentes
              </p>
              <p className={cn("text-sm", ui.body)}>
                Busca y entra directo a cualquier pieza de la librería.
              </p>
            </div>
            <Input
              type="search"
              size="sm"
              value={componentQuery}
              onChange={(event) => onComponentQueryChange(event.target.value)}
              placeholder="Buscar componente"
            />
          </div>

          <SidebarGroup
            label="Resumen"
            items={COMPONENT_NAV_ITEMS}
            activeSection={activeSection}
            onNavigate={onNavigate}
            ui={ui}
          />

          {filteredComponentGroups.length ? (
            filteredComponentGroups.map((group) => (
              <SidebarGroup
                key={group.label}
                label={group.label}
                items={group.items}
                activeSection={activeSection}
                onNavigate={onNavigate}
                ui={ui}
              />
            ))
          ) : (
            <div className={cn("px-1 text-sm", ui.body)}>
              No hay coincidencias para ese filtro.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DocsToC({ activeSection, ui }) {
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    const mainContent = document.querySelector("[data-docs-main]");

    if (!mainContent) {
      return undefined;
    }

    const headingNodes = Array.from(mainContent.querySelectorAll("h2, h3"));
    const items = headingNodes.map((node) => {
      if (!node.id) {
        node.id = node.textContent
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-");
      }

      return {
        id: node.id,
        level: node.tagName.toLowerCase(),
        text: node.textContent,
      };
    });

    const syncHeadings = window.setTimeout(() => {
      setHeadings(items);
      setActiveHeading(items[0]?.id ?? "");
    }, 0);

    if (!items.length) {
      return () => window.clearTimeout(syncHeadings);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length) {
          setActiveHeading(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-72px 0px -70% 0px",
        threshold: [0, 1],
      },
    );

    headingNodes.forEach((node) => observer.observe(node));

    return () => {
      window.clearTimeout(syncHeadings);
      observer.disconnect();
    };
  }, [activeSection]);

  if (!headings.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <p className={cn("text-[0.7rem] font-semibold uppercase tracking-[0.16em]", ui.sidebarLabel)}>
        En esta página
      </p>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(event) => {
              event.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className={cn(
              "docs-toc-link",
              heading.level === "h3" && "pl-5",
              activeHeading === heading.id ? ui.tocActive : ui.tocIdle,
            )}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

function DocsHeader({
  activeSection,
  mobileMenuOpen,
  showSidebar,
  setMobileMenuOpen,
  resolvedTheme,
  toggleTheme,
  ui,
}) {
  const currentSectionIsIntro = INTRO_ITEMS.some((item) => item.href === activeSection);
  const currentSectionIsExample = EXAMPLE_ITEMS.some((item) => item.href === activeSection);
  const currentSectionIsComponent = COMPONENT_ITEMS.some((item) => item.href === activeSection);
  const currentSectionIsLanding = activeSection === LANDING_SECTION;

  const navItems = [
    {
      href: LANDING_SECTION,
      label: "Inicio",
      active: currentSectionIsLanding,
    },
    {
      href: DEFAULT_INTRO_SECTION,
      label: "Docs",
      active: currentSectionIsIntro,
    },
    {
      href: DEFAULT_EXAMPLES_SECTION,
      label: "Ejemplos",
      active: currentSectionIsExample,
    },
    {
      href: DEFAULT_COMPONENT_SECTION,
      label: "Componentes",
      active: currentSectionIsComponent,
    },
  ];

  return (
    <header className={cn("sticky top-0 z-50 border-b backdrop-blur-xl", ui.header)}>
      <div className="docs-shell">
        <div className="flex min-h-[4.25rem] items-center gap-3 py-3">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            {showSidebar ? (
              <Button
                size="sm"
                color="neutral"
                variant="ghost"
                shape="square"
                activeMotion={false}
                className="lg:hidden"
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                onClick={() => setMobileMenuOpen((value) => !value)}
              >
                {mobileMenuOpen ? <CloseIcon className="size-4" /> : <MenuIcon className="size-4" />}
              </Button>
            ) : null}

            <a
              href={LANDING_SECTION}
              className="flex min-w-0 items-center gap-3 text-left"
              aria-label="Ir a Quickit UI"
            >
              <QuickitLogo className="h-5 w-auto shrink-0" />
            </a>

            <Badge
              color="neutral"
              variant="outline"
              className="hidden rounded-full px-2.5 py-1 text-[0.68rem] font-mono md:inline-flex"
            >
              v{packageMeta.version}
            </Badge>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  item.active ? ui.navActive : ui.navIdle,
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              appearance="button"
              color="neutral"
              variant="outline"
              shape="circle"
              aria-label="Repositorio en GitHub"
              className="hidden sm:inline-flex"
            >
              <GitHubIcon className="size-4" />
            </Link>

            {currentSectionIsLanding ? (
              <Link
                href="/docs/getting-started"
                appearance="button"
                color="brand"
                className="hidden md:inline-flex"
              >
                Empezar
              </Link>
            ) : null}

            <div
              className={cn(
                "hidden items-center gap-3 rounded-full border px-3 py-2 sm:flex",
                ui.drawerCard,
              )}
            >
              <span className={cn("text-xs font-medium", ui.body)}>
                {resolvedTheme === "dark" ? "Oscuro" : "Claro"}
              </span>
              <Switch
                color="brand"
                size="sm"
                checked={resolvedTheme === "dark"}
                onCheckedChange={toggleTheme}
                aria-label="Cambiar tema"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileDrawer({
  activeSection,
  componentQuery,
  filteredComponentGroups,
  onClose,
  onComponentQueryChange,
  onNavigate,
  open,
  resolvedTheme,
  toggleTheme,
  ui,
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "docs-mobile-drawer absolute inset-y-0 left-0 flex flex-col border-r shadow-2xl transition-transform duration-300 ease-out",
          ui.drawer,
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className={cn("flex items-center justify-between border-b px-4 py-3", ui.divider)}>
          <div className="flex min-w-0 items-center gap-3">
            <QuickitLogo className="h-5 w-auto shrink-0" />
            <div className="min-w-0">
              <p className={cn("text-xs", ui.body)}>
                Documentación y ejemplos
              </p>
            </div>
          </div>

          <Button
            size="sm"
            color="neutral"
            variant="ghost"
            shape="square"
            activeMotion={false}
            aria-label="Cerrar menú"
            onClick={onClose}
          >
            <CloseIcon className="size-4" />
          </Button>
        </div>

        <div className={cn("space-y-4 border-b px-4 py-4", ui.divider)}>
          <Input
            type="search"
            size="sm"
            value={componentQuery}
            onChange={(event) => onComponentQueryChange(event.target.value)}
            placeholder="Buscar componente"
          />

          <div className={cn("flex items-center justify-between rounded-2xl border px-3 py-2", ui.drawerCard)}>
            <div>
              <p className={cn("text-sm font-medium", ui.title)}>
                Tema
              </p>
              <p className={cn("text-xs", ui.body)}>
                {resolvedTheme === "dark" ? "Oscuro" : "Claro"}
              </p>
            </div>
            <Switch
              color="brand"
              size="sm"
              checked={resolvedTheme === "dark"}
              onCheckedChange={toggleTheme}
              aria-label="Cambiar tema"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 px-4">
          <DocsSidebar
            activeSection={activeSection}
            componentQuery={componentQuery}
            filteredComponentGroups={filteredComponentGroups}
            onComponentQueryChange={onComponentQueryChange}
            onNavigate={onNavigate}
            ui={ui}
          />
        </div>
      </div>
    </div>
  );
}

export default function DocsApp() {
  const { resolvedTheme, toggleTheme } = useQuickitThemeController();
  const [activeSection, setActiveSection] = useState(getInitialActiveSection);
  const [componentQuery, setComponentQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [dropdownMessage, setDropdownMessage] = useState(
    "Selecciona una acción del menú.",
  );
  const [controlledModalOpen, setControlledModalOpen] = useState(false);

  const ui = docsTheme[resolvedTheme] ?? docsTheme.light;

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
          filteredComponents.some((candidate) => candidate.href === item.href),
        ),
      })).filter((group) => group.items.length > 0),
    [filteredComponents],
  );

  const activeComponentItem =
    COMPONENT_ITEMS.find((item) => item.href === activeSection) ?? null;
  const activeExampleItem =
    EXAMPLE_ITEMS.find((item) => item.href === activeSection) ?? null;
  const activeIntroItem =
    INTRO_ITEMS.find((item) => item.href === activeSection) ?? null;
  const activeLandingItem = activeSection === LANDING_ITEM.href ? LANDING_ITEM : null;

  const activeSectionId =
    activeLandingItem?.id ??
    activeIntroItem?.id ??
    activeExampleItem?.id ??
    activeComponentItem?.id ??
    "getting-started";

  const activeVisibleSet = useMemo(() => new Set([activeSectionId]), [activeSectionId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const nextSection = findSection(window.location.pathname);

      if (normalizePathname(window.location.pathname) !== nextSection) {
        window.history.replaceState(null, "", nextSection);
      }

      setActiveSection(nextSection);
    };

    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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

      const anchor = event.target.closest("a[href]");

      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
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
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [activeSection]);

  const navigateTo = (href) => {
    if (href !== activeSection) {
      window.history.pushState(null, "", href);
    }

    setActiveSection(href);
    setMobileMenuOpen(false);
    scrollPageToTop("smooth");
  };

  const handleButtonLoadingStart = () => {
    setButtonLoading(true);
    window.setTimeout(() => setButtonLoading(false), 1800);
  };

  const renderActivePage = () => {
    if (activeLandingItem) {
      return <IntroductionDocs ui={ui} visibleIds={new Set(["landing"])} />;
    }

    if (activeIntroItem) {
      return <IntroductionDocs ui={ui} visibleIds={activeVisibleSet} />;
    }

    if (activeExampleItem) {
      return <ExamplesDocs ui={ui} visibleIds={activeVisibleSet} />;
    }

    switch (activeSectionId) {
      case "components-home":
        return <IntroductionDocs ui={ui} visibleIds={activeVisibleSet} />;

      case "provider":
      case "theme":
      case "use-breakpoint":
      case "use-media-query":
      case "use-focus-ring":
      case "use-ripple":
      case "colors":
      case "states":
        return <FoundationsDocs ui={ui} visibleIds={activeVisibleSet} />;

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

      default:
        return (
          <IntroductionDocs
            ui={ui}
            visibleIds={new Set(["getting-started"])}
          />
        );
    }
  };

  const showSidebar = !activeLandingItem && Boolean(activeComponentItem || activeExampleItem || activeIntroItem);

  return (
    <div className={cn("min-h-screen", ui.page)}>
      <DocsHeader
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        showSidebar={showSidebar}
        setMobileMenuOpen={setMobileMenuOpen}
        resolvedTheme={resolvedTheme}
        toggleTheme={toggleTheme}
        ui={ui}
      />

      <MobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
        componentQuery={componentQuery}
        filteredComponentGroups={filteredComponentGroups}
        onComponentQueryChange={setComponentQuery}
        onNavigate={navigateTo}
        resolvedTheme={resolvedTheme}
        toggleTheme={toggleTheme}
        ui={ui}
      />

      <div className="docs-shell">
        <div className="docs-main-grid">
          {showSidebar ? (
            <aside className="sticky top-20 hidden h-[calc(100vh-5.5rem)] self-start lg:block">
              <div className="docs-scrollbar h-full">
                <DocsSidebar
                  activeSection={activeSection}
                  componentQuery={componentQuery}
                  filteredComponentGroups={filteredComponentGroups}
                  onComponentQueryChange={setComponentQuery}
                  onNavigate={navigateTo}
                  ui={ui}
                />
              </div>
            </aside>
          ) : null}

          <main className="docs-main-content" data-docs-main>
            <div className={cn("docs-page-shell", activeLandingItem && "docs-page-shell-wide")}>
              {renderActivePage()}

              {activeComponentItem &&
              !filteredComponents.some((item) => item.href === activeSection) ? (
                <div className="pt-8">
                  <EmptyState>
                    <EmptyStateTitle>
                      Este componente no coincide con el filtro actual
                    </EmptyStateTitle>
                    <EmptyStateDescription>
                      La página sigue abierta, pero el filtro del sidebar lo
                      oculta de la navegación. Limpia la búsqueda para volver a
                      verlo en la lista.
                    </EmptyStateDescription>
                  </EmptyState>
                </div>
              ) : null}
            </div>
          </main>

          <aside className={cn("hidden 2xl:block", activeLandingItem && "2xl:hidden")}>
            <div className="sticky top-24 py-8">
              <DocsToC activeSection={activeSection} ui={ui} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
