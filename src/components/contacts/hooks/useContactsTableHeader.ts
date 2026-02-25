"use client";

import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import {
  setSearchQuery,
  setSelectedStatus,
  clearSelection,
  selectAllContacts,
  ContactState,
} from "../../../store/slices/contactSlice";
import { RootState } from "../../../store";

export const useContactsTableHeader = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(
    (state: RootState) => state.contact.searchQuery,
  );
  const selectedStatus = useAppSelector(
    (state: RootState) => state.contact.selectedStatus,
  );
  const selectedContacts = useAppSelector(
    (state: RootState) => state.contact.selectedContacts,
  );
  const allContacts = useAppSelector(
    (state: RootState) => state.contact.contacts,
  );
  const totalCount = allContacts.length;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleStatusChange = (status: ContactState["selectedStatus"]) => {
    dispatch(setSelectedStatus(status));
    setIsFilterOpen(false);
  };

  const handleSelectAll = () => {
    const allIds = allContacts.map((c) => c.id);
    dispatch(selectAllContacts(allIds));
    setIsOptionsOpen(false);
  };

  const handleUnselectAll = () => {
    dispatch(clearSelection());
    setIsOptionsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setIsOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    searchQuery,
    selectedStatus,
    selectedContacts,
    totalCount,
    isFilterOpen,
    setIsFilterOpen,
    isOptionsOpen,
    setIsOptionsOpen,
    filterRef,
    optionsRef,
    handleSearch,
    handleStatusChange,
    handleSelectAll,
    handleUnselectAll,
  };
};
