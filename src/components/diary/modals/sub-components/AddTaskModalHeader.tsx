"use client";

import React from "react";
import TaskIcon from "../../../../assets/icons/TaskIcon";
import TimesIcon from "../../../../assets/icons/TimesIcon";
import Heading from "../../../ui/Heading";
import CloseModalButton from "../../../modal/CloseModalButton";

interface AddTaskModalHeaderProps {
  onClose: () => void;
}

export default function AddTaskModalHeader({
  onClose,
}: AddTaskModalHeaderProps) {
  return (
   <div className="px-[1rem] pt-[2.4rem] sm:px-[2.4rem] sm:pt-[2.4rem] pb-0 sticky top-0 bg-primary z-10">
     <div className="flex items-center justify-between pb-[1rem] sm:pb-[2.4rem] border-b border-input-stroke">
      <div className="flex items-center gap-[1.2rem]">
        <div className="w-[3.2rem] h-[3.2rem] rounded-[.4rem] border border-input-stroke flex items-center justify-center">
          <TaskIcon size={18} color="var(--text-primary)" />
        </div>
        <Heading className="text-[1.6rem] sm:text-[2rem]">Add new task</Heading>
      </div>
      <CloseModalButton onClick={onClose} />
    </div>
   </div>
  );
}
