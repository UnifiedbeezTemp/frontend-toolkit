"use client";

import { useState, useMemo } from "react";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import { setSearchQueryMembers, setSearchQueryInvited } from "../../../store/onboarding/slices/membersSlice";

type Section = "invited" | "members";

export function useSearchAndFilter(section: Section) {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const dispatch = useAppDispatch();
  const { searchQueryMembers, searchQueryInvited, roleFilterMembers, statusFilterInvited } =
    useAppSelector((state) => state.members);
  const supabaseIcons = useSupabaseIcons();

  const searchQuery = section === "members" ? searchQueryMembers : searchQueryInvited;
  const hasActiveFilter = useMemo(
    () => (section === "members" ? roleFilterMembers !== null : statusFilterInvited !== null),
    [roleFilterMembers, statusFilterInvited, section]
  );

  const handleSearchChange = (value: string) => {
    if (section === "members") {
      dispatch(setSearchQueryMembers(value));
    } else {
      dispatch(setSearchQueryInvited(value));
    }
  };

  const toggleFilterDropdown = () => setShowFilterDropdown((prev) => !prev);
  const closeFilterDropdown = () => setShowFilterDropdown(false);

  return {
    supabaseIcons,
    searchQuery,
    hasActiveFilter,
    showFilterDropdown,
    handleSearchChange,
    toggleFilterDropdown,
    closeFilterDropdown,
  };
}

