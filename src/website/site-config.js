export const WEBSITE_THEME_STORAGE_KEY = "quickit-ui-website-theme";

export const WEBSITE_ROUTES = {
  landing: "/",
  docs: "/docs",
  examples: "/examples",
  playground: "/playground",
};

export function getWebsiteSection(pathname) {
  if (!pathname || pathname === WEBSITE_ROUTES.landing) {
    return WEBSITE_ROUTES.landing;
  }

  if (
    pathname === WEBSITE_ROUTES.docs ||
    pathname.startsWith(`${WEBSITE_ROUTES.docs}/`)
  ) {
    return WEBSITE_ROUTES.docs;
  }

  if (
    pathname === WEBSITE_ROUTES.examples ||
    pathname.startsWith(`${WEBSITE_ROUTES.examples}/`)
  ) {
    return WEBSITE_ROUTES.examples;
  }

  if (pathname === WEBSITE_ROUTES.playground) {
    return WEBSITE_ROUTES.playground;
  }

  return WEBSITE_ROUTES.landing;
}

export function getWebsiteComponentRoute(slug) {
  return `${WEBSITE_ROUTES.docs}/components/${slug}`;
}

export const WEBSITE_NAV = [
  { href: WEBSITE_ROUTES.docs, label: "Docs" },
  { href: WEBSITE_ROUTES.playground, label: "Playground" },
  { href: WEBSITE_ROUTES.examples, label: "Ejemplos" },
];
