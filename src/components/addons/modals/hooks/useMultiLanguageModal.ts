"use client";

import { useState, useMemo, useCallback } from "react";
import { languages, Language } from "../../../../data/languages";
import { Addon } from "../../../../store/onboarding/types/addonTypes";

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
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    addon?.selectedLanguages || [],
  );
  const MAX_LANGUAGES = 10;

  // Sync state if addon changes (e.g. when reopening)
  useMemo(() => {
    if (addon?.selectedLanguages) {
      setSelectedLanguages(addon.selectedLanguages);
    } else {
      setSelectedLanguages([]);
    }
  }, [addon?.id, addon?.selectedLanguages]);

  const filteredLanguages = useMemo(() => {
    return languages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const toggleLanguage = useCallback(
    (code: string) => {
      setSelectedLanguages((prev) => {
        if (prev.includes(code)) {
          return prev.filter((c) => c !== code);
        }
        if (prev.length >= MAX_LANGUAGES) return prev;
        return [...prev, code];
      });
    },
    [MAX_LANGUAGES],
  );

  const handleAdd = () => {
    if (addon && selectedLanguages.length > 0) {
      onAdd({ ...addon, selectedLanguages }, selectedLanguages.length);
      onClose();
      // Reset state for next time
      setSelectedLanguages([]);
      setSearchQuery("");
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
    maxLimitReached: selectedLanguages.length >= MAX_LANGUAGES,
    selectedCount: selectedLanguages.length,
    MAX_LANGUAGES,
  };
};
