import { api } from "../api";
import { apiBaseUrl } from "../api/rootUrls";

export interface GmailConnectRequest {
  channelId: number;
  authCode: string;
}

export interface GmailConnectResponse {
  success: boolean;
  channel?: {
    id: number;
    email: string;
    isActive: boolean;
    connectedAt: string;
  };
  message?: string;
}

export const getGmailAuthUrl = (): string => {
  const currentPath = window.location.pathname + window.location.search;
  const encodedPath = encodeURIComponent(currentPath);
  return `${apiBaseUrl}/channels/email/google/auth?redirect_path=${encodedPath}`;
};

export const initiateGmailAuth = (): void => {
   const currentPath = window.location.pathname + window.location.search;
  const encodedPath = encodeURIComponent(currentPath);
  window.location.href = `${apiBaseUrl}/channels/email/google/auth?redirect_path=${encodedPath}`
  // window.location.href = getGmailAuthUrl();
};

export const connectGmail = async (
  data: GmailConnectRequest,
): Promise<GmailConnectResponse> => {
  const response = await api.post<GmailConnectRequest, GmailConnectResponse>(
    "/channels/email/google/connect",
    data,
  );
  return response;
};

export const disconnectGmailAccount = async (
  accountId: number,
): Promise<{ success: boolean; message?: string }> => {
  return api.post<
    { accountId: number },
    { success: boolean; message?: string }
  >(`/channels/email/disconnect/gmail`, { accountId });
};
