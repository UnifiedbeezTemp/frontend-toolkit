"use client";

import React from "react";
import { useAutomationTableHeader } from "../hooks/useAutomationTableHeader";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Image from "next/image";
import AutomationHeaderDropdown from "./AutomationHeaderDropdown";
import AutomationHeaderFilterDropdown from "./AutomationHeaderFilterDropdown";

interface AutomationTableHeaderProps {
  automationType: string;
}

export default function AutomationTableHeader({
  automationType,
}: AutomationTableHeaderProps) {
  const { searchQuery, handleSearchChange, supabaseIcons } =
    useAutomationTableHeader();

  return (
    <div className="flex flex-col sm:flex-row gap-[2.2rem] sm:items-center justify-between px-[1.6rem] py-[0.8rem]">
      <div className="flex items-center gap-[10px]">
        <p className="text-secondary font-[700] text-[16px] leading-[23.6px]">
          {automationType}
        </p>
        <p className="rounded-full py-[0.16rem] px-[.31rem] text-text-primary text-[.99rem] border border-border">
          100
        </p>
      </div>

      <div className="flex items-center gap-[10px]">
        <Input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search contacts"
          className="placeholder:text-inactive-color py-[1rem] px-[1.4rem] pl-[4rem] placeholder:text-[1.4rem] text-[1.4rem]"
          leftIcon={
            <Image
              alt="search"
              src={supabaseIcons.searchIg}
              width={20}
              height={20}
              className="object-cover"
            />
          }
        />

        <div className="flex items-center gap-2">
          <AutomationHeaderFilterDropdown />
        </div>

        <AutomationHeaderDropdown />
      </div>
    </div>
  );
}
