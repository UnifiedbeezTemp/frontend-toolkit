import { useMemo } from "react";
import Button from "./Button";
import { cn } from "../../lib/utils";
import ImageComponent from "./ImageComponent";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const getVisiblePages = (
  current: number,
  total: number
): (number | "...")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2)
    return [1, "...", total - 3, total - 2, total - 1, total];

  return [1, "...", current - 1, current, current + 1, "...", total];
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const visiblePages = useMemo(
    () => getVisiblePages(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const icons = useSupabaseIcons();

  return (
    <div
      className={cn(
        "flex items-center justify-between px-[1.6rem] sm:px-[2.4rem] py-[1.6rem] border-t rounded-b-[0.8rem] border-border bg-primary",
        className
      )}
    >
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-[0.8rem] !py-[0.8rem] px-[1rem] sm:!px-[1.4rem]"
      >
        <ImageComponent
          src={icons.arrowLeft1}
          alt="arrow left"
          width={20}
          height={20}
          className="block shrink-0"
        />
        <span className="hidden sm:block">Previous</span>
      </Button>

      <div className="hidden sm:flex items-center gap-[0.2rem]">
        {visiblePages.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-[4rem] h-[4rem] flex items-center justify-center text-[1.4rem]"
              style={{ color: "var(--gray-600)" }}
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-[4rem] h-[4rem] flex items-center justify-center rounded-[0.8rem] text-[1.4rem] font-medium transition-colors",
                currentPage === page
                  ? "bg-gray-50 text-gray-900"
                  : "transparent text-gray-600"
              )}
            >
              {page}
            </button>
          )
        )}
      </div>

      <div className="flex sm:hidden items-center justify-center text-[1.4rem] font-medium text-gray-700">
        Page {currentPage} of {totalPages}
      </div>

      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-[0.8rem] !py-[0.8rem] px-[1rem] sm:!px-[1.4rem]"
      >
        <span className="hidden sm:block"> Next</span>
        <ImageComponent
          src={icons.arrowRight1}
          alt="right"
          width={20}
          height={20}
          className="block shrink-0"
        />
      </Button>
    </div>
  );
}
