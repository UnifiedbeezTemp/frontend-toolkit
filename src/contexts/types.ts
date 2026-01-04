import { ProfileSetupResponse } from "../api/services/auth";

export type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "error";

export type UserContextValue = {
  user: ProfileSetupResponse["user"] | null;
  status: AuthStatus;
  refetch: () => void;
};
