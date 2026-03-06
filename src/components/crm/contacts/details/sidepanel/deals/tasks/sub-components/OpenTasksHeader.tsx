"use client";

import React from "react";

interface OpenTasksHeaderProps {
  taskCount: number;
  showCompleted: boolean;
  onAddTask: () => void;
  onToggleCompleted: () => void;
}

export default function OpenTasksHeader({
  taskCount,
  showCompleted,
  onAddTask,
  onToggleCompleted,
}: OpenTasksHeaderProps) {
  return (
    <div className="flex items-center justify-between px-[1.6rem] py-[1.2rem] border-b border-input-stroke">
      <h3 className="text-[1rem] font-bold text-dark-base-100">
        {showCompleted ? "Completed Tasks" : `Open Tasks(${taskCount})`}
      </h3>

      <div className="flex items-center gap-[1.6rem]">
        <button
          onClick={onToggleCompleted}
          className="text-[1rem] font-bold text-dark-base-70 hover:text-dark-base-100 transition-colors"
        >
          {showCompleted ? "View Open Tasks" : "View Completed Tasks"}
        </button>
        <button
          onClick={onAddTask}
          className="text-[1rem] font-bold text-brand-primary hover:opacity-80 transition-opacity"
        >
          Add a Task
        </button>
      </div>
    </div>
  );
}
