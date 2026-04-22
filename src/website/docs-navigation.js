const WEBSITE_DOC_SECTION_SEGMENTS = {
  introduccion: "introduction",
  instalacion: "installation",
  "migracion-1-0-7": "migration",
  changelog: "changelog",
  tema: "theme",
  comportamiento: "behavior",
  tokens: "tokens",
  componentes: "components",
  hooks: "hooks",
};

const WEBSITE_DOC_SECTION_ALIASES = {
  introduccion: "introduccion",
  introduction: "introduccion",
  instalacion: "instalacion",
  installation: "instalacion",
  "migracion-1-0-0": "migracion-1-0-7",
  "migracion-1-0-7": "migracion-1-0-7",
  migration: "migracion-1-0-7",
  "migration-1-0-0": "migracion-1-0-7",
  "migration-1-0-7": "migracion-1-0-7",
  changelog: "changelog",
  tema: "tema",
  theme: "tema",
  comportamiento: "comportamiento",
  behavior: "comportamiento",
  tokens: "tokens",
  componentes: "componentes",
  components: "componentes",
  hooks: "hooks",
};

export function hookToSlug(name) {
  return name
    .replace(/([A-Z])/g, "-$1")
    .replace(/^-/, "")
    .toLowerCase();
}

export function getWebsiteDocsSectionRoute(sectionId) {
  const segment = WEBSITE_DOC_SECTION_SEGMENTS[sectionId] ?? sectionId;
  if (sectionId === "introduccion") {
    return "/docs";
  }

  return sectionId === "hooks" ? "/docs/hooks" : `/docs/${segment}`;
}

export function getWebsiteHookRoute(hookNameOrSlug) {
  const slug = hookNameOrSlug.includes("-")
    ? hookNameOrSlug
    : hookToSlug(hookNameOrSlug);

  return `/docs/hooks/${slug}`;
}

export function getWebsiteDocsSectionIdFromSegment(segment) {
  return WEBSITE_DOC_SECTION_ALIASES[segment] ?? segment;
}

export function resolveWebsiteDocsPath(pathname) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] !== "docs") {
    return pathname;
  }

  if (segments[1] === "hooks") {
    if (!segments[2]) {
      return "/docs/hooks";
    }

    return `/docs/hooks/${segments[2]}`;
  }

  if (segments[1] === "components" && segments[2]) {
    return `/docs/components/${segments[2]}`;
  }

  if (segments[1] === "componentes") {
    if (segments[2]) {
      return `/docs/components/${segments[2]}`;
    }

    return "/docs/components";
  }

  const sectionId = getWebsiteDocsSectionIdFromSegment(segments[1] ?? "");

  if (sectionId === "componentes") {
    return "/docs/components";
  }

  return getWebsiteDocsSectionRoute(sectionId || "introduccion");
}
