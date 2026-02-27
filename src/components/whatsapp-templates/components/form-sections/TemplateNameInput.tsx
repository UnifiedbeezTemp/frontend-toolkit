import React from "react";
import { TemplateFormData, HandleChange } from "../../types";
import Input from "../../../forms/Input";

interface TemplateNameInputProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
}

export default function TemplateNameInput({
  formData,
  handleChange,
}: TemplateNameInputProps) {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-[1.4rem] font-bold text-text-secondary">
        Template name
      </label>
      <p className="text-[1.2rem] text-text-primary">
        The name is used for internal purposes only
      </p>
      <Input
        placeholder="Enter template name"
        value={formData.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("name", e.target.value)
        }
        className="rounded-[0.8rem] border-input-stroke h-[4.2rem]"
      />
    </div>
  );
}
