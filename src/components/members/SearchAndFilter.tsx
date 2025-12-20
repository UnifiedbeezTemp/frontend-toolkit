"use client";

import Image from "next/image";
import Input from "../forms/Input";
import Button from "../ui/Button";
import FilterDropdown from "./FilterDropdown";
import { useSearchAndFilter } from "./hooks/useSearchAndFilter";

interface SearchAndFilterProps {
  section: "invited" | "members";
}

export default function SearchAndFilter({ section }: SearchAndFilterProps) {
  const {
    supabaseIcons,
    searchQuery,
    hasActiveFilter,
    showFilterDropdown,
    handleSearchChange,
    toggleFilterDropdown,
    closeFilterDropdown,
  } = useSearchAndFilter(section);

  return (
    <div className="flex items-center gap-[1.6rem] my-[1.6rem]">
      <div className="w-full relative">
        <Input
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
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
          onClick={toggleFilterDropdown}
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
          <FilterDropdown section={section} onClose={closeFilterDropdown} />
        )}
      </div>
    </div>
  );
}
