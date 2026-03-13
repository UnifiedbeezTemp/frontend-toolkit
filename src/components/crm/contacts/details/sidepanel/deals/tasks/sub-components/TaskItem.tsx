"use client";

import React from "react";
import { cn, formatShortDate } from "../../../../../../../../lib/utils";
import Checkbox from "../../../../../../../ui/CheckBox";
import { TaskItem as TaskType } from "../../../../../../../../store/slices/diarySlice";

interface TaskItemProps {
  task: TaskType;
  onToggle: (id: string) => void;
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <div className="flex items-start gap-[1.2rem] px-[1.6rem] py-[1.2rem] border-b border-input-stroke last:border-b-0 hover:bg-input-filled/30 transition-colors">
      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mt-[0.2rem]"
      />
      <div className="flex flex-col gap-[0.4rem] min-w-0 flex-1">
        <h4
          className={cn(
            "text-[1.4rem] font-bold text-dark-base-100 truncate",
            task.completed && "line-through text-dark-base-40",
          )}
        >
          {task.title}
        </h4>
        <div className="flex items-center justify-between gap-[0.8rem]">
          <span className="text-[1.2rem] font-medium text-dark-base-40">
            Due {formatShortDate(task.dueDate)}
          </span>
          <div
            className={cn(
              "px-[0.6rem] py-[0.1rem] rounded-[0.4rem] text-[1rem] font-bold uppercase",
              task.priority === "High"
                ? "bg-destructive/10 text-destructive"
                : task.priority === "Medium"
                  ? "bg-warning/10 text-warning"
                  : "bg-success/10 text-success",
            )}
          >
            {task.priority}
          </div>
        </div>
      </div>
    </div>
  );
}
