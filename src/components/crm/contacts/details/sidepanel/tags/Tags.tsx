"use client";

import React from "react";
import { useContactTags } from "./hooks/useContactTags";
import TagSelectorDropdown from "../../../../../diary/sub-components/TagSelectorDropdown";
import { TagPill } from "../../../../../inbox/components/TagPill";

export default function Tags() {
  const {
    allTags,
    selectedTags,
    selectedTagIds,
    isDropdownOpen,
    inputRef,
    handleToggleTag,
    handleRemoveTag,
    toggleDropdown,
    closeDropdown,
  } = useContactTags();

  return (
    <div className="flex flex-col gap-[1.6rem] pb-[2.4rem] border-b border-input-stroke">
      <h3 className="text-[1.6rem] font-bold text-dark-base-70 tracking-tight">
        Tags
      </h3>

      <div className="flex flex-col gap-[1.2rem]">
        {/* Trigger Input */}
        <div
          ref={inputRef}
          onClick={toggleDropdown}
          className="w-full h-[4.8rem] flex items-center px-[1.4rem] border border-input-stroke rounded-[0.8rem] bg-primary cursor-pointer hover:border-brand-primary transition-colors"
        >
          <span className="text-[1.6rem] text-dark-base-40">Enter Tag</span>
        </div>

        {/* Dropdown */}
        <TagSelectorDropdown
          isOpen={isDropdownOpen}
          onClose={closeDropdown}
          triggerRef={inputRef}
          allTags={allTags}
          selectedTags={selectedTagIds}
          onToggleTag={handleToggleTag}
        />

        {/* Tags Container */}
        <div className="flex flex-col gap-[1.2rem] p-[1.6rem] bg-input-filled border border-input-stroke rounded-[0.8rem]">
          <div className="flex flex-wrap gap-[0.8rem]">
            {selectedTags.map((tag) => (
              <TagPill
                key={tag.id}
                label={tag.label}
                isDismissable
                onDismiss={() => handleRemoveTag(tag.id)}
                className="h-[3.6rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.4rem] font-bold transition-all"
                tagIconSize={16}
                dismissIconSize={12}
              />
            ))}
          </div>

          {/* <button className="text-[1.6rem] font-bold text-brand-primary ml-auto hover:underline">
            View all
          </button> */}
        </div>
      </div>
    </div>
  );
}
