import { useEffect, useState } from "react";
import { Default, Match, RenderSwitch } from "@/lib";
import { WEBSITE_ROUTES, getWebsiteSection } from "@/website/site-config";
import WebsiteHeader from "@/website/components/WebsiteHeader";
import LandingPage from "@/website/sections/LandingPage";
import DocsPage from "@/website/sections/DocsPage";
import ExamplesPage from "@/website/sections/ExamplesPage";

function normalizePathname(pathname) {
  if (!pathname) {
    return WEBSITE_ROUTES.landing;
  }

  if (pathname.endsWith("/") && pathname.length > 1) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function resolvePath(pathname) {
  return normalizePathname(pathname);
}

function scrollToHash(hash, behavior = "smooth") {
  if (!hash) {
    window.scrollTo({ top: 0, left: 0, behavior });
    return;
  }

  const element = document.getElementById(decodeURIComponent(hash.slice(1)));

  if (element) {
    element.scrollIntoView({ block: "start", behavior });
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior });
}

export default function WebsiteApp() {
  const [activePath, setActivePath] = useState(() =>
    typeof window === "undefined"
      ? WEBSITE_ROUTES.landing
      : resolvePath(window.location.pathname),
  );

  useEffect(() => {
    const handlePopState = () => {
      setActivePath(resolvePath(window.location.pathname));
      requestAnimationFrame(() => {
        scrollToHash(window.location.hash, "auto");
      });
    };

    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const navigateWithinWebsite = (url) => {
      const nextPath = resolvePath(url.pathname);
      const nextLocation = `${nextPath}${url.hash}`;

      if (
        nextPath !== window.location.pathname ||
        url.hash !== window.location.hash
      ) {
        window.history.pushState(null, "", nextLocation);
      }

      setActivePath(nextPath);

      requestAnimationFrame(() => {
        scrollToHash(url.hash);
      });
    };

    const handleDocumentClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = event.target.closest("a[href]");

      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");

      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      if (href.startsWith("#")) {
        event.preventDefault();
        const nextLocation = `${window.location.pathname}${href}`;
        window.history.pushState(null, "", nextLocation);
        requestAnimationFrame(() => {
          scrollToHash(href);
        });
        return;
      }

      const url = new URL(anchor.href, window.location.origin);

      if (url.origin !== window.location.origin) {
        return;
      }
      event.preventDefault();
      navigateWithinWebsite(url);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-100">
      <WebsiteHeader activePath={getWebsiteSection(activePath)} />
      <RenderSwitch value={getWebsiteSection(activePath)}>
        <Match when={WEBSITE_ROUTES.docs}>
          <DocsPage currentPath={activePath} />
        </Match>
        <Match when={WEBSITE_ROUTES.examples}>
          <ExamplesPage />
        </Match>
        <Default>
          <LandingPage />
        </Default>
      </RenderSwitch>
    </div>
  );
}
