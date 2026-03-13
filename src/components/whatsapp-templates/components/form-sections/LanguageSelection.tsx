import React, { useRef } from "react";
import { TemplateFormData, HandleChange } from "../../types";
import { SelectedLanguagePill } from "./SelectedLanguagePill";
import { LanguageDropdownItems, LANGUAGE_MAP } from "./LanguageDropdownItems";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { SmartDropdown } from "../../../smart-dropdown";

interface LanguageSelectionProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
  setActiveDropdown: (name: string | null) => void;
}

export default function LanguageSelection({
  formData,
  handleChange,
  activeDropdown,
  toggleDropdown,
  setActiveDropdown,
}: LanguageSelectionProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const icons = useSupabaseIcons() as { gridDropdown: string };

  const selectedLang = formData.language || "American English";
  const selectedInfo =
    LANGUAGE_MAP[selectedLang] || LANGUAGE_MAP["American English"];

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-[1.4rem] font-bold text-text-secondary">
        Language
      </label>
      <p className="text-[1.2rem] text-text-primary">
        Select the language of this template
      </p>
      <div className="relative">
        <button
          ref={triggerRef}
          onClick={() => toggleDropdown("language")}
          className="w-full h-[4.2rem] flex items-center justify-between px-[1.2rem] bg-primary border border-input-stroke rounded-[0.8rem] text-left"
        >
          <div className="flex items-center gap-[1.2rem]">
            <SelectedLanguagePill info={selectedInfo} icons={icons} />
            <span className="text-[1.4rem] text-text-secondary font-medium">
              {selectedLang}
            </span>
          </div>
          <ImageComponent
            src={icons.gridDropdown}
            alt="v"
            width={16}
            height={16}
          />
        </button>
        <SmartDropdown
          isOpen={activeDropdown === "language"}
          onClose={() => setActiveDropdown(null)}
          triggerRef={triggerRef}
        >
          <LanguageDropdownItems
            onSelect={(lang) => {
              handleChange("language", lang);
              setActiveDropdown(null);
            }}
          />
        </SmartDropdown>
      </div>
    </div>
  );
}
