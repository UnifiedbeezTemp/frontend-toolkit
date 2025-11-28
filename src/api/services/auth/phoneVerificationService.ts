import { UserProfile } from "../../../types/userProfileTypes";
import { authBaseUrl } from "../../rootUrls";
import { PhoneOTPPayload, AuthResponse, AuthError } from ".";
import { VerificationResponseData } from "./types";

export const phoneVerificationService = {
  async verifyPhone(
    payload: PhoneOTPPayload
  ): Promise<AuthResponse<VerificationResponseData>> {
    const response = await fetch(`${authBaseUrl}/phone/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    let responseData: VerificationResponseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      responseData = {
        message: responseText || "Unknown error occurred",
        user: {} as UserProfile,
      };
    }

    // console.log(responseData);

    if (!response.ok) {
      const errorMessage =
        (responseData as VerificationResponseData)?.message ||
        "Verification failed";
      throw new AuthError(errorMessage, response.status, responseData);
    }

    return {
      data: responseData,
      status: response.status,
      ok: response.ok,
    };
  },

  async resendPhoneOTP(
    phone: string
  ): Promise<AuthResponse<VerificationResponseData>> {
    const response = await fetch(`${authBaseUrl}/phone/resend-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ phone }),
    });

    const responseText = await response.text();

    // console.log(responseText)
    let responseData: VerificationResponseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      responseData = {
        message: responseText || "Unknown error occurred",
        user: {} as UserProfile,
      };
    }

    if (!response.ok) {
      const errorMessage =
        (responseData as VerificationResponseData)?.message ||
        "Failed to resend code";
      throw new AuthError(errorMessage, response.status, responseData);
    }

    return {
      data: responseData,
      status: response.status,
      ok: response.ok,
    };
  },
};
