"use client";

import { useCallback, useEffect, useMemo } from "react";
import { api, useAppQuery } from "../../api";
import { APIError } from "../../api/types";
import { useToast } from "../../components/ui/toast/ToastProvider";
import { ProfileSetupResponse } from "../../api/services/auth";
import { AuthStatus } from "../../contexts/types";

export default function useSession() {
  const { data, isPending, isError, error, refetch } = useAppQuery<
    ProfileSetupResponse["user"],
    APIError
  >(["session"], async () => await api.get("/auth/profile"));

  const authStatus: AuthStatus = useMemo(() => {
    if (!isError && !error && !isPending && data) return "authenticated";
    else if (isError && error.status === 401) return "unauthenticated";
    else if (isPending) return "loading";
    else return "error";
  }, [isError, error, isPending, data]);
  const { showToast } = useToast();

  const redirectToLogin = useCallback(() => {
    const isAuthRoute = window.location.pathname.startsWith("/auth");
    if (isAuthRoute) return;

    const currentUrl = window.location.href;
    const encoded = encodeURIComponent(currentUrl);
    window.location.replace(
      `${process.env.NEXT_PUBLIC_BASE}/auth/signin?returnTo=${encoded}`
    );
  }, []);

  useEffect(() => {
    if (isError && error) {
      if (error.status === 401) redirectToLogin();
      showToast({
        id: error.details?.correlationId,
        title: error.status === 401 ? "Authentication failed" : "Error",
        description: error.message.message,
        variant: "error",
      });

    }
  }, [isError, error, redirectToLogin, showToast]);

  return { isPending, isError, error, data, authStatus, refetch };
}
