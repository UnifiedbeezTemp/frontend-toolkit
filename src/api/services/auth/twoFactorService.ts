import { api } from "../../index";
import {
  TwoFactorVerifyPayload,
  TwoFactorVerifyResponse,
  TwoFactorEmailRequestPayload,
  DisableTwoFactorPayload,
  RegenerateBackupCodesResponse,
  TwoFactorSetupResponse,
  TwoFactorStatusResponse,
  Verify2FASetupPayload,
  Verify2FASetupResponse,
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
  
  async setup2FA(): Promise<TwoFactorSetupResponse> {
    return await api.post("/auth/2fa/setup");
  },

  async disable2FA(
    payload: DisableTwoFactorPayload
  ): Promise<{ message: string }> {
    return await api.post("/auth/2fa/disable", payload);
  },

  async verify2FASetup(
    payload: Verify2FASetupPayload
  ): Promise<Verify2FASetupResponse> {
    return await api.post("/auth/2fa/verify-setup", payload);
  },

  async getTwoFactorStatus(): Promise<TwoFactorStatusResponse> {
    return await api.get("/auth/2fa/status");
  },

  async regenerateBackupCodes(): Promise<RegenerateBackupCodesResponse> {
    return await api.post("/auth/2fa/regenerate-backup");
  },
};
