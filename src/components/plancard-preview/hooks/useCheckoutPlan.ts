"use client";

import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { OriginalPlan } from "../../../api/services/plan/types";
import { getPlanByType } from "../../../data/plansData";

import {
  formatPriceRaw,
  calculateBillingCyclePrice,
} from "../../../utils/priceUtils";

export const useCheckoutPlan = ({
  backendPlan,
  isYearly,
}: {
  backendPlan: OriginalPlan | null;
  isYearly: boolean;
}) => {
  const icons = useSupabaseIcons();
  const plan = backendPlan ? getPlanByType(backendPlan, icons) : null;

  const monthlyPrice = plan ? formatPriceRaw(plan.monthlyPrice) : 0;
  const displayPrice = calculateBillingCyclePrice(monthlyPrice, isYearly);

  return {
    plan,
    isYearly,
    monthlyPrice,
    displayPrice,
  };
};
