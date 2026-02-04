"use client";

import { useEffect, useMemo, useState } from "react";
import { api, useAppQuery } from "../../api";
import { APIError } from "../../api/types";
import { useToast } from "../../components/ui/toast/ToastProvider";
import { ProfileSetupResponse } from "../../api/services/auth";
import { AuthStatus } from "../../contexts/types";
import { redirectToLogin } from "../../utils/redirectToLogin";

export default function useSession() {
  const [showSessionExpired, setShowSessionExpired] = useState(false);
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

  useEffect(() => {
    if (isError && error) {
      if (error.status !== 401) {
        showToast({
          id: error.details?.correlationId,
          title: "Error",
          description: error.message.message,
          variant: "error",
        });
      }

      if (error.status === 401) {
        const wasSessionActive =
          localStorage.getItem("hb_session_active") === "true";
        if (wasSessionActive) {
          setShowSessionExpired(true);
        }
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
