/**
 * Utility to determine the allowed step and substep based on completed steps
 * Prevents users from accessing steps they haven't unlocked yet
 */

import { initialStepsData } from "../data/stepsData";
import { getNextStepAfterHighest } from "./completedOnboardingSteps";

/**
 * Get the allowed step and substep based on completed steps
 * If user tries to access a step beyond what they've completed, redirects to the correct step
 */
export function getAllowedStep(
  requestedStepId: number,
  requestedSubStepId: string | number | null,
  completedSteps: { step: number; status: string }[]
): { stepId: number; subStepId: string | number } {
  const nextAllowedStep = getNextStepAfterHighest(completedSteps);

  // If requested step is beyond what's allowed (user hasn't completed previous steps), redirect to the allowed step
  if (requestedStepId > nextAllowedStep) {
    const allowedStepData = initialStepsData.find(
      (s) => s.id === nextAllowedStep
    );
    if (allowedStepData && allowedStepData.subSteps.length > 0) {
      return {
        stepId: nextAllowedStep,
        subStepId: allowedStepData.subSteps[0].id,
      };
    }
    return { stepId: 1, subStepId: 1 };
  }

  // If step is valid, validate the substep
  const stepData = initialStepsData.find((s) => s.id === requestedStepId);
  if (!stepData) {
    const allowedStepData = initialStepsData.find(
      (s) => s.id === nextAllowedStep
    );
    if (allowedStepData && allowedStepData.subSteps.length > 0) {
      return {
        stepId: nextAllowedStep,
        subStepId: allowedStepData.subSteps[0].id,
      };
    }
    return { stepId: 1, subStepId: 1 };
  }

  // If substep is provided, validate it exists
  if (requestedSubStepId !== null && requestedSubStepId !== undefined) {
    const subStepExists = stepData.subSteps.some(
      (sub) => sub.id === requestedSubStepId
    );
    if (!subStepExists) {
      return { stepId: requestedStepId, subStepId: stepData.subSteps[0].id };
    }
    return { stepId: requestedStepId, subStepId: requestedSubStepId };
  }

  // Default to first substep
  return { stepId: requestedStepId, subStepId: stepData.subSteps[0]?.id || 1 };
}
