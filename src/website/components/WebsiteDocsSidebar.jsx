import { useMemo, useState } from "react";
import { Button, For } from "@/lib";
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

export default function WebsiteDocsSidebar({
  componentGroups,
  currentComponentSlug,
  sections,
  currentPath,
}) {
  const [openSections, setOpenSections] = useState(() => new Set());
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
    <aside className="hidden border-r border-neutral-200 dark:border-neutral-800 lg:fixed lg:top-[61px] lg:block lg:h-[calc(100vh-61px)] lg:overflow-y-auto pl-4 sm:pl-6 xl:pl-8 lg:pr-3 lg:[scrollbar-width:thin] lg:[scrollbar-color:rgb(163_163_163)_transparent] lg:[&::-webkit-scrollbar]:w-2 lg:[&::-webkit-scrollbar-track]:bg-transparent lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:[&::-webkit-scrollbar-thumb]:border-2 lg:[&::-webkit-scrollbar-thumb]:border-transparent lg:[&::-webkit-scrollbar-thumb]:bg-neutral-300 lg:[&::-webkit-scrollbar-thumb]:bg-clip-content lg:[&::-webkit-scrollbar-thumb:hover]:bg-neutral-400 dark:lg:[scrollbar-color:rgb(115_115_115)_transparent] dark:lg:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:lg:[&::-webkit-scrollbar-thumb:hover]:bg-neutral-600">
      <div className="space-y-8 py-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Documentación
          </p>
          <nav className="mt-4 space-y-1">
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
                  <div key={`${section.id}-${index}`} className="space-y-1">
                    <div className="flex items-center gap-1">
                      <a
                        href={baseHref}
                        className={
                          isActive || isChildActive
                            ? "block min-w-0 flex-1 rounded-xl bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-950 dark:bg-neutral-900 dark:text-neutral-100"
                            : "block min-w-0 flex-1 rounded-xl px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                        }
                      >
                        {section.label}
                      </a>

                      {hasChildren ? (
                        <Button
                          size="sm"
                          shape="square"
                          color="neutral"
                          variant="ghost"
                          activeMotion={false}
                          aria-controls={`sidebar-section-${section.id}`}
                          aria-expanded={isExpanded}
                          aria-label={`${isExpanded ? "Colapsar" : "Expandir"} ${section.label}`}
                          className="h-9 w-9 shrink-0 rounded-xl"
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
                              "size-3.5 transition-transform duration-200",
                              isExpanded && "rotate-180",
                            )}
                          />
                        </Button>
                      ) : null}
                    </div>

                    {hasChildren ? (
                      <div
                        id={`sidebar-section-${section.id}`}
                        aria-hidden={!isExpanded}
                        data-state={isExpanded ? "open" : "closed"}
                        className={cn(
                          "ml-4 grid transition-[grid-template-rows,opacity] duration-200 ease-out",
                          isExpanded
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="space-y-1 border-l border-neutral-100 pl-4 pt-1 dark:border-neutral-800">
                            {childEntries.map((child) => {
                              const isCurrentChild = currentPath === child.href;

                              return (
                                <a
                                  key={child.id}
                                  href={child.href}
                                  className={
                                    isCurrentChild
                                      ? "block py-1 text-xs font-medium text-brand-600"
                                      : "block py-1 text-xs text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-100"
                                  }
                                >
                                  {child.label}
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              }}
            </For>
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Componentes
          </p>
          <div className="mt-4 space-y-4">
            <For each={componentGroups}>
              {(group, groupIndex) => (
                <div key={`${group.title}-${groupIndex}`}>
                  <p className="px-3 text-xs font-medium text-white">
                    {group.title}
                  </p>
                  <div className="mt-2 space-y-1 px-3">
                    <For each={group.items}>
                      {(item, itemIndex) => (
                        <a
                          key={`${item.slug}-${itemIndex}`}
                          href={getWebsiteComponentRoute(item.slug)}
                          className={
                            currentComponentSlug === item.slug
                              ? "block rounded-lg bg-neutral-100 px-2 py-1.5 text-sm font-medium text-neutral-950 dark:bg-neutral-900 dark:text-neutral-100"
                              : "block rounded-lg px-2 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                          }
                        >
                          <span className="flex items-center gap-2">
                            {item.name}
                            {item.isNew ? (
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            ) : null}
                          </span>
                        </a>
                      )}
                    </For>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </aside>
  );
}
