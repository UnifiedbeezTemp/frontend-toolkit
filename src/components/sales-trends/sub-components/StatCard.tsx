"use client";

import React, { ReactNode } from "react";
import { cn } from "../../../lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  iconBg: string;
  className: string;
}

export default function StatCard({
  label,
  value,
  icon,
  iconBg,
  className,
}: StatCardProps) {
  return (
    <div className={cn("flex items-center gap-[1.2rem] px-[1.2rem] py-[1rem] border border-input-stroke rounded-[0.8rem] bg-primary", className)}>
      <div
        className={`w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center shrink-0 ${iconBg}`}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[1.2rem] text-text-primary">{label}</span>
        <span className="text-[1.8rem] font-bold text-text-secondary">
          {value}
        </span>
      </div>
    </div>
  );
}
