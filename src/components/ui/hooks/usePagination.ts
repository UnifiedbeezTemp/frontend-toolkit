import { useMemo } from "react";

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
}

export type PaginationItem = number | "...";

export function usePagination({ currentPage, totalPages }: UsePaginationProps) {
  const visiblePages = useMemo(() => {
    const range = (start: number, end: number) => {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    if (totalPages <= 7) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, "...", ...middleRange, "...", totalPages];
    }

    return range(1, totalPages);
  }, [currentPage, totalPages]);

  return {
    visiblePages,
  };
}
