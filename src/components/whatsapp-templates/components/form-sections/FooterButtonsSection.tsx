import React from "react";
import { TemplateFormData, HandleChange } from "../../types";
import { useCollapsible } from "../../hooks/useCollapsible";
import { SectionToggle } from "./SectionToggle";
import { FooterInput } from "./FooterInput";
import { ButtonsList } from "./ButtonsList";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { cn } from "../../../../lib/utils";

interface FooterButtonsSectionProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
  activeDropdown: string | null;
  setActiveDropdown: (val: string | null) => void;
}

export default function FooterButtonsSection({
  formData,
  handleChange,
  activeDropdown,
  setActiveDropdown,
}: FooterButtonsSectionProps) {
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
            Footer & Buttons
          </h2>
          <p className="text-[1.2rem] text-text-primary">
            Add footer or buttons to your template
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
        <div className="flex flex-col border-input-stroke">
          <SectionToggle
            label="Add footer"
            optional
            active={formData.hasFooter}
            onToggle={() => handleChange("hasFooter", !formData.hasFooter)}
          />

          {formData.hasFooter && (
            <FooterInput formData={formData} handleChange={handleChange} />
          )}

          <div className="px-[2.4rem]">
            <div className="h-[0.1rem] bg-input-stroke w-full" />
          </div>

          <SectionToggle
            label="Add button"
            optional
            description="Add up to 10 buttons to your WhatsApp template."
            active={formData.hasButton}
            onToggle={() => {
              const newVal = !formData.hasButton;
              handleChange("hasButton", newVal);
              if (newVal && formData.buttons.length === 0) {
                handleChange("buttons", [{ type: "Quick reply", text: "" }]);
              }
            }}
          />

          {formData.hasButton && (
            <ButtonsList
              formData={formData}
              handleChange={handleChange}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          )}
        </div>
      )}
    </div>
  );
}
