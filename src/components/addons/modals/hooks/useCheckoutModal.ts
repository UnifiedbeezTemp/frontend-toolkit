import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useAddonsPage } from "../../hooks/useAddonsPage";
import { Addon } from "../../../../store/onboarding/types/addonTypes";
import { usePlan } from "../../../../api/services/plan/hooks/usePlan";
import { useCheckoutPlan } from "../../../plancard-preview/hooks/useCheckoutPlan";

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

  const { handleCloseCheckoutModal } = useAddonsPage();

  const { plan: backendPlan } = usePlan({ planType });
  const { displayPrice: planFee } = useCheckoutPlan({
    backendPlan,
    isYearly,
  });

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

  const handleProceedToPayment = useCallback(() => {
    router.push("/checkout");
    handleCloseCheckoutModal();
  }, [handleCloseCheckoutModal, router]);

  return {
    calculateAddonPrice,
    planFee,
    subtotalAddons,
    subtotal,
    vat,
    total,
    hasLimitReachedAddons,
    handleProceedToPayment,
  };
};
