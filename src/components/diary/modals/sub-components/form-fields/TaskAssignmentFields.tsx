"use client";

import React from "react";
import SmartDropdown from "../../../../smart-dropdown/SmartDropdown";
import ImageComponent from "../../../../ui/ImageComponent";
import Image from "next/image";
import {
  TASK_REMINDERS,
  TASK_ASSIGNEES,
} from "../../../constants/diaryConstants";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import {
  AddTaskFormData,
  AddTaskRefs,
  SetFieldType,
} from "../../../hooks/useAddTask";

interface TaskAssignmentFieldsProps {
  formData: AddTaskFormData;
  setField: SetFieldType;
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
  closeDropdown: () => void;
  refs: AddTaskRefs;
}

export default function TaskAssignmentFields({
  formData,
  setField,
  activeDropdown,
  toggleDropdown,
  closeDropdown,
  refs,
}: TaskAssignmentFieldsProps) {
  const supabaseIcons = useSupabaseIcons();

  return (
    <>
      {/* Assign To */}
      <div className="flex flex-col gap-[0.8rem]">
        <label className="text-[1.4rem] font-bold text-text-secondary">
          Assign to
        </label>
        <button
          ref={refs.assignee}
          onClick={() => toggleDropdown("assignee")}
          className="h-[4.4rem] px-[1.6rem] flex items-center justify-between border border-input-stroke rounded-[0.8rem] text-[1.4rem] text-text-primary bg-primary hover:bg-input-filled transition-all"
        >
          <div className="flex items-center gap-[0.8rem]">
            <ImageComponent
              src={formData.assignee.avatar}
              alt={formData.assignee.name}
              width={20}
              height={20}
              containerClassName="w-[2rem] h-[2rem] rounded-full overflow-hidden border border-input-stroke"
            />
            <span>{formData.assignee.name}</span>
          </div>
          <Image
            src={supabaseIcons.chevronDown || ""}
            alt="down"
            width={16}
            height={16}
            className="opacity-60"
          />
        </button>
        <SmartDropdown
          isOpen={activeDropdown === "assignee"}
          onClose={closeDropdown}
          triggerRef={refs.assignee}
          className=""
        >
          <div className="py-[0.8rem]">
            {TASK_ASSIGNEES.map((a) => (
              <button
                key={a.name}
                onClick={() => {
                  setField("assignee", a);
                  closeDropdown();
                }}
                className="w-full h-[4.4rem] px-[1.6rem] flex items-center gap-[0.8rem] text-[1.4rem] text-text-primary hover:bg-input-filled text-left transition-colors"
              >
                <ImageComponent
                  src={a.avatar}
                  alt={a.name}
                  width={24}
                  height={24}
                  containerClassName="w-[2.4rem] h-[2.4rem] rounded-full overflow-hidden border border-input-stroke"
                />
                {a.name}
              </button>
            ))}
          </div>
        </SmartDropdown>
      </div>

      {/* Reminder */}
      <div className="flex flex-col gap-[0.8rem]">
        <label className="text-[1.4rem] font-bold text-text-secondary">
          Reminder
        </label>
        <button
          ref={refs.reminder}
          onClick={() => toggleDropdown("reminder")}
          className="h-[4.4rem] px-[1.6rem] flex items-center justify-between border border-input-stroke rounded-[0.8rem] text-[1.4rem] text-text-primary bg-primary hover:bg-input-filled transition-all"
        >
          <span>{formData.reminder}</span>
          <Image
            src={supabaseIcons.chevronDown || ""}
            alt="down"
            width={16}
            height={16}
            className="opacity-60"
          />
        </button>
        <SmartDropdown
          isOpen={activeDropdown === "reminder"}
          onClose={closeDropdown}
          triggerRef={refs.reminder}
          className=""
        >
          <div className="py-[0.8rem]">
            {TASK_REMINDERS.map((r) => (
              <button
                key={r}
                onClick={() => {
                  setField("reminder", r);
                  closeDropdown();
                }}
                className="w-full h-[4rem] px-[1.6rem] flex items-center text-[1.4rem] text-text-primary hover:bg-input-filled text-left transition-colors"
              >
                {r}
              </button>
            ))}
          </div>
        </SmartDropdown>
      </div>
    </>
  );
}
