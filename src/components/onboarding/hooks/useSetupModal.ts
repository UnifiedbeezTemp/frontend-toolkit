"use client";

import { useMemo } from "react";
import { initialStepsData } from "../../../data/stepsData";
import { ProgressStep } from "../types";
import useSession from "../../../providers/hooks/useSession";

export function useSetupModal(onClose?: () => void) {
  const { data } = useSession();

  const completedStepIds = useMemo(() => {
    return (data?.completedOnboardingSteps || [])
      .filter((s) => s.status === "complete" || s.status === "completed")
      .map((s) => s.step);
  }, [data?.completedOnboardingSteps]);

  const dynamicSteps = useMemo(() => {
    return initialStepsData.map((step) => {
      const isCompleted = completedStepIds.includes(step.id);
      return {
        ...step,
        isCompleted,
        isActive:
          !isCompleted &&
          !completedStepIds.includes(step.id - 1) &&
          step.id !== 1
            ? false
            : true,
      } as ProgressStep;
    });
  }, [completedStepIds]);

  const completedStepsCount = completedStepIds.length;
  const totalSteps = initialStepsData.length;
  const progressPercentage = (completedStepsCount / totalSteps) * 100;
  const unCompletedSteps = totalSteps - completedStepsCount;

  const handleContinueSetup = () => {
    onClose?.();
  };

  const handleStepAction = (stepId: number) => {
    // Logic to navigate to specific step if needed
    console.log("Handle step action:", stepId);
  };

  return {
    dynamicSteps,
    completedStepsCount,
    totalSteps,
    progressPercentage,
    unCompletedSteps,
    handleContinueSetup,
    handleStepAction,
  };
}
