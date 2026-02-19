"use client";

import React from "react";
import CompletedStepsBadge from "./CompletedStepsBadge";
import ProgressBar from "./ProgressBar";
import RemainingWarning from "./RemainingWarning";

interface ProgressSectionProps {
  completedSteps: number;
  totalSteps: number;
  progressPercentage: number;
  unCompletedSteps: number;
}

export default function ProgressSection({
  completedSteps,
  totalSteps,
  progressPercentage,
  unCompletedSteps,
}: ProgressSectionProps) {
  return (
    <div className="mt-[2.4rem] flex flex-col gap-[1.6rem]">
      <div className="flex items-center justify-between mb-[-2.4rem]">
        <CompletedStepsBadge
          completedSteps={completedSteps}
          totalSteps={totalSteps}
        />
        <span className="text-[1.4rem] text-text-primary-2 hidden sm:block">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      <ProgressBar progressPercentage={progressPercentage} />
      <RemainingWarning unCompletedSteps={unCompletedSteps} />
    </div>
  );
}
