"use client";

import React from "react";
import TaskInfoFields from "./form-fields/TaskInfoFields";
import TaskClassificationFields from "./form-fields/TaskClassificationFields";
import TaskDateTimeFields from "./form-fields/TaskDateTimeFields";
import TaskAssignmentFields from "./form-fields/TaskAssignmentFields";
import {
  AddTaskFormData,
  AddTaskRefs,
  SetFieldType,
} from "../../hooks/useAddTask";

interface AddTaskModalFormProps {
  formData: AddTaskFormData;
  setField: SetFieldType;
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
  closeDropdown: () => void;
  refs: AddTaskRefs;
}

export default function AddTaskModalForm({
  formData,
  setField,
  activeDropdown,
  toggleDropdown,
  closeDropdown,
  refs,
}: AddTaskModalFormProps) {
  return (
    <div className="p-[1rem] sm:p-[2.4rem] flex flex-col gap-[2.4rem]">
      <TaskInfoFields formData={formData} setField={setField} />

      <TaskClassificationFields
        formData={formData}
        setField={setField}
        activeDropdown={activeDropdown}
        toggleDropdown={toggleDropdown}
        closeDropdown={closeDropdown}
        refs={refs}
      />

      <TaskDateTimeFields formData={formData} setField={setField} />

      <TaskAssignmentFields
        formData={formData}
        setField={setField}
        activeDropdown={activeDropdown}
        toggleDropdown={toggleDropdown}
        closeDropdown={closeDropdown}
        refs={refs}
      />
    </div>
  );
}
