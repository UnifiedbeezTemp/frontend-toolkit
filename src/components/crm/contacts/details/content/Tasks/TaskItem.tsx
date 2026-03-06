"use client";

import React from "react";
import { ContactTask } from "../types";
import Checkbox from "../../../../../ui/CheckBox";
import TaskPriorityBadge from "../../../../../diary/sub-components/TaskPriorityBadge";
import ImageComponent from "../../../../../ui/ImageComponent";
import CalendarIcon2 from "../../../../../../assets/icons/CalendarIcon2";
import { cn, formatShortDate, formatTime } from "../../../../../../lib/utils";

import {
  useSupabaseIcons,
  useSupabaseImages,
} from "../../../../../../lib/supabase/useSupabase";

interface TaskItemProps {
  task: ContactTask;
  onToggle: (id: string) => void;
  isLast: boolean;
}

export default function TaskItem({ task, onToggle, isLast }: TaskItemProps) {
  const icons = useSupabaseIcons() as Record<string, string>;
  const images = useSupabaseImages();

  const formattedDueDate = formatShortDate(task.dueDate);
  const formattedTime = formatTime(task.dueDate);
  const isDueToday =
    new Date(task.dueDate).toDateString() === new Date().toDateString();

  return (
    <div
      className={cn(
        "flex items-start gap-[1.6rem] py-[2rem] transition-opacity",
        !isLast && "border-b border-input-stroke",
        task.completed && "opacity-70",
      )}
    >
      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mt-[0.2rem]"
      />

      <div className="flex-1 flex flex-col gap-[1rem]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[0.6rem]">
          <div className="flex items-center gap-[0.8rem] flex-wrap">
            <h4
              className={cn(
                "text-[1.6rem] font-bold text-dark-base-100",
                task.completed && "line-through",
              )}
            >
              {task.title}
            </h4>
            <TaskPriorityBadge priority={task.priority} />
          </div>
          <span className="text-[1.2rem] text-dark-base-40 font-medium whitespace-nowrap">
            {formattedDueDate} {formattedTime}
          </span>
        </div>

        {task.description && (
          <p className="text-[1.4rem] text-dark-base-100/70 leading-relaxed">
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-[1.6rem]">
          <div className="flex items-center gap-[0.6rem]">
            <CalendarIcon2
              size={16}
              color={isDueToday ? "var(--error)" : "var(--dark-base-40)"}
            />
            <span
              className={cn(
                "text-[1.2rem] font-bold",
                isDueToday ? "text-error" : "text-dark-base-40",
              )}
            >
              {isDueToday ? "Due Today" : `Due ${formattedDueDate}`}
            </span>
          </div>

          {task.assignee && (
            <div className="flex items-center gap-[0.8rem]">
              <div className="w-[2rem] h-[2rem] rounded-full overflow-hidden border border-input-stroke bg-input-filled flex-shrink-0">
                <ImageComponent
                  src={
                    (task.assignee.avatar &&
                      images[task.assignee.avatar as keyof typeof images]) ||
                    icons.userGreen
                  }
                  alt={task.assignee.name}
                  width={20}
                  height={20}
                  className="object-cover"
                />
              </div>
              <span className="text-[1.2rem] text-dark-base-40 font-medium">
                {task.assignee.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
