import React from "react";
import { TemplateFormData, HandleChange } from "../../types";
import AttachmentTypeSelection from "./AttachmentTypeSelection";
import Input from "../../../forms/Input";

interface AttachmentHeadlineFieldsProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
}

export function AttachmentHeadlineFields({
  formData,
  handleChange,
}: AttachmentHeadlineFieldsProps) {
  if (formData.headerType === "attachment") {
    return (
      <AttachmentTypeSelection
        formData={formData}
        handleChange={handleChange}
      />
    );
  }

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-[1.4rem] font-bold text-text-secondary">
        Headline text
      </label>
      <Input
        placeholder="Enter headline text"
        value={formData.headline}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("headline", e.target.value)
        }
        className="rounded-[0.8rem] border-input-stroke h-[4.2rem]"
      />
    </div>
  );
}
