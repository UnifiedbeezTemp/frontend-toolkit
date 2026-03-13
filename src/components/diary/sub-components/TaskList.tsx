"use client";

import React from "react";
import { useDiary } from "../hooks/useDiary";
import TaskItem from "./TaskItem";
import Input from "../../forms/Input";
import Image from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Button from "../../ui/Button";
import { cn } from "../../../lib/utils";
import PlusIcon from "../../../assets/icons/PlusIcon";

export default function TaskList() {
  const { tasks, searchQuery, handleSearch, setIsAddTaskModalOpen } =
    useDiary();
  const supabaseIcons = useSupabaseIcons();

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-between gap-[1.6rem]">
        <h3 className="text-[1.8rem] text-text-primary font-bold">
          Recent Tasks
        </h3>

        <div className="flex items-center gap-[1.2rem] flex-wrap sm:flex-nowrap">
          <Button
            onClick={() => setIsAddTaskModalOpen(true)}
            className="h-[3.6rem] px-[1.6rem] gap-[0.8rem] whitespace-nowrap"
          >
            <PlusIcon size={16} />
            <span className="text-[1.4rem] font-bold">Create Tasks</span>
          </Button>
        </div>
      </div>

      <div className="bg-primary border border-input-stroke rounded-[1.6rem] overflow-hidden">
        {tasks?.length > 0 ? (
          tasks?.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <div className="py-[6rem] text-center text-text-primary/50 text-[1.4rem]">
            No active tasks found.
          </div>
        )}
      </div>
    </div>
  );
}
