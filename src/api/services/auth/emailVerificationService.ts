import { authBaseUrl } from "../../rootUrls";
import { AuthResponse, OTPPayload, VerificationResponseData } from "./types";
import { UserProfile } from "../../../types/userProfileTypes";
import { AuthError } from "./error";

export const emailVerificationService = {
  async verifyEmail(
    payload: OTPPayload
  ): Promise<AuthResponse<VerificationResponseData>> {
    const response = await fetch(`${authBaseUrl}/verify-email`, {
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

    console.log(responseData);

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

  async resendOTP(
    email: string
  ): Promise<AuthResponse<VerificationResponseData>> {
    const response = await fetch(`${authBaseUrl}/resend-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
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
