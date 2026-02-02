import { api } from "../api";
import { apiBaseUrl } from "../api/rootUrls";

export interface PayPalConnectResponse {
  success: boolean;
  channel?: {
    id: number;
    email?: string;
    isActive: boolean;
    connectedAt: string;
  };
  message?: string;
}

export const getPayPalAuthUrl = (): string => {
  return `${apiBaseUrl}/channels/paypal/auth`;
};

export const initiatePayPalAuth = (): void => {
  window.location.href = getPayPalAuthUrl();
};

export const disconnectPayPalAccount = (accountId: number) => {
  return api.post<
    { accountId: number },
    { success: boolean; message?: string }
  >(`/channels/paypal/disconnect`, { accountId });
};
