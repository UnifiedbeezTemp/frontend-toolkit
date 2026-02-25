"use client";

import React from "react";
import Tabs from "../ui/Tabs";
import { useDiary } from "./hooks/useDiary";
import DiaryEntryForm from "./sub-components/DiaryEntryForm";
import DiaryRecentEntries from "./sub-components/DiaryRecentEntries";
import { cn } from "../../lib/utils";
import MiBook from "../../assets/icons/MiBook";

export default function Diary() {
  const { activeTab, handleTabChange } = useDiary();

  const tabOptions = [
    { label: "Diary", value: "diary" },
    { label: "My Tasks", value: "tasks" },
  ];

  return (
    <div className="flex flex-col w-full  lg:mt-[2rem] bg-primary border border-input-stroke rounded-[1.6rem] overflow-hidden max-h-[48rem]">
      {/* Header */}
      <div className="flex  flex-col lg:flex-row lg:items-center gap-[1rem] justify-between p-[1rem]">
        <div className="flex items-center gap-[1rem]">
          <div className="w-[3rem] h-[3rem] rounded-full bg-success/10 flex items-center justify-center">
            <MiBook className="w-[2.4rem] h-[2.4rem]" color="var(--success)" />
          </div>
          <h2 className="text-[1.6rem] sm:text-[2rem] font-bold text-text-secondary">Diary</h2>
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
          <div className="py-20 flex flex-col items-center justify-center text-center opacity-50">
            <h3 className="text-[1.8rem] font-bold text-text-primary">
              No Tasks
            </h3>
            <p className="text-[1.4rem] text-text-primary">
              You do not have any active tasks
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
