import { For } from "@/lib";
import { getWebsiteComponentRoute } from "@/website/site-config";

export default function WebsiteDocsSidebar({
  componentGroups,
  currentComponentSlug,
  sections,
  currentPath,
}) {
  return (
    <aside className="hidden self-start lg:sticky lg:top-24 lg:block lg:h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-3 lg:[scrollbar-width:thin] lg:[scrollbar-color:rgb(163_163_163)_transparent] lg:[&::-webkit-scrollbar]:w-2 lg:[&::-webkit-scrollbar-track]:bg-transparent lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:[&::-webkit-scrollbar-thumb]:border-2 lg:[&::-webkit-scrollbar-thumb]:border-transparent lg:[&::-webkit-scrollbar-thumb]:bg-neutral-300 lg:[&::-webkit-scrollbar-thumb]:bg-clip-content lg:[&::-webkit-scrollbar-thumb:hover]:bg-neutral-400 dark:lg:[scrollbar-color:rgb(115_115_115)_transparent] dark:lg:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:lg:[&::-webkit-scrollbar-thumb:hover]:bg-neutral-600">
      <div className="space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
            Documentación
          </p>
          <nav className="mt-4 space-y-1">
            <For each={sections}>
              {(section, index) => {
                const isHooks = section.id === "hooks";
                const baseHref = isHooks ? "/docs/hooks" : `/docs/${section.id}`;
                
                const isActive = currentPath === baseHref;
                
                return (
                  <div key={`${section.id}-${index}`} className="space-y-1">
                    <a
                      href={baseHref}
                      className={
                        isActive 
                          ? "block rounded-xl bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-950 dark:bg-neutral-900 dark:text-neutral-100"
                          : "block rounded-xl px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                      }
                    >
                      {section.label}
                    </a>
                    {section.children && (
                      <div className="ml-4 space-y-1 border-l border-neutral-100 pl-4 dark:border-neutral-800">
                        {section.children.map((child) => {
                          const childSlug = child.id.replace("hook-", "");
                          const childHref = `/docs/hooks/${childSlug}`;
                          const isChildActive = currentPath === childHref;

                          return (
                            <a
                              key={child.id}
                              href={childHref}
                              className={
                                isChildActive
                                  ? "block py-1 text-xs font-medium text-brand-600"
                                  : "block py-1 text-xs text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-100"
                              }
                            >
                              {child.label}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }}
            </For>
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
            Componentes
          </p>
          <div className="mt-4 space-y-4">
            <For each={componentGroups}>
              {(group, groupIndex) => (
                <div key={`${group.title}-${groupIndex}`}>
                  <p className="px-3 text-xs font-medium text-neutral-500 dark:text-neutral-500">
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
