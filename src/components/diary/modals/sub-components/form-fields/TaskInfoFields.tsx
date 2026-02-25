"use client";

import React from "react";
import Input from "../../../../forms/Input";
import Textarea from "../../../../forms/Textarea";
import { ChangeEvent } from "react";
import {
  AddTaskField,
  AddTaskFormData,
  SetFieldType,
} from "../../../hooks/useAddTask";

interface TaskInfoFieldsProps {
  formData: AddTaskFormData;
  setField: SetFieldType;
}

export default function TaskInfoFields({
  formData,
  setField,
}: TaskInfoFieldsProps) {
  return (
    <>
      {/* Title */}
      <div className="flex flex-col gap-[0.8rem]">
        <label className="text-[1.4rem] font-bold text-text-secondary">
          Task title<span className="text-destructive">*</span>
        </label>
        <Input
          placeholder="e.g Email list, Campaign Letter"
          value={formData.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setField("title", e.target.value)
          }
          className="h-[4.4rem] border-input-stroke"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-[0.8rem]">
        <label className="text-[1.4rem] font-bold text-text-secondary">
          Description
        </label>
        <Textarea
          placeholder="Add task description"
          value={formData.description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setField("description", e.target.value)
          }
          className="min-h-[10rem] border-input-stroke resize-none"
        />
      </div>
    </>
  );
}
