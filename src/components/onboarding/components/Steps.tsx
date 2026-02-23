"use client";

import React from "react";
import { ProgressStep } from "../types";
import StepItem from "./StepItem";

interface StepsProps {
  steps: ProgressStep[];
}

export default function Steps({ steps }: StepsProps) {
  return (
    <div className="mt-[2.4rem]">
      <p className="text-[1.6rem] lg:text-[2rem] text-secondary font-[700] mb-[1.6rem]">
        Setup steps
      </p>
      <div className="space-y-[1.6rem]">
        {steps.map((step, idx) => (
          <StepItem step={step} key={idx} isModal onAction={() => {}} />
        ))}
      </div>
    </div>
  );
}
