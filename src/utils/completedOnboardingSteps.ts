/**
 * Utility functions for managing completed onboarding steps
 */

/**
 * Get the highest completed step ID
 * @param completedSteps - Array of completed step IDs
 * @returns Highest step ID or 0 if array is empty
 */
export function getHighestCompletedStep(completedSteps: number[]): number {
  if (!completedSteps || completedSteps.length === 0) {
    return 0;
  }
  return Math.max(...completedSteps);
}

/**
 * Get the next step after the highest completed step
 * @param completedSteps - Array of completed step IDs
 * @returns Next step ID (highest + 1) or 1 if no steps completed
 */
export function getNextStepAfterHighest(completedSteps: number[]): number {
  const highest = getHighestCompletedStep(completedSteps);
  return highest + 1;
}

/**
 * Check if a step is completed
 * @param stepId - Step ID to check
 * @param completedSteps - Array of completed step IDs
 * @returns true if step is completed, false otherwise
 */
export function isStepCompleted(stepId: number, completedSteps: number[]): boolean {
  if (!completedSteps || completedSteps.length === 0) {
    return false;
  }
  return completedSteps.includes(stepId);
}

/**
 * Check if a step should be marked as completed
 * Only marks if not already in the array
 * @param stepId - Step ID to potentially add
 * @param completedSteps - Current array of completed step IDs
 * @returns true if step should be added (not already completed), false otherwise
 */
export function shouldMarkStepAsCompleted(stepId: number, completedSteps: number[]): boolean {
  return !isStepCompleted(stepId, completedSteps);
}

