import { UseMutationOptions } from "@tanstack/react-query";
import { useAppMutation } from "../api";
import { passwordService } from "../api/services/auth/passwordService";
import { twoFactorService } from "../api/services/auth/twoFactorService";
import {
  ChangePasswordPayload,
  ChangePasswordResponseData,
  DisableTwoFactorPayload,
  TwoFactorSetupResponse,
  Verify2FASetupPayload,
  Verify2FASetupResponse,
  RegenerateBackupCodesResponse,
} from "../api/services/auth/types";

export const useChangePassword = (
  options?: Omit<
    UseMutationOptions<
      ChangePasswordResponseData,
      unknown,
      ChangePasswordPayload
    >,
    "mutationFn"
  >
) => {
  return useAppMutation<ChangePasswordPayload, ChangePasswordResponseData>(
    (payload) => passwordService.changePassword(payload),
    options
  );
};

export const useSetup2FA = (
  options?: Omit<
    UseMutationOptions<TwoFactorSetupResponse, unknown, void>,
    "mutationFn"
  >
) => {
  return useAppMutation<void, TwoFactorSetupResponse>(
    () => twoFactorService.setup2FA(),
    options
  );
};

export const useVerify2FASetup = (
  options?: Omit<
    UseMutationOptions<Verify2FASetupResponse, unknown, Verify2FASetupPayload>,
    "mutationFn"
  >
) => {
  return useAppMutation<Verify2FASetupPayload, Verify2FASetupResponse>(
    (payload) => twoFactorService.verify2FASetup(payload),
    options
  );
};

export const useDisable2FA = (
  options?: Omit<
    UseMutationOptions<{ message: string }, unknown, DisableTwoFactorPayload>,
    "mutationFn"
  >
) => {
  return useAppMutation<DisableTwoFactorPayload, { message: string }>(
    (payload) => twoFactorService.disable2FA(payload),
    options
  );
};

export const useRegenerateBackupCodes = (
  options?: Omit<
    UseMutationOptions<RegenerateBackupCodesResponse, unknown, void>,
    "mutationFn"
  >
) => {
  return useAppMutation<void, RegenerateBackupCodesResponse>(
    () => twoFactorService.regenerateBackupCodes(),
    options
  );
};
