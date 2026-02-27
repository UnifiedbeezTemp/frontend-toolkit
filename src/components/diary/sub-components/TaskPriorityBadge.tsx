"use client";

import React from "react";
import { cn } from "../../../lib/utils";

interface TaskPriorityBadgeProps {
  priority: "Low" | "Medium" | "High";
  className?: string;
}

export default function TaskPriorityBadge({
  priority,
  className,
}: TaskPriorityBadgeProps) {
  const styles = {
    Low: "bg-success/10 border-success/30 text-success",
    Medium: "bg-warning/10 border-warning/30 text-warning",
    High: "bg-destructive/10 border-destructive/30 text-destructive",
  };

  const labels = {
    Low: "Low",
    Medium: "Medium",
    High: "High Priority",
  };

  return (
    <div
      className={cn(
        "px-[0.8rem] py-[0.8rem] rounded-[0.8rem] border text-[1.1rem] f leading-none uppercase tracking-wider",
        styles[priority],
        className,
      )}
    >
      {labels[priority]}
    </div>
  );
}
