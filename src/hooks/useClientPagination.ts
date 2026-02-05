"use client";

import { useState, useMemo, useEffect } from "react";

interface UseClientPaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
  initialPage?: number;
}

export function useClientPagination<T>({
  data,
  itemsPerPage = 5,
  initialPage = 1,
}: UseClientPaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Reset to first page when data length changes (e.g., during filtering)
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  return {
    paginatedData,
    currentPage,
    totalPages,
    goToPage,
    setCurrentPage, // Also expose it if manual override is needed
  };
}
