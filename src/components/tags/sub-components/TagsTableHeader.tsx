import React from "react";
import Image from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Input from "../../forms/Input";
import { useTagsTableHeader } from "../hooks/useTagsTableHeader";
import { CATEGORY_MAP } from "../utils/tagConstants";

export default function TagsTableHeader() {
  const {
    searchQuery,
    handleSearch,
    filteredTagsInCurrentView,
    isFilterOpen,
    setIsFilterOpen,
    isOptionsOpen,
    setIsOptionsOpen,
    filterRef,
    optionsRef,
    handleSelectAll,
    handleUnselectAll,
    handleDeleteTags,
    handleStatusChange,
    selectedCategory,
  } = useTagsTableHeader();

  const supabaseIcons = useSupabaseIcons();
  const categoryLabel = CATEGORY_MAP[selectedCategory]?.label;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-[1.4rem] sm:px-[2.4rem]">
      <div className="flex items-center gap-[1rem]">
        <h2 className="text-[1.8rem] font-bold text-text-primary">Tags</h2>
        <span className="px-[0.8rem] py-[0.2rem] border border-border rounded-full text-[1rem] font-medium text-text-primary">
          {filteredTagsInCurrentView.length} {categoryLabel}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 sm:w-[28rem]">
          <Input
            placeholder="Search tags"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 h-[3.6rem] border-input-stroke"
            leftIcon={
              <Image
                src={supabaseIcons.searchSmIcon}
                alt="search"
                width={18}
                height={18}
              />
            }
          />
        </div>

        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-[0.8rem] border border-input-stroke rounded-lg hover:bg-input-filled transition-colors shrink-0"
          >
            <Image
              src={supabaseIcons.filterLinesIcon}
              alt="filter"
              width={18}
              height={18}
            />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-primary border border-input-stroke rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="p-3 border-b border-input-stroke bg-input-filled/50 font-bold text-[1.4rem] text-text-primary">
                Filter by Status
              </div>
              {["Active", "Archived", "All"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className="w-full text-left px-4 py-3 text-[1.4rem] hover:bg-input-filled transition-colors text-text-primary"
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={optionsRef}>
          <button
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            className="p-[0.8rem] border border-input-stroke rounded-lg hover:bg-input-filled transition-colors shrink-0"
          >
            <Image
              src={supabaseIcons.threeDot}
              alt="options"
              width={18}
              height={18}
            />
          </button>

          {isOptionsOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-primary border border-input-stroke rounded-lg shadow-lg z-50 overflow-hidden">
              <button
                onClick={handleSelectAll}
                className="w-full text-left px-4 py-3 text-[1.4rem] hover:bg-input-filled transition-colors text-text-primary font-bold"
              >
                Select All
              </button>
              <button
                onClick={handleUnselectAll}
                className="w-full text-left px-4 py-3 text-[1.4rem] hover:bg-input-filled transition-colors text-text-primary"
              >
                Unselect All
              </button>
              <div className="h-[1px] bg-input-stroke mx-2" />
              <button
                onClick={handleDeleteTags}
                className="w-full text-left px-4 py-3 text-[1.4rem] hover:bg-input-filled transition-colors text-destructive flex items-center gap-2"
              >
                <Image
                  src={supabaseIcons.trashRed || ""}
                  alt="delete"
                  width={16}
                  height={16}
                />
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
