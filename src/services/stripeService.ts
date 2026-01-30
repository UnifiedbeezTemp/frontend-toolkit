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
  return `${apiBaseUrl}/channels/stripe/auth`;
};

export const initiateStripeAuth = (): void => {
  window.location.href = getStripeAuthUrl();
};
