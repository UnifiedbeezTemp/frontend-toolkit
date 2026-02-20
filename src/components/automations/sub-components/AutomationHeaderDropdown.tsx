"use client";

import React from "react";
import Image from "next/image";
import { useAutomationTableHeader } from "../hooks/useAutomationTableHeader";

export default function AutomationHeaderDropdown() {
  const {
    isOpen,
    dropdownRef,
    supabaseIcons,
    selectedAutomations,
    toggleDropdown,
    onSelectAll,
    onUnselectAll,
    onDeleteSelected,
  } = useAutomationTableHeader();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex flex-col p-2 hover:bg-border/30 rounded-lg transition-colors"
      >
        <Image
          alt="settings icon"
          src={supabaseIcons.threeDot}
          width={25}
          height={25}
          className="object-cover"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 min-w-[200px] bg-white border border-border shadow-lg rounded-[1.2rem] z-20 py-2 overflow-hidden">
          <button
            onClick={onSelectAll}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-[1.4rem] text-text-primary hover:bg-input-filled transition-colors"
          >
            Select All
          </button>

          <button
            onClick={onUnselectAll}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-[1.4rem] text-text-primary hover:bg-input-filled transition-colors"
          >
            Unselect All
          </button>

          <div className="h-[1px] bg-border my-1" />

          <button
            onClick={onDeleteSelected}
            disabled={selectedAutomations.length === 0}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left text-[1.4rem] transition-colors ${
              selectedAutomations.length > 0
                ? "text-destructive hover:bg-destructive/10"
                : "text-text-primary/30 cursor-not-allowed"
            }`}
          >
            Delete Selected ({selectedAutomations.length})
          </button>
        </div>
      )}
    </div>
  );
}
