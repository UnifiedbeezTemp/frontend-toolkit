"use client";

import { useEffect, useMemo } from "react";
import { api, useAppQuery } from "../../api";
import { APIError } from "../../api/types";
import { useToast } from "../../components/ui/toast/ToastProvider";
import { ProfileSetupResponse } from "../../api/services/auth";
import { AuthStatus } from "../../contexts/types";
import { extractErrorMessage } from "../../utils/extractErrorMessage";

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

  useEffect(() => {
    if (!isPending && data) {
      localStorage.setItem("hb_session_active", "true");
    }
  }, [data, isPending]);

  const { showToast } = useToast();

  const showSessionExpired = useMemo(() => {
    if (!isError || error?.status !== 401 || typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem("hb_session_active") === "true";
  }, [error?.status, isError]);

  useEffect(() => {
    if (isError && error) {
      if (error.status !== 401) {
        showToast({
          id: error.details?.correlationId,
          title: "Error",
          description: extractErrorMessage(error),
          variant: "error",
        });
      }
    }
  }, [isError, error, showToast]);

  return {
    isPending,
    isError,
    error,
    data,
    authStatus,
    refetch,
    showSessionExpired,
  };
}
