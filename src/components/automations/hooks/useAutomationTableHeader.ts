"use client";

import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import {
  setSearchQuery,
  setSelectedType,
  setSelectedStatus,
  selectAllAutomations,
  clearSelectedAutomations,
  deleteSelectedAutomations,
  selectFilteredAutomations,
} from "../../../store/slices/automationSlice";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

export const useAutomationTableHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const supabaseIcons = useSupabaseIcons();

  const automationState = useAppSelector((state) => state.automation);
  const searchQuery = automationState?.searchQuery || "";
  const selectedAutomations = automationState?.selectedAutomations || [];
  const selectedStatus = automationState?.selectedStatus || "All";

  const filteredAutomations = useAppSelector(selectFilteredAutomations);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setIsFilterOpen(false);
  };

  const toggleFilterDropdown = () => {
    setIsFilterOpen((prev) => !prev);
    setIsOpen(false);
  };

  const onSelectAll = () => {
    const allIds = filteredAutomations.map((a) => a.id);
    dispatch(selectAllAutomations(allIds));
    setIsOpen(false);
  };

  const onUnselectAll = () => {
    dispatch(clearSelectedAutomations());
    setIsOpen(false);
  };

  const onDeleteSelected = () => {
    if (selectedAutomations.length > 0) {
      dispatch(deleteSelectedAutomations());
    }
    setIsOpen(false);
  };

  const handleFilter = () => {
    toggleFilterDropdown();
  };

  const resetFilters = () => {
    dispatch(setSearchQuery(""));
    dispatch(setSelectedType("All"));
    dispatch(setSelectedStatus("All"));
  };

  const handleStatusFilter = (status: "All" | "active" | "inactive") => {
    dispatch(setSelectedStatus(status));
    setIsFilterOpen(false);
  };

  return {
    isOpen,
    isFilterOpen,
    dropdownRef,
    filterDropdownRef,
    searchQuery,
    selectedAutomations,
    selectedStatus,
    handleSearchChange,
    toggleDropdown,
    toggleFilterDropdown,
    onSelectAll,
    onUnselectAll,
    onDeleteSelected,
    handleFilter,
    resetFilters,
    handleStatusFilter,
    supabaseIcons,
  };
};
