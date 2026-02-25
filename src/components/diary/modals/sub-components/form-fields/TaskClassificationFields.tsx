"use client";

import React from "react";
import SmartDropdown from "../../../../smart-dropdown/SmartDropdown";
import Image from "next/image";
import {
  TASK_PRIORITIES,
  TASK_CATEGORIES,
} from "../../../constants/diaryConstants";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import {
  AddTaskField,
  AddTaskFormData,
  AddTaskRefs,
  SetFieldType,
} from "../../../hooks/useAddTask";

interface TaskClassificationFieldsProps {
  formData: AddTaskFormData;
  setField: SetFieldType;
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
  closeDropdown: () => void;
  refs: AddTaskRefs;
}

export default function TaskClassificationFields({
  formData,
  setField,
  activeDropdown,
  toggleDropdown,
  closeDropdown,
  refs,
}: TaskClassificationFieldsProps) {
  const supabaseIcons = useSupabaseIcons();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.6rem]">
      {/* Priority */}
      <div className="flex flex-col gap-[0.8rem]">
        <label className="text-[1.4rem] font-bold text-text-secondary">
          Priority
        </label>
        <button
          ref={refs.priority}
          onClick={() => toggleDropdown("priority")}
          className="h-[4.4rem] px-[1.6rem] flex items-center justify-between border border-input-stroke rounded-[0.8rem] text-[1.4rem] text-text-primary bg-primary hover:bg-input-filled transition-all"
        >
          <span>{formData.priority}</span>
          <Image
            src={supabaseIcons.chevronDown || ""}
            alt="down"
            width={16}
            height={16}
            className="opacity-60"
          />
        </button>
        <SmartDropdown
          isOpen={activeDropdown === "priority"}
          onClose={closeDropdown}
          triggerRef={refs.priority}
          className=""
        >
          <div className="py-[0.8rem]">
            {TASK_PRIORITIES.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setField("priority", p);
                  closeDropdown();
                }}
                className="w-full h-[4rem] px-[1.6rem] flex items-center text-[1.4rem] text-text-primary hover:bg-input-filled text-left transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </SmartDropdown>
      </div>

      {/* Category */}
      <div className="flex flex-col gap-[0.8rem]">
        <label className="text-[1.4rem] font-bold text-text-secondary">
          Category
        </label>
        <button
          ref={refs.category}
          onClick={() => toggleDropdown("category")}
          className="h-[4.4rem] px-[1.6rem] flex items-center justify-between border border-input-stroke rounded-[0.8rem] text-[1.4rem] text-text-primary bg-primary hover:bg-input-filled transition-all"
        >
          <span>{formData.category}</span>
          <Image
            src={supabaseIcons.chevronDown || ""}
            alt="down"
            width={16}
            height={16}
            className="opacity-60"
          />
        </button>
        <SmartDropdown
          isOpen={activeDropdown === "category"}
          onClose={closeDropdown}
          triggerRef={refs.category}
          className=""
        >
          <div className="py-[0.8rem]">
            {TASK_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setField("category", c);
                  closeDropdown();
                }}
                className="w-full h-[4rem] px-[1.6rem] flex items-center text-[1.4rem] text-text-primary hover:bg-input-filled text-left transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        </SmartDropdown>
      </div>
    </div>
  );
}
