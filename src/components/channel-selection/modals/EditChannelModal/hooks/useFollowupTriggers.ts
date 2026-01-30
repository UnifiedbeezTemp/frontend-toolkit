import { useState, useCallback, useEffect } from "react";
import {
  useFollowUpPersistence,
  FollowUpTriggersConfig,
} from "../../../../channel-account-ai-config/hooks/useFollowUpPersistence";
import { AIConfigParams } from "../../../../channel-account-ai-config/services/aiConfigService";
import {
  TimeUnit,
  FollowUpContentType,
} from "../../../../channel-account-ai-config/types/api";
import { FollowUpRecommendationsResponse } from "../../../../../services/smartSuggestionsService";
import {
  contentTypeToUI,
  delayToString,
} from "../../../../channel-account-ai-config/utils/configUtils";

export function useFollowupTriggers(
  params: AIConfigParams,
  recommendations?: FollowUpRecommendationsResponse,
) {
  const [localConfig, setLocalConfig] = useState<FollowUpTriggersConfig>({
    enableFollowUp: true,
    delayBeforeFollowUp: null,
    followUpContentType: null,
  });

  const updateLocalConfig = useCallback(
    (updates: Partial<FollowUpTriggersConfig>) => {
      setLocalConfig((prev) => ({ ...prev, ...updates }));
    },
    [],
  );

  // Apply recommendations
  useEffect(() => {
    if (recommendations) {
      updateLocalConfig({
        enableFollowUp: recommendations.followUpEnabled,
        delayBeforeFollowUp: delayToString(
          recommendations.followUpDelayAmount,
          recommendations.followUpDelayUnit as TimeUnit,
        ),
        followUpContentType: contentTypeToUI(
          recommendations.followUpContentType as FollowUpContentType,
        ),
      });
    }
  }, [recommendations, updateLocalConfig]);

  const persistence = useFollowUpPersistence(
    params,
    localConfig,
    updateLocalConfig,
  );

  const handleDelayChange = useCallback(
    (value: string) => {
      updateLocalConfig({ delayBeforeFollowUp: value });
    },
    [updateLocalConfig],
  );

  const handleContentTypeChange = useCallback(
    (value: string) => {
      updateLocalConfig({ followUpContentType: value });
    },
    [updateLocalConfig],
  );

  return {
    delayBeforeFollowup: localConfig.delayBeforeFollowUp,
    followupContentType: localConfig.followUpContentType,
    handleDelayChange,
    handleContentTypeChange,
    ...persistence,
  };
}
