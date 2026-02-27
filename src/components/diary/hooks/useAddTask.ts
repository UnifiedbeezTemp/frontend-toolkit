"use client";

import { useState, useRef } from "react";
import { useAppDispatch } from "../../../store/hooks/useRedux";
import {
  addTask,
  setIsAddTaskModalOpen,
  TaskItem,
} from "../../../store/slices/diarySlice";
import { TASK_ASSIGNEES } from "../constants/diaryConstants";

export type AddTaskField = keyof AddTaskFormData;

export interface TaskAssignee {
  name: string;
  avatar: string;
}

export interface AddTaskFormData {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  category: string;
  dueDate: string;
  dueTime: string;
  assignee: TaskAssignee;
  reminder: string;
}

export interface AddTaskRefs {
  priority: React.RefObject<HTMLButtonElement | null>;
  category: React.RefObject<HTMLButtonElement | null>;
  assignee: React.RefObject<HTMLButtonElement | null>;
  reminder: React.RefObject<HTMLButtonElement | null>;
}

export type SetFieldType = <K extends keyof AddTaskFormData>(
  field: K,
  value: AddTaskFormData[K],
) => void;

export const useAddTask = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<AddTaskFormData>({
    title: "",
    description: "",
    priority: "Medium",
    category: "Follow-up",
    dueDate: "",
    dueTime: "",
    assignee: TASK_ASSIGNEES[0],
    reminder: "1 Hour before",
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const refs: AddTaskRefs = {
    priority: useRef<HTMLButtonElement>(null),
    category: useRef<HTMLButtonElement>(null),
    assignee: useRef<HTMLButtonElement>(null),
    reminder: useRef<HTMLButtonElement>(null),
  };

  const handleSave = () => {
    if (!formData.title || !formData.dueDate) return;

    const newTask: TaskItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      category: formData.category,
      dueDate: `${formData.dueDate}T${formData.dueTime || "00:00"}:00Z`,
      reminder: formData.reminder,
      completed: false,
      assignee: formData.assignee,
    };

    dispatch(addTask(newTask));
    dispatch(setIsAddTaskModalOpen(false));
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      category: "Follow-up",
      dueDate: "",
      dueTime: "",
      assignee: TASK_ASSIGNEES[0],
      reminder: "1 Hour before",
    });
  };

  const setField: SetFieldType = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const closeDropdown = () => setActiveDropdown(null);
  const toggleDropdown = (name: string) =>
    setActiveDropdown((prev) => (prev === name ? null : name));

  const isValid = !!formData.title && !!formData.dueDate;

  return {
    formData,
    setField,
    activeDropdown,
    toggleDropdown,
    closeDropdown,
    handleSave,
    refs,
    isValid,
    onClose: () => dispatch(setIsAddTaskModalOpen(false)),
  };
};
