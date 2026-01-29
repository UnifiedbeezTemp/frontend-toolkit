"use client";

import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../../components/ui/ImageComponent";
import { SearchBarProps } from "../types";
import Input from "../../../../components/forms/Input";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search",
}: SearchBarProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="relative my-[1.4rem]">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        leftIcon={<ImageComponent
          src={icons.lucideSearch}
          alt="search"
          width={16}
          height={16}
          className="text-text-secondary"
        />}
      />
    </div>
  );
}

