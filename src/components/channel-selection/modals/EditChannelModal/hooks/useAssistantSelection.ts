"use client";

import { useCallback, useEffect } from "react";
import { useAssistantSelector } from "../../../../ai-assistant/hooks/useAssistantSelector";
import { AIConfigParams } from "../../../../channel-account-ai-config/services/aiConfigService";
import { AIAssistant } from "../../../../../types/aiAssistantTypes";

interface UseAssistantSelectionProps {
  params: AIConfigParams;
  assistants: AIAssistant[];
  onAssistantChange?: (aiId: number) => void;
}

export function useAssistantSelection({
  params,
  assistants,
  onAssistantChange,
}: UseAssistantSelectionProps) {
  const { selectedAssistant, selectAssistant, isLoading } =
    useAssistantSelector();

  const handleSelect = useCallback(
    (id: string) => {
      selectAssistant(id);
      if (onAssistantChange) {
        onAssistantChange(Number(id));
      }
    },
    [selectAssistant, onAssistantChange],
  );

  useEffect(() => {
    if (params.aiId && params.aiId !== Number(selectedAssistant?.id)) {
      selectAssistant(String(params.aiId));
    }
  }, [params.aiId, selectedAssistant?.id, selectAssistant]);

  return {
    assistants,
    selectedAssistant,
    isLoading,
    handleSelect,
  };
}
