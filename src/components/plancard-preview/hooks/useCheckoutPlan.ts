"use client";

import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { OriginalPlan } from "../../../api/services/plan/types";
import { getPlanByType } from "../../../data/plansData";

export const useCheckoutPlan = ({
  backendPlan,
  isYearly,
}: {
  backendPlan: OriginalPlan | null;
  isYearly: boolean;
}) => {
  const icons = useSupabaseIcons();
  const plan = backendPlan ? getPlanByType(backendPlan, icons) : null;

  const calculatePrice = (monthlyPrice: number) => {
    return isYearly ? Math.floor(monthlyPrice * 12 * 0.85) : monthlyPrice;
  };

  const displayPrice = plan ? calculatePrice(plan.monthlyPrice) : 0;

  return {
    plan,
    isYearly,
    displayPrice,
  };
};
