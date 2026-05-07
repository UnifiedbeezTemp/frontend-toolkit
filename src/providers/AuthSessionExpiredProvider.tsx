"use client";

import { PropsWithChildren, useEffect, useRef } from "react";
import { useToast } from "../components/ui/toast/ToastProvider";
import {
  addAuthSessionExpiredListener,
  AuthSessionExpiredEventDetail,
} from "../api/authSessionEvents";
import { redirectToLogin } from "../utils/redirectToLogin";

const REDIRECT_DELAY_MS = 1500;
const SESSION_ACTIVE_STORAGE_KEY = "hb_session_active";

export type AuthSessionExpiredProviderProps = PropsWithChildren<{
  clearSessionStorageKey?: string | false;
  defaultMessage?: string;
  onSessionExpired?: (detail: AuthSessionExpiredEventDetail) => void;
  redirectDelayMs?: number;
  redirectTo?: () => void;
  toastTitle?: string;
}>;

export default function AuthSessionExpiredProvider({
  children,
  clearSessionStorageKey = SESSION_ACTIVE_STORAGE_KEY,
  defaultMessage = "Please log in again to continue.",
  onSessionExpired,
  redirectDelayMs = REDIRECT_DELAY_MS,
  redirectTo = redirectToLogin,
  toastTitle = "Session expired",
}: AuthSessionExpiredProviderProps) {
  const { showToast } = useToast();
  const hasHandledSessionExpiry = useRef(false);
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const removeSessionExpiredListener = addAuthSessionExpiredListener(
      (detail) => {
        if (hasHandledSessionExpiry.current) return;
        hasHandledSessionExpiry.current = true;

        if (clearSessionStorageKey) {
          localStorage.removeItem(clearSessionStorageKey);
        }

        showToast({
          id: detail?.correlationId ?? "session-expired",
          title: toastTitle,
          description: detail?.message || defaultMessage,
          variant: "error",
          duration: redirectDelayMs,
        });

        onSessionExpired?.(detail);

        redirectTimer.current = setTimeout(() => {
          redirectTo();
        }, redirectDelayMs);
      },
    );

    return () => {
      removeSessionExpiredListener();
      if (redirectTimer.current) {
        clearTimeout(redirectTimer.current);
      }
    };
  }, [
    clearSessionStorageKey,
    defaultMessage,
    onSessionExpired,
    redirectDelayMs,
    redirectTo,
    showToast,
    toastTitle,
  ]);

  return children;
}
