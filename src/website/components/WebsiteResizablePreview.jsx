import { useQuickitTheme } from "@/lib";
import WebsiteCodeBlock from "@/website/components/WebsiteCodeBlock";

export default function WebsiteResizablePreview({ code, children }) {
  const theme = useQuickitTheme();
  const isDark = theme === "dark";
  const previewBg = isDark ? "bg-neutral-800" : "bg-neutral-50";

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
      <div className={`relative flex min-h-[18rem] items-center justify-center overflow-hidden p-10 ${previewBg}`}>
        {/* Fondo decorativo con patrón de puntos */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgb(120 120 120) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
            opacity: isDark ? 0.3 : 0.5,
          }}
        />
        <div className="relative z-10 flex w-full items-center justify-center">
          {children}
        </div>
      </div>
      
      <div>
        <WebsiteCodeBlock code={code} language="tsx" />
      </div>
    </div>
  );
}
