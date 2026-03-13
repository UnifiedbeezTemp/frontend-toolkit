"use client";

import React from "react";
import TagIcon from "../../../assets/icons/TagIcon";
import { StarIcon2 } from "../../../assets/icons/StarIcon2";
import { MOODS } from "../constants/diaryConstants";

interface DiaryEntryActionsProps {
  tagsRef: React.RefObject<HTMLButtonElement | null>;
  moodRef: React.RefObject<HTMLButtonElement | null>;
  onTagsClick: () => void;
  onMoodClick: () => void;
  selectedTagsCount: number;
  selectedMood: string;
}

export default function DiaryEntryActions({
  tagsRef,
  moodRef,
  onTagsClick,
  onMoodClick,
  selectedTagsCount,
  selectedMood,
}: DiaryEntryActionsProps) {
  const currentMood = MOODS.find((m) => m.label === selectedMood);

  return (
    <div className="flex items-center gap-[1rem]">
      {/* Tags Button */}
      <button
        ref={tagsRef}
        onClick={onTagsClick}
        className="flex items-center gap-[0.8rem] px-[1.2rem] py-[0.8rem] border border-input-stroke rounded-[0.8rem] bg-primary hover:bg-input-filled transition-colors"
      >
        <TagIcon size={16} color="var(--text-primary)" />
        <span className="text-[1.4rem] text-text-primary">
          {selectedTagsCount > 0
            ? `${selectedTagsCount} ${selectedTagsCount === 1 ? "Tag" : "Tags"}`
            : "Add Tags"}
        </span>
      </button>

      {/* Mood Button */}
      <button
        ref={moodRef}
        onClick={onMoodClick}
        className="flex items-center gap-[0.8rem] px-[1.2rem] py-[0.8rem] border border-input-stroke rounded-[0.8rem] bg-primary hover:bg-input-filled transition-colors"
      >
        {selectedMood && selectedMood !== "Neutral" ? (
          <span className="text-[1.6rem]">{currentMood?.emoji}</span>
        ) : (
          <StarIcon2 size={16} color="var(--text-primary)" />
        )}
        <span className="text-[1.4rem] text-text-primary">
          {selectedMood && selectedMood !== "Neutral"
            ? selectedMood
            : "Set Mood"}
        </span>
      </button>
    </div>
  );
}
