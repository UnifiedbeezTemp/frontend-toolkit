"use client";

import React from "react";
import { ProgressStep } from "../types";

interface StepActionsProps {
  step: ProgressStep;
  onAction: (id: number) => void;
  isNextStep?: boolean;
}

export default function StepActions({
  step,
  onAction,
  isNextStep,
}: StepActionsProps) {
  return (
    <div className="flex gap-[0.8rem]">
      {!step.isCompleted && (
        <button
          onClick={() => onAction(step.id)}
          className="bg-brand-primary text-primary px-[1.2rem] py-[0.6rem] rounded-[0.8rem] text-[1.2rem] font-bold"
        >
          {isNextStep ? "Continue" : "Start"}
        </button>
      )}
    </div>
  );
}
