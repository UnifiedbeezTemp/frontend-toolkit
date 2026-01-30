import { useState, useCallback, useEffect } from "react";
import {
  useAIBehaviorPersistence,
  AIBehaviorSettingsConfig,
} from "../../../../channel-account-ai-config/hooks/useAIBehaviorPersistence";
import { AIConfigParams } from "../../../../channel-account-ai-config/services/aiConfigService";
import { TimeUnit } from "../../../../channel-account-ai-config/types/api";
import { AIBehaviorRecommendationsResponse } from "../../../../../services/smartSuggestionsService";
import {
  timeToString,
  parseTimeString,
} from "../../../../channel-account-ai-config/utils/configUtils";

export type TimePeriod = "AM" | "PM";

export interface TimeState {
  hours: string;
  minutes: string;
  period: TimePeriod;
}

export function useAIBehaviourSettings(
  params: AIConfigParams,
  recommendations?: AIBehaviorRecommendationsResponse,
) {
  const [localConfig, setLocalConfig] = useState<AIBehaviorSettingsConfig>({
    aiReplyDelay: null,
    workingDays: [],
    timezone: null,
    openingHours: "09",
    openingMinutes: "00",
    openingPeriod: "AM",
    closingHours: "05",
    closingMinutes: "00",
    closingPeriod: "PM",
  });

  const updateLocalConfig = useCallback(
    (updates: Partial<AIBehaviorSettingsConfig>) => {
      setLocalConfig((prev) => ({ ...prev, ...updates }));
    },
    [],
  );

  // Apply recommendations
  useEffect(() => {
    if (recommendations) {
      updateLocalConfig({
        aiReplyDelay: timeToString(
          recommendations.replyDelayAmount,
          recommendations.replyDelayUnit as TimeUnit,
        ),
        workingDays: recommendations.workingDays,
        timezone: recommendations.timezone,
        openingHours: String(
          recommendations.openingHour > 12
            ? recommendations.openingHour - 12
            : recommendations.openingHour,
        ).padStart(2, "0"),
        openingMinutes: "00",
        openingPeriod: recommendations.openingHour >= 12 ? "PM" : "AM",
        closingHours: String(
          recommendations.closingHour > 12
            ? recommendations.closingHour - 12
            : recommendations.closingHour,
        ).padStart(2, "0"),
        closingMinutes: "00",
        closingPeriod: recommendations.closingHour >= 12 ? "PM" : "AM",
      });
    }
  }, [recommendations, updateLocalConfig]);

  const persistence = useAIBehaviorPersistence(
    params,
    localConfig,
    updateLocalConfig,
  );

  const handleReplyDelayChange = useCallback(
    (value: string) => {
      updateLocalConfig({ aiReplyDelay: value });
    },
    [updateLocalConfig],
  );

  const handleWorkingDaysChange = useCallback(
    (days: string[]) => {
      updateLocalConfig({ workingDays: days });
    },
    [updateLocalConfig],
  );

  const handleTimezoneChange = useCallback(
    (value: string) => {
      updateLocalConfig({ timezone: value });
    },
    [updateLocalConfig],
  );

  const handleOpeningTimeChange = useCallback(
    (hours: string, minutes: string, period: TimePeriod) => {
      updateLocalConfig({
        openingHours: hours,
        openingMinutes: minutes,
        openingPeriod: period,
      });
    },
    [updateLocalConfig],
  );

  const handleClosingTimeChange = useCallback(
    (hours: string, minutes: string, period: TimePeriod) => {
      updateLocalConfig({
        closingHours: hours,
        closingMinutes: minutes,
        closingPeriod: period,
      });
    },
    [updateLocalConfig],
  );

  return {
    replyDelay: localConfig.aiReplyDelay,
    workingDays: localConfig.workingDays,
    timezone: localConfig.timezone,
    openingTime: {
      hours: localConfig.openingHours,
      minutes: localConfig.openingMinutes,
      period: localConfig.openingPeriod,
    },
    closingTime: {
      hours: localConfig.closingHours,
      minutes: localConfig.closingMinutes,
      period: localConfig.closingPeriod,
    },
    handleReplyDelayChange,
    handleWorkingDaysChange,
    handleTimezoneChange,
    handleOpeningTimeChange,
    handleClosingTimeChange,
    ...persistence,
  };
}
