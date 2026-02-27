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
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";

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
  const { purchasedAddons, refetch: refetchPurchased } = usePurchasedAddons();

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

  const { user } = useUser();
  const hasTrialInfo = !!user?.paymentMethod;

  const handleConfirmPurchase = useCallback(async () => {
    if (selectedAddons.length === 0) return;

    if (!hasTrialInfo) {
      try {
        sessionStorage.setItem(
          "unifiedbeez_checkout_addons",
          JSON.stringify(selectedAddons),
        );
        router.push("/checkout?fromAddons=true");
        handleCloseCheckoutModal();
      } catch (e) {
        console.error("Failed to store addons in session storage", e);
        showToast({
          title: "Error",
          description: "An error occurred. Please try again.",
          variant: "error",
        });
      }
      return;
    }

    // Change detection for existing users
    const currentPurchases = purchasedAddons.map((a) => ({
      type: a.addonType,
      qty: a.used || 1,
    }));
    const nextPurchases = selectedAddons.map((a) => ({
      type: a.addonType,
      qty: a.used || 1,
    }));

    const hasChanged =
      currentPurchases.length !== nextPurchases.length ||
      nextPurchases.some((next) => {
        const current = currentPurchases.find((c) => c.type === next.type);
        return !current || current.qty !== next.qty;
      });

    if (!hasChanged) {
      handleCloseCheckoutModal();
      router.back();
      return;
    }

    setIsPurchasing(true);

    try {
      const purchases = selectedAddons
        .map((addon) => {
          const type =
            addon.addonType ||
            availableAddons.find((a) => a.id === addon.id)?.addonType;

          const purchasedAddon = purchasedAddons.find((a) => a.id === addon.id);
          const purchasedQuantity = purchasedAddon?.used || 0;
          const delta = (addon.used || 1) - purchasedQuantity;

          return {
            addonType: type,
            quantity: delta,
          };
        })
        .filter(
          (p): p is { addonType: string; quantity: number } =>
            Boolean(p.addonType) && p.quantity > 0,
        );

      if (purchases.length === 0) {
        showToast({
          title: "No changes detected",
          description: "You haven't increased any add-on quantities.",
          variant: "error",
        });
        setIsPurchasing(false);
        return;
      }

      const payload: PurchaseBatchPayload = { purchases };
      await addonService.purchaseBatch(payload);

      refetchUser();
      refetchPurchased();

      showToast({
        title: "Add-ons updated!",
        description:
          "Your add-ons have been updated and synced with your billing cycle.",
        variant: "success",
      });

      sessionStorage.removeItem("unifiedbeez_checkout_addons");
      handleCloseCheckoutModal();
      router.back();
    } catch (error) {
      console.error("Update failed", error);
      showToast({
        title: "Update failed",
        description: extractErrorMessage(error, "Something went wrong."),
        variant: "error",
      });
    } finally {
      setIsPurchasing(false);
    }
  }, [
    selectedAddons,
    purchasedAddons,
    availableAddons,
    handleCloseCheckoutModal,
    router,
    showToast,
    refetchUser,
    refetchPurchased,
    hasTrialInfo,
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
    hasTrialInfo,
  };
};
