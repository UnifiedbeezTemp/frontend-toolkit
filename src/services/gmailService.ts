import { api } from "../api";

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

export const connectGmail = async (
  data: GmailConnectRequest
): Promise<GmailConnectResponse> => {
  const response = await api.post<GmailConnectRequest, GmailConnectResponse>(
    "/channels/email/google/connect",
    data
  );
  return response;
};
