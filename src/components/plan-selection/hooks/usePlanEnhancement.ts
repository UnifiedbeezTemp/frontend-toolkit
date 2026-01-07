import { useEffect } from "react";
import { Plan } from "../../../api/services/plan/types";

const PLAN_HIERARCHY = ["individual", "business", "premium", "organisation"];

const getPlanTier = (planType: string): number => {
  const normalizedType = planType.toLowerCase();
  return PLAN_HIERARCHY.indexOf(normalizedType);
};

const getCtaText = (plan: Plan, userPlanType: string | undefined): string => {
  if (plan.id === "organisation") {
    return "Talk to Sales";
  }

  if (!userPlanType) {
    return plan.ctaText;
  }

  const userTier = getPlanTier(userPlanType);
  const planTier = getPlanTier(plan.id);

  if (userTier === planTier) {
    return "Current Plan";
  }

  if (planTier > userTier) {
    return `Upgrade to ${plan.title}`;
  }

  return `Downgrade to ${plan.title}`;
};

export const usePlanEnhancement = (
  plans: Plan[],
  userPlan: string | undefined,
  selectedPlan: string | null,
  setSelectedPlan: (plan: string) => void
) => {
  useEffect(() => {
    if (userPlan && plans.length > 0 && !selectedPlan) {
      const userPlanType = userPlan.toLowerCase();
      const matchingPlan = plans.find(
        (p) => p.originalPlan.planType.toLowerCase() === userPlanType
      );
      if (matchingPlan) {
        setSelectedPlan(matchingPlan.id);
      }
    }
  }, [userPlan, plans, selectedPlan, setSelectedPlan]);

  const enhancedPlans = plans.map((plan) => ({
    ...plan,
    ctaText: getCtaText(plan, userPlan),
  }));

  return { enhancedPlans };
};
