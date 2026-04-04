import { forwardRef } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Link } from "@/lib/components/link";

const BREADCRUMB_THEME_CLASSES = {
  light: {
    current: "text-slate-950",
    separator: "text-slate-400",
  },
  dark: {
    current: "text-stone-50",
    separator: "text-stone-500",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

const Breadcrumb = forwardRef(function Breadcrumb({ children, className, ...props }, ref) {
  return (
    <nav ref={ref} aria-label="Breadcrumb" className={className} {...props}>
      {children}
    </nav>
  );
});

const BreadcrumbList = forwardRef(function BreadcrumbList(
  { children, className, ...props },
  ref,
) {
  return (
    <ol
      ref={ref}
      className={cn("flex flex-wrap items-center gap-2 text-sm", className)}
      {...props}
    >
      {children}
    </ol>
  );
});

const BreadcrumbItem = forwardRef(function BreadcrumbItem(
  { children, className, ...props },
  ref,
) {
  return (
    <li ref={ref} className={cn("inline-flex items-center gap-2", className)} {...props}>
      {children}
    </li>
  );
});

const BreadcrumbLink = forwardRef(function BreadcrumbLink(props, ref) {
  return <Link ref={ref} variant="muted" underline="hover" {...props} />;
});

const BreadcrumbSeparator = forwardRef(function BreadcrumbSeparator(
  { children, className, ...props },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = BREADCRUMB_THEME_CLASSES[theme];

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(ui.separator, className)}
      {...props}
    >
      {children ?? "/"}
    </span>
  );
});

const BreadcrumbCurrent = forwardRef(function BreadcrumbCurrent(
  { children, className, ...props },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = BREADCRUMB_THEME_CLASSES[theme];

  return (
    <span ref={ref} aria-current="page" className={cn("font-medium", ui.current, className)} {...props}>
      {children}
    </span>
  );
});

export {
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
};

export default Breadcrumb;
