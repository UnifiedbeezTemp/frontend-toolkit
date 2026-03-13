"use client";

import React from "react";
import Modal from "../../modal/Modal";
import { DiaryEntry } from "../../../store/slices/diarySlice";
import { formatDate } from "../../../lib/utils";
import Button from "../../ui/Button";
import CloseModalButton from "../../modal/CloseModalButton";
import DiaryModalHeader from "./sub-components/DiaryModalHeader";
import DiaryModalContent from "./sub-components/DiaryModalContent";
import DiaryModalTags from "./sub-components/DiaryModalTags";
import { useDiaryModal } from "../hooks/useDiaryModal";

interface DiaryEntryDetailsModalProps {
  entry: DiaryEntry | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DiaryEntryDetailsModal({
  entry,
  isOpen,
  onClose,
}: DiaryEntryDetailsModalProps) {
  const {
    content,
    setContent,
    mood,
    setMood,
    tags,
    toggleTag,
    handleSave,
    isValid,
  } = useDiaryModal({ entry, isOpen, onClose });

  if (!entry) return null;

  const formattedDate = formatDate(entry.date);
  const time = entry.date.split("T")[1]?.slice(0, 5) || "14:30";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="rounded-[2.4rem] max-w-[60.9rem] sm:min-w-[60.9rem] overflow-hidden"
      bottomSheet
    >
      <div className="flex flex-col p-[2.4rem] sm:p-[4rem] gap-[2.4rem]">
        <div className="flex items-start justify-between">
          <DiaryModalHeader
            name={entry.name}
            date={formattedDate}
            time={time}
            mood={mood}
            onMoodSelect={setMood}
          />
          <CloseModalButton onClick={onClose} />
        </div>

        <DiaryModalContent
          content={content}
          onContentChange={setContent}
        />

        <DiaryModalTags
          selectedTags={tags}
          onToggleTag={toggleTag}
        />

        <div className="flex items-center gap-[1.6rem] mt-[0.8rem]">
          <Button variant="outline" className="w-full" onClick={onClose}>
            Go back
          </Button>
          <Button
            className="w-full highlight-inside border-0"
            onClick={handleSave}
            disabled={!isValid}
          >
            Edit Entry
          </Button>
        </div>
      </div>
    </Modal>
  );
}
