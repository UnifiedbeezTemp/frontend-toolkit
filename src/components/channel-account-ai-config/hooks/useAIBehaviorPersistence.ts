import { useCallback } from "react";
import { useAIConfigPersistence } from "./useAIConfigPersistence";
import { AIConfigParams } from "../services/aiConfigService";
import {
  timeToString,
  parseTimeString,
  isWebchatConnection,
} from "../utils/configUtils";
import {
  AIConfigResponse,
  UpdateAIConfigRequest,
  WorkingDay,
} from "../types/api";

export interface AIBehaviorSettingsConfig {
  aiReplyDelay: string | null;
  workingDays: string[];
  timezone: string | null;
  openingHours: string;
  openingMinutes: string;
  openingPeriod: "AM" | "PM";
  closingHours: string;
  closingMinutes: string;
  closingPeriod: "AM" | "PM";
}

// Convert 24-hour to 12-hour format
function to12Hour(hour24: number): { hours: string; period: "AM" | "PM" } {
  const period: "AM" | "PM" = hour24 >= 12 ? "PM" : "AM";
  let hour12 = hour24 % 12;
  if (hour12 === 0) hour12 = 12;
  return { hours: String(hour12), period };
}

// Convert 12-hour to 24-hour format
function to24Hour(hours: string, period: "AM" | "PM"): number {
  let hour = parseInt(hours, 10) || 0;
  if (period === "AM") {
    if (hour === 12) hour = 0;
  } else {
    if (hour !== 12) hour += 12;
  }
  return hour;
}

export function useAIBehaviorPersistence(
  params: AIConfigParams,
  config: AIBehaviorSettingsConfig,
  updateLocalConfig: (updates: Partial<AIBehaviorSettingsConfig>) => void,
) {
  const syncFromApi = useCallback(
    (apiConfig: AIConfigResponse): Partial<AIBehaviorSettingsConfig> => {
      const opening = to12Hour(apiConfig.openingHour);
      const closing = to12Hour(apiConfig.closingHour);

      const dayMap: Record<WorkingDay, string> = {
        MONDAY: "Monday",
        TUESDAY: "Tuesday",
        WEDNESDAY: "Wednesday",
        THURSDAY: "Thursday",
        FRIDAY: "Friday",
        SATURDAY: "Saturday",
        SUNDAY: "Sunday",
      };

      return {
        aiReplyDelay: timeToString(
          apiConfig.replyDelayAmount,
          apiConfig.replyDelayUnit,
        ),
        workingDays: apiConfig.workingDays.map((d) => dayMap[d]),
        timezone: apiConfig.timezone,
        openingHours: opening.hours,
        openingMinutes: "00", // API only stores hours for now
        openingPeriod: opening.period,
        closingHours: closing.hours,
        closingMinutes: "00",
        closingPeriod: closing.period,
      };
    },
    [],
  );

  const compareConfigs = useCallback(
    (current: AIBehaviorSettingsConfig, api: AIConfigResponse): boolean => {
      const apiOpening = to12Hour(api.openingHour);
      const apiClosing = to12Hour(api.closingHour);
      const apiDelay = timeToString(api.replyDelayAmount, api.replyDelayUnit);

      // Day comparison
      const uiDays = [...current.workingDays].sort();
      const dayMap: Record<WorkingDay, string> = {
        MONDAY: "Monday",
        TUESDAY: "Tuesday",
        WEDNESDAY: "Wednesday",
        THURSDAY: "Thursday",
        FRIDAY: "Friday",
        SATURDAY: "Saturday",
        SUNDAY: "Sunday",
      };
      const apiDays = api.workingDays.map((d) => dayMap[d]).sort();

      return (
        current.aiReplyDelay !== apiDelay ||
        JSON.stringify(uiDays) !== JSON.stringify(apiDays) ||
        current.timezone !== api.timezone ||
        current.openingHours !== apiOpening.hours ||
        current.openingPeriod !== apiOpening.period ||
        current.closingHours !== apiClosing.hours ||
        current.closingPeriod !== apiClosing.period
      );
    },
    [],
  );

  const transformToApi = useCallback(
    (current: AIBehaviorSettingsConfig): UpdateAIConfigRequest => {
      const { amount, unit } = parseTimeString(current.aiReplyDelay);

      const reverseDayMap: Record<string, WorkingDay> = {
        Monday: "MONDAY",
        Tuesday: "TUESDAY",
        Wednesday: "WEDNESDAY",
        Thursday: "THURSDAY",
        Friday: "FRIDAY",
        Saturday: "SATURDAY",
        Sunday: "SUNDAY",
      };

      return {
        replyDelayAmount: amount,
        replyDelayUnit: unit,
        workingDays: current.workingDays.map((d) => reverseDayMap[d]),
        timezone: current.timezone || "UTC",
        openingHour: to24Hour(current.openingHours, current.openingPeriod),
        closingHour: to24Hour(current.closingHours, current.closingPeriod),
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
    sectionName: "AI Behavior",
  });
}
