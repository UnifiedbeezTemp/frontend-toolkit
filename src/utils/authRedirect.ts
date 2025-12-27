import { UserProfile } from "../types/userProfileTypes";
import { getSetupRoute } from "./setupRoutes";
import {
  getHighestCompletedStep,
  getNextStepAfterHighest,
  TOTAL_ONBOARDING_STEPS,
} from "./completedOnboardingSteps";

export function getOnboardingRedirect(user: UserProfile | null) {
  if (!user) return "/auth/signin";

  const completedSteps = user.completedOnboardingSteps || [];
  const highest = getHighestCompletedStep(completedSteps);
  const nextStep = getNextStepAfterHighest(completedSteps);

  if (highest >= TOTAL_ONBOARDING_STEPS || nextStep > TOTAL_ONBOARDING_STEPS) {
    const beehiveUrl = process.env.NEXT_PUBLIC_BEEHIVE_URL;
    return beehiveUrl ? `${beehiveUrl}/get-started` : "/";
  }

  if (completedSteps.length === 0) {
    return "/account-setup";
  }

  return getSetupRoute(nextStep);
}
