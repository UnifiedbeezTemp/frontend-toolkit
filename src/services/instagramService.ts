import { api } from "../api";
import { apiBaseUrl } from "../api/rootUrls";

export interface InstagramConnectSuccessResponse {
  channelId: number;
  success: boolean;
}

export interface InstagramConnectErrorResponse {
  message: string;
  error: string;
}

export const getInstagramConnectUrl = (): string => {
  const currentPath = window.location.pathname + window.location.search;
  const encodedPath = encodeURIComponent(currentPath);
  return `${apiBaseUrl}/auth/instagram/connect?redirect_path=${encodedPath}`;
};

export const initiateInstagramAuth = (): void => {
  const authUrl = getInstagramConnectUrl();
  window.location.href = authUrl;
};

export const disconnectInstagramAccount = async (
  accountId: number,
): Promise<void> => {
  return api.delete(`/auth/instagram/account/${accountId}`);
};
