"use client";

import React, { useState } from "react";
import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import { cn } from "../../../lib/utils";
import { MOODS } from "../constants/diaryConstants";
import Input from "../../forms/Input";
import SearchIcon from "../../../assets/icons/SearchIcon";

interface MoodSelectorDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  selectedMood: string;
  onSelectMood: (mood: string) => void;
}

export default function MoodSelectorDropdown({
  isOpen,
  onClose,
  triggerRef,
  selectedMood,
  onSelectMood,
}: MoodSelectorDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMoods = MOODS.filter((mood) =>
    mood.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      className="min-w-[20rem] flex flex-col gap-[1.2rem]"
      maxHeight="30rem"
    >
      <div className="flex flex-col gap-[1.2rem] p-[1rem]">
        <h4 className="text-[1.4rem] font-bold text-text-primary px-[0.6rem]">
          Mood
        </h4>
        <Input
          placeholder="Search mood..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<SearchIcon size={16} color="var(--text-primary-2)" />}
          className="h-[3.6rem]"
        />
        <div className="flex flex-col gap-[0.4rem] max-h-[18rem] overflow-y-auto pr-[0.4rem]">
          {filteredMoods.length > 0 ? (
            filteredMoods.map((mood) => (
              <div
                key={mood.label}
                onClick={() => {
                  onSelectMood(mood.label);
                  onClose();
                  setSearchQuery("");
                }}
                className={cn(
                  "flex items-center gap-[1rem] p-[0.8rem] rounded-[0.6rem] cursor-pointer hover:bg-input-filled transition-colors group",
                  selectedMood === mood.label && "bg-brand-primary/10",
                )}
              >
                <span className="text-[2rem]">{mood.emoji}</span>
                <span className="text-[1.4rem] text-text-primary flex-1">
                  {mood.label}
                </span>
                {selectedMood === mood.label && (
                  <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-brand-primary" />
                )}
              </div>
            ))
          ) : (
            <div className="py-[2rem] text-center text-text-primary-2 text-[1.2rem]">
              No moods found
            </div>
          )}
        </div>
      </div>
    </SmartDropdown>
  );
}
