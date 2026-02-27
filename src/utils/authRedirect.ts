import { UserProfile } from "../types/userProfileTypes";
import { getSetupRoute } from "./setupRoutes";
import {
  getHighestCompletedStep,
  getNextStepAfterHighest,
  TOTAL_ONBOARDING_STEPS,
} from "./completedOnboardingSteps";

function getReturnToUrl(): string | null {
  if (typeof window === "undefined") return null;

  const searchParams = new URLSearchParams(window.location.search);
  const returnTo = searchParams.get("returnTo");

  if (!returnTo) return null;

  try {
    const decodedUrl = decodeURIComponent(returnTo);

    return decodedUrl;
  } catch (error) {
    return null;
  }
}

export function getOnboardingRedirect(user: UserProfile | null) {
  if (!user) return "/auth/signin";

  const returnToUrl = getReturnToUrl();
  if (returnToUrl) {
    return returnToUrl;
  }

  const completedSteps = user.completedOnboardingSteps || [];
  const highest = getHighestCompletedStep(completedSteps);
  const nextStep = getNextStepAfterHighest(completedSteps);

  if (highest >= TOTAL_ONBOARDING_STEPS || nextStep > TOTAL_ONBOARDING_STEPS) {
    const beehiveUrl = process.env.NEXT_PUBLIC_BEEHIVE_URL;
    return beehiveUrl ? `${beehiveUrl}/get-started` : "/";
  }

  if (completedSteps.length === 0) {
    if (user.paymentMethod) {
      return "/";
    }
    return "/auth/account-setup";
  }

  return getSetupRoute(nextStep);
}
