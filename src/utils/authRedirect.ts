import { UserProfile } from "../types/userProfileTypes";
import { getSetupRoute } from "./setupRoutes";
import {
  getNextStepAfterHighest,
  isAllOnboardingCompleted,
} from "./completedOnboardingSteps";

export function getOnboardingRedirect(user: UserProfile | null) {
  if (!user) return "/auth/signin";

  const completedSteps = user.completedOnboardingSteps || [];

  if (isAllOnboardingCompleted(completedSteps)) {
    const beehiveUrl = process.env.NEXT_PUBLIC_BEEHIVE_URL;
    return `${beehiveUrl}/get-started` || "/";
  }

  if (completedSteps.length === 0) {
    return "/account-setup";
  }

  const nextStep = getNextStepAfterHighest(completedSteps);
  return getSetupRoute(nextStep);
}
