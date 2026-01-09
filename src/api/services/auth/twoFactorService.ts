import { api } from "../../index";
import {
  TwoFactorSetupResponse,
  DisableTwoFactorPayload,
  Verify2FASetupPayload,
  Verify2FASetupResponse,
  TwoFactorStatusResponse,
  RegenerateBackupCodesResponse,
} from "./types";

export const twoFactorService = {
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
