"use client";

import { useAutomationsContext } from "../AutomationsContext";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

export const useAutomationTable = () => {
  const { items, total, totalPages, currentPage, setPage } =
    useAutomationsContext();
  const icons = useSupabaseIcons();

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return {
    filteredAutomations: items,
    currentAutomations: items,
    icons,
    currentPage,
    totalPages,
    totalCount: total,
    handlePrevious: () => setPage(Math.max(1, currentPage - 1)),
    handleNext: () => setPage(Math.min(totalPages, currentPage + 1)),
    handlePageChange: (page: number | string) => {
      if (typeof page === "number" && page >= 1 && page <= totalPages) {
        setPage(page);
      }
    },
    getPageNumbers,
  };
};
