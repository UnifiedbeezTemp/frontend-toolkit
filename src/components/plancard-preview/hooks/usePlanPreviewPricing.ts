import { useMemo } from "react";
import { Plan } from "../../../api/services/plan/types";
import { Addon } from "../../../store/onboarding/types/addonTypes";

interface UsePlanPreviewPricingProps {
  plan: Plan | null;
  addons?: Addon[];
  monthlyPrice: number;
  isYearly?: boolean;
  bulkSeatsMonthlyTotal?: number;
}

export const usePlanPreviewPricing = ({
  plan,
  addons,
  monthlyPrice,
  isYearly = false,
  bulkSeatsMonthlyTotal = 0,
}: UsePlanPreviewPricingProps) => {
  const addonsTotal = useMemo(() => {
    const monthlyTotal = (addons || []).reduce((total, addon) => {
      return total + addon.price * (addon.used || 1);
    }, 0);

    const combinedMonthlyTotal = monthlyTotal + bulkSeatsMonthlyTotal;
    return isYearly ? combinedMonthlyTotal * 12 : combinedMonthlyTotal;
  }, [addons, isYearly, bulkSeatsMonthlyTotal]);

  const yearlyPriceEur = plan?.originalPlan?.yearlyPriceEur;

  const displayPrice = isYearly
    ? yearlyPriceEur
      ? yearlyPriceEur
      : Math.floor(monthlyPrice * 12 * 0.85)
    : monthlyPrice;

  const totalPrice = displayPrice + addonsTotal;

  return {
    addonsTotal,
    displayPrice,
    totalPrice,
  };
};
