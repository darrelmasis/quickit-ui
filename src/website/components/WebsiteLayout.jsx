import { Toaster } from "@/lib";
import { cn } from "@/lib/utils";
import WebsitePageToc from "@/website/components/WebsitePageToc";

export default function WebsiteLayout({ sidebar, children, tocSections }) {
  return (
    <main className="pb-16">
      <Toaster />
      <div
        className={cn(
          "lg:grid min-w-0",
          "lg:grid-cols-[15rem_minmax(0,1fr)]",
          tocSections?.length > 0 && "xl:grid-cols-[15rem_minmax(0,1fr)_14rem]",
        )}
      >
        {sidebar}
        <div className="min-w-0 px-4 sm:px-6 lg:col-start-2 lg:pl-10 lg:pr-10 py-6 lg:py-10">
          {children}
        </div>
        {tocSections?.length > 0 && (
          <WebsitePageToc sections={tocSections} />
        )}
      </div>
    </main>
  );
}
