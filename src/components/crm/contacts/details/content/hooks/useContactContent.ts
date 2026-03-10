"use client";

import { useState, useCallback } from "react";

export type ContentTab =
  | "activity"
  | "tasks"
  | "emails"
  | "communication"
  | "documents";

export function useContactContent() {
  const [activeTab, setActiveTab] = useState<ContentTab>("activity");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabChange = useCallback((tab: ContentTab) => {
    setActiveTab(tab);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [],
  );

  return {
    activeTab,
    searchQuery,
    handleTabChange,
    handleSearchChange,
  };
}
