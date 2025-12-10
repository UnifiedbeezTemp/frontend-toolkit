import { authBaseUrl } from "../../rootUrls";
import { AuthError } from "./error";
import { AuthPayload, AuthResponse, LoginResponseData } from "./types";

export const loginService = {
  async signIn(payload: AuthPayload): Promise<AuthResponse<LoginResponseData>> {
    // const response = await fetch(`${authBaseUrl}/test/delete-user`, {
    const response = await fetch(`${authBaseUrl}/login`, {
      // method: "DELETE",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    let responseData: LoginResponseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      responseData = {
        token: "",
        user: null,
        message: "",
      };
    }


    if (!response.ok) {
      const errorMessage =
        (responseData as LoginResponseData)?.message ||
        "Sign in failed";
      throw new AuthError(errorMessage, response.status);
    }

    return {
      data: responseData,
      status: response.status,
      ok: response.ok,
    };
  },
};
