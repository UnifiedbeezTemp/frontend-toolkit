import { useMemo, useState, useEffect } from "react";
import useGetOrdinal from "./useGetOrdinal";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const YEARS = Array.from(
  { length: 10 },
  (_, i) => new Date().getFullYear() + i,
);

export const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);

export const MINUTES = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0"),
);

export const PERIODS = ["AM", "PM"] as const;

export type Period = (typeof PERIODS)[number];

export const TIMES = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12;
  const ampm = i < 12 ? "AM" : "PM";
  return `${hour} ${ampm}`;
});

export const getDaysInMonth = (month: string, year: number) => {
  const monthIndex = MONTHS.indexOf(month);
  return new Date(year, monthIndex + 1, 0).getDate();
};

export const getSupportedTimezones = () => {
  try {
    return (Intl as any).supportedValuesOf("timeZone") as string[];
  } catch (e) {
    console.error(
      "Browser does not support Intl.supportedValuesOf('timeZone')",
      e,
    );
    return [
      "UTC",
      "America/New_York",
      "America/Los_Angeles",
      "Europe/London",
      "Asia/Tokyo",
    ];
  }
};

const MS_PER_HOUR = 1000 * 60 * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

function computeLastSavedLabel(iso: string): string {
  const now = new Date();
  const date = new Date(iso);
  const diffMs = now.getTime() - date.getTime();

  // Within the last 24 hours → time only ("2:32 PM")
  if (diffMs < MS_PER_DAY) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Yesterday or day before yesterday → weekday name ("Monday")
  const diffDays = Math.floor(diffMs / MS_PER_DAY);
  if (diffDays < 3) {
    return date.toLocaleDateString([], { weekday: "long" });
  }

  // 3–6 days → "x days ago"
  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }

  // 7–13 days → "1 week ago"
  if (diffDays < 14) {
    return "1 week ago";
  }

  // Older than 2 weeks: show actual date, progressively adding context
  const diffYears =
    now.getFullYear() - date.getFullYear() ||
    (now < new Date(date.getFullYear() + 1, date.getMonth(), date.getDate())
      ? 0
      : 1);

  if (diffYears >= 1) {
    // > 1 year → "Jan 15, 2024"
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const diffMonths =
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth());

  if (diffMonths >= 1) {
    // > 1 month → "Jan 15"
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  }

  // > 1 week, < 1 month → date with month for clarity ("Jan 15")
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

/**
 * Returns a human-readable label for when an automation was last saved,
 * refreshing every minute so relative labels stay accurate.
 *
 * - < 24 h          →  "2:32 PM"
 * - Yesterday/day before → "Monday"
 * - 3–6 days        →  "3 days ago"
 * - ~1 week         →  "1 week ago"
 * - > 1 week        →  "Jan 15"   (month added)
 * - > 1 year        →  "Jan 15, 2024"  (year added)
 */
export function useLastSavedLabel(updatedAt: string | null): string {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  return useMemo(() => {
    if (!updatedAt) return "Not saved yet";
    // `now` in the deps ensures recomputation on each minute tick
    void now;
    return computeLastSavedLabel(updatedAt);
  }, [updatedAt, now]);
}

export const useDateHooks = () => {
  const getOrdinalSuffix = useGetOrdinal();

  const getFormattedDays = useMemo(
    () => (month: string, year: number) => {
      const days = getDaysInMonth(month, year);
      return Array.from({ length: days }, (_, i) => {
        const day = i + 1;
        return `${day}${getOrdinalSuffix(day)}`;
      });
    },
    [getOrdinalSuffix],
  );

  return {
    months: MONTHS,
    years: YEARS,
    hours: HOURS,
    minutes: MINUTES,
    periods: PERIODS,
    times: TIMES,
    timezones: getSupportedTimezones(),
    getFormattedDays,
    getDaysInMonth,
  };
};
