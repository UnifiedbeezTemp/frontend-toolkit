"use client";

import React from "react";
import SearchIcon from "../../../../../../assets/icons/SearchIcon";
import FunnelIcon from "../../../../../../assets/icons/FunnelIcon";
import Input from "../../../../../forms/Input";
import Button from "../../../../../ui/Button";

interface ContentSearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterClick?: () => void;
}

export default function ContentSearch({
  value,
  onChange,
  onFilterClick,
}: ContentSearchProps) {
  return (
    <div className="flex items-center gap-[1.2rem] w-full  p-[1rem] sm:p-0">
      <div className="relative flex-1">
        <Input
          leftIcon={<SearchIcon size={20} color="var(--muted)" />}
          placeholder="Search items..."
          value={value}
          onChange={onChange}
        />
      </div>
      {/* <Button variant="secondary" onClick={onFilterClick} className="">
        <FunnelIcon size={20} color="var(--muted)" />
      </Button> */}
    </div>
  );
}
