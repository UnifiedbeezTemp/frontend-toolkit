import { authBaseUrl } from "../../rootUrls";
import { AuthError } from "./error";
import {
  AuthResponse,
  ConfirmResetPasswordPayload,
  PasswordResetResponseData,
  ResetPasswordPayload,
} from "./types";

export const passwordService = {
  async requestPasswordReset(
    payload: ResetPasswordPayload
  ): Promise<AuthResponse<PasswordResetResponseData>> {
    const response = await fetch(`${authBaseUrl}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    let responseData: PasswordResetResponseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      responseData = { message: responseText || "Unknown error occurred" };
    }

    if (!response.ok) {
      const errorMessage =
        (responseData as any)?.message?.message ||
        (responseData as any)?.message ||
        (responseData as any)?.error ||
        "Password reset request failed";
      throw new AuthError(errorMessage, response.status, responseData);
    }

    return {
      data: responseData,
      status: response.status,
      ok: response.ok,
    };
  },

  async confirmPasswordReset(
    payload: ConfirmResetPasswordPayload
  ): Promise<AuthResponse<PasswordResetResponseData>> {
    const response = await fetch(`${authBaseUrl}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    let responseData: PasswordResetResponseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      responseData = { message: responseText || "Unknown error occurred" };
    }

    if (!response.ok) {
      const errorMessage =
        (responseData as any)?.message?.message ||
        (responseData as any)?.message ||
        (responseData as any)?.error ||
        "Password reset failed";
      throw new AuthError(errorMessage, response.status, responseData);
    }

    return {
      data: responseData,
      status: response.status,
      ok: response.ok,
    };
  },
};
