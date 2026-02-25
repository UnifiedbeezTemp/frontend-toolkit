"use client";

import React, { useState } from "react";
import TagIcon from "../../../assets/icons/TagIcon";
import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import Input from "../../forms/Input";
import SearchIcon from "../../../assets/icons/SearchIcon";
import Checkbox from "../../ui/CheckBox";
import { Tag } from "../../../store/slices/tagSlice";

interface TagSelectorDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  allTags: Tag[];
  selectedTags: string[];
  onToggleTag: (tagId: string) => void;
}

export default function TagSelectorDropdown({
  isOpen,
  onClose,
  triggerRef,
  allTags,
  selectedTags,
  onToggleTag,
}: TagSelectorDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTags = allTags.filter((tag) =>
    tag.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      className="min-w-[30rem] flex flex-col gap-[1.2rem]"
      maxHeight="30rem"
    >
      <div className="flex flex-col gap-[1.2rem] p-[1.6rem]">
        <h4 className="text-[1.4rem] font-bold text-text-primary">Tags</h4>
        <Input
          placeholder="Search tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<SearchIcon size={16} color="var(--text-primary-2)" />}
          className="h-[3.6rem]"
        />
        <div className="flex flex-col gap-[0.4rem] max-h-[18rem] overflow-y-auto pr-[0.4rem]">
          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => (
              <div
                key={tag.id}
                onClick={() => onToggleTag(tag.id)}
                className={`flex items-center justify-between p-[0.8rem] rounded-[0.6rem] cursor-pointer hover:bg-input-filled transition-colors group ${
                  selectedTags.includes(tag.id) ? "bg-brand-primary/10" : ""
                }`}
              >
                <div className="flex items-center gap-[1rem]">
                  <TagIcon
                    size={14}
                    className="text-text-primary-2 group-hover:text-brand-primary transition-colors"
                  />
                  <span className="text-[1.3rem] text-text-primary">
                    {tag.label}
                  </span>
                </div>
                <Checkbox
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => onToggleTag(tag.id)}
                  size="sm"
                />
              </div>
            ))
          ) : (
            <div className="py-[2rem] text-center text-text-primary-2 text-[1.2rem]">
              No tags found
            </div>
          )}
        </div>
      </div>
    </SmartDropdown>
  );
}
