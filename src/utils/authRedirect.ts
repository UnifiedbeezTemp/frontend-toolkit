import { UserProfile } from "../types/userProfileTypes";
import { getSetupRoute } from "./setupRoutes";
import { getNextStepAfterHighest } from "./completedOnboardingSteps";

export function getOnboardingRedirect(user: UserProfile | null) {
  if (!user) return "/auth/signin";

  const completedSteps = user.completedOnboardingSteps || [];

  if (completedSteps.length === 0) {
    return "/account-setup";
  }

  const nextStep = getNextStepAfterHighest(completedSteps);
  return getSetupRoute(nextStep);
}
