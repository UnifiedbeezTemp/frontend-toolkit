"use client";

interface UseStepIndicatorProps {
  steps: number;
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export function useStepIndicator({
  steps,
  currentStep,
  onStepClick,
}: UseStepIndicatorProps) {
  const clampedStep = Math.min(Math.max(currentStep, 0), steps - 1);

  const handleClick = (index: number) => {
    if (onStepClick) {
      onStepClick(index);
    }
  };

  return {
    clampedStep,
    handleClick,
  };
}
