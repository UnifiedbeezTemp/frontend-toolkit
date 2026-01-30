"use client";

import { useState, useEffect, useCallback } from "react";
import { useAiAssistants } from "../../../hooks/useAiAssistants";
import { AIAssistant } from "../../../types/aiAssistantTypes";

export function useAssistantSelector() {
  const { assistants, refetch, isLoading, isFetching } = useAiAssistants({
    autoFetch: true,
  });

  useEffect(() => {
    refetch();
  }, []);
  const [selectedAssistantId, setSelectedAssistantId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (assistants.length > 0 && !selectedAssistantId) {
      setSelectedAssistantId(assistants[0].id);
    }
  }, [assistants, selectedAssistantId]);

  const selectAssistant = useCallback((id: string) => {
    setSelectedAssistantId(id);
  }, []);

  const selectedAssistant =
    assistants.find((a: AIAssistant) => a.id === selectedAssistantId) || null;

  return {
    selectedAssistant,
    assistants,
    selectedAssistantId,
    selectAssistant,
    isLoading,
    isFetching,
  };
}
