"use client";

import Image from "next/image";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { setSearchQueryMembers, setSearchQueryInvited } from "../../store/onboarding/slices/membersSlice";
import Input from "../forms/Input";
import Button from "../ui/Button";

interface SearchAndFilterProps {
  section: "invited" | "members";
}

export default function SearchAndFilter({ section }: SearchAndFilterProps) {
  const dispatch = useAppDispatch();
  const { searchQueryMembers, searchQueryInvited } = useAppSelector(
    (state) => state.members
  );
  const supabaseIcons = useSupabaseIcons();

  const searchQuery =
    section === "members" ? searchQueryMembers : searchQueryInvited;

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

      <Button variant="secondary" size="sm">
        <Image
          alt="filter icon"
          src={supabaseIcons.filterLinesIcon}
          width={25}
          height={25}
          className="object-cover"
        />
      </Button>
    </div>
  );
}
