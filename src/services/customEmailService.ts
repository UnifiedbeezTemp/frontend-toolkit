import { api } from "../api";

export interface CustomEmailSetupRequest {
  channelId: number;
  domain: string;
}

export interface DNSRecord {
  type: string;
  name: string;
  value: string;
  priority?: number;
}

export interface CustomEmailSetupResponse {
  success: boolean;
  message?: string;
  dnsRecords?: DNSRecord[];
}

export const setupCustomEmailReceiving = async (
  data: CustomEmailSetupRequest
): Promise<CustomEmailSetupResponse> => {
  const response = await api.post<CustomEmailSetupRequest, CustomEmailSetupResponse>(
    "/channels/email/custom/setup-receiving",
    data
  );
  return response;
};

