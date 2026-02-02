import { Plan } from "../../../../api/services/plan/types";

import { calculateBillingCyclePrice } from "../../../../utils/priceUtils";

export const useCollapsiblePlanCard = (plan: Plan, isYearly: boolean) => {
  const displayPrice = calculateBillingCyclePrice(
    plan.monthlyPrice,
    isYearly
  );

  return {
    displayPrice,
  };
};
