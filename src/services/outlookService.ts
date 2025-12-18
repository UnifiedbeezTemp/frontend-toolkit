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
  window.open(authUrl, "_blank", "noopener,noreferrer,width=600,height=700");
};
