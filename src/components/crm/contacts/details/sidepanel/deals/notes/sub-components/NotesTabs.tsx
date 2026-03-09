"use client";

import React from "react";
import { NotesTab } from "../hooks/useContactNotes";
import { cn } from "../../../../../../../../lib/utils";

interface NotesTabsProps {
  activeTab: NotesTab;
  onTabChange: (tab: NotesTab) => void;
  counts: Record<NotesTab, number>;
}

export default function NotesTabs({
  activeTab,
  onTabChange,
  counts,
}: NotesTabsProps) {
  const tabs: { id: NotesTab; label: string }[] = [
    { id: "notes", label: "Notes" },
    { id: "files", label: "Files" },
    { id: "emails", label: "Emails" },
    { id: "sms", label: "SMS" },
  ];

  return (
    <div className="flex border-b border-input-stroke">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex-1 py-[1.2rem] px-[.6rem] text-[1rem] font-bold transition-all border-r border-input-stroke last:border-r-0",
            activeTab === tab.id
              ? "text-dark-base-100 bg-primary"
              : "text-dark-base-40 hover:text-dark-base-100 bg-input-filled",
          )}
        >
          {tab.label} ({counts[tab.id]})
        </button>
      ))}
      {/* <button className="px-[1.6rem] py-[1.2rem] border-l border-input-stroke hover:bg-input-filled/30 transition-colors">
        <span className="text-dark-base-40 font-bold">...</span>
      </button> */}
    </div>
  );
}
