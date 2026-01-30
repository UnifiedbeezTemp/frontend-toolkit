import { useState, useCallback } from "react";

export type TimePeriod = "AM" | "PM";

export interface TimeState {
  hours: string;
  minutes: string;
  period: TimePeriod;
}

export function useAIBehaviourSettings() {
  const [replyDelay, setReplyDelay] = useState<string | null>(null);
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [timezone, setTimezone] = useState<string | null>(null);

  const [openingTime, setOpeningTime] = useState<TimeState>({
    hours: "09",
    minutes: "00",
    period: "AM",
  });

  const [closingTime, setClosingTime] = useState<TimeState>({
    hours: "05",
    minutes: "00",
    period: "PM",
  });

  const handleReplyDelayChange = useCallback((value: string) => {
    setReplyDelay(value);
  }, []);

  const handleWorkingDaysChange = useCallback((days: string[]) => {
    setWorkingDays(days);
  }, []);

  const handleTimezoneChange = useCallback((value: string) => {
    setTimezone(value);
  }, []);

  const handleOpeningTimeChange = useCallback(
    (hours: string, minutes: string, period: TimePeriod) => {
      setOpeningTime({ hours, minutes, period });
    },
    [],
  );

  const handleClosingTimeChange = useCallback(
    (hours: string, minutes: string, period: TimePeriod) => {
      setClosingTime({ hours, minutes, period });
    },
    [],
  );

  return {
    replyDelay,
    workingDays,
    timezone,
    openingTime,
    closingTime,
    handleReplyDelayChange,
    handleWorkingDaysChange,
    handleTimezoneChange,
    handleOpeningTimeChange,
    handleClosingTimeChange,
  };
}
