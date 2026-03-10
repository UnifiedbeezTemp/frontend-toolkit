import { api } from "../../index";
import {
  PaymentMethodData,
  PaymentMethodResponse,
  StartTrialPayload,
  TrialResponseData,
} from "./types";

export const trialService = {
  async confirmTrialStart(
    payload: StartTrialPayload,
  ): Promise<TrialResponseData> {
    return await api.post("/auth/setup/trial", payload);
  },

  async attachPaymentMethod(
    paymentMethodId: string,
  ): Promise<{ success: boolean; message: string }> {
    return await api.post("/auth/payment/attach", {
      payment_method_id: paymentMethodId,
    });
  },

  async getPaymentMethod(): Promise<PaymentMethodResponse> {
    return await api.get("/payment/payment-method");
  },

  async createSetupIntent(): Promise<{
    client_secret: string;
    customer_id: string;
  }> {
    return await api.post("/payment/create-setup-intent", {});
  },

  async updatePaymentMethod(
    paymentMethodId: string,
  ): Promise<PaymentMethodData> {
    return await api.post("/payment/update-payment-method", {
      payment_method_id: paymentMethodId,
    });
  },

  async switchPlan(
    planType: string,
    billingInterval: "MONTHLY" | "YEARLY",
  ): Promise<{ message: string; pendingSwitch: boolean }> {
    return await api.post("/plan/switch", {
      planType: planType.toUpperCase(),
      billingInterval,
    });
  },
};
