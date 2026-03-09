"use client";

import React from "react";
import { useContactNotes } from "./hooks/useContactNotes";
import NotesTabs from "./sub-components/NotesTabs";
import NotesHeader from "./sub-components/NotesHeader";
import NotesEmptyState from "./sub-components/NotesEmptyState";

export default function ContactNotes() {
  const { activeTab, counts, handleTabChange, handleAddNote } =
    useContactNotes();

  return (
    <div className="flex flex-col border border-input-stroke rounded-[1.2rem] overflow-hidden bg-primary shadow-[0px_1px_2px_0px_#1018280D]">
      <NotesTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        counts={counts}
      />

      <div className="flex flex-col">
        <NotesHeader onAddNote={handleAddNote} />

        <div className="px-[1.6rem] pb-[2.4rem]">
            <NotesEmptyState tab={activeTab} />
        </div>
      </div>
    </div>
  );
}
