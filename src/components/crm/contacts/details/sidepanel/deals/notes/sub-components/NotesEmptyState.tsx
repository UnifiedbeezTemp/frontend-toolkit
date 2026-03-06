"use client";

import React from "react";
import Notes05Icon from "../../../../../../../../assets/icons/Notes05Icon";

interface NotesEmptyStateProps {
  tab: string;
}

export default function NotesEmptyState({ tab }: NotesEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-[4rem] gap-[2.4rem]">
      <div className="flex items-center justify-center">
        <Notes05Icon size={84} />
      </div>
      <p className="text-[1.4rem] font-bold text-dark-base-30">
        There are no {tab}
      </p>
    </div>
  );
}
