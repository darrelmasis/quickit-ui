import { For } from "@/lib";

export default function WebsitePageToc({ sections }) {
  return (
    <aside className="hidden xl:sticky xl:top-24 xl:block xl:self-start xl:h-[calc(100vh-7rem)] xl:overflow-y-auto xl:overflow-x-hidden xl:pr-3 xl:[scrollbar-width:thin] xl:[scrollbar-color:rgb(163_163_163)_transparent] xl:[&::-webkit-scrollbar]:w-2 xl:[&::-webkit-scrollbar-track]:bg-transparent xl:[&::-webkit-scrollbar-thumb]:rounded-full xl:[&::-webkit-scrollbar-thumb]:border-2 xl:[&::-webkit-scrollbar-thumb]:border-transparent xl:[&::-webkit-scrollbar-thumb]:bg-neutral-300 xl:[&::-webkit-scrollbar-thumb]:bg-clip-content xl:[&::-webkit-scrollbar-thumb:hover]:bg-neutral-400 dark:xl:[scrollbar-color:rgb(115_115_115)_transparent] dark:xl:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:xl:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:xl:[&::-webkit-scrollbar-thumb:hover]:bg-neutral-600">
      <div className="w-56 max-w-full">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
          En esta página
        </p>
        <nav className="mt-4 space-y-1">
          <For each={sections}>
            {(section, index) => (
              <div key={`${section.id}-${index}`}>
                <a
                  href={`#${section.id}`}
                  className="block rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                >
                  {section.label}
                </a>
                {section.children ? (
                  <div className="mt-1 space-y-1 pl-3">
                    <For each={section.children}>
                      {(child, childIndex) => (
                        <a
                          key={`${child.id}-${childIndex}`}
                          href={`#${child.id}`}
                          className="block break-words rounded-md px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-500 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                        >
                          {child.label}
                        </a>
                      )}
                    </For>
                  </div>
                ) : null}
              </div>
            )}
          </For>
        </nav>
      </div>
    </aside>
  );
}
