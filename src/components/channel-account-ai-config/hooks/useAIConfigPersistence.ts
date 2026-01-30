import { useCallback, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../ui/toast/ToastProvider";
import { aiConfigService, AIConfigParams } from "../services/aiConfigService";
import { AIConfigResponse, UpdateAIConfigRequest } from "../types/api";

interface UseAIConfigPersistenceProps<T> {
  params: AIConfigParams;
  config: T;
  updateLocalConfig: (updates: Partial<T>) => void;
  syncFromApi: (apiConfig: AIConfigResponse) => Partial<T>;
  compareConfigs: (current: T, api: AIConfigResponse) => boolean;
  transformToApi: (current: T) => UpdateAIConfigRequest;
  sectionName: string;
}

export function useAIConfigPersistence<T>({
  params,
  config,
  updateLocalConfig,
  syncFromApi,
  compareConfigs,
  transformToApi,
  sectionName,
}: UseAIConfigPersistenceProps<T>) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { channelId, aiId, connectionId } = params;

  const queryKey = ["aiConfig", sectionName, channelId, aiId, connectionId];

  const {
    data: apiConfig,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey,
    queryFn: () => aiConfigService.getAIConfig(params),
    enabled: !!aiId && channelId > 0,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const lastSyncedApiConfigRef = useRef<string | null>(null);

  useEffect(() => {
    if (apiConfig) {
      const apiConfigString = JSON.stringify(apiConfig);
      if (lastSyncedApiConfigRef.current !== apiConfigString) {
        const uiConfig = syncFromApi(apiConfig);
        updateLocalConfig(uiConfig);
        lastSyncedApiConfigRef.current = apiConfigString;
      }
    }
  }, [apiConfig, syncFromApi, updateLocalConfig]);

  const hasChanges = useCallback(() => {
    if (!apiConfig) return false;
    return compareConfigs(config, apiConfig);
  }, [config, apiConfig, compareConfigs]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const data = transformToApi(config);
      return aiConfigService.updateAIConfig({ ...params, data });
    },
    onSuccess: () => {
      showToast({
        title: `${sectionName} Saved`,
        description: `Your ${sectionName.toLowerCase()} settings have been updated successfully.`,
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error: Error) => {
      showToast({
        title: "Failed to Save",
        description:
          error.message ||
          `Could not save ${sectionName.toLowerCase()} settings.`,
        variant: "error",
      });
    },
  });

  return {
    isLoading: isLoading && !apiConfig,
    isSaving: saveMutation.isPending,
    isRefreshing: isRefetching || isFetching,
    hasChanges: hasChanges(),
    hasAI: !!aiId,
    apiConfig,
    save: () => saveMutation.mutate(),
  };
}
