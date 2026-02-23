import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import {
  addDiaryEntry,
  updateDiaryEntry,
  setEditingEntryId,
  DiaryEntry,
} from "../../../store/slices/diarySlice";
import { RootState } from "../../../store";

export const useDiaryForm = () => {
  const dispatch = useAppDispatch();
  const editingEntryId = useAppSelector(
    (state: RootState) => state.diary.editingEntryId,
  );
  const entries = useAppSelector((state: RootState) => state.diary.entries);

  const [content, setContent] = useState("");
  const isEditing = !!editingEntryId;

  useEffect(() => {
    if (editingEntryId) {
      const entry = entries.find((e) => e.id === editingEntryId);
      if (entry) {
        setContent(entry.content);
      }
    } else {
      setContent("");
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
        mood: "Neutral",
      };
      dispatch(addDiaryEntry(newEntry));
    }
    setContent("");
  };

  const handleCancelEdit = () => {
    dispatch(setEditingEntryId(null));
    setContent("");
  };

  return {
    content,
    setContent,
    handleSave,
    handleCancelEdit,
    isEditing,
    isValid: content.trim().length > 0,
  };
};
