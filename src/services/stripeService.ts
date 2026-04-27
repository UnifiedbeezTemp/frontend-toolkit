import { api } from "../api";
import { apiBaseUrl } from "../api/rootUrls";

export interface StripeConnectResponse {
  success: boolean;
  channel?: {
    id: number;
    email?: string;
    isActive: boolean;
    connectedAt: string;
  };
  message?: string;
}

export const getStripeAuthUrl = (): string => {
  const currentPath = window.location.pathname + window.location.search;
  return `${apiBaseUrl}/channels/stripe/auth?redirect_path=${encodeURIComponent(currentPath)}`;
};

export const initiateStripeAuth = (): void => {
  window.location.href = getStripeAuthUrl();
};

export const disconnectStripeAccount = async (
  accountId: number,
): Promise<{ success: boolean; message?: string }> => {
  return api.post<
    { accountId: number },
    { success: boolean; message?: string }
  >(`/channels/stripe/disconnect`, { accountId });
};
