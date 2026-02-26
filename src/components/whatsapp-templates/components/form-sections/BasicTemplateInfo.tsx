import React from "react";
import AccountSelection from "./AccountSelection";
import TemplateNameInput from "./TemplateNameInput";
import CategorySelection from "./CategorySelection";
import LanguageSelection from "./LanguageSelection";
import MessageTextarea from "./MessageTextarea";
import { HandleChange, TemplateFormData } from "../../types";
import { useCollapsible } from "../../hooks/useCollapsible";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { cn } from "../../../../lib/utils";

interface BasicTemplateInfoProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
  setActiveDropdown: (name: string | null) => void;
}

export default function BasicTemplateInfo({
  formData,
  handleChange,
  activeDropdown,
  toggleDropdown,
  setActiveDropdown,
}: BasicTemplateInfoProps) {
  const { isExpanded, toggle } = useCollapsible(true);
  const icons = useSupabaseIcons() as { gridDropdown: string };

  return (
    <div className="flex flex-col border border-input-stroke rounded-[1.2rem] overflow-hidden bg-input-filled">
      <div
        className="flex items-center justify-between p-[2.4rem] cursor-pointer"
        onClick={toggle}
      >
        <div className="flex flex-col gap-[0.4rem]">
          <h2 className="text-[1.6rem] font-bold text-text-secondary leading-tight">
            Template Configuration
          </h2>
          <p className="text-[1.2rem] text-text-primary">
            Select the account for which you want to use this template
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
        <div className="flex flex-col gap-[2.4rem] p-[2.4rem] pt-0">
          <AccountSelection
            formData={formData}
            handleChange={handleChange}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
            setActiveDropdown={setActiveDropdown}
          />

          <TemplateNameInput formData={formData} handleChange={handleChange} />

          <CategorySelection
            formData={formData}
            handleChange={handleChange}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
            setActiveDropdown={setActiveDropdown}
          />

          <LanguageSelection
            formData={formData}
            handleChange={handleChange}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
            setActiveDropdown={setActiveDropdown}
          />

          <MessageTextarea formData={formData} handleChange={handleChange} />
        </div>
      )}
    </div>
  );
}
