"use client";

import React from "react";
import TaskApp28RegularIcon from "../../../../../../../../assets/icons/TaskApp28RegularIcon";

interface OpenTasksEmptyStateProps {
  message?: string;
}

export default function OpenTasksEmptyState({
  message = "There are no open tasks",
}: OpenTasksEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-[2.4rem] gap-[2.4rem]">
      <div className="flex items-center justify-center">
        <TaskApp28RegularIcon size={84} />
      </div>
      <p className="text-[1.4rem] font-bold text-dark-base-30">
        There are no open tasks
      </p>
    </div>
  );
}
