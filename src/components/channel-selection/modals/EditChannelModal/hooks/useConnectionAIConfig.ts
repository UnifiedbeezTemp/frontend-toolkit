"use client";

import { useQuery } from "@tanstack/react-query";
import { ConnectionDisplayData } from "../../../../channels/connections/types";
import { useMemo, useState, useCallback } from "react";
import {
  AIConfigParams,
  aiConfigService,
} from "../../../../channel-account-ai-config/services/aiConfigService";
import { useAiAssistants } from "../../../../../hooks/useAiAssistants";

interface UseConnectionAIConfigProps {
  channelId: string | number;
  connection: ConnectionDisplayData | null;
}

export function useConnectionAIConfig({
  channelId,
  connection,
}: UseConnectionAIConfigProps) {
  const { assistants, isLoading: isLoadingAssistants } = useAiAssistants({
    autoFetch: true,
  });

  const aiIdFromMetadata = useMemo(() => {
    return (connection?.metadata?.aiAssistantId as number) || 0;
  }, [connection]);

  const firstAssistantId = useMemo(() => {
    if (assistants.length > 0) {
      return Number(assistants[0].id);
    }
    return 0;
  }, [assistants]);

  const defaultAiId = aiIdFromMetadata || firstAssistantId;

  const [selectedAiId, setSelectedAiId] = useState<number>(0);

  const effectiveAiId = selectedAiId || defaultAiId;

  const handleAssistantChange = useCallback((newAiId: number) => {
    setSelectedAiId(newAiId);
  }, []);

  const params: AIConfigParams = useMemo(
    () => ({
      channelId: Number(channelId),
      aiId: effectiveAiId,
      connectionId: connection?.id || "",
      metadata: connection?.metadata as Record<string, unknown>,
    }),
    [channelId, effectiveAiId, connection],
  );

  const isQueryEnabled = !!connection && !!channelId && effectiveAiId > 0;

  const {
    data: configData,
    isLoading: isLoadingConfig,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "connection-ai-config",
      channelId,
      connection?.id,
      effectiveAiId,
    ],
    queryFn: () => aiConfigService.getAIConfig(params),
    enabled: isQueryEnabled,
    staleTime: 5 * 60 * 1000,
  });

  const isLoading = isLoadingAssistants || (isLoadingConfig && isQueryEnabled);

  return {
    params,
    configData,
    isLoading,
    error,
    refetch,
    aiId: effectiveAiId,
    assistants,
    handleAssistantChange,
  };
}
