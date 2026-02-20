"use client";

import React from "react";
import { DiaryEntry } from "../../../store/slices/diarySlice";
import { PencilIcon } from "../../../assets/icons/PencilIcon";
import { cn, formatDate } from "../../../lib/utils";
import { useDiary } from "../hooks/useDiary";

interface DiaryEntryItemProps {
  entry: DiaryEntry;
  isLast?: boolean;
}

export default function DiaryEntryItem({ entry, isLast }: DiaryEntryItemProps) {
  const { handleEditEntry } = useDiary();
  const formattedDate = formatDate(entry?.date);

  return (
    <div
      className={cn(
        "py-[1rem] flex flex-col bg-primary hover:bg-input-filled/20 transition-colors",
        !isLast && "border-b border-input-stroke",
      )}
    >
      <div className="flex items-center justify-between sm:mb-[1rem] lg:mb-0">
        <div className="flex items-center sm:items-start flex-row lg:items-center lg:gap-[0.8rem] sm:flex-col lg:flex-row">
          <h4 className="text-[1.3rem] lg:text-[1.6rem] font-bold text-text-secondary">
            {entry?.name}
          </h4>
          <span className="text-[1.2rem] text-text-primary">
            {formattedDate}
          </span>
        </div>

        <button
          onClick={() => handleEditEntry(entry?.id)}
          className="flex items-center gap-2 px-[1.2rem] py-[0.2rem] border border-input-stroke rounded-lg hover:bg-input-filled transition-colors"
        >
          <PencilIcon className="w-4 h-4 text-text-primary/60 outline-none" />
          <span className="text-[1.4rem] font-bold text-text-primary">
            Edit
          </span>
        </button>
      </div>

      <p className="text-[1.4rem] leading-[1.6] text-text-primary/70 line-clamp-2">
        {entry?.content}
      </p>
    </div>
  );
}
