"use client";

import { useAppSelector } from "../../../store/hooks/useRedux";
import { usePagination } from "../../../hooks/usePagination";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import {
  selectFilteredContacts,
  selectTotalContactsCount,
} from "../../../store/slices/contactSlice";

const ITEMS_PER_PAGE = 10;

export const useContactsTable = () => {
  const filteredContacts = useAppSelector(selectFilteredContacts);
  const totalCount = useAppSelector(selectTotalContactsCount);
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
    totalItems: filteredContacts.length,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const currentContacts = filteredContacts.slice(startIndex, endIndex);

  return {
    filteredContacts,
    currentContacts,
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
