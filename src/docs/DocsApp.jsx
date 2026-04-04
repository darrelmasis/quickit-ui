import { useEffect, useMemo, useRef, useState } from "react";
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
  DEFAULT_COMPONENT_SECTION,
  DEFAULT_INTRO_SECTION,
  docsTheme,
  getInitialTheme,
  INTRO_ITEMS,
  STORAGE_KEY,
} from "@/docs/config";
import QuickitLogo from "@/docs/components/QuickitLogo";
import IntroductionDocs from "@/docs/sections/IntroductionDocs";
import CoreDocs from "@/docs/sections/CoreDocs";
import FormDocs from "@/docs/sections/FormDocs";
import OverlayDocs from "@/docs/sections/OverlayDocs";
import NavigationDocs from "@/docs/sections/NavigationDocs";
import UtilityDocs from "@/docs/sections/UtilityDocs";

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

export default function DocsApp() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeSection, setActiveSection] = useState(getInitialActiveSection);
  const [componentQuery, setComponentQuery] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [dropdownMessage, setDropdownMessage] = useState(
    "Selecciona una acción del menú.",
  );
  const [controlledModalOpen, setControlledModalOpen] = useState(false);
  const contentScrollRef = useRef(null);
  const ui = docsTheme[theme];

  const filteredComponents = useMemo(() => {
    const query = componentQuery.trim().toLowerCase();

    if (!query) {
      return COMPONENT_ITEMS;
    }

    return COMPONENT_ITEMS.filter((item) =>
      item.label.toLowerCase().includes(query),
    );
  }, [componentQuery]);

  const visibleComponentIds = useMemo(
    () => new Set(filteredComponents.map((item) => item.href.slice(1))),
    [filteredComponents],
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

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

  useEffect(() => {
    const root = contentScrollRef.current;

    if (!root) {
      return undefined;
    }

    const itemsInOrder = [...INTRO_ITEMS, ...filteredComponents];
    const sections = itemsInOrder
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const updateActiveSection = () => {
      const rootTop = root.getBoundingClientRect().top;
      const activationOffset = 120;
      let nextSection = `#${sections[0].id}`;

      for (const section of sections) {
        const relativeTop = section.getBoundingClientRect().top - rootTop;

        if (relativeTop <= activationOffset) {
          nextSection = `#${section.id}`;
          continue;
        }

        break;
      }

      setActiveSection((current) =>
        current === nextSection ? current : nextSection,
      );

      if (window.location.hash !== nextSection) {
        window.history.replaceState(null, "", nextSection);
      }
    };

    updateActiveSection();
    root.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      root.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [filteredComponents]);

  const navigateToSection = (href, type) => {
    const id = href.slice(1);
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    setActiveSection(href);
    window.history.replaceState(null, "", href);
    element.scrollIntoView({
      behavior: "smooth",
      block: type === "intro" ? "nearest" : "start",
    });
  };

  const handleButtonLoadingStart = () => {
    setButtonLoading(true);
    window.setTimeout(() => {
      setButtonLoading(false);
    }, 1800);
  };

  const singleVisibleSet = (id) =>
    visibleComponentIds.has(id) ? new Set([id]) : new Set();

  return (
    <QuickitProvider theme={theme}>
      <main className={`h-screen overflow-hidden ${ui.page}`}>
        <div className="flex h-full flex-col">
          <header className={`sticky top-0 z-50 border-b ${ui.surface}`}>
            <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Link
                    href="/"
                    className={`${theme === "dark" ? "text-white" : "text-neutral-900"}`}
                  >
                    <QuickitLogo className="h-6 w-auto" />
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2">
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
            </div>
          </header>

          <div className="mx-auto grid min-h-0 w-full max-w-[1800px] flex-1 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside
              className={`min-h-0 overflow-y-auto border-r ${ui.sidebar} [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="min-h-full p-4 sm:p-5">
                <div>
                  <div>
                    <p
                      className={`mb-3 text-xs font-semibold uppercase tracking-[0.18em] ${ui.accent}`}
                    >
                      Introducción
                    </p>
                    <div className="space-y-2">
                      {INTRO_ITEMS.map((item) => (
                        <Button
                          key={item.href}
                          fullWidth
                          size="sm"
                          color="neutral"
                          variant={
                            activeSection === item.href ? "solid" : "ghost"
                          }
                          className="justify-start"
                          onClick={() => navigateToSection(item.href, "intro")}
                        >
                          {item.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className={`sticky top-0 z-10 pb-4 pt-4 ${ui.sidebar}`}>
                    <p
                      className={`mb-3 text-xs font-semibold uppercase tracking-[0.18em] ${ui.accent}`}
                    >
                      Componentes
                    </p>
                    <Input
                      size="sm"
                      value={componentQuery}
                      onChange={(event) =>
                        setComponentQuery(event.target.value)
                      }
                      placeholder="Buscar componente"
                    />
                  </div>

                  <div className="space-y-2">
                    {filteredComponents.map((item) => (
                      <Button
                        key={item.href}
                        fullWidth
                        size="sm"
                        color="neutral"
                        variant={
                          activeSection === item.href ? "solid" : "ghost"
                        }
                        className="justify-start"
                        onClick={() =>
                          navigateToSection(item.href, "component")
                        }
                      >
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <section
              ref={contentScrollRef}
              className="min-h-0 overflow-y-auto scroll-smooth"
            >
              <div className="p-4 sm:p-6 lg:p-8">
                <IntroductionDocs ui={ui} />

                {filteredComponents.length ? (
                  <div className="space-y-0">
                    <NavigationDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("accordion")}
                    />
                    <UtilityDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("avatar")}
                    />
                    <UtilityDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("badge")}
                    />
                    <NavigationDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("breadcrumb")}
                    />
                    <CoreDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("button")}
                      buttonLoading={buttonLoading}
                      onButtonLoadingStart={handleButtonLoadingStart}
                    />
                    <FormDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("checkbox")}
                    />
                    <OverlayDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("dropdown")}
                      dropdownMessage={dropdownMessage}
                      onDropdownMessageChange={setDropdownMessage}
                      controlledModalOpen={controlledModalOpen}
                      onControlledModalChange={setControlledModalOpen}
                    />
                    <UtilityDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("empty-state")}
                    />
                    <FormDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("form-control")}
                    />
                    <FormDocs ui={ui} visibleIds={singleVisibleSet("input")} />
                    <FormDocs ui={ui} visibleIds={singleVisibleSet("label")} />
                    <UtilityDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("link")}
                    />
                    <OverlayDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("modal")}
                      dropdownMessage={dropdownMessage}
                      onDropdownMessageChange={setDropdownMessage}
                      controlledModalOpen={controlledModalOpen}
                      onControlledModalChange={setControlledModalOpen}
                    />
                    <NavigationDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("pagination")}
                    />
                    <OverlayDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("popover")}
                      dropdownMessage={dropdownMessage}
                      onDropdownMessageChange={setDropdownMessage}
                      controlledModalOpen={controlledModalOpen}
                      onControlledModalChange={setControlledModalOpen}
                    />
                    <FormDocs ui={ui} visibleIds={singleVisibleSet("radio")} />
                    <FormDocs ui={ui} visibleIds={singleVisibleSet("select")} />
                    <UtilityDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("skeleton")}
                    />
                    <FormDocs ui={ui} visibleIds={singleVisibleSet("switch")} />
                    <NavigationDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("tabs")}
                    />
                    <FormDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("textarea")}
                    />
                    <OverlayDocs
                      ui={ui}
                      visibleIds={singleVisibleSet("tooltip")}
                      dropdownMessage={dropdownMessage}
                      onDropdownMessageChange={setDropdownMessage}
                      controlledModalOpen={controlledModalOpen}
                      onControlledModalChange={setControlledModalOpen}
                    />
                  </div>
                ) : (
                  <div className="pt-8">
                    <EmptyState>
                      <EmptyStateTitle>No hay coincidencias</EmptyStateTitle>
                      <EmptyStateDescription>
                        Prueba con otro nombre o limpia el buscador para ver
                        todos los componentes disponibles.
                      </EmptyStateDescription>
                    </EmptyState>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </QuickitProvider>
  );
}
