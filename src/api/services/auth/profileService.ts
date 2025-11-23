import { createEmptyUser, UserProfile } from "../../../types/userProfileTypes";
import { authBaseUrl } from "../../rootUrls";
import { AuthError } from "./error";
import { AuthResponse } from "./types";

export const profileService = {
  async getProfile(): Promise<AuthResponse<UserProfile | null>> {
    const response = await fetch(`${authBaseUrl}/profile`, {
      method: "GET",
      credentials: "include",
    });

    const responseText = await response.text();

    let responseData: UserProfile;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      responseData = createEmptyUser();
    }

    if (!response.ok) {
      throw new AuthError("Failed to fetch user profile", response.status);
    }

    return {
      data: responseData,
      status: response.status,
      ok: response.ok,
    };
  },

  async logout(): Promise<AuthResponse<{ message: string }>> {
    const response = await fetch(`${authBaseUrl}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const responseText = await response.text();

    let responseData: { message: string };
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      responseData = { message: responseText || "Unknown error occurred" };
    }

    if (!response.ok) {
      throw new AuthError("Logout failed", response.status, responseData);
    }

    return {
      data: responseData,
      status: response.status,
      ok: response.ok,
    };
  },
};
