"use client";

import Button from "./Button";
import { cn } from "../../lib/utils";
import { PaginationArrowLeftIcon } from "../../assets/icons/PaginationArrowLeftIcon";
import { PaginationArrowRightIcon } from "../../assets/icons/PaginationArrowRightIcon";
import { usePagination, PaginationItem } from "./hooks/usePagination";

interface PaginationV2Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function PaginationV2({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationV2Props) {
  const { visiblePages } = usePagination({ currentPage, totalPages });

  const handlePageClick = (page: PaginationItem) => {
    if (page !== "...") {
      onPageChange(page);
    }
  };

  return (
    <div className={cn("flex gap-2 items-center justify-between w-full", className)}>
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="!px-[1.1rem] !py-[.66rem] border-border text-dark-base-70 hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-[0.8rem]">
          <PaginationArrowLeftIcon />
          <span className="hidden sm:block">Previous</span>
        </span>
      </Button>

      <div className="flex items-center gap-[0.2rem]">
        {visiblePages.map((page, idx) => {
          const isEllipsis = page === "...";
          const isActive = currentPage === page;

          if (isEllipsis) {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-[3.3rem] h-[3.3rem] flex items-center justify-center text-[1.1rem] font-medium text-gray-600"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={`page-${page}`}
              onClick={() => handlePageClick(+page)}
              className={cn(
                "w-[3.3rem] h-[3.3rem] flex items-center justify-center rounded-[.6rem] text-[1.1rem] font-medium transition-all",
                isActive
                  ? "bg-gray-50 text-gray-800"
                  : "bg-transparent text-gray-600 hover:bg-gray-50"
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
        className="!px-[1.1rem] !py-[.66rem] border-border text-dark-base-70 hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-[0.8rem]">
          <span className="hidden sm:block">Next</span>
          <PaginationArrowRightIcon />
        </span>
      </Button>
    </div>
  );
}
