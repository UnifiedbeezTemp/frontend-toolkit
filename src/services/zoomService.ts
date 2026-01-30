import { api } from "../api";
import { apiBaseUrl } from "../api/rootUrls";

export interface ZoomConnectResponse {
  success: boolean;
  channel?: {
    id: number;
    email?: string;
    isActive: boolean;
    connectedAt: string;
  };
  message?: string;
}

export const getZoomAuthUrl = (): string => {
  return `${apiBaseUrl}/channels/zoom/auth`;
};

export const initiateZoomAuth = (): void => {
  window.location.href = getZoomAuthUrl();
};

export const disconnectZoomAccount = async (
  accountId: number,
): Promise<{ success: boolean; message?: string }> => {
  return api.post<
    { accountId: number },
    { success: boolean; message?: string }
  >(`/channels/zoom/disconnect`, { accountId });
};
