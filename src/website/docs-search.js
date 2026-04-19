import {
  WEBSITE_COMPONENT_GROUPS,
  WEBSITE_DOC_OVERVIEW_SECTIONS,
  WEBSITE_HOOKS,
} from "@/website/docs-content";
import {
  getWebsiteDocsSectionRoute,
  getWebsiteHookRoute,
} from "@/website/docs-navigation";
import { getWebsiteComponentRoute } from "@/website/site-config";

export function buildWebsiteSearchIndex() {
  const guideEntries = WEBSITE_DOC_OVERVIEW_SECTIONS.map((section) => ({
    id: `guide-${section.id}`,
    label: section.label,
    href: getWebsiteDocsSectionRoute(section.id),
    group: "Guías",
    keywords: [
      section.id,
      section.label,
      "documentación",
      "docs",
      "guía",
    ],
  }));

  const hookEntries = WEBSITE_HOOKS.map((hook) => ({
    id: `hook-${hook.name}`,
    label: hook.name,
    href: getWebsiteHookRoute(hook.name),
    group: "Hooks",
    keywords: [
      hook.name,
      hook.description,
      "hook",
      "api",
      "documentación",
    ],
  }));

  const componentEntries = WEBSITE_COMPONENT_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      id: `component-${item.slug}`,
      label: item.name,
      href: getWebsiteComponentRoute(item.slug),
      group: group.title,
      keywords: [
        item.slug,
        item.name,
        item.description,
        group.title,
        "componente",
        "ui",
      ],
    })),
  );

  return [...guideEntries, ...hookEntries, ...componentEntries];
}

export function getWebsiteSearchGroups(onNavigate) {
  const entries = buildWebsiteSearchIndex();
  const groups = new Map();

  entries.forEach((entry) => {
    if (!groups.has(entry.group)) {
      groups.set(entry.group, []);
    }

    groups.get(entry.group).push({
      id: entry.id,
      keywords: entry.keywords,
      label: entry.label,
      onSelect: () => onNavigate(entry.href),
    });
  });

  return Array.from(groups.entries()).map(([heading, items]) => ({
    heading,
    items,
  }));
}
