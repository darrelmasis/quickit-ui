export function hookToSlug(name) {
  return name
    .replace(/([A-Z])/g, "-$1")
    .replace(/^-/, "")
    .toLowerCase();
}

export function getWebsiteDocsSectionRoute(sectionId) {
  return sectionId === "hooks" ? "/docs/hooks" : `/docs/${sectionId}`;
}

export function getWebsiteHookRoute(hookNameOrSlug) {
  const slug = hookNameOrSlug.includes("-")
    ? hookNameOrSlug
    : hookToSlug(hookNameOrSlug);

  return `/docs/hooks/${slug}`;
}
