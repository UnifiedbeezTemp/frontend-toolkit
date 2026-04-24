"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppMutation } from "../../../../../api";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import {
  PayPalConnectResponse,
  getPayPalAuthUrl,
  disconnectPayPalAccount,
} from "../../../../../services/paypalService";
import { useToast } from "../../../../ui/toast/ToastProvider";
import { useRedirectModalContext } from "../../../context/RedirectModalContext";

interface UsePayPalIntegrationProps {
  channelId: number;
  onComplete?: (response: PayPalConnectResponse) => void;
  onRefetchChannels?: () => Promise<void> | void;
}

export const usePayPalIntegration = ({
  channelId,
  onComplete,
  onRefetchChannels,
}: UsePayPalIntegrationProps) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { showRedirectModal } = useRedirectModalContext();
  const icons = useSupabaseIcons();


  const startIntegration = useCallback(() => {
    const authUrl = getPayPalAuthUrl();
    showRedirectModal("PayPal", authUrl, icons.paypalLogo);
  }, [showRedirectModal, icons]);

  const disconnectMutation = useAppMutation(
    (accountId: number) => disconnectPayPalAccount(accountId),
    {
      onSuccess: async () => {
        showToast({
          title: "Disconnected",
          description: "PayPal account disconnected successfully",
          variant: "success",
        });
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
      },
      onError: () => {
        showToast({
          title: "Error",
          description: "Failed to disconnect PayPal account",
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
