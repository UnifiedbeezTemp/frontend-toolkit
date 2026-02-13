import { useCallback, useMemo } from "react";
import {
  Addon,
  MultiLanguageInstance,
} from "../../../../../store/onboarding/types/addonTypes";
import { useMultiLanguage } from "../../../hooks/useMultiLanguage";
import { languages, Language } from "../../../../../data/languages";

interface UseMultiLanguageManagerProps {
  addon: Addon;
  currentQuantity: number;
  purchasedQuantity: number;
  selectedLanguages: string[];
  onSelectionChange: (languages: string[]) => void;
}

export const useMultiLanguageManager = ({
  addon,
  currentQuantity,
  purchasedQuantity,
  selectedLanguages,
  onSelectionChange,
}: UseMultiLanguageManagerProps) => {
  const {
    cancelInstance,
    isLoading,
    availableLanguages,
    cancellingInstanceId,
  } = useMultiLanguage();

  const delta = useMemo(
    () => Math.max(0, currentQuantity - purchasedQuantity),
    [currentQuantity, purchasedQuantity],
  );

  const activeLanguageCodes = useMemo(
    () =>
      addon.instances?.map((i: MultiLanguageInstance) =>
        i.language.toLowerCase(),
      ) || [],
    [addon.instances],
  );

  const selectableLanguages = useMemo(() => {
    return availableLanguages
      .filter(
        (lang: string) => !activeLanguageCodes.includes(lang.toLowerCase()),
      )
      .map((code: string) => {
        const staticLang = languages.find(
          (l: Language) => l.name.toLowerCase() === code.toLowerCase(),
        );
        return {
          code,
          name:
            staticLang?.name || code.charAt(0).toUpperCase() + code.slice(1),
          flag: staticLang?.flag || "🌐",
        };
      });
  }, [availableLanguages, activeLanguageCodes]);

  const handleLanguageToggle = useCallback(
    (lang: string) => {
      if (selectedLanguages.includes(lang)) {
        onSelectionChange(selectedLanguages.filter((l) => l !== lang));
      } else {
        if (selectedLanguages.length < delta) {
          onSelectionChange([...selectedLanguages, lang]);
        }
      }
    },
    [selectedLanguages, delta, onSelectionChange],
  );

  const shouldRender = useMemo(() => {
    return (addon.instances && addon.instances.length > 0) || delta > 0;
  }, [addon.instances, delta]);

  return {
    cancelInstance,
    isLoading,
    cancellingInstanceId,
    delta,
    selectableLanguages,
    handleLanguageToggle,
    shouldRender,
  };
};
