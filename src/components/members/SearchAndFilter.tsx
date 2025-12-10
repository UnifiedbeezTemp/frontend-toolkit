"use client";

import { useState } from "react";
import Image from "next/image";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { setSearchQueryMembers, setSearchQueryInvited } from "../../store/onboarding/slices/membersSlice";
import Input from "../forms/Input";
import Button from "../ui/Button";
import FilterDropdown from "./FilterDropdown";

interface SearchAndFilterProps {
  section: "invited" | "members";
}

export default function SearchAndFilter({ section }: SearchAndFilterProps) {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const dispatch = useAppDispatch();
  const { searchQueryMembers, searchQueryInvited, roleFilterMembers, statusFilterInvited } = useAppSelector(
    (state) => state.members
  );
  const supabaseIcons = useSupabaseIcons();

  const searchQuery =
    section === "members" ? searchQueryMembers : searchQueryInvited;
  
  const hasActiveFilter = section === "members" 
    ? roleFilterMembers !== null 
    : statusFilterInvited !== null;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (section === "members") {
      dispatch(setSearchQueryMembers(value));
    } else {
      dispatch(setSearchQueryInvited(value));
    }
  };

  return (
    <div className="flex items-center gap-[1.6rem] my-[1.6rem]">
      <div className="w-full relative">
        <Input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
          leftIcon={
            <Image
              alt="search"
              src={supabaseIcons.lucideSearch}
              width={25}
              height={25}
              className="object-cover"
            />
          }
          className="border-input-stroke"
        />
      </div>

      <div className="relative">
        <Button 
          variant="secondary" 
          size="sm"
          onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          className={hasActiveFilter ? "border-brand-primary border-2" : ""}
        >
          <Image
            alt="filter icon"
            src={supabaseIcons.filterLinesIcon}
            width={25}
            height={25}
            className="object-cover"
          />
        </Button>
        {showFilterDropdown && (
          <FilterDropdown
            section={section}
            onClose={() => setShowFilterDropdown(false)}
          />
        )}
      </div>
    </div>
  );
}
