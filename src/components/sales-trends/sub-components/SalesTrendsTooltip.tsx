"use client";

import React from "react";

interface TooltipPayloadItem {
  value: number;
  dataKey: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-primary border border-input-stroke rounded-[0.8rem] px-[1.2rem] py-[0.8rem] shadow-card">
      <p className="text-[1.2rem] font-bold text-text-secondary">{label}</p>
      <p className="text-[1.4rem] text-text-primary">
        Sales:{" "}
        <span className="font-bold">£{payload[0].value.toLocaleString()}</span>
      </p>
    </div>
  );
}
