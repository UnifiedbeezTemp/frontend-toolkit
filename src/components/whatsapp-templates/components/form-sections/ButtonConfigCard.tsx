import React, { useRef } from "react";
import Input from "@/shared/src/components/forms/Input";
import { TemplateFormData, HandleChange, TemplateButton } from "../../types";
import { ButtonHeader, ButtonActionInput } from "./ButtonFields";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";
import { TypeSelectionDropdown } from "./TypeSelectionDropdown";
import { LabelInputFields } from "./LabelInputFields";

interface ButtonConfigCardProps {
  index: number;
  btn: TemplateButton;
  formData: TemplateFormData;
  handleChange: HandleChange;
  activeDropdown: string | null;
  setActiveDropdown: (val: string | null) => void;
}

export default function ButtonConfigCard({
  index,
  btn,
  formData,
  handleChange,
  activeDropdown,
  setActiveDropdown,
}: ButtonConfigCardProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownName = `button-type-${index}`;
  const icons = useSupabaseIcons() as { gridDropdown: string };

  const updateBtn = (field: string, value: string) => {
    const newButtons = [...formData.buttons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    handleChange("buttons", newButtons);
  };

  const onRemove = () => {
    const newB = [...formData.buttons];
    newB.splice(index, 1);
    handleChange("buttons", newB);
  };

  return (
    <div className="bg-primary border border-input-stroke rounded-[1.2rem] p-[1.6rem] flex flex-col gap-[1.6rem] pb-[4rem]">
      <ButtonHeader index={index} onRemove={onRemove} />

      <TypeSelectionDropdown
        btn={btn}
        triggerRef={triggerRef}
        isOpen={activeDropdown === dropdownName}
        onToggle={() =>
          setActiveDropdown(
            activeDropdown === dropdownName ? null : dropdownName,
          )
        }
        onClose={() => setActiveDropdown(null)}
        onSelect={(t) => {
          updateBtn("type", t);
          setActiveDropdown(null);
        }}
        icons={icons}
      />

      <LabelInputFields btn={btn} onUpdate={(val) => updateBtn("text", val)} />

      <ButtonActionInput
        type={btn.type}
        url={btn.url}
        phone={btn.phone}
        updateButton={updateBtn}
        InputComponent={Input}
      />
    </div>
  );
}
