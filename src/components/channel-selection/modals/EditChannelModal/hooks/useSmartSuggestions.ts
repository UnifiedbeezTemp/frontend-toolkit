"use client";

import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  getSmartSuggestions,
  MainConfigRecommendationsResponse,
} from "../../../../../services/smartSuggestionsService";
import { AIConfigParams } from "../../../../channel-account-ai-config/services/aiConfigService";
import { useToast } from "../../../../ui/toast/ToastProvider";
import { getAccountTypeFromProvider } from "../../../../channel-account-ai-config/utils/configUtils";

interface UseSmartSuggestionsProps {
  params: AIConfigParams;
}

export function useSmartSuggestions({ params }: UseSmartSuggestionsProps) {
  const { showToast } = useToast();
  const [isEnabled, setIsEnabled] = useState(false);

  const fetchMutation = useMutation({
    mutationFn: async () => {
      const response = await getSmartSuggestions(
        params.channelId,
        params.aiId,
        {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          accountId: Number(params.connectionId) || undefined,
          accountType: getAccountTypeFromProvider(
            (params.metadata?.provider as string) || "",
          ),
        },
      );
      return response as MainConfigRecommendationsResponse;
    },
    onSuccess: (data) => {
      showToast({
        title: "Smart Suggestions Applied",
        description:
          "Recommended settings have been loaded based on your plan and business type.",
        variant: "success",
      });
      return data;
    },
    onError: (error: Error) => {
      setIsEnabled(false);
      showToast({
        title: "Failed to Load Suggestions",
        description: error.message || "Could not fetch smart suggestions.",
        variant: "error",
      });
    },
  });

  const handleToggle = useCallback(
    (enabled: boolean) => {
      setIsEnabled(enabled);
      if (enabled && params.aiId > 0) {
        fetchMutation.mutate();
      }
    },
    [params.aiId, fetchMutation],
  );

  return {
    isEnabled,
    isLoading: fetchMutation.isPending,
    handleToggle,
    recommendations: fetchMutation.data,
  };
}
