"use client";

import { useState, useCallback } from "react";

export type NotesTab = "notes" | "files" | "emails" | "sms";

export function useContactNotes() {
  const [activeTab, setActiveTab] = useState<NotesTab>("notes");
  const [counts] = useState({
    notes: 0,
    files: 0,
    emails: 0,
    sms: 0,
  });

  const handleTabChange = useCallback((tab: NotesTab) => {
    setActiveTab(tab);
  }, []);

  const handleAddNote = useCallback(() => {
    // console.log("Add note clicked");
  }, []);

  return {
    activeTab,
    counts,
    handleTabChange,
    handleAddNote,
  };
}
