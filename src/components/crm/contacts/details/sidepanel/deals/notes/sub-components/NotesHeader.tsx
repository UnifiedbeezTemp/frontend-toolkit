"use client";

import React from "react";

interface NotesHeaderProps {
  onAddNote: () => void;
}

export default function NotesHeader({ onAddNote }: NotesHeaderProps) {
  return (
    <div className="flex items-center justify-end px-[1.6rem] py-[1.2rem] border-b border-input-stroke">
      <button
        onClick={onAddNote}
        className="text-[1.4rem] font-bold text-brand-primary hover:opacity-80 transition-opacity"
      >
        Add a note
      </button>
    </div>
  );
}
