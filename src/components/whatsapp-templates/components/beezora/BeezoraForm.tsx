import React, { useRef } from "react";
import { BeezoraFormData } from "../../hooks/useBeezoraModal";
import {
  LanguageDropdownItems,
  LANGUAGE_MAP,
} from "../form-sections/LanguageDropdownItems";
import CaretDownIcon from "../../../../assets/icons/CaretDownIcon";
import Input from "../../../forms/Input";
import { SmartDropdown } from "../../../smart-dropdown";

interface BeezoraFormProps {
  formData: BeezoraFormData;
  handleInputChange: (field: keyof BeezoraFormData, value: string) => void;
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
  setActiveDropdown: (name: string | null) => void;
}

const VARIABLES = [
  "{{First Name}}",
  "{{Last Name}}",
  "{{Order ID}}",
  "{{Date}}",
];

export function BeezoraForm({
  formData,
  handleInputChange,
  activeDropdown,
  toggleDropdown,
  setActiveDropdown,
}: BeezoraFormProps) {
  const varRef = useRef<HTMLButtonElement>(null);
  const langRef = useRef<HTMLButtonElement>(null);

  const selectedLang = formData.language || "English";
  const langInfo =
    LANGUAGE_MAP[
      selectedLang === "English" ? "American English" : selectedLang
    ];

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <div className="flex flex-col gap-[0.8rem]">
        <label className="text-[1.4rem] font-bold text-text-secondary">
          Message Objective
        </label>
        <p className="text-[1.2rem] text-text-primary">
          Define the purpose of this template (e.g., authentication, support,
          marketing).
        </p>
        <Input
          placeholder="e.g Welcome new subscribers with a personalized thank you message."
          value={formData.objective}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("objective", e.target.value)
          }
          className="h-[4.2rem] rounded-[0.8rem] border-input-stroke bg-primary text-[1.4rem] text-inactive-color placeholder:text-[1.2rem] placeholder:text-inactive-color"
        />
      </div>

      <div className="flex flex-col gap-[0.8rem]">
        <label className="text-[1.4rem] font-bold text-text-secondary">
          Add personalization with text variables{" "}
          <span className="font-normal text-text-primary">(Optional)</span>
        </label>
        <p className="text-[1.2rem] text-text-primary">
          Insert smart placeholders like name or order ID that personalize your
          template automatically.
        </p>
        <div className="relative">
          <button
            ref={varRef}
            onClick={() => toggleDropdown("variable")}
            className="w-full h-[4.2rem] flex items-center justify-between px-[1.2rem] bg-primary border border-input-stroke rounded-[0.8rem] text-left"
          >
            <span className="text-[1.4rem] text-inactive-color font-medium">
              {formData.variable || "Select"}
            </span>
            <CaretDownIcon size={12} color="var(--text-primary)" />
          </button>
          <SmartDropdown
            isOpen={activeDropdown === "variable"}
            onClose={() => setActiveDropdown(null)}
            triggerRef={varRef}
          >
            {VARIABLES.map((v) => (
              <button
                key={v}
                onClick={() => {
                  handleInputChange("variable", v);
                  setActiveDropdown(null);
                }}
                className="w-full px-[1.2rem] py-[0.8rem] text-left text-[1.4rem] hover:bg-input-filled/50 font-medium text-text-secondary"
              >
                {v}
              </button>
            ))}
          </SmartDropdown>
        </div>
      </div>

      <div className="flex flex-col gap-[0.8rem]">
        <label className="text-[1.4rem] font-bold text-text-secondary">
          Select languages
        </label>
        <p className="text-[1.2rem] text-text-primary">
          Your region language will be used if no language is selected
        </p>
        <div className="relative">
          <button
            ref={langRef}
            onClick={() => toggleDropdown("language")}
            className="w-full h-[4.2rem] flex items-center justify-between px-[1.2rem] bg-primary border border-input-stroke rounded-[0.8rem] text-left"
          >
            <div className="flex items-center gap-[1rem]">
              {langInfo && (
                <span className="text-[1.6rem]">{langInfo.flag}</span>
              )}
              <span className="text-[1.4rem] text-text-secondary font-medium">
                {selectedLang}
              </span>
            </div>
            <CaretDownIcon size={12} color="var(--text-primary)" />
          </button>
          <SmartDropdown
            isOpen={activeDropdown === "language"}
            onClose={() => setActiveDropdown(null)}
            triggerRef={langRef}
          >
            <LanguageDropdownItems
              onSelect={(lang) => {
                handleInputChange("language", lang);
                setActiveDropdown(null);
              }}
            />
          </SmartDropdown>
        </div>
      </div>
    </div>
  );
}
