import React from "react";
import Input from "@/shared/src/components/forms/Input";
import { TemplateButton } from "../../types";

interface LabelInputFieldsProps {
  btn: TemplateButton;
  onUpdate: (val: string) => void;
}

export function LabelInputFields({ btn, onUpdate }: LabelInputFieldsProps) {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-[1.3rem] font-bold text-text-secondary">
        Label
      </label>
      <div className="relative">
        <Input
          placeholder="Enter a label"
          value={btn.text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onUpdate(e.target.value.slice(0, 60))
          }
          className="rounded-[0.8rem] border-input-stroke h-[4.2rem]"
        />
        <span className="absolute bottom-[-1.8rem] right-0 text-[1.1rem] text-inactive-color">
          {btn.text.length}/60 Characters
        </span>
      </div>
    </div>
  );
}
