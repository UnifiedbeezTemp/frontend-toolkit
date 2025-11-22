import { useMemo } from "react";
import { PASSWORD_REQUIREMENTS } from "../constants/passwordRequirements";

export const usePasswordValidation = (password: string) => {
  const passwordChecks = useMemo(
    () =>
      PASSWORD_REQUIREMENTS.reduce((acc, req) => {
        acc[req.key] = req.test(password || "");
        return acc;
      }, {} as Record<string, boolean>),
    [password]
  );

  const isPasswordValid = useMemo(() => {
    return Object.values(passwordChecks).every((check) => check === true);
  }, [passwordChecks]);

  return {
    passwordChecks,
    isPasswordValid,
  };
};
