import { useState, useMemo, useCallback, useEffect } from "react";
import { languages, Language } from "../../../../data/languages";
import { Addon } from "../../../../store/onboarding/types/addonTypes";
import { useMultiLanguage } from "../../hooks/useMultiLanguage";

interface UseMultiLanguageModalProps {
  onAdd: (addon: Addon, quantity: number) => void;
  onClose: () => void;
  addon: Addon | null;
}

export const useMultiLanguageModal = ({
  onAdd,
  onClose,
  addon,
}: UseMultiLanguageModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const {
    updatePreferences,
    isLoading,
    error,
    availableLanguages,
    selectedLanguages: apiSelectedLanguages,
    maxAllowed,
    refetch,
  } = useMultiLanguage();

  const isUnlimited = useMemo(() => {
    return (
      typeof maxAllowed === "string" && maxAllowed.toLowerCase() === "unlimited"
    );
  }, [maxAllowed]);

  const MAX_LANGUAGES = useMemo(() => {
    if (isUnlimited) {
      return 1000;
    }
    return Number(maxAllowed) || 10;
  }, [maxAllowed, isUnlimited]);

  useEffect(() => {
    if (apiSelectedLanguages && apiSelectedLanguages.length > 0) {
      setSelectedLanguages(apiSelectedLanguages);
    }
  }, [apiSelectedLanguages]);

  const mappedLanguages = useMemo(() => {
    return availableLanguages.map((code) => {
      const staticLang = languages.find(
        (l) => l.name.toLowerCase() === code.toLowerCase(),
      );
      return {
        code,
        name: staticLang?.name || code.charAt(0).toUpperCase() + code.slice(1),
        nativeName: staticLang?.nativeName || "",
        flag: staticLang?.flag || "🌐",
      };
    });
  }, [availableLanguages]);

  const filteredLanguages = useMemo(() => {
    return mappedLanguages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, mappedLanguages]);

  const toggleLanguage = useCallback(
    (code: string) => {
      setSelectedLanguages((prev) => {
        const lowerCode = code.toLowerCase();
        if (prev.some((c) => c.toLowerCase() === lowerCode)) {
          return prev.filter((c) => c.toLowerCase() !== lowerCode);
        }
        if (!isUnlimited && prev.length >= MAX_LANGUAGES) return prev;
        return [...prev, lowerCode];
      });
    },
    [MAX_LANGUAGES, isUnlimited],
  );

  const handleAdd = async () => {
    if (addon) {
      try {
        const selectedLanguageCodes = selectedLanguages.map((l) =>
          l.toLowerCase(),
        );

        await updatePreferences(selectedLanguageCodes);
        onAdd({ ...addon, selectedLanguages }, selectedLanguages.length);
        onClose();
        setSelectedLanguages([]);
        setSearchQuery("");
      } catch (err) {
        console.error("Failed to update preferences", err);
      }
    }
  };

  const totalPrice = (addon?.price || 0) * selectedLanguages.length;

  return {
    searchQuery,
    setSearchQuery,
    selectedLanguages,
    filteredLanguages,
    toggleLanguage,
    handleAdd,
    totalPrice,
    maxLimitReached: !isUnlimited && selectedLanguages.length >= MAX_LANGUAGES,
    selectedCount: selectedLanguages.length,
    MAX_LANGUAGES,
    isUnlimited,
    isLoading,
    error,
    refetch,
    isEmpty: !isLoading && !error && filteredLanguages.length === 0,
  };
};
