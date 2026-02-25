"use client";

import React, { useRef, useState, useEffect } from "react";
import Textarea from "../../forms/Textarea";
import Button from "../../ui/Button";
import SaveIcon from "../../../assets/icons/SaveIcon";
import { useDiaryForm } from "../hooks/useDiaryForm";
import TagSelectorDropdown from "./TagSelectorDropdown";
import MoodSelectorDropdown from "./MoodSelectorDropdown";
import DiaryEntryActions from "./DiaryEntryActions";

export default function DiaryEntryForm() {
  const {
    content,
    setContent,
    selectedTags,
    toggleTag,
    selectedMood,
    setSelectedMood,
    allTags,
    handleSave,
    handleCancelEdit,
    isEditing,
    isValid,
  } = useDiaryForm();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isEditing]);

  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isMoodOpen, setIsMoodOpen] = useState(false);

  const tagsRef = useRef<HTMLButtonElement>(null);
  const moodRef = useRef<HTMLButtonElement>(null);

  return (
    <div ref={containerRef} className="flex flex-col gap-[1.6rem]">
      <div className="flex items-center justify-between">
        <h3 className="text-[1.4rem] lg:text-[1.8rem] text-text-primary font-medium">
          {isEditing ? "Edit Entry" : "New Entry"}
        </h3>
        {isEditing && (
          <button
            onClick={handleCancelEdit}
            className="text-[1.4rem] text-brand-primary hover:underline"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <div className="">
        <Textarea
          placeholder="Write your diary entry for today..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-input-filled"
        />

        <div className="flex items-center justify-between mt-[1.6rem]">
          <DiaryEntryActions
            tagsRef={tagsRef}
            moodRef={moodRef}
            onTagsClick={() => setIsTagsOpen(true)}
            onMoodClick={() => setIsMoodOpen(true)}
            selectedTagsCount={selectedTags.length}
            selectedMood={selectedMood}
          />

          <Button
            onClick={handleSave}
            disabled={!isValid}
            className="w-fit ml-auto flex items-center gap-[1rem]"
          >
            <SaveIcon size={16} color="white" />
            <span className="text-[1.4rem]">
              {isEditing ? "Update Entry" : "Save Entry"}
            </span>
          </Button>
        </div>

        <TagSelectorDropdown
          isOpen={isTagsOpen}
          onClose={() => setIsTagsOpen(false)}
          triggerRef={tagsRef}
          allTags={allTags}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
        />

        <MoodSelectorDropdown
          isOpen={isMoodOpen}
          onClose={() => setIsMoodOpen(false)}
          triggerRef={moodRef}
          selectedMood={selectedMood}
          onSelectMood={setSelectedMood}
        />
      </div>
    </div>
  );
}
