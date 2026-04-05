import { useMemo, useState } from "react";
import { Button } from "@/lib/components/button";
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
  const isControlled = controlledPage !== undefined;
  const [internalPage, setInternalPage] = useState(defaultPage);
  const page = isControlled ? controlledPage : internalPage;
  const safeCount = Math.max(1, count ?? 1);
  const currentPage = Math.min(Math.max(page, 1), safeCount);
  const items = useMemo(
    () =>
      createPaginationItems({
        count: safeCount,
        page: currentPage,
        siblingCount,
      }),
    [currentPage, safeCount, siblingCount],
  );

  const setPage = (nextPage) => {
    if (disabled) {
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
      className={cn("flex items-center gap-2", className)}
    >
      <Button
        variant="outline"
        color={color}
        size="sm"
        disabled={disabled || currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        Anterior
      </Button>

      <div className="flex items-center gap-2">
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
        variant="outline"
        color={color}
        size="sm"
        disabled={disabled || currentPage === safeCount}
        onClick={() => setPage(currentPage + 1)}
      >
        Siguiente
      </Button>
    </nav>
  );
}

export default Pagination;
