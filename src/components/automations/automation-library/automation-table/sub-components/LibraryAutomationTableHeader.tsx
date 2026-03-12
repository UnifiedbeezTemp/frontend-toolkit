"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { AUTOMATION_TYPES } from "../../../../../constants/automations";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import Input from "../../../../forms/Input";
import { SmartDropdown, DropdownItem } from "../../../../smart-dropdown";
import Button from "../../../../ui/Button";
import ChevronDownIcon from "../../../../../assets/icons/ChevronDownIcon";

interface LibraryAutomationTableHeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  statusFilter: "all" | "active" | "inactive";
  onStatusFilterChange: (status: "all" | "active" | "inactive") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNewAutomation: () => void;
}

export default function LibraryAutomationTableHeader({
  selectedCategory,
  onCategoryChange,
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchChange,
  onNewAutomation,
}: LibraryAutomationTableHeaderProps) {
  const icons = useSupabaseIcons();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const categoryTriggerRef = useRef<HTMLButtonElement>(null);
  const statusTriggerRef = useRef<HTMLButtonElement>(null);

  const categories = ["All Automations", ...AUTOMATION_TYPES];
  const statuses: ("all" | "active" | "inactive")[] = [
    "all",
    "active",
    "inactive",
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-[1.2rem] items-stretch lg:items-center justify-between p-[1.2rem] sm:p-[1.6rem] border-b border-[var(--input-stroke)] bg-[var(--primary)]">
      <div className="relative w-full lg:w-auto">
        <button
          ref={categoryTriggerRef}
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="w-full lg:w-auto flex items-center justify-between lg:justify-start gap-[0.8rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] border border-[var(--input-stroke)] bg-[var(--primary)] hover:bg-[var(--gray-50)] transition-colors shadow-sm"
        >
          <span className="text-[1.4rem] font-bold text-[var(--text-primary)]">
            {selectedCategory || "All Automations"}
          </span>
          <ChevronDownIcon size={16} className="text-[var(--text-secondary)]" />
        </button>

        <SmartDropdown
          isOpen={isCategoryOpen}
          onClose={() => setIsCategoryOpen(false)}
          triggerRef={categoryTriggerRef}
          placement="bottom-start"
          className="!w-[30rem]"
        >
          <div className="p-2 flex flex-col gap-1">
            {categories.map((cat) => (
              <DropdownItem
                key={cat}
                onClick={() => {
                  onCategoryChange(cat === "All Automations" ? "" : cat);
                  setIsCategoryOpen(false);
                }}
                className={
                  selectedCategory === cat ||
                  (!selectedCategory && cat === "All Automations")
                    ? "bg-[var(--accent)]"
                    : ""
                }
              >
                <span className="text-[1.4rem] font-medium">{cat}</span>
              </DropdownItem>
            ))}
          </div>
        </SmartDropdown>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-[1.2rem] w-full lg:w-auto">
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search smart sequences"
          className="bg-[var(--primary)] text-[var(--text-primary)] border-[var(--input-stroke)] flex-1 w-full"
          leftIcon={
            <Image
              src={icons.searchIg || ""}
              alt="search"
              width={18}
              height={18}
            />
          }
        />

        <div className="flex items-center gap-[1rem] w-full sm:w-auto">
          <div className="relative flex-shrink-0">
            <button
              ref={statusTriggerRef}
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className="p-[1rem] h-[4rem] min-w-[4rem] rounded-[0.8rem] border border-[var(--input-stroke)] hover:bg-[var(--gray-50)] transition-colors shadow-sm flex items-center justify-center bg-[var(--primary)]"
            >
              <Image
                src={icons.filterLinesIcon || ""}
                alt="filter"
                width={20}
                height={20}
              />
            </button>

            <SmartDropdown
              isOpen={isStatusOpen}
              onClose={() => setIsStatusOpen(false)}
              triggerRef={statusTriggerRef}
              placement="bottom-end"
              className="!w-[16rem]"
            >
              <div className="p-2 flex flex-col gap-1">
                {statuses.map((status) => (
                  <DropdownItem
                    key={status}
                    onClick={() => {
                      onStatusFilterChange(status);
                      setIsStatusOpen(false);
                    }}
                    className={
                      statusFilter === status ? "bg-[var(--accent)]" : ""
                    }
                  >
                    <span className="text-[1.4rem] font-medium capitalize">
                      {status === "all" ? "All Status" : status}
                    </span>
                  </DropdownItem>
                ))}
              </div>
            </SmartDropdown>
          </div>

          <Button
            className="whitespace-nowrap flex items-center justify-center gap-[1rem] grad-btn flex-1 sm:flex-none h-[4rem]"
            onClick={onNewAutomation}
          >
            <span className="text-[1.8rem] leading-none mb-[.2rem]">+</span>
            New automation
          </Button>
        </div>
      </div>
    </div>
  );
}
