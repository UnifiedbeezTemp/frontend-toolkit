import { useState } from "react";
import { Plan } from "../../../api/services/plan/types";

import {
  formatPriceFromCents,
  calculateBillingCyclePrice,
} from "../../../utils/priceUtils";

export const usePlanCard = (
  plan: Plan,
  isYearly: boolean,
  overridePrice?: number
) => {
  const [showFeatures, setShowFeatures] = useState(false);

  const calculatedPrice = calculateBillingCyclePrice(
    formatPriceFromCents(plan.monthlyPrice),
    isYearly
  );

  const displayPrice =
    overridePrice !== undefined ? overridePrice : calculatedPrice;

  const toggleFeatures = () => setShowFeatures(!showFeatures);

  return {
    showFeatures,
    displayPrice,
    toggleFeatures,
  };
};
