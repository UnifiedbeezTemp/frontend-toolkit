"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRedirectModalContext } from "../../../context/RedirectModalContext";
import { completeOutlookConnection, disconnectOutlookAccount, OutlookConnectResponse } from "../../../../../services/outlookService";
import { useAppMutation } from "../../../../../api";
import { apiBaseUrl } from "../../../../../api/rootUrls";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { useToast } from "../../../../ui/toast/ToastProvider";

interface UseOutlookIntegrationProps {
  channelId: number;
  onComplete?: (response: OutlookConnectResponse) => void;
  onRefetchChannels?: () => Promise<void> | void;
}

export const useOutlookIntegration = ({
  channelId,
  onComplete,
  onRefetchChannels,
}: UseOutlookIntegrationProps) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { showRedirectModal } = useRedirectModalContext();
  const icons = useSupabaseIcons();

  const connectMutation = useAppMutation<
    { code: string; channelId: number },
    OutlookConnectResponse
  >(
    async ({ code, channelId }) => {
      return await completeOutlookConnection(code, channelId);
    },
    {
      onSuccess: async (data) => {
        if (onRefetchChannels) {
          await onRefetchChannels();
        }

        showToast({
          title: "Success",
          description: data.message || "Outlook connected successfully",
          variant: "success",
        });

        onComplete?.(data);
        setIsLoading(false);

        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        url.searchParams.delete("state");
        window.history.replaceState({}, "", url.toString());
      },
      onError: (error: unknown) => {
        console.error("🔵 Outlook Callback Error:", error);
        showToast({
          title: "Error",
          description: "Failed to complete Outlook connection",
          variant: "error",
        });
        setIsLoading(false);
      },
    },
  );

  const handleOAuthCallback = useCallback(
    (code: string) => {
      setIsLoading(true);
      connectMutation.mutate({ code, channelId });
    },
    [channelId, connectMutation],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pathname = window.location.pathname;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription =
      searchParams.get("error_description") || searchParams.get("message");
    const state = searchParams.get("state");

    const broadcastChannel = new BroadcastChannel("unifiedbeez-outlook-auth");

    const isSuccessPath = pathname.includes("/microsoft/callback");
    const isErrorParam = error === "outlook_connect_failed" || !!error;

    if (code) {
      if (isSuccessPath) {
        // This is the popup window
        broadcastChannel.postMessage({ type: "OUTLOOK_AUTH_SUCCESS", code });
        showToast({
          title: "Success",
          description: "Outlook authorized, closing window...",
          variant: "success",
        });
        setTimeout(() => window.close(), 1500);
      } else {
        // Main window callback (if redirecting instead of popup)
        if (!isLoading && !connectMutation.isPending) {
          handleOAuthCallback(code);
        }
      }
    } else if (isErrorParam) {
      const description =
        errorDescription ||
        (error === "outlook_connect_failed"
          ? "Outlook connection failed"
          : "Outlook authentication failed");

      if (isSuccessPath || pathname.includes("/microsoft/error")) {
        broadcastChannel.postMessage({
          type: "OUTLOOK_AUTH_ERROR",
          error: description,
        });
        showToast({
          title: "Connection Error",
          description: description,
          variant: "error",
        });
        setTimeout(() => window.close(), 3000);
      } else {
        showToast({
          title: "Connection Error",
          description: description,
          variant: "error",
        });
        setIsLoading(false);
      }

      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      url.searchParams.delete("error_description");
      url.searchParams.delete("message");
      url.searchParams.delete("state");
      window.history.replaceState({}, "", url.toString());
    }

    return () => {
      broadcastChannel.close();
    };
  }, [
    searchParams,
    handleOAuthCallback,
    showToast,
    isLoading,
    connectMutation.isPending,
  ]);

  useEffect(() => {
    const broadcastChannel = new BroadcastChannel("unifiedbeez-outlook-auth");

    broadcastChannel.onmessage = async (event) => {
      if (event.data.type === "OUTLOOK_AUTH_SUCCESS") {
        if (event.data.code && !isLoading && !connectMutation.isPending) {
          handleOAuthCallback(event.data.code);
        }
      } else if (event.data.type === "OUTLOOK_AUTH_ERROR") {
        showToast({
          title: "Connection Failed",
          description: event.data.error || "Failed to connect Outlook",
          variant: "error",
        });
        setIsLoading(false);
      }
    };

    return () => {
      broadcastChannel.close();
    };
  }, [showToast, handleOAuthCallback, isLoading, connectMutation.isPending]);

  const startIntegration = useCallback(() => {
    const authUrl = `${apiBaseUrl}/channels/email/microsoft/auth?channelId=${channelId}`;
    showRedirectModal("Outlook", authUrl, icons.microsoft);
  }, [channelId, showRedirectModal, icons]);

  const disconnectMutation = useAppMutation(
    (accountId: number) => disconnectOutlookAccount(accountId),
    {
      onSuccess: async () => {
        showToast({
          title: "Disconnected",
          description: "Outlook account disconnected successfully",
          variant: "success",
        });
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
      },
      onError: () => {
        showToast({
          title: "Error",
          description: "Failed to disconnect Outlook account",
          variant: "error",
        });
      },
    },
  );

  const handleConfirmDelete = (accountId: number) => {
    disconnectMutation.mutate(accountId);
  };

  return {
    startIntegration,
    isLoading: isLoading || connectMutation.isPending,
    isDeleting: disconnectMutation.isPending,
    handleConfirmDelete,
  };
};
