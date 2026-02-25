import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import {
  setDiaryEntries,
  setActiveTab,
  setDiarySearchQuery,
  setEditingEntryId,
  setSelectedEntryForDetails,
  toggleTaskStatus,
  setTasks,
  setIsAddTaskModalOpen,
  setDiaryGroupBy,
  DiaryEntry,
} from "../../../store/slices/diarySlice";
import { generateDiaryData } from "../utils/generateDiaryData";
import { generateTaskData } from "../utils/generateTaskData";
import { RootState } from "../../../store";

export const useDiary = () => {
  const dispatch = useAppDispatch();
  const {
    entries,
    tasks,
    activeTab,
    searchQuery,
    editingEntryId,
    selectedEntryForDetails,
    isAddTaskModalOpen,
    groupBy,
  } = useAppSelector((state: RootState) => state.diary);

  useEffect(() => {
    if (entries.length === 0) {
      dispatch(setDiaryEntries(generateDiaryData()));
    }
  }, [dispatch, entries.length]);

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(setTasks(generateTaskData()));
    }
  }, [dispatch, tasks.length]);

  const handleTabChange = (tab: "diary" | "tasks") => {
    dispatch(setActiveTab(tab));
  };

  const handleSearch = (query: string) => {
    dispatch(setDiarySearchQuery(query));
  };

  const handleGroupBy = (group: "date" | "mood" | "alphabetical") => {
    dispatch(setDiaryGroupBy(group));
  };

  const toggleTask = (id: string) => {
    dispatch(toggleTaskStatus(id));
  };

  const handleEditEntry = (id: string) => {
    dispatch(setEditingEntryId(id));
    dispatch(setSelectedEntryForDetails(null));
  };

  const handleViewDetails = (entry: DiaryEntry) => {
    dispatch(setSelectedEntryForDetails(entry));
  };

  const handleCloseDetails = () => {
    dispatch(setSelectedEntryForDetails(null));
  };

  const filteredEntries = [...entries]
    .filter(
      (entry) =>
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (groupBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (groupBy === "mood") {
        return (a.mood || "").localeCompare(b.mood || "");
      }
      if (groupBy === "alphabetical") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return {
    entries: filteredEntries,
    allEntries: entries,
    tasks,
    activeTab,
    searchQuery,
    groupBy,
    editingEntryId,
    selectedEntryForDetails,
    handleTabChange,
    handleSearch,
    handleGroupBy,
    handleEditEntry,
    handleViewDetails,
    handleCloseDetails,
    toggleTask,
    isAddTaskModalOpen,
    setIsAddTaskModalOpen: (open: boolean) =>
      dispatch(setIsAddTaskModalOpen(open)),
  };
};
