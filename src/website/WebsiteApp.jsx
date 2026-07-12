import { useEffect, useState } from "react";
import { Default, Match, RenderSwitch } from "@/lib";
import { WEBSITE_ROUTES, getWebsiteSection } from "@/website/site-config";
import WebsiteHeader from "@/website/components/WebsiteHeader";
import {
  resolveWebsiteNavigation,
  resolveWebsitePath,
  scrollToWebsiteHash,
  shouldHandleWebsiteClick,
} from "@/website/router";
import LandingPage from "@/website/sections/LandingPage";
import DocsPage from "@/website/sections/DocsPage";
import ExamplesPage from "@/website/sections/ExamplesPage";
import PlaygroundPage from "@/website/sections/PlaygroundPage";

export default function WebsiteApp() {
  const [activePath, setActivePath] = useState(() =>
    typeof window === "undefined"
      ? WEBSITE_ROUTES.landing
      : resolveWebsitePath(window.location.pathname),
  );

  useEffect(() => {
    const handlePopState = () => {
      const nextPath = resolveWebsitePath(window.location.pathname);

      if (nextPath !== window.location.pathname) {
        window.history.replaceState(
          null,
          "",
          `${nextPath}${window.location.hash}`,
        );
      }

      setActivePath(nextPath);
      requestAnimationFrame(() => {
        scrollToWebsiteHash(window.location.hash, "auto");
      });
    };

    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const navigateWithinWebsite = (url) => {
      const nextPath = resolveWebsitePath(url.pathname);
      const nextLocation = `${nextPath}${url.hash}`;

      if (
        nextPath !== window.location.pathname ||
        url.hash !== window.location.hash
      ) {
        window.history.pushState(null, "", nextLocation);
      }

      setActivePath(nextPath);

      requestAnimationFrame(() => {
        scrollToWebsiteHash(url.hash);
      });
    };

    const handleDocumentClick = (event) => {
      if (!shouldHandleWebsiteClick(event)) {
        return;
      }

      const anchor = event.target.closest("a[href]");

      if (!anchor) {
        return;
      }

      const navigation = resolveWebsiteNavigation(anchor);

      if (navigation.type === "ignore" || navigation.type === "external") {
        return;
      }

      if (navigation.type === "hash") {
        event.preventDefault();
        window.history.pushState(null, "", navigation.href);
        requestAnimationFrame(() => {
          scrollToWebsiteHash(navigation.hash);
        });
        return;
      }

      event.preventDefault();
      navigateWithinWebsite({ hash: navigation.hash, pathname: navigation.path });
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
        <Match when={WEBSITE_ROUTES.playground}>
          <PlaygroundPage />
        </Match>
        <Default>
          <LandingPage />
        </Default>
      </RenderSwitch>
    </div>
  );
}
