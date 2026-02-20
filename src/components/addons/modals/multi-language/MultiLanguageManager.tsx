import React from "react";
import { useMultiLanguage } from "../../hooks/useMultiLanguage";
import {
  Addon,
  MultiLanguageInstance,
} from "../../../../store/onboarding/types/addonTypes";
import Button from "../../../ui/Button";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "next/image";
import { languages } from "../../../../data/languages";

import { useMultiLanguageManager } from "./hooks/useMultiLanguageManager";

interface MultiLanguageManagerProps {
  addon: Addon;
  params: {
    currentQuantity: number;
    purchasedQuantity: number;
  };
  onSelectionChange: (languages: string[]) => void;
  selectedLanguages: string[];
}

export const MultiLanguageManager: React.FC<MultiLanguageManagerProps> = ({
  addon,
  params,
  onSelectionChange,
  selectedLanguages,
}) => {
  const {
    cancelInstance,
    isLoading,
    cancellingInstanceId,
    delta,
    selectableLanguages,
    handleLanguageToggle,
    shouldRender,
  } = useMultiLanguageManager({
    addon,
    currentQuantity: params.currentQuantity,
    purchasedQuantity: params.purchasedQuantity,
    selectedLanguages,
    onSelectionChange,
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[2.4rem] w-full">
      {addon.instances && addon.instances.length > 0 && (
        <div className="flex flex-col gap-[1.6rem]">
          <h3 className="text-[1.6rem] font-[700] text-text-primary">
            Active Languages
          </h3>
          <div className="flex flex-col gap-[1.2rem]">
            {addon.instances.map((instance) => {
              const staticLang = languages.find(
                (l) => l.name.toLowerCase() === instance.language.toLowerCase(),
              );
              const flag = staticLang?.flag || "🌐";
              const name =
                staticLang?.name ||
                instance.language.charAt(0).toUpperCase() +
                  instance.language.slice(1);

              return (
                <div
                  key={instance.id}
                  className="flex items-center justify-between p-[1.6rem] bg-background-secondary rounded-[1.2rem] border border-border"
                >
                  <div className="flex items-center gap-[1.2rem]">
                    <span className="text-[2.4rem]">{flag}</span>
                    <div className="flex flex-col">
                      <span className="text-[1.4rem] font-[600] text-text-primary capitalize">
                        {name}
                      </span>
                      {instance.scheduledForCancellation && (
                        <span className="text-[1.2rem] text-destructive font-[500]">
                          This addon is scheduled for cancellation from your
                          next billing cycle
                        </span>
                      )}
                    </div>
                  </div>

                  {!instance.scheduledForCancellation && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => cancelInstance(instance.id)}
                      loading={cancellingInstanceId === instance.id}
                      className="text-destructive border-destructive hover:bg-destructive/10"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {delta > 0 && (
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.6rem] font-[700] text-text-primary">
              Select New Languages
            </h3>
            <span className="text-[1.4rem] font-[600] text-brand-primary">
              {selectedLanguages.length}/{delta} Selected
            </span>
          </div>

          <div className="grid grid-cols-2 gap-[1rem]">
            {selectableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageToggle(lang.code)}
                className={`
                       flex items-center gap-[1rem] p-[1.2rem] rounded-[1rem] border text-[1.4rem] font-[600] capitalize transition-all
                       ${
                         selectedLanguages.includes(lang.code)
                           ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                           : "border-border bg-white text-text-secondary hover:border-brand-primary/50"
                       }
                       ${selectedLanguages.length >= delta && !selectedLanguages.includes(lang.code) ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                disabled={
                  selectedLanguages.length >= delta &&
                  !selectedLanguages.includes(lang.code)
                }
              >
                <span className="text-[2rem]">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
          {selectedLanguages.length < delta && (
            <p className="text-[1.2rem] text-destructive font-[600]">
              Please select {delta - selectedLanguages.length} more language(s)
            </p>
          )}
        </div>
      )}
    </div>
  );
};
