"use client";

import { useState, useRef } from "react";
import ImageComponent from "next/image";
import { Language, languages } from "../../../data/languages";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { SmartDropdown } from "../../smart-dropdown";

interface Props {
  onLanguageChange?: (language: Language) => void;
  selectedLanguage?: Language;
}

export default function LanguageSelector({
  onLanguageChange,
  selectedLanguage,
}: Props) {
  const icons = useSupabaseIcons();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (language: Language) => {
    setIsOpen(false);
    if (onLanguageChange) {
      onLanguageChange(language);
    }
  };

  if (!selectedLanguage) return null;

  return (
    <div className="">
      <div className="">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center bg-primary justify-between w-full border border-border rounded-[0.8rem] px-[1.6rem] py-[0.8rem] text-[1.6rem] text-text-primary mt-[1rem] transition-colors hover:border-brand-primary/50 !cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedLanguage.flag}</span>
            <span>{selectedLanguage.nativeName}</span>
          </div>
          <ImageComponent
            src={icons.smArrowDown}
            alt=""
            width={20}
            height={20}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <SmartDropdown
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          triggerRef={triggerRef}
          maxHeight="20rem"
        >
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  selectedLanguage.code === language.code
                    ? "bg-brand-primary/10"
                    : ""
                }`}
              >
                <span className="text-2xl">{language.flag}</span>
                <div className="flex flex-col items-start">
                  <span className="text-text-primary text-[1.4rem]">
                    {language.nativeName}
                  </span>
                  <span className="text-text-secondary text-[1.2rem]">
                    {language.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </SmartDropdown>
      </div>
    </div>
  );
}
