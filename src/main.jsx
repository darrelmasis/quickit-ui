import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import { QuickitThemeProvider } from "@/lib";
import WebsiteApp from "@/website/WebsiteApp";
import { WEBSITE_THEME_STORAGE_KEY } from "@/website/site-config";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuickitThemeProvider
      defaultTheme="system"
      pressEffect="ripple"
      ripple={true}
      storageKey={WEBSITE_THEME_STORAGE_KEY}
    >
      <WebsiteApp />
    </QuickitThemeProvider>
  </StrictMode>,
);
