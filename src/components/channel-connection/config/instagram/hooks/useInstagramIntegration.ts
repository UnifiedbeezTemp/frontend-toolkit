"use client";

import { useCallback, useEffect, useState } from "react";
import { useRedirectModalContext } from "../../../context/RedirectModalContext";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import {
  getInstagramConnectUrl,
  disconnectInstagramAccount,
} from "../../../../../services/instagramService";
import { useToast } from "../../../../ui/toast/ToastProvider";
import { useAppMutation } from "../../../../../api/query";
import { extractErrorMessage } from "../../../../../utils/extractErrorMessage";

interface UseInstagramIntegrationProps {
  onComplete?: () => void;
  onDeleteSuccess?: () => void;
  onRefetchChannels?: () => Promise<void> | void;
}

export const useInstagramIntegration = ({
  onComplete,
  onDeleteSuccess,
  onRefetchChannels,
}: UseInstagramIntegrationProps) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { showRedirectModal } = useRedirectModalContext();
  const icons = useSupabaseIcons();

  useEffect(() => {
    // This hook now focuses on starting the integration.
    // Redirect callbacks are handled by useChannelConnectionToast
  }, []);

  const startIntegration = useCallback(() => {
    try {
      const authUrl = getInstagramConnectUrl();
      showRedirectModal("Instagram", authUrl, icons.instagramLogo);
    } catch (error) {
      console.error("Failed to initiate Instagram OAuth:", error);
      showToast({
        title: "Error",
        description: "Failed to start Instagram connection",
        variant: "error",
      });
      setIsLoading(false);
    }
  }, [showToast, showRedirectModal, icons]);

  const disconnectMutation = useAppMutation(
    (accountId: number) => disconnectInstagramAccount(accountId),
    {
      onSuccess: async () => {
        showToast({
          title: "Success",
          description: "Instagram account disconnected successfully",
          variant: "success",
        });
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
      },
      onError: (error) => {
        const errorMessage = extractErrorMessage(
          error,
          "Failed to disconnect Instagram account",
        );
        showToast({
          title: "Error",
          description: errorMessage,
          variant: "error",
        });
      },
    },
  );

  return {
    startIntegration,
    isLoading,
    isDeleting: disconnectMutation.isPending,
    handleConfirmDelete: (accountId: number) =>
      disconnectMutation.mutate(accountId),
  };
};
