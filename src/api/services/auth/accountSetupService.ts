import { api } from "../../index";
import {
  AccountSetupFormData,
  PhoneVerificationResponse,
  PhotoUploadResponse,
  ProfileSetupResponse,
  UpdateOnboardingMethodPayload,
  UpdateOnboardingMethodResponse,
} from ".";

export const accountSetupService = {
  async setupProfile(
    data: AccountSetupFormData
  ): Promise<ProfileSetupResponse> {
    return await api.patch("/auth/setup/profile", data);
  },

  async uploadProfilePhoto(file: File): Promise<PhotoUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);
    return await api.post("/auth/profile/photo", formData);
  },

  async initiatePhoneVerification(
    phone: string
  ): Promise<PhoneVerificationResponse> {
    return await api.post("/auth/phone/send-verification", { phone });
  },

  async selectPlan(planType: string): Promise<ProfileSetupResponse> {
    return await api.post("/auth/setup/plan", {
      planType: planType.toUpperCase(),
    });
  },

  async updateOnboardingMethod(
    data: UpdateOnboardingMethodPayload
  ): Promise<UpdateOnboardingMethodResponse> {
    return await api.patch("/auth/onboarding/method", data);
  },
};
