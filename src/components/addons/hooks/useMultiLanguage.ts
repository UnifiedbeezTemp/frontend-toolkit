import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { addonService } from "../../../api/services/addon/addonService";
import { useToast } from "../../ui/toast/ToastProvider";
import { usePurchasedAddons } from "../../plancard-preview/hooks/usePurchasedAddons";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

export const useMultiLanguage = () => {
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [maxAllowed, setMaxAllowed] = useState<string | number>(10);
  const [purchasedCount, setPurchasedCount] = useState<number>(0);
  const [canPurchase, setCanPurchase] = useState<boolean>(true);
  const [cancellingInstanceId, setCancellingInstanceId] = useState<
    number | null
  >(null);

  const { showToast } = useToast();
  const { refetch: refetchPurchased } = usePurchasedAddons();

  const fetchAvailableLanguages = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await addonService.getAvailableLanguages();
      setAvailableLanguages(response.languages.map((l) => l.code));
    } catch (err) {
      console.error("Failed to fetch available languages", err);
      setError("Failed to load available languages. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPreferences = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await addonService.getMultiLanguagePreferences();
      if (response.languages) {
        setSelectedLanguages(response.languages);
      }
      setMaxAllowed(response.maxAllowed);
      setPurchasedCount(response.purchasedCount);
      setCanPurchase(response.canPurchase);
    } catch (err) {
      console.error("Failed to fetch language preferences", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePreferences = useCallback(
    async (languagesList: string[]) => {
      try {
        setIsLoading(true);
        const response =
          await addonService.updateMultiLanguagePreferences(languagesList);

        // Fetch everything again to ensure selectedLanguages and purchasedCount are perfectly in sync
        await fetchPreferences();

        showToast({
          title: "Preferences updated",
          description: "Your language preferences have been saved.",
          variant: "success",
        });
      } catch (err) {
        console.error("Failed to update language preferences", err);

        showToast({
          title: "Update failed",
          description: extractErrorMessage(
            err,
            "Failed to update language preferences.",
          ),
          variant: "error",
        });
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [showToast, fetchPreferences],
  );

  const cancelInstance = useCallback(
    async (userAddonId: number) => {
      try {
        setCancellingInstanceId(userAddonId);
        setIsLoading(true);
        await addonService.cancelAddonInstance(
          "MULTI_LANGUAGE_AI",
          userAddonId,
        );

        await refetchPurchased();
        await fetchPreferences();

        showToast({
          title: "Language cancelled",
          description:
            "The language instance has been scheduled for cancellation.",
          variant: "success",
        });
      } catch (err) {
        console.error("Failed to cancel language instance", err);

        showToast({
          title: "Cancellation failed",
          description: extractErrorMessage(
            err,
            "Failed to cancel language instance.",
          ),
          variant: "error",
        });
      } finally {
        setIsLoading(false);
        setCancellingInstanceId(null);
      }
    },
    [refetchPurchased, fetchPreferences, showToast],
  );

  const refetch = useCallback(() => {
    fetchAvailableLanguages();
    fetchPreferences();
  }, [fetchAvailableLanguages, fetchPreferences]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    availableLanguages,
    selectedLanguages,
    maxAllowed,
    purchasedCount,
    canPurchase,
    isLoading,
    error,
    refetch,
    updatePreferences,
    cancelInstance,
    cancellingInstanceId,
  };
};
