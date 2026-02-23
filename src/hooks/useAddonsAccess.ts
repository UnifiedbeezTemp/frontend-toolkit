"use client";

import { useUserPlan } from "../api/services/plan/hooks/useUserPlan";
import { useToast } from "../components/ui/toast/useToast";

export const useAddonsAccess = () => {
  const { userPlan } = useUserPlan();
  const { showToast } = useToast();

  const verifyAccess = (targetPlanId?: string) => {
    if (
      targetPlanId &&
      userPlan?.planType?.toLowerCase() !== targetPlanId.toLowerCase()
    ) {
      showToast({
        title: "Access Restricted",
        description: "You can only view addons for your current plan",
        variant: "info",
      });
      return false;
    }
    return true;
  };

  return { verifyAccess, userPlan };
};
