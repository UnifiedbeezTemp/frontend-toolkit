import { UseMutationOptions } from "@tanstack/react-query";
import { useAppMutation } from "../api";
import { passwordService } from "../api/services/auth/passwordService";
import {
  ChangePasswordPayload,
  ChangePasswordResponseData,
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
