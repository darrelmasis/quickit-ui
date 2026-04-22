import { useEffect, useState, useMemo } from "react";
import { For, cn } from "@/lib";

export default function WebsitePageToc({ sections }) {
  const [activeId, setActiveId] = useState("");

  const allSectionIds = useMemo(() => {
    const ids = [];
    sections.forEach((s) => {
      if (s.id) ids.push(s.id);
      if (s.children) {
        s.children.forEach((c) => {
          if (c.id) ids.push(c.id);
        });
      }
    });
    return ids;
  }, [sections]);

  const resolvedActiveId =
    allSectionIds.includes(activeId) ? activeId : (allSectionIds[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0,
      },
    );

    allSectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [allSectionIds]);

  const handleLinkClick = (id) => {
    setActiveId(id);
  };

  const renderLink = (id, label, isChild = false) => {
    const isActive = resolvedActiveId === id;
    
    return (
      <a
        href={`#${id}`}
        onClick={() => handleLinkClick(id)}
        className={cn(
          "block transition-colors",
          isChild 
            ? "break-words rounded-md px-3 py-1.5 text-sm" 
            : "rounded-lg px-3 py-2 text-sm",
          isActive
            ? "bg-brand-50/50 font-semibold text-brand-600 dark:bg-brand-950/20 dark:text-brand-400"
            : isChild
              ? "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-500 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
              : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
        )}
      >
        {label}
      </a>
    );
  };

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
                {renderLink(section.id, section.label)}
                {section.children ? (
                  <div className="mt-1 space-y-1 pl-3 border-l border-neutral-200 dark:border-neutral-800 ml-3">
                    <For each={section.children}>
                      {(child, childIndex) => (
                        <div key={`${child.id}-${childIndex}`}>
                          {renderLink(child.id, child.label, true)}
                        </div>
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
