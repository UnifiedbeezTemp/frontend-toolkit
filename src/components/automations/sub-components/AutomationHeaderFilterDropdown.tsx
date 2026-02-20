"use client";

import React from "react";
import Image from "next/image";
import { useAutomationTableHeader } from "../hooks/useAutomationTableHeader";

export default function AutomationHeaderFilterDropdown() {
  const {
    isFilterOpen,
    filterDropdownRef,
    toggleFilterDropdown,
    handleStatusFilter,
    selectedStatus,
    supabaseIcons,
  } = useAutomationTableHeader();

  const options: { label: string; value: "All" | "active" | "inactive" }[] = [
    { label: "All Status", value: "All" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  return (
    <div className="relative" ref={filterDropdownRef}>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input-stroke bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3"
        onClick={toggleFilterDropdown}
      >
        <Image
          alt="filter icon"
          src={supabaseIcons.filterLinesIcon}
          width={30}
          height={30}
          className="object-cover"
        />
      </button>

      {isFilterOpen && (
        <div className="absolute top-full right-0 mt-1 min-w-[160px] bg-white border border-border shadow-lg rounded-[1.2rem] z-20 py-2 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStatusFilter(option.value)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left text-[1.4rem] transition-colors ${
                selectedStatus === option.value
                  ? "text-brand-primary bg-brand-primary/5"
                  : "text-text-primary hover:bg-input-filled"
              }`}
            >
              {option.label}
              {selectedStatus === option.value && (
                <div className="w-2 h-2 rounded-full bg-brand-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
