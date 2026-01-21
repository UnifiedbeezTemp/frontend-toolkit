/**
 * Formats an ISO date string or Date object into a readable date and time
 * @param date - ISO date string or Date object
 * @param options - Optional Intl.DateTimeFormatOptions
 * @returns Formatted date string (e.g., "Jan 9, 2026, 4:30 PM")
 */
export function formatDateTime(
  date: string | Date | undefined,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }
): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;

  try {
    return new Intl.DateTimeFormat("en-US", options).format(d);
  } catch (err) {
    console.error("Error formatting date:", err);
    return "";
  }
}
