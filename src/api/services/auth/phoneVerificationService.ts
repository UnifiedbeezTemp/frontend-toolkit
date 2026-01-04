import { api } from "../../index";
import { PhoneOTPPayload } from ".";
import { VerificationResponseData } from "./types";

export const phoneVerificationService = {
  async verifyPhone(
    payload: PhoneOTPPayload
  ): Promise<VerificationResponseData> {
    return await api.post("/auth/phone/verify/", payload);
  },

  async resendPhoneOTP(phone: string): Promise<VerificationResponseData> {
    return await api.post("/auth/phone/resend-verification", { phone });
  },
};
