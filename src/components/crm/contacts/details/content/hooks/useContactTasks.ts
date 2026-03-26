"use client";

import { useMemo } from "react";
import { DUMMY_TASKS } from "../mockData";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../store/hooks/useRedux";
import {
  setTasks,
  toggleTaskStatus,
  setIsAddTaskModalOpen,
} from "../../../../../../store/slices/diarySlice";

export function useContactTasks(contactId: string, searchQuery: string = "") {
  const dispatch = useAppDispatch();
  const allTasks = useAppSelector((state) => state.diary.tasks);
  const isAddTaskModalOpen = useAppSelector(
    (state) => state.diary.isAddTaskModalOpen,
  );

  // Initialize with dummy data if empty (for demo purposes)
  useMemo(() => {
    if (allTasks.length === 0) {
      // Map DUMMY_TASKS to current contactId if they don't have one
      const initialTasks = DUMMY_TASKS.map((t) => ({
        ...t,
        category: t.category || "Follow-up", // Ensure category exists
        contactId: t.contactId || contactId,
      }));
      dispatch(setTasks(initialTasks));
    }
  }, [allTasks.length, contactId, dispatch]);

  const contactTasks = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allTasks.filter(
      (task) =>
        task.contactId === contactId &&
        (task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query)),
    );
  }, [allTasks, contactId, searchQuery]);

  const handleToggleTask = (id: string) => {
    dispatch(toggleTaskStatus(id));
  };

  const openAddTaskModal = () => {
    dispatch(setIsAddTaskModalOpen(true));
  };

  const closeAddTaskModal = () => {
    dispatch(setIsAddTaskModalOpen(false));
  };

  return {
    tasks: contactTasks,
    isAddTaskModalOpen,
    handleToggleTask,
    openAddTaskModal,
    closeAddTaskModal,
  };
}
