"use client";

import React from "react";
import Tabs from "../ui/Tabs";
import { useDiary } from "./hooks/useDiary";
import DiaryEntryForm from "./sub-components/DiaryEntryForm";
import DiaryRecentEntries from "./sub-components/DiaryRecentEntries";
import { cn } from "../../lib/utils";
import MiBook from "../../assets/icons/MiBook";
import TaskList from "./sub-components/TaskList";
import AddTaskModal from "./modals/AddTaskModal";

export default function Diary() {
  const {
    activeTab,
    handleTabChange,
    selectedEntryForDetails,
    handleCloseDetails,
    handleEditEntry,
    isAddTaskModalOpen,
    setIsAddTaskModalOpen,
  } = useDiary();

  const tabOptions = [
    { label: "Diary", value: "diary" },
    { label: "My Tasks", value: "tasks" },
  ];

  return (
    <div className="flex flex-col w-full lg:mt-[2rem] bg-primary border border-input-stroke rounded-[1.6rem] overflow-hidden max-h-[48rem]">
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
      />
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-[1rem] justify-between p-[2.4rem]">
        <div className="flex items-center gap-[1rem]">
          <div className="w-[3rem] h-[3rem] rounded-full bg-success/10 flex items-center justify-center">
            <MiBook className="w-[2.4rem] h-[2.4rem]" color="var(--success)" />
          </div>
          <h2 className="text-[1.6rem] sm:text-[2rem] font-bold text-text-secondary">
            Diary
          </h2>
        </div>

        <Tabs
          tabs={tabOptions}
          activeTab={activeTab}
          onTabChange={(v) => handleTabChange(v as "diary" | "tasks")}
          variant="default"
          fullWidth={false}
          className="p-[.5rem] w-fit"
        />
      </div>

      {/* Content */}
      <div className="p-[1rem] overflow-y-auto flex-1">
        {activeTab === "diary" ? (
          <div className="flex flex-col gap-[1rem]">
            <DiaryEntryForm />
            <DiaryRecentEntries />
          </div>
        ) : (
          <TaskList />
        )}
      </div>
    </div>
  );
}
