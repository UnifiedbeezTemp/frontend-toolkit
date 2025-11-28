import { UserProfile } from "../../../types/userProfileTypes";
import { authBaseUrl } from "../../rootUrls";
import { AuthError } from "./error";
import { AuthPayload, AuthResponse, SignupResponseData } from "./types";

export const signupService = {
  async signup(
    payload: AuthPayload
  ): Promise<AuthResponse<SignupResponseData>> {
    const response = await fetch(`${authBaseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    let responseData: SignupResponseData;
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
        (responseData as SignupResponseData)?.message || "Signup failed";
      throw new AuthError(errorMessage, response.status, responseData);
    }

    return {
      data: responseData,
      status: response.status,
      ok: response.ok,
    };
  },
};
