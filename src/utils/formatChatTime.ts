/**
 * Formats an ISO date string or Date object into a WhatsApp-style chat time
 * @param date - ISO date string or Date object
 * @returns Formatted chat time string (e.g., "Just now", "Yesterday", "Monday", "09/01/2026")
 */
export function formatChatTime(date: string | Date | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  // Future dates (sanity check)
  if (diffInSeconds < -5) return "Just now";

  // Less than a minute
  if (diffInSeconds < 60) return "Just now";

  // Less than an hour
  if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m ago`;
  }

  // Today
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) {
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  // Yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  // Within the last week
  const diffInDays = Math.floor(diffInSeconds / (3600 * 24));
  if (diffInDays < 7) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[d.getDay()];
  }

  // Older than a week
  return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
}

/**
 * Formats an ISO date string or display timestamp into a clean bubble time (e.g., "1:52 pm").
 * Falls back to "12:52" if the input is missing or unparseable.
 */
export function formatBubbleTime(timestamp?: string): string {
  if (!timestamp) return "00:00";

  // If it looks like an ISO string or parseable date, format it
  const d = new Date(timestamp);
  if (!isNaN(d.getTime())) {
    return d
      .toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  }

  // If it's already a display string like "Just now" or "3m ago", return as-is
  return timestamp;
}
