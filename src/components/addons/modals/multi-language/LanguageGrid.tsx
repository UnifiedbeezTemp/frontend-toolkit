import React from "react";
import Text from "../../../ui/Text";
import { Language } from "../../../../data/languages";
import ImageComponent from "../../../ui/ImageComponent";
import { cn } from "../../../../lib/utils";

import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";

interface LanguageGridProps {
  languages: Language[];
  selectedLanguages: string[];
  onToggle: (code: string) => void;
  icons: ReturnType<typeof useSupabaseIcons>;
}

export const LanguageGrid: React.FC<LanguageGridProps> = ({
  languages,
  selectedLanguages,
  onToggle,
  icons,
}) => {
  if (languages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-[6rem] text-center">
        <div className="w-[6.4rem] h-[6.4rem] bg-muted/20 rounded-full flex items-center justify-center mb-[1.6rem]">
          <ImageComponent
            src={icons.searchSmIcon}
            alt="No results"
            width={32}
            height={32}
            className="opacity-20"
          />
        </div>
        <Text className="text-[1.8rem] font-bold text-text-primary mb-[0.4rem]">
          No languages found
        </Text>
        <Text className="text-[1.4rem] text-text-secondary">
          Try searching for a different language name.
        </Text>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.2rem] min-h-[30vh] pb-[2rem]">
      {languages.map((lang) => {
        const isSelected = selectedLanguages.includes(lang.code);
        return (
          <button
            key={lang.code}
            onClick={() => onToggle(lang.code)}
            className={cn(
              "flex items-center justify-between p-[1.8rem] border rounded-[0.8rem] transition-all",
              isSelected
                ? "border-brand-primary bg-success/15 text-brand-primary"
                : "border-border hover:border-text-secondary/50 bg-primary text-text-secondary",
            )}
          >
            <div className="flex items-center gap-[1.2rem]">
              <span className="text-[2.4rem] leading-none">{lang.flag}</span>
              <div className="text-left">
                <Text className="text-[1.6rem] leading-tight font-medium">
                  {lang.name}
                </Text>
              </div>
            </div>
            {isSelected && (
              <div className="">
                <ImageComponent
                  src={icons.check}
                  alt="Selected"
                  width={20}
                  height={20}
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
