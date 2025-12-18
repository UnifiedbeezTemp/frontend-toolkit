import { BusinessObjective } from "./businessObjectiveTypes";
import { BusinessGoal } from "./businessGoalTypes";
import { UserWebsite } from "./websiteTypes";

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  isVerified: boolean;
  profilePhoto: string | null;
  phoneVerified: boolean;
  phone: string;
  plan: string;
  businessName: string;
  completedOnboardingSteps: number[];
  planFeatures: { maxAiAssistants: number; maxSeats?: number };
  industry: string;
  businessObjectives?: BusinessObjective[];
  businessGoals?: BusinessGoal[];
  websites?: UserWebsite[];
  businessOverview?: string;
  businessLogo?: string;
}

export const createEmptyUser = (): UserProfile => {
  return {
    id: "",
    email: "",
    fullName: "",
    phone: "",
    phoneVerified: false,
    profilePhoto: "",
    isVerified: false,
    plan: "",
    businessName: "",
    completedOnboardingSteps: [],
    planFeatures: { maxAiAssistants: 0, maxSeats: 0 },
    industry: ""
  };
};
