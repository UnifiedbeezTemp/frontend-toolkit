"use client";

import { useSearchParams } from "next/navigation";
import { getPlanById } from "../../../data/plansData";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

export const useCheckoutPlan = () => {
  const icons = useSupabaseIcons();
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");
  const isYearly = searchParams.get("isYearly") === "true";

  const plan = planId ? getPlanById(icons, planId) : null;

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