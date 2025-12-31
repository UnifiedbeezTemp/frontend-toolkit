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
  return `${apiBaseUrl}/auth/facebook/connect?type=instagram`;
};

export const initiateInstagramAuth = (): void => {
  const authUrl = getInstagramConnectUrl();
  window.location.href = authUrl;
};
