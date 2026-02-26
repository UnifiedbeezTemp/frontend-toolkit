import React from "react";
import Input from "@/shared/src/components/forms/Input";
import { TemplateFormData, HandleChange } from "../../types";

interface FooterInputProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
}

export function FooterInput({ formData, handleChange }: FooterInputProps) {
  return (
    <div className="px-[2.4rem] pb-[4rem] flex flex-col gap-[0.8rem]">
      <label className="text-[1.4rem] font-bold text-text-secondary">
        Footer text
      </label>
      <p className="text-[1.2rem] text-text-primary">
        The name is used for internal purposes only
      </p>
      <div className="relative">
        <Input
          placeholder="Enter a footer"
          value={formData.footerText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("footerText", e.target.value.slice(0, 60))
          }
          className="rounded-[0.8rem] border-input-stroke h-[4.2rem]"
        />
        <span className="absolute bottom-[-2rem] right-0 text-[1.1rem] text-inactive-color font-medium">
          {formData.footerText.length}/60 Characters
        </span>
      </div>
    </div>
  );
}
