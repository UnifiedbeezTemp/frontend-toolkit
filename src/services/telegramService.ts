import { api } from "../api";
import { apiBaseUrl } from "../api/rootUrls";

export interface TelegramConnectResponse {
  success: boolean;
  message?: string;
  channel?: {
    id: number;
    telegramId?: string;
    isActive: boolean;
    connectedAt: string;
  };
}

export interface TelegramPhoneResponse {
  sessionId: string;
  success: boolean;
  message?: string;
}

export interface TelegramVerifyResponse {
  success: boolean;
  message?: string;
  passwordNeeded?: boolean;
}

export interface TelegramQRResponse {
  qrUrl: string;
  sessionId: string;
  success: boolean;
}

export const telegramService = {
  // Phone Flow
  sendPhoneCode: (phoneNumber: string) =>
    api.post<{ phoneNumber: string }, TelegramPhoneResponse>(
      `${apiBaseUrl}/channels/telegram/connect/phone`,
      { phoneNumber },
    ),

  verifyCode: (sessionId: string, code: string) =>
    api.post<{ sessionId: string; code: string }, TelegramVerifyResponse>(
      `${apiBaseUrl}/channels/telegram/connect/verify-code`,
      { sessionId, code },
    ),

  verify2FA: (sessionId: string, password: string) =>
    api.post<{ sessionId: string; password: string }, TelegramConnectResponse>(
      `${apiBaseUrl}/channels/telegram/connect/verify-2fa`,
      { sessionId, password },
    ),

  // QR Flow
  generateQR: () =>
    api.post<void, TelegramQRResponse>(
      `${apiBaseUrl}/channels/telegram/connect/qr`,
    ),

  checkQRStatus: (sessionId: string) =>
    api.get<{ success: boolean }>(
      `${apiBaseUrl}/channels/telegram/connect/qr/check?sessionId=${sessionId}`,
    ),

  disconnectAccount: (accountId: number) =>
    api.post<{ accountId: number }, { success: boolean; message?: string }>(
      `${apiBaseUrl}/channels/telegram/disconnect`,
      { accountId },
    ),
};
