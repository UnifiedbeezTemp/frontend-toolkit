/**
 * Formats milliseconds into MM:SS format
 * @param ms - Time in milliseconds
 * @returns Formatted time string (e.g., "9:45")
 */
export function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
