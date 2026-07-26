import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Divider = forwardRef(function Divider(
  { className, label, orientation = "horizontal", ...props },
  ref,
) {
  if (orientation === "vertical") {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "mx-2 inline-flex self-stretch border-l border-neutral-200 dark:border-neutral-800",
          className,
        )}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn("flex items-center gap-3", className)}
        {...props}
      >
        <div className="flex-1 border-t border-neutral-200 dark:border-neutral-800" />
        <span className="text-xs font-medium text-neutral-500">{label}</span>
        <div className="flex-1 border-t border-neutral-200 dark:border-neutral-800" />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        "border-t border-neutral-200 dark:border-neutral-800",
        className,
      )}
      {...props}
    />
  );
});

export { Divider };
export default Divider;
