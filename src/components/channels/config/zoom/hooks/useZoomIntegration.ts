"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRedirectModalContext } from "../../../context/RedirectModalContext";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { useAppMutation } from "../../../../../api";
import {
  ZoomConnectResponse,
  getZoomAuthUrl,
  disconnectZoomAccount,
} from "../../../../../services/zoomService";
import { useToast } from "../../../../ui/toast/ToastProvider";

interface UseZoomIntegrationProps {
  channelId: number;
  onComplete?: (response: ZoomConnectResponse) => void;
  onRefetchChannels?: () => Promise<void> | void;
}

export const useZoomIntegration = ({
  channelId,
  onComplete,
  onRefetchChannels,
}: UseZoomIntegrationProps) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { showRedirectModal } = useRedirectModalContext();
  const icons = useSupabaseIcons();

  const startIntegration = useCallback(() => {
    const authUrl = getZoomAuthUrl();
    showRedirectModal("Zoom", authUrl, icons.zoomLogo);
  }, [showRedirectModal, icons]);

  const disconnectMutation = useAppMutation(
    (accountId: number) => disconnectZoomAccount(accountId),
    {
      onSuccess: async () => {
        showToast({
          title: "Disconnected",
          description: "Zoom account disconnected successfully",
          variant: "success",
        });
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
      },
      onError: () => {
        showToast({
          title: "Error",
          description: "Failed to disconnect Zoom account",
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
    isLoading,
    isDeleting: disconnectMutation.isPending,
    handleConfirmDelete,
  };
};
