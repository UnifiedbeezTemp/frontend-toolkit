import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAddonsPage } from "../../hooks/useAddonsPage";
import { Addon } from "../../../../store/onboarding/types/addonTypes";

interface UseCheckoutModalProps {
  selectedAddons: Addon[];
  planType: string | undefined;
}

export const useCheckoutModal = ({
  selectedAddons,
  planType,
}: UseCheckoutModalProps) => {
  const VAT_RATE = 0.02;
  const router = useRouter();

  const { handleCloseCheckoutModal } = useAddonsPage();

  const calculateAddonPrice = useCallback((addon: Addon): number => {
    return addon.price * (addon.used || 1);
  }, []);

  const calculateSubtotal = useCallback((): number => {
    return selectedAddons?.reduce((total, addon) => {
      return total + calculateAddonPrice(addon);
    }, 0);
  }, [selectedAddons, calculateAddonPrice]);

  const calculateVAT = useCallback((): number => {
    return calculateSubtotal() * VAT_RATE;
  }, [calculateSubtotal]);

  const calculateTotal = useCallback((): number => {
    return calculateSubtotal() + calculateVAT();
  }, [calculateSubtotal, calculateVAT]);

  const hasLimitReachedAddons = selectedAddons?.some(
    (addon) => (addon.used || 1) >= addon.limit
  );

  const handleProceedToPayment = useCallback(() => {
    router.push("/checkout");
    handleCloseCheckoutModal();
  }, [handleCloseCheckoutModal, router]);

  const subtotal = calculateSubtotal();
  const vat = calculateVAT();
  const total = calculateTotal();

  return {
    calculateAddonPrice,
    subtotal,
    vat,
    total,
    hasLimitReachedAddons,
    handleProceedToPayment,
  };
};
