import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import {
  setDiaryEntries,
  setActiveTab,
  setDiarySearchQuery,
  setEditingEntryId,
  DiaryEntry,
} from "../../../store/slices/diarySlice";
import { generateDiaryData } from "../utils/generateDiaryData";
import { RootState } from "../../../store";

export const useDiary = () => {
  const dispatch = useAppDispatch();
  const { entries, tasks, activeTab, searchQuery, editingEntryId } =
    useAppSelector((state: RootState) => state.diary);

  useEffect(() => {
    if (entries.length === 0) {
      dispatch(setDiaryEntries(generateDiaryData()));
    }
  }, [dispatch, entries.length]);

  const handleTabChange = (tab: "diary" | "tasks") => {
    dispatch(setActiveTab(tab));
  };

  const handleSearch = (query: string) => {
    dispatch(setDiarySearchQuery(query));
  };

  const handleEditEntry = (id: string) => {
    dispatch(setEditingEntryId(id));
  };

  const filteredEntries = entries.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return {
    entries: filteredEntries,
    allEntries: entries,
    tasks,
    activeTab,
    searchQuery,
    editingEntryId,
    handleTabChange,
    handleSearch,
    handleEditEntry,
  };
};
