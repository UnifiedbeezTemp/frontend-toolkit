import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useAddonsPage } from "../../hooks/useAddonsPage";
import { Addon } from "../../../../store/onboarding/types/addonTypes";
import { usePlan } from "../../../../api/services/plan/hooks/usePlan";
import { useCheckoutPlan } from "../../../plancard-preview/hooks/useCheckoutPlan";
import {
  addonService,
  PurchaseBatchPayload,
} from "../../../../api/services/addon/addonService";
import { useToast } from "../../../ui/toast/ToastProvider";
import { useUser } from "../../../../contexts/UserContext";
import { usePurchasedAddons } from "../../../plancard-preview/hooks/usePurchasedAddons";

interface UseCheckoutModalProps {
  selectedAddons: Addon[];
  planType: string | undefined;
  isYearly: boolean;
}

export const useCheckoutModal = ({
  selectedAddons,
  planType,
  isYearly,
}: UseCheckoutModalProps) => {
  const VAT_RATE = 0.02;
  const router = useRouter();
  const { showToast } = useToast();
  const { refetch: refetchUser } = useUser();
  const { refetch: refetchPurchased } = usePurchasedAddons();

  const { handleCloseCheckoutModal } = useAddonsPage();

  const { plan: backendPlan } = usePlan({ planType });
  const { displayPrice: planFee } = useCheckoutPlan({
    backendPlan,
    isYearly,
  });

  const [isPurchasing, setIsPurchasing] = useState(false);

  const { addons: availableAddons } = useAddonsPage();

  const calculateAddonPrice = useCallback((addon: Addon): number => {
    return addon.price * (addon.used || 1);
  }, []);

  const subtotalAddons = useMemo(() => {
    return selectedAddons?.reduce((total, addon) => {
      return total + calculateAddonPrice(addon);
    }, 0);
  }, [selectedAddons, calculateAddonPrice]);

  const subtotal = useMemo(() => {
    return subtotalAddons + planFee;
  }, [subtotalAddons, planFee]);

  const vat = useMemo(() => {
    return subtotal * VAT_RATE;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + vat;
  }, [subtotal, vat]);

  const hasLimitReachedAddons = useMemo(() => {
    return selectedAddons?.some((addon) => (addon.used || 1) >= addon.limit);
  }, [selectedAddons]);

  const handleConfirmPurchase = useCallback(async () => {
    if (selectedAddons.length === 0) return;

    setIsPurchasing(true);

    try {
      const purchases = selectedAddons
        .map((addon) => {
          const type =
            addon.addonType ||
            availableAddons.find((a) => a.id === addon.id)?.addonType;
          return {
            addonType: type,
            quantity: addon.used || 1,
          };
        })
        .filter((p): p is { addonType: string; quantity: number } =>
          Boolean(p.addonType),
        );

      if (purchases.length === 0) {
        showToast({
          title: "No valid add-ons",
          description: "Could not process the selected add-ons.",
          variant: "error",
        });
        return;
      }

      const payload: PurchaseBatchPayload = { purchases };
      await addonService.purchaseBatch(payload);

      refetchUser();
      refetchPurchased();

      showToast({
        title: "Add-ons purchased!",
        description:
          "Your add-ons have been activated and added to your billing cycle.",
        variant: "success",
      });

      handleCloseCheckoutModal();
      router.back();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      showToast({
        title: "Purchase failed",
        description: errorMessage,
        variant: "error",
      });
    } finally {
      setIsPurchasing(false);
    }
  }, [
    selectedAddons,
    availableAddons,
    handleCloseCheckoutModal,
    router,
    showToast,
    refetchUser,
    refetchPurchased,
  ]);

  return {
    calculateAddonPrice,
    planFee,
    subtotalAddons,
    subtotal,
    vat,
    total,
    hasLimitReachedAddons,
    isPurchasing,
    handleConfirmPurchase,
  };
};
