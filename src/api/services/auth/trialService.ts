import { api } from "../../index";
import { StartTrialPayload, TrialResponseData } from "./types";

export const trialService = {
  async confirmTrialStart(
    payload: StartTrialPayload
  ): Promise<TrialResponseData> {
    return await api.post("/auth/setup/trial", payload);
  },

  async attachPaymentMethod(
    paymentMethodId: string
  ): Promise<{ success: boolean; message: string }> {
    return await api.post("/auth/payment/attach", {
      payment_method_id: paymentMethodId,
    });
  },
};
