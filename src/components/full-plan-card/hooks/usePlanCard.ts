import { useState } from "react";
import { Plan } from "../../../data/plansData";

export const usePlanCard = (plan: Plan, isYearly: boolean) => {
  const [showFeatures, setShowFeatures] = useState(false);

  const calculatePrice = (monthlyPrice: number) => {
    return isYearly ? Math.floor(monthlyPrice * 12 * 0.85) : monthlyPrice;
  };

  const displayPrice = calculatePrice(plan.monthlyPrice);

  const toggleFeatures = () => setShowFeatures(!showFeatures);

  return {
    showFeatures,
    displayPrice,
    toggleFeatures,
  };
};
