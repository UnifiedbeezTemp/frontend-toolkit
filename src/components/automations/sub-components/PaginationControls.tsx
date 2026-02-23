"use client";

import React from "react";
import Button from "../../ui/Button";
import ImageComponent from "../../ui/ImageComponent";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  handlePrevious: () => void;
  handleNext: () => void;
  handlePageChange: (page: number | string) => void;
  getPageNumbers: () => (number | string)[];
  icons: Record<string, string>;
  hasAutomations: boolean;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  handlePrevious,
  handleNext,
  handlePageChange,
  getPageNumbers,
  icons,
  hasAutomations,
}: PaginationControlsProps) {
  if (!hasAutomations) return null;

  return (
    <div className="px-[2rem] sm:border-t border-border py-[1.3rem] flex items-center justify-between">
      <Button
        variant="secondary"
        className="py-[.66rem] px-[1.1rem] rounded-[.66rem] font-[700] text-[1.4rem] flex items-center gap-[0.4rem]"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <ImageComponent src={icons.arrowLeft1} alt="" width={20} height={20} />
        <span className="hidden sm:block">Previous</span>
      </Button>

      <div className="flex items-center gap-[1rem]">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`w-[3.31rem] h-[3.31rem] text-[1.1rem] font-[500] flex items-center justify-center rounded-[0.66rem] transition-colors ${
              page === currentPage
                ? "bg-input-filled text-text-secondary"
                : "text-text-secondary hover:bg-input-filled"
            } ${page === "..." ? "cursor-default" : ""}`}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>

      <Button
        variant="secondary"
        className="py-[.66rem] px-[1.1rem] rounded-[.66rem] font-[700] text-[1.4rem] flex items-center gap-[0.4rem]"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <span className="hidden sm:block">Next</span>
        <ImageComponent src={icons.arrowRight1} alt="" width={20} height={20} />
      </Button>
    </div>
  );
}
