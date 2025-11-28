import { authBaseUrl } from "../../rootUrls";
import { AuthError } from "./error";
import { StartTrialPayload, AuthResponse, TrialResponseData } from "./types";

export const trialService = {
  async confirmTrialStart(
    payload: StartTrialPayload
  ): Promise<AuthResponse<TrialResponseData>> {
    const response = await fetch(`${authBaseUrl}/setup/trial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    let responseData: TrialResponseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      responseData = {
        message: responseText || "Unknown error occurred",
        trialEndsAt: "",
        clientSecret: "",
        customerId: "",
      };
    }

    if (!response.ok) {
      const errorMessage =
        (responseData as TrialResponseData)?.message || "Trial setup failed";
      throw new AuthError(errorMessage, response.status, responseData);
    }

    return {
      data: responseData,
      status: response.status,
      ok: response.ok,
    };
  },

  async attachPaymentMethod(
    paymentMethodId: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${authBaseUrl}/payment/attach`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ payment_method_id: paymentMethodId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to attach payment method");
    }

    return data;
  },
};
