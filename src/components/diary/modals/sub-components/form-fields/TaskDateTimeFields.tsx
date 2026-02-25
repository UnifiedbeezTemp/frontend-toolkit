"use client";

import React from "react";
import Input from "../../../../forms/Input";
import CalendarIcon2 from "../../../../../assets/icons/CalendarIcon2";
import { ClockIcon } from "../../../../../assets/icons/ClockIcon";
import { ChangeEvent } from "react";
import { AddTaskFormData, SetFieldType } from "../../../hooks/useAddTask";

interface TaskDateTimeFieldsProps {
  formData: AddTaskFormData;
  setField: SetFieldType;
}

export default function TaskDateTimeFields({
  formData,
  setField,
}: TaskDateTimeFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.6rem]">
      <div className="flex flex-col gap-[0.8rem]">
        <label className="text-[1.4rem] font-bold text-text-secondary">
          Due date<span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <Input
            type="date"
            value={formData.dueDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setField("dueDate", e.target.value)
            }
            className=""
          />
          {/* <div className="absolute right-[1.6rem] top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
            <CalendarIcon2 size={18} />
          </div> */}
        </div>
      </div>

      <div className="flex flex-col gap-[0.8rem]">
        <label className="text-[1.4rem] font-bold text-text-secondary">
          Due time
        </label>
        <div className="relative">
          <Input
            type="time"
            value={formData.dueTime}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setField("dueTime", e.target.value)
            }
            className=""
          />
          {/* <div className="absolute right-[1.6rem] top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
            <ClockIcon size={18} />
          </div> */}
        </div>
      </div>
    </div>
  );
}
