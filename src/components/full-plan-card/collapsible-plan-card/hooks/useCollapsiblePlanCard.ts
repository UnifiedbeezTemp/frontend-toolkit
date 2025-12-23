import { Plan } from "../../../../api/services/plan/types";

export const useCollapsiblePlanCard = (plan: Plan, isYearly: boolean) => {
  const calculatePrice = (monthlyPrice: number) => {
    return isYearly ? Math.floor(monthlyPrice * 12 * 0.85) : monthlyPrice;
  };

  const displayPrice = calculatePrice(plan.monthlyPrice);

  return {
    displayPrice,
  };
};

