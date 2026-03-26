"use client";

import { useState, useRef, useEffect } from "react";
import { useAutomationsContext } from "../AutomationsContext";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

export const useAutomationTableHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const supabaseIcons = useSupabaseIcons();

  const {
    items,
    total,
    searchQuery,
    selectedStatus,
    selectedIds,
    setSearch,
    setStatus,
    selectAll,
    clearSelected,
    deleteSelected,
  } = useAutomationsContext();

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
    setSearch(e.target.value);
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
    selectAll();
    setIsOpen(false);
  };

  const onUnselectAll = () => {
    clearSelected();
    setIsOpen(false);
  };

  const onDeleteSelected = () => {
    deleteSelected();
    setIsOpen(false);
  };

  const handleStatusFilter = (status: "All" | "active" | "inactive") => {
    setStatus(status);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
  };

  return {
    isOpen,
    isFilterOpen,
    dropdownRef,
    filterDropdownRef,
    searchQuery,
    selectedAutomations: selectedIds,
    selectedStatus,
    totalCount: total,
    handleSearchChange,
    toggleDropdown,
    toggleFilterDropdown,
    onSelectAll,
    onUnselectAll,
    onDeleteSelected,
    handleFilter: toggleFilterDropdown,
    resetFilters,
    handleStatusFilter,
    supabaseIcons,
    filteredAutomations: items,
  };
};
