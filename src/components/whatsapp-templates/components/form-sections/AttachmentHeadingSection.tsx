import React from "react";
import { TemplateFormData, HandleChange } from "../../types";
import { useCollapsible } from "../../hooks/useCollapsible";
import { HeaderTypeToggle } from "./HeaderTypeToggle";
import { AttachmentHeadlineFields } from "./AttachmentHeadlineFields";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { cn } from "../../../../lib/utils";
import ToggleSwitch from "../../../ui/ToggleSwitch";

interface AttachmentHeadingSectionProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
}

export default function AttachmentHeadingSection({
  formData,
  handleChange,
}: AttachmentHeadingSectionProps) {
  const { isExpanded, toggle } = useCollapsible(true);
  const icons = useSupabaseIcons();

  return (
    <div className="flex flex-col border border-input-stroke rounded-[1.2rem] overflow-hidden bg-input-filled">
      <div
        className="flex items-center justify-between p-[2.4rem] cursor-pointer"
        onClick={toggle}
      >
        <div className="flex flex-col gap-[0.4rem]">
          <h2 className="text-[1.6rem] font-bold text-text-secondary leading-tight">
            Add an attachment
          </h2>
          <p className="text-[1.2rem] text-text-primary">
            Upload a file to provide extra context or supporting information
          </p>
        </div>
        <ImageComponent
          src={icons.gridDropdown}
          alt="expand"
          width={20}
          height={20}
          className={cn(
            "transition-transform duration-200",
            isExpanded ? "rotate-0" : "-rotate-90",
          )}
        />
      </div>

      {isExpanded && (
        <div className="flex flex-col border-input-stroke bg-input-filled">
          <div className="flex items-center justify-between p-[2.4rem]">
            <label className="text-[1.6rem] font-bold text-text-secondary leading-tight">
              Add attachment / heading
            </label>
            <ToggleSwitch
              isActive={formData.hasAttachment}
              onToggle={() =>
                handleChange("hasAttachment", !formData.hasAttachment)
              }
            />
          </div>

          {formData.hasAttachment && (
            <div className="px-[2.4rem] pb-[2.4rem] flex flex-col gap-[2.4rem]">
              <HeaderTypeToggle
                formData={formData}
                handleChange={handleChange}
              />
              <AttachmentHeadlineFields
                formData={formData}
                handleChange={handleChange}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
