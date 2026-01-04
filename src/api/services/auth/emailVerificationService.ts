import { api } from "../../index";
import { OTPPayload, VerificationResponseData } from "./types";

export const emailVerificationService = {
  async verifyEmail(payload: OTPPayload): Promise<VerificationResponseData> {
    return await api.post("/auth/verify-email", payload);
  },

  async resendOTP(email: string): Promise<VerificationResponseData> {
    return await api.post("/auth/resend-verification", { email });
  },
};
