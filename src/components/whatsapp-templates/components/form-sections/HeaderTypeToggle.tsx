import React from "react";
import { TemplateFormData, HandleChange } from "../../types";
import { CheckboxIndicator } from "./FormSubComponents";
import { cn } from "../../../../lib/utils";

interface HeaderTypeToggleProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
}

export function HeaderTypeToggle({
  formData,
  handleChange,
}: HeaderTypeToggleProps) {
  return (
    <div className="flex flex-col gap-[1.2rem]">
      {["attachment", "headline"].map((type) => (
        <button
          key={type}
          onClick={() => handleChange("headerType", type as any)}
          className={cn(
            "flex items-center justify-between p-[1.6rem] rounded-[1.2rem] border transition-all duration-200",
            formData.headerType === type
              ? "layout-body border-input-stroke text-text-secondary"
              : "bg-primary border-input-stroke text-text-primary",
          )}
        >
          <span className="text-[1.4rem] font-bold capitalize">{type}</span>
          <CheckboxIndicator active={formData.headerType === type} />
        </button>
      ))}
    </div>
  );
}
