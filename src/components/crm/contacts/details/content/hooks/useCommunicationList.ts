"use client";

import { useState, useCallback } from "react";
import { CommunicationActivity } from "../types";

export function useCommunicationList(communications: CommunicationActivity[]) {
  const [selectedActivity, setSelectedActivity] =
    useState<CommunicationActivity | null>(null);

  const handleActivityClick = useCallback(
    (id: string) => {
      const found = communications.find((c) => c.id === id) || null;
      setSelectedActivity(found);
    },
    [communications],
  );

  const handleCloseModal = useCallback(() => {
    setSelectedActivity(null);
  }, []);

  return {
    selectedActivity,
    handleActivityClick,
    handleCloseModal,
  };
}
