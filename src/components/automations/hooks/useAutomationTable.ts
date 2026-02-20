"use client";

import { useAppSelector } from "../../../store/hooks/useRedux";
import { usePagination } from "../../../hooks/usePagination";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import {
  selectFilteredAutomations,
  selectTotalCount,
} from "../../../store/slices/automationSlice";

const ITEMS_PER_PAGE = 10;

export const useAutomationTable = () => {
  const filteredAutomations = useAppSelector(selectFilteredAutomations);
  const totalCount = useAppSelector(selectTotalCount);
  const icons = useSupabaseIcons();

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    handlePrevious,
    handleNext,
    handlePageChange,
    getPageNumbers,
  } = usePagination({
    totalItems: filteredAutomations.length,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const currentAutomations = filteredAutomations.slice(startIndex, endIndex);

  return {
    filteredAutomations,
    currentAutomations,
    icons,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    handlePrevious,
    handleNext,
    handlePageChange,
    getPageNumbers,
    totalCount,
  };
};
