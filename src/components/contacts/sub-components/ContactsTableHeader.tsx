"use client";

import React from "react";
import Image from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { useContactsTableHeader } from "../hooks/useContactsTableHeader";
import Input from "../../forms/Input";

export default function ContactsTableHeader() {
  const {
    searchQuery,
    handleSearch,
    isFilterOpen,
    setIsFilterOpen,
    isOptionsOpen,
    setIsOptionsOpen,
    filterRef,
    optionsRef,
    handleStatusChange,
    handleSelectAll,
    handleUnselectAll,
    selectedStatus,
    totalCount,
  } = useContactsTableHeader();

  const supabaseIcons = useSupabaseIcons();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-[1.6rem] px-[1.4rem] sm:px-[2.4rem]">
      <div className="flex items-center gap-[1rem]">
        <h2 className="text-[1.8rem] font-bold text-text-primary">
          Recent Contacts
        </h2>
        <span className="px-[0.8rem] py-[0.2rem] border border-border rounded-full text-[1rem] font-medium text-text-primary">
          {totalCount} users
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-full sm:w-[28rem]">
          <Input
            placeholder="Search contacts"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 h-[3.6rem] border-input-stroke"
            leftIcon={
              <Image
                src={supabaseIcons.searchSmIcon}
                alt="search"
                width={20}
                height={20}
                className=""
              />
            }
          />
        </div>

        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-[0.8rem] border border-input-stroke rounded-lg hover:bg-input-filled transition-colors"
          >
            <Image
              src={supabaseIcons.filterLinesIcon}
              alt="filter"
              width={20}
              height={20}
            />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-50 overflow-hidden">
              {["All", "Active", "Unconfirmed", "Unsubscribed", "Bounced"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status as any)}
                    className={`w-full text-left px-4 py-2 text-[1.4rem] hover:bg-input-filled transition-colors ${selectedStatus === status ? "bg-input-filled font-bold" : ""}`}
                  >
                    {status}
                  </button>
                ),
              )}
            </div>
          )}
        </div>

        <div className="relative" ref={optionsRef}>
          <button
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            className="p-[0.8rem] border border-input-stroke rounded-lg hover:bg-input-filled transition-colors"
          >
            <Image
              src={supabaseIcons.threeDot}
              alt="options"
              width={20}
              height={20}
            />
          </button>

          {isOptionsOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-50 overflow-hidden">
              <button
                onClick={handleSelectAll}
                className="w-full text-left px-4 py-2 text-[1.4rem] hover:bg-input-filled transition-colors"
              >
                Select All
              </button>
              <button
                onClick={handleUnselectAll}
                className="w-full text-left px-4 py-2 text-[1.4rem] hover:bg-input-filled transition-colors text-destructive"
              >
                Unselect All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
