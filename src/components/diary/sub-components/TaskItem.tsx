"use client";

import React from "react";
import { TaskItem as TaskType } from "../../../store/slices/diarySlice";
import Checkbox from "../../ui/CheckBox";
import { cn, formatShortDate, formatTime } from "../../../lib/utils";
import TaskPriorityBadge from "./TaskPriorityBadge";
import ImageComponent from "../../ui/ImageComponent";
import CalendarIcon2 from "../../../assets/icons/CalendarIcon2";
import ClockIcon from "../../../assets/icons/ClockIcon";
import { useDiary } from "../hooks/useDiary";

interface TaskItemProps {
  task: TaskType;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTask } = useDiary();

  const formattedDueDate = formatShortDate(task.dueDate);
  const formattedTime = formatTime(task.dueDate);

  const isDueToday =
    new Date(task.dueDate).toDateString() === new Date().toDateString();

  return (
    <div
      className={cn(
        "flex items-start gap-[1.6rem] p-[2.4rem] border-b border-input-stroke last:border-0 transition-opacity",
        task.completed && "opacity-80",
      )}
    >
      <Checkbox
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="mt-[0.2rem]"
      />

      <div className="flex-1 flex flex-col gap-[1.2rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.8rem]">
            <h4
              className={cn(
                "text-[1.6rem] font-bold text-text-primary",
                task.completed && "line-through",
              )}
            >
              {task.title}
            </h4>
            <TaskPriorityBadge priority={task.priority} />
          </div>
          <span className="text-[1.2rem] text-text-primary/60 font-medium">
            {formattedDueDate} {formattedTime}
          </span>
        </div>

        {task.description && (
          <p className="text-[1.4rem] text-text-primary/70 leading-relaxed">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[1.6rem]">
            <div className="flex items-center gap-[0.6rem]">
              <CalendarIcon2
                size={16}
                color={isDueToday ? "var(--error)" : "var(--text-primary-2)"}
              />
              <span
                className={cn(
                  "text-[1.2rem] font-bold",
                  isDueToday ? "text-error" : "text-text-primary/60",
                )}
              >
                {isDueToday ? "Due Today" : `Due ${formattedDueDate}`}
              </span>
            </div>

            {task.assignee && (
              <div className="flex items-center gap-[0.8rem]">
                <ImageComponent
                  src={task.assignee.avatar}
                  alt={task.assignee.name}
                  width={20}
                  height={20}
                  containerClassName="w-[2rem] h-[2rem] rounded-full overflow-hidden border border-input-stroke"
                />
                <span className="text-[1.2rem] text-text-primary/60 font-medium">
                  {task.assignee.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
