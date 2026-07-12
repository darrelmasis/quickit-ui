import { useEffect, useState, useMemo } from "react";
import { For, Link, Show } from "@/lib";
import { cn } from "@/lib/utils";

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

  const renderLink = (id, label, depth = 0) => {
    const isActive = resolvedActiveId === id;
    return (
      <Link
        href={`#${id}`}
        onClick={() => handleLinkClick(id)}
        className={cn(
          "block transition-colors no-underline",
          depth === 0
            ? "py-1 text-[0.8125rem]"
            : "py-0.5 text-[0.8125rem]",
          isActive
            ? "font-medium text-neutral-900 dark:text-neutral-100"
            : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <aside className="hidden xl:sticky xl:top-20 xl:block xl:self-start xl:h-[calc(100vh-5rem)] xl:overflow-y-auto">
      <div className="w-56 max-w-full">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          En esta página
        </p>
        <nav className="mt-3 flex flex-col">
          <For each={sections}>
            {(section, index) => (
              <div key={`${section.id}-${index}`}>
                {renderLink(section.id, section.label, 0)}
                <Show when={section.children}>
                  <div className="flex flex-col border-l border-neutral-200 pl-3 ml-3 dark:border-neutral-800">
                    <For each={section.children}>
                      {(child, childIndex) => (
                        <div key={`${child.id}-${childIndex}`}>
                          {renderLink(child.id, child.label, 1)}
                        </div>
                      )}
                    </For>
                  </div>
                </Show>
              </div>
            )}
          </For>
        </nav>
      </div>
    </aside>
  );
}
