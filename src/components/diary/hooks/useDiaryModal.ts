"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks/useRedux";
import { DiaryEntry, updateDiaryEntry } from "../../../store/slices/diarySlice";

interface UseDiaryModalProps {
  entry: DiaryEntry | null;
  isOpen: boolean;
  onClose: () => void;
}

export const useDiaryModal = ({
  entry,
  isOpen,
  onClose,
}: UseDiaryModalProps) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("Neutral");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (entry && isOpen) {
      setContent(entry.content || "");
      setMood(entry.mood || "Neutral");
      setTags(entry.tags || []);
    }
  }, [entry, isOpen]);

  const handleSave = () => {
    if (!entry || !content.trim()) return;

    dispatch(
      updateDiaryEntry({
        ...entry,
        content,
        mood,
        tags,
      }),
    );
    onClose();
  };

  const toggleTag = (tagId: string) => {
    setTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  return {
    content,
    setContent,
    mood,
    setMood,
    tags,
    toggleTag,
    handleSave,
    isValid: content.trim().length > 0,
  };
};
