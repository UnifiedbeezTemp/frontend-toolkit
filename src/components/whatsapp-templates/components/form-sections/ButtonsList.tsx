import React from "react";
import Button from "@/shared/src/components/ui/Button";
import ButtonConfigCard from "./ButtonConfigCard";
import { TemplateFormData, HandleChange } from "../../types";

interface ButtonsListProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
  activeDropdown: string | null;
  setActiveDropdown: (val: string | null) => void;
}

export function ButtonsList({
  formData,
  handleChange,
  activeDropdown,
  setActiveDropdown,
}: ButtonsListProps) {
  return (
    <div className="px-[2.4rem] pb-[2.4rem] flex flex-col gap-[2.4rem]">
      {formData.buttons.map((btn, index) => (
        <ButtonConfigCard
          key={index}
          index={index}
          btn={btn}
          formData={formData}
          handleChange={handleChange}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
      ))}

      {formData.buttons.length < 10 && (
        <Button
          onClick={() => {
            handleChange("buttons", [
              ...formData.buttons,
              { type: "Quick reply", text: "" },
            ]);
          }}
          className="w-fit px-[1.6rem] py-[0.8rem] bg-brand-gradient-2 rounded-[0.8rem] flex items-center justify-center gap-[0.8rem] h-[4.2rem] border-0"
        >
          <span className="text-[1.8rem] leading-none mb-1">+</span>
          <span className="text-[1.4rem] font-bold text-white">New Button</span>
        </Button>
      )}
    </div>
  );
}
