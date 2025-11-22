import { authBaseUrl } from "../../rootUrls";
import { OTPPayload, AuthResponse, AuthError } from "./authServices";
import { VerificationResponseData } from "./types";

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
        user: {} as any,
      };
    }

    console.log(responseData)

    if (!response.ok) {
      const errorMessage =
        (responseData as any)?.message?.message ||
        (responseData as any)?.message ||
        (responseData as any)?.error ||
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
        user: {} as any,
      };
    }

    if (!response.ok) {
      const errorMessage =
        (responseData as any)?.message?.message ||
        (responseData as any)?.message ||
        (responseData as any)?.error ||
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
