import { useState, useCallback, useMemo } from "react";
import { useMultiLanguage } from "../../hooks/useMultiLanguage";
import { extractErrorMessage } from "../../../../utils";
import { useToast } from "../../../ui/toast/ToastProvider";
import { Addon } from "../../../../store/onboarding/types/addonTypes";

interface UseAddAddonModalProps {
  onAdd: () => void;
  addon: Addon | null;
  currentQuantity: number;
}

export const useAddAddonModal = ({
  onAdd,
  addon,
  currentQuantity,
}: UseAddAddonModalProps) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const { updatePreferences, isLoading: isUpdatingPreferences } =
    useMultiLanguage();
  const { showToast } = useToast();

  const isMultiLanguage = addon?.addonType === "MULTI_LANGUAGE_AI";
  const purchasedQuantity = addon?.used || 0;
  const delta = useMemo(
    () => Math.max(0, currentQuantity - purchasedQuantity),
    [currentQuantity, purchasedQuantity],
  );

  const isLanguageSelectionIncomplete = useMemo(
    () => isMultiLanguage && delta > 0 && selectedLanguages.length !== delta,
    [isMultiLanguage, delta, selectedLanguages.length],
  );

  const handleConfirmAdd = useCallback(async () => {
    if (isMultiLanguage) {
      if (selectedLanguages.length !== delta && delta > 0) {
        return;
      }
      try {
        const lowercaseLanguages = selectedLanguages.map((l) =>
          l.toLowerCase(),
        );
        await updatePreferences(lowercaseLanguages);
        onAdd();
      } catch (error) {
        console.error("Failed to update prefs", error);
        showToast({
          title: "Update failed",
          description: extractErrorMessage(
            error,
            "Failed to update language preferences.",
          ),
          variant: "error",
        });
      }
    } else {
      onAdd();
    }
  }, [
    isMultiLanguage,
    selectedLanguages,
    delta,
    updatePreferences,
    onAdd,
    showToast,
  ]);

  return {
    selectedLanguages,
    setSelectedLanguages,
    handleConfirmAdd,
    isUpdatingPreferences,
    isMultiLanguage,
    delta,
    isLanguageSelectionIncomplete,
  };
};
