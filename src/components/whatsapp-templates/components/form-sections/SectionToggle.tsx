import React from "react";
import ToggleSwitch from "@/shared/src/components/ui/ToggleSwitch";

interface SectionToggleProps {
  label: string;
  optional?: boolean;
  description?: string;
  active: boolean;
  onToggle: () => void;
}

export function SectionToggle({
  label,
  optional,
  description,
  active,
  onToggle,
}: SectionToggleProps) {
  return (
    <div className="flex items-center justify-between p-[2.4rem]">
      <div className="flex flex-col gap-[0.4rem]">
        <label className="text-[1.6rem] font-bold text-text-secondary leading-tight">
          {label}{" "}
          {optional && (
            <span className="font-normal text-text-primary text-[1.4rem]">
              (optional)
            </span>
          )}
        </label>
        {description && (
          <p className="text-[1.2rem] text-text-primary">{description}</p>
        )}
      </div>
      <ToggleSwitch isActive={active} onToggle={onToggle} />
    </div>
  );
}
