import React from "react";

export const DUMMY_LANGUAGES = [
  "American English",
  "British English",
  "Spanish",
  "French",
  "German",
  "Portuguese",
];

export const LANGUAGE_MAP: Record<string, { flag: string; code: string }> = {
  "American English": { flag: "🇺🇸", code: "US" },
  "British English": { flag: "🇬🇧", code: "UK" },
  Spanish: { flag: "🇪🇸", code: "ES" },
  French: { flag: "🇫🇷", code: "FR" },
  German: { flag: "🇩🇪", code: "DE" },
  Portuguese: { flag: "🇵🇹", code: "PT" },
};

interface LanguageDropdownItemsProps {
  onSelect: (lang: string) => void;
}

export function LanguageDropdownItems({
  onSelect,
}: LanguageDropdownItemsProps) {
  return (
    <>
      {DUMMY_LANGUAGES.map((lang) => {
        const info = LANGUAGE_MAP[lang];
        return (
          <button
            key={lang}
            onClick={() => onSelect(lang)}
            className="w-full px-[1.2rem] py-[0.8rem] text-left text-[1.4rem] hover:bg-input-filled/50 font-medium text-text-secondary flex items-center gap-[1rem]"
          >
            <span className="text-[1.6rem]">{info?.flag}</span>
            {lang}
          </button>
        );
      })}
    </>
  );
}
