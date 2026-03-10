"use client";

import { useState, useCallback, useMemo } from "react";
import { Contact } from "../../../../../types";
import { useAppSelector } from "../../../../../../../../store/hooks/useRedux";

export function useOpenTasks(contact: Contact) {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const allTasks = useAppSelector((state) => state.diary.tasks);

  const contactTasks = useMemo(() => {
    return allTasks.filter(
      (task) =>
        task.contactId === contact.id && task.completed === showCompleted,
    );
  }, [allTasks, contact.id, showCompleted]);

  const taskCount = useMemo(() => {
    return allTasks.filter(
      (task) => task.contactId === contact.id && !task.completed,
    ).length;
  }, [allTasks, contact.id]);

  const handleAddTask = useCallback(() => {
    setIsAddTaskModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsAddTaskModalOpen(false);
  }, []);

  const toggleShowCompleted = useCallback(() => {
    setShowCompleted((prev) => !prev);
  }, []);

  return {
    taskCount,
    handleAddTask,
    toggleShowCompleted,
    showCompleted,
    isAddTaskModalOpen,
    handleCloseModal,
    contactTasks,
  };
}
