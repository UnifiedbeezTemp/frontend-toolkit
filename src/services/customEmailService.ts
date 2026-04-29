import { api } from "../api";

export interface CustomEmailSetupRequest {
  fromEmail: string;
}

export interface DNSRecords {
  mx: Array<{ priority: number; value: string }>;
  txt: string[];
  cname: Array<{ name: string; value: string }>;
}

export interface CustomEmailSetupResponse {
  success: boolean;
  connectedChannelId: number;
  emailAccountId: number;
  domain: string;
  fromEmail: string;
  dnsRecords: DNSRecords;
  instructions: {
    steps: string[];
    note: string;
  };
  message?: string;
}

export interface CustomEmailVerifyResponse {
  success: boolean;
  domain: string;
  fromEmail?: string;
  canReceive: boolean;
  canSend: boolean;
  verifiedBy?: string;
  missingReceiving?: string[];
  dkimStatus?: string;
}

export const setupCustomEmailReceiving = async (
  data: CustomEmailSetupRequest,
): Promise<CustomEmailSetupResponse> => {
  const response = await api.post<
    CustomEmailSetupRequest,
    CustomEmailSetupResponse
  >("/channels/email/custom/setup", data);
  return response;
};

export const verifyCustomEmailReceiving = async (
  emailAccountId: number,
): Promise<CustomEmailVerifyResponse> => {
  const response = await api.post<void, CustomEmailVerifyResponse>(
    `/channels/email/custom/${emailAccountId}/verify`,
  );
  return response;
};

export const disconnectCustomEmail = async (
  accountId: number,
): Promise<{ success: boolean; message?: string }> => {
  const response = await api.post<
    { accountId: number },
    { success: boolean; message?: string }
  >("/channels/email/disconnect/custom", { accountId });
  return response;
};
