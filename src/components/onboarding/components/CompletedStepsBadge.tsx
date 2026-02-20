"use client";

import React from "react";
import Button from "../../ui/Button";

interface BadgeProps {
  completedSteps: number;
  totalSteps: number;
}

export default function CompletedStepsBadge({
  completedSteps,
  totalSteps,
}: BadgeProps) {
  return (
    <Button
      variant="secondary"
      onClick={() => {}}
      size="sm"
      className="rounded-[0.8rem] text-[1.4rem] font-[400] text-dark-base-60 leading-[1.68rem]"
    >
      {`0${completedSteps}/0${totalSteps} Completed`}
    </Button>
  );
}
