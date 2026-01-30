import { useCallback } from "react";
import { useAIConfigPersistence } from "./useAIConfigPersistence";
import { AIConfigParams } from "../services/aiConfigService";
import {
  delayToString,
  parseDelayString,
  contentTypeToAPI,
  contentTypeToUI,
} from "../utils/configUtils";
import { AIConfigResponse, UpdateAIConfigRequest } from "../types/api";

export interface FollowUpTriggersConfig {
  enableFollowUp: boolean;
  delayBeforeFollowUp: string | null;
  followUpContentType: string | null;
}

export function useFollowUpPersistence(
  params: AIConfigParams,
  config: FollowUpTriggersConfig,
  updateLocalConfig: (updates: Partial<FollowUpTriggersConfig>) => void,
) {
  const syncFromApi = useCallback(
    (apiConfig: AIConfigResponse): Partial<FollowUpTriggersConfig> => {
      return {
        enableFollowUp: apiConfig.followUpEnabled,
        delayBeforeFollowUp: delayToString(
          apiConfig.followUpDelayAmount,
          apiConfig.followUpDelayUnit,
        ),
        followUpContentType: contentTypeToUI(apiConfig.followUpContentType),
      };
    },
    [],
  );

  const compareConfigs = useCallback(
    (current: FollowUpTriggersConfig, api: AIConfigResponse): boolean => {
      const apiDelay = delayToString(
        api.followUpDelayAmount,
        api.followUpDelayUnit,
      );
      const apiContentType = contentTypeToUI(api.followUpContentType);

      return (
        current.enableFollowUp !== api.followUpEnabled ||
        current.delayBeforeFollowUp !== apiDelay ||
        current.followUpContentType !== apiContentType
      );
    },
    [],
  );

  const transformToApi = useCallback(
    (current: FollowUpTriggersConfig): UpdateAIConfigRequest => {
      const { amount, unit } = parseDelayString(current.delayBeforeFollowUp);
      return {
        followUpEnabled: current.enableFollowUp,
        followUpDelayAmount: amount,
        followUpDelayUnit: unit,
        followUpContentType: contentTypeToAPI(current.followUpContentType),
      };
    },
    [],
  );

  return useAIConfigPersistence({
    params,
    config,
    updateLocalConfig,
    syncFromApi,
    compareConfigs,
    transformToApi,
    sectionName: "Follow-Up Triggers",
  });
}
