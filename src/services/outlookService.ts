import { api } from "../api";
import { apiBaseUrl } from "../api/rootUrls";

export interface OutlookConnectResponse {
  success: boolean;
  channel?: {
    id: number;
    email: string;
    isActive: boolean;
    connectedAt: string;
  };
  message?: string;
}

export const initiateOutlookAuth = (channelId: number): void => {
  const authUrl = `${apiBaseUrl}/channels/email/microsoft/auth?channelId=${channelId}`;
  window.location.href = authUrl;
};

export const completeOutlookConnection = async (
  code: string,
  channelId: number,
): Promise<OutlookConnectResponse> => {
  return api.get<OutlookConnectResponse>(
    `/channels/email/microsoft/callback?code=${code}&channelId=${channelId}`,
  );
};
