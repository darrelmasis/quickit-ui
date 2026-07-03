import { Children, forwardRef, isValidElement } from "react";
import { Link } from "@/lib/components/link";
import { useQuickitControlState } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@/lib/assets/icons";

const BREADCRUMB_PRIMITIVES = {
  nav: "flex items-center",
  list: "flex flex-wrap items-center gap-1.5 break-words text-sm",
  item: "flex items-center gap-1.5",
  link: "transition-colors hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  separator: "flex-shrink-0 opacity-50",
  page: "font-semibold pointer-events-none",
  itemContent: "inline-flex items-center gap-1.5",
};

const BREADCRUMB_THEME_CLASSES = {
  light: {
    text: "text-slate-500",
    current: "text-slate-900",
  },
  dark: {
    text: "text-stone-400",
    current: "text-stone-50",
  },
};

function renderBreadcrumbItemContent({
  allowLink,
  children,
  contentClassName,
  current,
  href,
  linkVariant,
  title,
  underline,
}) {
  if (current) {
    return (
      <BreadcrumbCurrent className={contentClassName} title={title}>
        {children}
      </BreadcrumbCurrent>
    );
  }

  if (allowLink || href) {
    return (
      <BreadcrumbLink
        href={href}
        className={contentClassName}
        title={title}
        underline={underline}
        variant={linkVariant}
      >
        {children}
      </BreadcrumbLink>
    );
  }

  return (
    <span className={cn(BREADCRUMB_PRIMITIVES.itemContent, contentClassName)}>
      {children}
    </span>
  );
}

const Breadcrumb = forwardRef(function Breadcrumb(
  { children, className, ...props },
  ref,
) {
  const hasExplicitList = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === BreadcrumbList,
  );

  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn(BREADCRUMB_PRIMITIVES.nav, className)}
      {...props}
    >
      {hasExplicitList ? children : <BreadcrumbList>{children}</BreadcrumbList>}
    </nav>
  );
});

export const BreadcrumbList = forwardRef(function BreadcrumbList(
  { children, className, separator, separatorClassName, ...props },
  ref,
) {
  const items = Children.toArray(children);
  const content = items.flatMap((child, index) => {
    const isLast = index === items.length - 1;
    const nextChild = items[index + 1];
    const hasExplicitSeparator =
      isValidElement(nextChild) && nextChild.type === BreadcrumbSeparator;

    if (isLast || hasExplicitSeparator) {
      return [child];
    }

    return [
      child,
      <BreadcrumbSeparator
        key={`separator-${index}`}
        className={separatorClassName}
      >
        {separator}
      </BreadcrumbSeparator>,
    ];
  });

  return (
    <ol
      ref={ref}
      className={cn(BREADCRUMB_PRIMITIVES.list, className)}
      {...props}
    >
      {content}
    </ol>
  );
});

export const BreadcrumbItem = forwardRef(function BreadcrumbItem(
  {
    allowLink = false,
    children,
    className,
    contentClassName,
    current = false,
    href,
    linkVariant = "muted",
    title,
    underline,
    ...props
  },
  ref,
) {
  return (
    <li
      ref={ref}
      className={cn(BREADCRUMB_PRIMITIVES.item, className)}
      {...props}
    >
      {renderBreadcrumbItemContent({
        allowLink,
        children,
        contentClassName,
        current,
        href,
        linkVariant,
        title,
        underline,
      })}
    </li>
  );
});

export const BreadcrumbLink = forwardRef(function BreadcrumbLink(
  { className, variant = "muted", ...props },
  ref,
) {
  const { theme } = useQuickitControlState("breadcrumb");
  const ui = BREADCRUMB_THEME_CLASSES[theme];

  return (
    <Link
      ref={ref}
      className={cn(BREADCRUMB_PRIMITIVES.link, ui.text, className)}
      variant={variant}
      {...props}
    />
  );
});

export const BreadcrumbCurrent = forwardRef(function BreadcrumbCurrent(
  { children, className, ...props },
  ref,
) {
  const { theme } = useQuickitControlState("breadcrumb");
  const ui = BREADCRUMB_THEME_CLASSES[theme];

  return (
    <span
      ref={ref}
      aria-current="page"
      className={cn(BREADCRUMB_PRIMITIVES.page, ui.current, className)}
      {...props}
    >
      {children}
    </span>
  );
});

export const BreadcrumbSeparator = forwardRef(function BreadcrumbSeparator(
  { children, className, ...props },
  ref,
) {
  const { theme } = useQuickitControlState("breadcrumb");
  const ui = BREADCRUMB_THEME_CLASSES[theme];

  return (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn(BREADCRUMB_PRIMITIVES.separator, ui.text, className)}
      {...props}
    >
      {children ?? <ChevronRightIcon className="size-3.5" />}
    </li>
  );
});

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.List = BreadcrumbList;
Breadcrumb.Link = BreadcrumbLink;
Breadcrumb.Current = BreadcrumbCurrent;
Breadcrumb.Separator = BreadcrumbSeparator;

export { Breadcrumb };
export default Breadcrumb;
