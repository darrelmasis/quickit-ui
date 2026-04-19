import { WEBSITE_ROUTES } from "@/website/site-config";
import { resolveWebsiteDocsPath } from "@/website/docs-navigation";

export function normalizeWebsitePathname(pathname) {
  if (!pathname) {
    return WEBSITE_ROUTES.landing;
  }

  if (pathname.endsWith("/") && pathname.length > 1) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

export function resolveWebsitePath(pathname) {
  const normalizedPath = normalizeWebsitePathname(pathname);
  return resolveWebsiteDocsPath(normalizedPath);
}

export function getWebsiteScrollTargetId(hash) {
  if (!hash) {
    return null;
  }

  return decodeURIComponent(hash.slice(1));
}

export function scrollToWebsiteHash(hash, behavior = "smooth") {
  if (!hash) {
    window.scrollTo({ top: 0, left: 0, behavior });
    return;
  }

  const element = document.getElementById(getWebsiteScrollTargetId(hash));

  if (element) {
    element.scrollIntoView({ block: "start", behavior });
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior });
}

export function shouldHandleWebsiteClick(event) {
  return !(
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export function resolveWebsiteNavigation(anchor, origin = window.location.origin) {
  const href = anchor.getAttribute("href");

  if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return { type: "ignore" };
  }

  if (href.startsWith("#")) {
    return {
      type: "hash",
      hash: href,
      href: `${window.location.pathname}${href}`,
    };
  }

  const url = new URL(anchor.href, origin);

  if (url.origin !== origin) {
    return { type: "external", url };
  }

  const path = resolveWebsitePath(url.pathname);
  return {
    type: "internal",
    hash: url.hash,
    href: `${path}${url.hash}`,
    path,
  };
}

export function navigateWebsiteToHref(href) {
  const url = new URL(href, window.location.origin);

  if (url.origin !== window.location.origin) {
    window.location.assign(url.toString());
    return;
  }

  const path = resolveWebsitePath(url.pathname);
  const nextLocation = `${path}${url.hash}`;
  const currentLocation = `${window.location.pathname}${window.location.hash}`;

  if (nextLocation !== currentLocation) {
    window.history.pushState(null, "", nextLocation);
  }

  window.dispatchEvent(new PopStateEvent("popstate"));
}
