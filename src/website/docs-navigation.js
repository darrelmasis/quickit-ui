const WEBSITE_DOC_SECTION_SEGMENTS = {
  introduccion: "introduction",
  instalacion: "installation",
  migracion: "migration",
  changelog: "changelog",
  tema: "theme",
  comportamiento: "behavior",
  radio: "radius",
  tokens: "tokens",
  utilidades: "utilities",
  componentes: "components",
  hooks: "hooks",
};

const WEBSITE_DOC_SECTION_ALIASES = {
  introduccion: "introduccion",
  introduction: "introduccion",
  instalacion: "instalacion",
  installation: "instalacion",
  migracion: "migracion",
  migration: "migracion",
  "migracion-1-0-0": "migracion",
  "migracion-1-0-7": "migracion",
  "migracion-1-0-10": "migracion",
  "migracion-1-0-11": "migracion",
  "migration-1-0-0": "migracion",
  "migration-1-0-7": "migracion",
  "migration-1-0-10": "migracion",
  "migration-1-0-11": "migracion",
  changelog: "changelog",
  tema: "tema",
  theme: "tema",
  comportamiento: "comportamiento",
  behavior: "comportamiento",
  radio: "radio",
  radius: "radio",
  tokens: "tokens",
  utilidades: "utilidades",
  utilities: "utilidades",
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
