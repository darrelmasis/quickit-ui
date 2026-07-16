import { useQuickitTheme } from "@/lib";
import WebsiteCodeBlock from "@/website/components/WebsiteCodeBlock";

export default function WebsitePreviewTabs({ code, children }) {
  const theme = useQuickitTheme();
  const isDark = theme === "dark";
  const previewBg = isDark ? "bg-neutral-900" : "bg-white";

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
      <div className={`flex min-h-[18rem] items-center justify-center p-10 ${previewBg}`}>
        {children}
      </div>
      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <WebsiteCodeBlock code={code} language="tsx" />
      </div>
    </div>
  );
}
