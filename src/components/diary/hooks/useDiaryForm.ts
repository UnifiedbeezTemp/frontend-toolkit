import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import {
  addDiaryEntry,
  updateDiaryEntry,
  setEditingEntryId,
  DiaryEntry,
} from "../../../store/slices/diarySlice";
import { RootState } from "../../../store";
import { useTags } from "../../tags/hooks/useTags";

export const useDiaryForm = () => {
  const dispatch = useAppDispatch();
  useTags();
  const editingEntryId = useAppSelector(
    (state: RootState) => state.diary.editingEntryId,
  );
  const entries = useAppSelector((state: RootState) => state.diary.entries);

  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>("Neutral");
  const isEditing = !!editingEntryId;

  const allTags = useAppSelector((state: RootState) => state.tag.tags);

  useEffect(() => {
    if (editingEntryId) {
      const entry = entries.find((e) => e.id === editingEntryId);
      if (entry) {
        setContent(entry.content);
        setSelectedTags(entry.tags || []);
        setSelectedMood(entry.mood || "Neutral");
      }
    } else {
      setContent("");
      setSelectedTags([]);
      setSelectedMood("Neutral");
    }
  }, [editingEntryId, entries]);

  const handleSave = () => {
    if (!content.trim()) return;

    if (isEditing) {
      const entry = entries.find((e) => e.id === editingEntryId);
      if (entry) {
        dispatch(
          updateDiaryEntry({
            ...entry,
            content,
            tags: selectedTags,
            mood: selectedMood,
          }),
        );
      }
      dispatch(setEditingEntryId(null));
    } else {
      const newEntry: DiaryEntry = {
        id: Date.now().toString(),
        name: "New Entry",
        date: new Date().toISOString(),
        content,
        mood: selectedMood,
        tags: selectedTags,
      };
      dispatch(addDiaryEntry(newEntry));
    }
    setContent("");
    setSelectedTags([]);
    setSelectedMood("Neutral");
  };

  const handleCancelEdit = () => {
    dispatch(setEditingEntryId(null));
    setContent("");
    setSelectedTags([]);
    setSelectedMood("Neutral");
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  return {
    content,
    setContent,
    selectedTags,
    setSelectedTags,
    toggleTag,
    selectedMood,
    setSelectedMood,
    allTags,
    handleSave,
    handleCancelEdit,
    isEditing,
    isValid: content.trim().length > 0,
  };
};
