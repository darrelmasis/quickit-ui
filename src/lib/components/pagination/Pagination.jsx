import { useMemo, useState } from "react";
import { ChevronRightIcon } from "@/lib/assets/icons";
import { Button } from "@/lib/components/button";
import { useBreakpoint } from "@/lib/hooks";
import { cn } from "@/lib/utils";

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

export function Pagination({
  className,
  color = "neutral",
  count,
  defaultPage = 1,
  disabled = false,
  onPageChange,
  page: controlledPage,
  siblingCount = 1,
}) {
  const { isMobile } = useBreakpoint();
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

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex w-full flex-wrap items-center justify-center gap-2",
        className,
      )}
    >
      <Button
        aria-label="Página anterior"
        title="Página anterior"
        shape="square"
        variant="outline"
        color={color}
        size="sm"
        disabled={disabled || safeCount === 0 || currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        <ChevronRightIcon className="size-4 rotate-180" />
      </Button>

      <div
        className={cn(
          "flex min-w-0 items-center justify-center gap-2",
          isMobile && "order-3 basis-full",
        )}
      >
        {items.map((item, index) =>
          typeof item === "number" ? (
            <Button
              key={item}
              shape="square"
              size="sm"
              variant={item === currentPage ? "solid" : "outline"}
              color={color}
              aria-label={
                item === currentPage
                  ? `Página actual, ${item}`
                  : `Ir a la página ${item}`
              }
              aria-current={item === currentPage ? "page" : undefined}
              onClick={() => setPage(item)}
            >
              {item}
            </Button>
          ) : (
            <span key={`${item}-${index}`} className="px-1 text-sm opacity-70">
              ...
            </span>
          ),
        )}
      </div>

      <Button
        aria-label="Página siguiente"
        title="Página siguiente"
        shape="square"
        variant="outline"
        color={color}
        size="sm"
        disabled={disabled || safeCount === 0 || currentPage === safeCount}
        onClick={() => setPage(currentPage + 1)}
      >
        <ChevronRightIcon className="size-4" />
      </Button>

      {isMobile && safeCount > 0 ? (
        <p className="basis-full text-center text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Pagina {currentPage} de {safeCount}
        </p>
      ) : null}
    </nav>
  );
}

export default Pagination;
