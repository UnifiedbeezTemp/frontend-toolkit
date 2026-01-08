import { api } from "../../index";
import {
  ConfirmResetPasswordPayload,
  PasswordResetResponseData,
  ResetPasswordPayload,
  ChangePasswordPayload,
  ChangePasswordResponseData,
} from "./types";

export const passwordService = {
  async requestPasswordReset(
    payload: ResetPasswordPayload
  ): Promise<PasswordResetResponseData> {
    return await api.post("/auth/forgot-password", payload);
  },

  async confirmPasswordReset(
    payload: ConfirmResetPasswordPayload
  ): Promise<PasswordResetResponseData> {
    return await api.post("/auth/reset-password", payload);
  },

  async changePassword(
    payload: ChangePasswordPayload
  ): Promise<ChangePasswordResponseData> {
    return await api.patch("/auth/change-password", payload);
  },
};
