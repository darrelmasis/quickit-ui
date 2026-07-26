import { cn } from "@/lib/utils";

export default function WebsiteSidebar({ className, children, ...props }) {
  return (
    <aside
      className={cn(
        "hidden border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 lg:fixed lg:top-14 lg:block lg:h-[calc(100vh-3.5rem)] lg:w-60 lg:overflow-y-auto scrollbar-hidden [mask-image:linear-gradient(transparent_0px,#000_32px,#000_calc(100%-32px),transparent)]",
        className,
      )}
      {...props}
    >
      <div className="p-3 pb-8 pt-8">{children}</div>
    </aside>
  );
}
