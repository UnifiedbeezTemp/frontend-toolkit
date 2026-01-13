import { api } from "../../index";
import {
  TwoFactorVerifyPayload,
  TwoFactorVerifyResponse,
  TwoFactorEmailRequestPayload,
} from "./types";

export const twoFactorService = {
  async verify(
    payload: TwoFactorVerifyPayload
  ): Promise<TwoFactorVerifyResponse> {
    return await api.post("/auth/2fa/verify", payload);
  },

  async requestEmailBackupCode(
    payload: TwoFactorEmailRequestPayload
  ): Promise<{ message: string }> {
    return await api.post("/auth/2fa/backup-email", payload);
  },
};
