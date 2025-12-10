import { UserProfile } from "../types/userProfileTypes";

export function getOnboardingRedirect(user: UserProfile | null) {
  if (!user) return "/auth/signin";

  const step = user.onboardingStep ?? 0;

  if (step === 0) {
    return "/account-setup";
  }

  return `/setup?step=${step}`;
}
