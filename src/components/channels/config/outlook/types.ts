export interface OutlookConnectRequest {
  channelId: number;
  authCode: string;
}

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

