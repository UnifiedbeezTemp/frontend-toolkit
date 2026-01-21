import { Plan } from "../../../../api/services/plan/types";

import { formatPriceFromCents, calculateBillingCyclePrice } from "../../../../utils/priceUtils";

export const useCollapsiblePlanCard = (plan: Plan, isYearly: boolean) => {
  const displayPrice = calculateBillingCyclePrice(
    formatPriceFromCents(plan.monthlyPrice),
    isYearly
  );

  return {
    displayPrice,
  };
};
