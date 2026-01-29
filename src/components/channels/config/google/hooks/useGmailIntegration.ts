"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useRedirectModalContext } from "../../../context/RedirectModalContext";
import { useAppMutation } from "../../../../../api";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import {
  GmailConnectResponse,
  getGmailAuthUrl,
  disconnectGmailAccount,
} from "../../../../../services/gmailService";
import { useToast } from "../../../../ui/toast/ToastProvider";

interface UseGmailIntegrationProps {
  channelId: number;
  onComplete?: (response: GmailConnectResponse) => void;
  onRefetchChannels?: () => Promise<void> | void;
}

export const useGmailIntegration = ({
  channelId,
  onComplete,
  onRefetchChannels,
}: UseGmailIntegrationProps) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { showRedirectModal } = useRedirectModalContext();
  const icons = useSupabaseIcons();


  const startIntegration = useCallback(() => {
    const authUrl = getGmailAuthUrl();
    showRedirectModal("Gmail", authUrl, icons.google);
  }, [showRedirectModal, icons]);

  const disconnectMutation = useAppMutation(
    (accountId: number) => disconnectGmailAccount(accountId),
    {
      onSuccess: async () => {
        showToast({
          title: "Disconnected",
          description: "Gmail account disconnected successfully",
          variant: "success",
        });
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
      },
      onError: () => {
        showToast({
          title: "Error",
          description: "Failed to disconnect Gmail account",
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
