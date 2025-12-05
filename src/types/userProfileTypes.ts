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
  onboardingStep: number;
  planFeatures: { maxAiAssistants: number };
}

export const createEmptyUser = () => {
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
    onboardingStep: 0,
  };
};
