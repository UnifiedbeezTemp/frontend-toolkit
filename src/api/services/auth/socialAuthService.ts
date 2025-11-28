import { UserProfile } from "../../../types/userProfileTypes";
import { authBaseUrl } from "../../rootUrls";
import { AuthError } from "./error";
import {
  SocialAuthPayload,
  SocialAuthResponse,
  AuthResponseData,
} from "./types";

async function handleResponse(
  response: Response
): Promise<SocialAuthResponse<AuthResponseData>> {
  const responseText = await response.text();

  let responseData: AuthResponseData;
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
      responseData?.message || "Social authentication failed";
    throw new AuthError(errorMessage, response.status, responseData);
  }

  return {
    data: responseData,
    status: response.status,
    ok: response.ok,
  };
}

export const socialAuthService = {
  async signIn(
    payload: SocialAuthPayload
  ): Promise<SocialAuthResponse<AuthResponseData>> {
    const response = await fetch(`${authBaseUrl}/login/social`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  },

  async signUp(
    payload: SocialAuthPayload
  ): Promise<SocialAuthResponse<AuthResponseData>> {
    const response = await fetch(`${authBaseUrl}/signup/social`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  },
};