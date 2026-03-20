import React from "react";
import { cn } from "../../lib/utils";

export type LevelPillValue = "Low" | "Medium" | "High";

interface LevelPillProps {
  value: LevelPillValue;
  className?: string;
}

const levelStyles: Record<LevelPillValue, { text: string; bg: string }> = {
  Low: {
    text: "var(--crm-status-active-text)",
    bg: "var(--crm-status-active-bg)",
  },
  Medium: {
    text: "var(--crm-status-unconfirmed-text)",
    bg: "var(--crm-status-unconfirmed-bg)",
  },
  High: {
    text: "var(--crm-status-unsubscribed-text)",
    bg: "var(--crm-status-unsubscribed-bg)",
  },
};

export default function LevelPill({ value, className }: LevelPillProps) {
  const styles = levelStyles[value];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-[0.6rem] px-[0.8rem] py-[0.2rem] rounded-[1.6rem] text-[1.2rem] font-medium",
        className,
      )}
      style={{ backgroundColor: styles.bg, color: styles.text }}
    >
      <span
        className="w-[0.6rem] h-[0.6rem] rounded-full"
        style={{ backgroundColor: styles.text }}
      />
      {value}
    </div>
  );
}

