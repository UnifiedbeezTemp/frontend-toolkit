/**
 * VIDEO PLAYER UTILITIES
 * 
 * Utility functions for video time formatting and calculations.
 */

/**
 * Formats seconds into a time string (mm:ss or hh:mm:ss)
 * @param seconds - Time in seconds
 * @param forceHours - Force showing hours even if 0
 * @returns Formatted time string
 */
export function formatTime(seconds: number, forceHours = false): string {
  if (!isFinite(seconds) || isNaN(seconds) || seconds < 0) {
    return forceHours ? "0:00:00" : "0:00";
  }

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const paddedMins = hrs > 0 ? mins.toString().padStart(2, "0") : mins.toString();
  const paddedSecs = secs.toString().padStart(2, "0");

  if (hrs > 0 || forceHours) {
    return `${hrs}:${paddedMins}:${paddedSecs}`;
  }

  return `${paddedMins}:${paddedSecs}`;
}

/**
 * Parses a time string into seconds
 * @param timeString - Time string in format mm:ss or hh:mm:ss
 * @returns Time in seconds
 */
export function parseTime(timeString: string): number {
  const parts = timeString.split(":").map(Number);
  
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }

  return 0;
}

/**
 * Calculates the percentage of progress
 * @param current - Current value
 * @param total - Total value
 * @returns Percentage (0-100)
 */
export function calculateProgress(current: number, total: number): number {
  if (!total || total === 0) return 0;
  return Math.min(100, Math.max(0, (current / total) * 100));
}

/**
 * Clamps a value between min and max
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Formats duration for display (e.g., "2:45" or "1:30:00")
 * @param current - Current time in seconds
 * @param total - Total duration in seconds
 * @returns Formatted string like "2:45 / 10:30"
 */
export function formatTimeDisplay(current: number, total: number): string {
  const showHours = total >= 3600;
  return `${formatTime(current, showHours)} / ${formatTime(total, showHours)}`;
}

/**
 * Gets buffered percentage from TimeRanges
 * @param buffered - TimeRanges object from video element
 * @param duration - Total duration
 * @returns Buffered percentage
 */
export function getBufferedPercentage(buffered: TimeRanges, duration: number): number {
  if (!buffered || buffered.length === 0 || !duration) return 0;
  
  // Get the end of the last buffered range
  const end = buffered.end(buffered.length - 1);
  return calculateProgress(end, duration);
}

