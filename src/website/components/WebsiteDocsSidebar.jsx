import { useMemo, useState } from "react";
import { Button, For, Link, Show, Input } from "@/lib";
import { ChevronDownIcon } from "@/lib/assets/icons";
import { cn } from "@/lib/utils";
import {
  getWebsiteDocsSectionRoute,
  getWebsiteHookRoute,
} from "@/website/docs-navigation";
import { getWebsiteComponentRoute } from "@/website/site-config";

function getSectionState(section, currentPath) {
  const baseHref = getWebsiteDocsSectionRoute(section.id);
  const childEntries =
    section.children?.map((child) => {
      const childSlug = child.id.replace("hook-", "");
      return {
        ...child,
        href: getWebsiteHookRoute(childSlug),
      };
    }) ?? [];

  return {
    baseHref,
    childEntries,
    hasChildren: childEntries.length > 0,
    isActive: currentPath === baseHref,
    isChildActive: childEntries.some((child) => child.href === currentPath),
  };
}

function SidebarLink({ href, isActive, children }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex h-8 w-full items-center rounded-md px-3 text-[0.8125rem] transition-colors no-underline",
        isActive
          ? "bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
          : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
      )}
    >
      {children}
    </Link>
  );
}

export default function WebsiteDocsSidebar({
  componentGroups,
  currentComponentSlug,
  sections,
  currentPath,
}) {
  const [openSections, setOpenSections] = useState(() => new Set());
  const [filter, setFilter] = useState("");
  const [collapsedGroups, setCollapsedGroups] = useState(() => new Set());

  const toggleGroup = (id) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allComponents = useMemo(
    () =>
      componentGroups
        .flatMap((group) => group.items)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [componentGroups],
  );

  const filteredComponents = useMemo(
    () =>
      filter
        ? allComponents.filter((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase()),
          )
        : allComponents,
    [allComponents, filter],
  );

  const activeSectionIds = useMemo(
    () =>
      new Set(
        sections
          .filter((section) => {
            const state = getSectionState(section, currentPath);
            return state.isActive || state.isChildActive;
          })
          .map((section) => section.id),
      ),
    [sections, currentPath],
  );

  return (
    <aside className="hidden border-r border-neutral-200 dark:border-neutral-800 lg:fixed lg:top-14 lg:block lg:h-[calc(100vh-3.5rem)] lg:w-60 xl:w-64 lg:overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(transparent_0px,#000_32px,#000_calc(100%-32px),transparent)]">
      <div className="p-3 pb-8 pt-8">
        <div className="flex flex-col gap-6">
          <div>
            <Button
              color="light"
              variant="ghost"
              fullWidth
              align="left"
              onClick={() => toggleGroup("docs")}
              className="!justify-start"
            >
              <ChevronDownIcon
                className={cn(
                  "size-3 transition-transform duration-200",
                  !collapsedGroups.has("docs") && "rotate-180",
                )}
              />
              Documentación
            </Button>
            <div
              className={cn(
                "mt-2 grid transition-[grid-template-rows,opacity] duration-200 ease-out",
                !collapsedGroups.has("docs")
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <nav className="flex flex-col gap-0.5">
                  <For each={sections}>
                    {(section, index) => {
                      const {
                        baseHref,
                        childEntries,
                        hasChildren,
                        isActive,
                        isChildActive,
                      } = getSectionState(section, currentPath);
                      const isExpanded =
                        hasChildren &&
                        (openSections.has(section.id) ||
                          activeSectionIds.has(section.id) ||
                          isChildActive);

                      return (
                        <div
                          key={`${section.id}-${index}`}
                          className="flex flex-col gap-0.5"
                        >
                          <div className="flex items-center gap-0.5">
                            <SidebarLink
                              href={baseHref}
                              isActive={isActive || isChildActive}
                            >
                              {section.label}
                            </SidebarLink>
                            <Show when={hasChildren}>
                              <Button
                                size="sm"
                                shape="square"
                                color="neutral"
                                variant="ghost"
                                activeMotion={false}
                                aria-controls={`sidebar-section-${section.id}`}
                                aria-expanded={isExpanded}
                                aria-label={`${isExpanded ? "Colapsar" : "Expandir"} ${section.label}`}
                                className="h-7 w-7 shrink-0 rounded-md"
                                onClick={() => {
                                  setOpenSections((previous) => {
                                    const next = new Set(previous);
                                    if (next.has(section.id)) {
                                      next.delete(section.id);
                                    } else {
                                      next.add(section.id);
                                    }
                                    return next;
                                  });
                                }}
                              >
                                <ChevronDownIcon
                                  className={cn(
                                    "size-3 transition-transform duration-200",
                                    isExpanded && "rotate-180",
                                  )}
                                />
                              </Button>
                            </Show>
                          </div>
                          <Show when={hasChildren}>
                            <div
                              id={`sidebar-section-${section.id}`}
                              aria-hidden={!isExpanded}
                              data-state={isExpanded ? "open" : "closed"}
                              className={cn(
                                "ml-3 grid transition-[grid-template-rows,opacity] duration-200 ease-out",
                                isExpanded
                                  ? "grid-rows-[1fr] opacity-100"
                                  : "grid-rows-[0fr] opacity-0",
                              )}
                            >
                              <div className="min-h-0 overflow-hidden">
                                <div className="flex flex-col gap-0.5 border-l border-neutral-200 pl-3 dark:border-neutral-800">
                                  <For each={childEntries}>
                                    {(child) => {
                                      const isCurrentChild =
                                        currentPath === child.href;
                                      return (
                                        <Link
                                          key={child.id}
                                          href={child.href}
                                          className={cn(
                                            "relative flex h-7 items-center rounded-md px-3 text-[0.8125rem] transition-colors no-underline",
                                            isCurrentChild
                                              ? "bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
                                              : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
                                          )}
                                        >
                                          {child.label}
                                        </Link>
                                      );
                                    }}
                                  </For>
                                </div>
                              </div>
                            </div>
                          </Show>
                        </div>
                      );
                    }}
                  </For>
                </nav>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <Input
                type="search"
                placeholder="Filtrar componentes..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                clearButton
              />
            </div>
            <Button
              color="light"
              variant="ghost"
              fullWidth
              align="left"
              onClick={() => toggleGroup("components")}
            >
              <ChevronDownIcon
                className={cn(
                  "size-3 transition-transform duration-200",
                  !collapsedGroups.has("components") && "rotate-180",
                )}
              />
              Componentes
            </Button>

            <div
              className={cn(
                "mt-2 grid transition-[grid-template-rows,opacity] duration-200 ease-out",
                !collapsedGroups.has("components")
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="flex flex-col gap-0.5">
                  <Show when={filteredComponents.length === 0}>
                    <p className="px-3 py-2 text-sm text-neutral-400 dark:text-neutral-500">
                      Sin resultados
                    </p>
                  </Show>
                  <For each={filteredComponents}>
                    {(item, index) => (
                      <Link
                        key={`${item.slug}-${index}`}
                        href={getWebsiteComponentRoute(item.slug)}
                        className={cn(
                          "relative flex h-8 items-center rounded-md px-3 text-[0.8125rem] transition-colors no-underline",
                          currentComponentSlug === item.slug
                            ? "bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
                            : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {item.name}
                          <Show when={item.isNew}>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          </Show>
                        </span>
                      </Link>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
