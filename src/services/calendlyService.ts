import { api } from "../api";
import { apiBaseUrl } from "../api/rootUrls";

export interface CalendlyConnectResponse {
  success: boolean;
  channel?: {
    id: number;
    email: string;
    isActive: boolean;
    connectedAt: string;
  };
  message?: string;
  email?: string;
}

export interface CalendlyConnectRequest {
  authCode: string;
}

export const getCalendlyAuthUrl = (): string => {
  return `${apiBaseUrl}/channels/calendly/auth`;
};

export const initiateCalendlyAuth = (): void => {
  window.location.href = getCalendlyAuthUrl();
};

export const connectCalendly = async (
  data: CalendlyConnectRequest,
): Promise<CalendlyConnectResponse> => {
  return api.post<CalendlyConnectRequest, CalendlyConnectResponse>(
    `${apiBaseUrl}/channels/calendly/connect`,
    data,
  );
};

export const disconnectCalendlyAccount = async (
  accountId: number,
): Promise<{ success: boolean; message?: string }> => {
  return api.post<
    { accountId: number },
    { success: boolean; message?: string }
  >(`${apiBaseUrl}/channels/calendly/disconnect`, { accountId });
};
