import { authBaseUrl } from "../../rootUrls";
import { AuthPayload, AuthResponse, AuthError } from "./authServices";
import { LoginResponseData } from "./types";

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
      };
    }

    console.log(responseData);

    if (!response.ok) {
      const errorMessage =
        (responseData as any)?.message?.message ||
        (responseData as any)?.message ||
        (responseData as any)?.error ||
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
