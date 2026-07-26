import { forwardRef, useMemo, useState } from "react";
import { ChevronRightIcon } from "@/lib/assets/icons";
import Button from "@/lib/components/button/Button";
import { useBreakpoint } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useTXT } from "@/lib/i18n";

function createPaginationItems({ count, page, siblingCount }) {
  const totalNumbers = siblingCount * 2 + 5;

  if (count <= totalNumbers) {
    return Array.from({ length: count }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, count);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < count - 1;

  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, index) => index + 1,
    );
    return [...leftRange, "dots", count];
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, index) => count - (2 + siblingCount * 2) + index,
    );
    return [1, "dots", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, index) => leftSibling + index,
  );

  return [1, "dots-left", ...middleRange, "dots-right", count];
}

const Pagination = forwardRef(function Pagination({
  className,
  color = "neutral",
  count,
  defaultPage = 1,
  disabled = false,
  onPageChange,
  page: controlledPage,
  renderButton,
  siblingCount = 1,
}, ref) {

  const { isMobile } = useBreakpoint();
  const TXT = useTXT();
  const isControlled = controlledPage !== undefined;
  const [internalPage, setInternalPage] = useState(defaultPage);
  const page = isControlled ? controlledPage : internalPage;
  const safeCount = Math.max(0, count ?? 0);
  const currentPage =
    safeCount === 0 ? 0 : Math.min(Math.max(page, 1), safeCount);
  const effectiveSiblingCount = isMobile
    ? Math.min(siblingCount, 0)
    : siblingCount;
  const items = useMemo(
    () =>
      createPaginationItems({
        count: safeCount,
        page: currentPage,
        siblingCount: effectiveSiblingCount,
      }),
    [currentPage, effectiveSiblingCount, safeCount],
  );

  const setPage = (nextPage) => {
    if (disabled || safeCount === 0) {
      return;
    }

    const safePage = Math.min(Math.max(nextPage, 1), safeCount);

    if (!isControlled) {
      setInternalPage(safePage);
    }

    if (safePage !== currentPage) {
      onPageChange?.(safePage);
    }
  };

  const defaultRenderButton = ({ key: btnKey, ...props }, children) => (
    <Button key={btnKey} {...props}>{children}</Button>
  );
  const btn = renderButton || defaultRenderButton;

  return (
    <nav
      ref={ref}
      aria-label={TXT.PAGINATION_LABEL}
      className={cn(
        "flex w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2",
        className,
      )}
    >
      {btn(
        {
          "aria-label": TXT.PREV_PAGE,
          title: TXT.PREV_PAGE,
          shape: "square",
          variant: "outline",
          color,
          size: isMobile ? "xs" : "sm",
          disabled: disabled || safeCount === 0 || currentPage === 1,
          onClick: () => setPage(currentPage - 1),
        },
        <ChevronRightIcon className="size-4 rotate-180" />,
      )}

      <div
        className={cn(
          "flex min-w-0 items-center justify-center gap-1.5 sm:gap-2",
          isMobile && "order-3 basis-full",
        )}
      >
        {items.map((item, index) =>
          typeof item === "number"
            ? btn(
                {
                  key: item,
                  shape: "square",
                  size: isMobile ? "xs" : "sm",
                  variant: item === currentPage ? "solid" : "outline",
                  color,
                  "aria-label":
                    item === currentPage
                      ? TXT.PAGE_CURRENT(item)
                      : TXT.PAGE_GO_TO(item),
                  "aria-current":
                    item === currentPage ? "page" : undefined,
                  onClick: () => setPage(item),
                },
                item,
              )
            : (
              <span
                key={`${item}-${index}`}
                className="px-1 text-sm opacity-70 text-neutral-500 dark:text-neutral-400"
              >
                ...
              </span>
            ),
        )}
      </div>

      {btn(
        {
          "aria-label": TXT.NEXT_PAGE,
          title: TXT.NEXT_PAGE,
          shape: "square",
          variant: "outline",
          color,
          size: isMobile ? "xs" : "sm",
          disabled:
            disabled || safeCount === 0 || currentPage === safeCount,
          onClick: () => setPage(currentPage + 1),
        },
        <ChevronRightIcon className="size-4" />,
      )}

      {isMobile && safeCount > 0 ? (
        <p className="basis-full text-center text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {TXT.PAGE_INFO(currentPage, safeCount)}
        </p>
      ) : null}
    </nav>
  );
});
export { Pagination };

export default Pagination;
