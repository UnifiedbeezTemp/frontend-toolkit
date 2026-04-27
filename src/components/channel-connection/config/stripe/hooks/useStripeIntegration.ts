"use client";

import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRedirectModalContext } from "../../../context/RedirectModalContext";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { useAppMutation } from "../../../../../api";
import {
  StripeConnectResponse,
  getStripeAuthUrl,
  disconnectStripeAccount,
} from "../../../../../services/stripeService";
import { useToast } from "../../../../ui/toast/ToastProvider";
import { extractErrorMessage } from "../../../../../utils/extractErrorMessage";

interface UseStripeIntegrationProps {
  channelId: number;
  onComplete?: (response: StripeConnectResponse) => void;
  onRefetchChannels?: () => Promise<void> | void;
}

export const useStripeIntegration = ({
  channelId,
  onComplete,
  onRefetchChannels,
}: UseStripeIntegrationProps) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { showRedirectModal } = useRedirectModalContext();
  const icons = useSupabaseIcons();

  const startIntegration = useCallback(() => {
    const authUrl = getStripeAuthUrl();
    showRedirectModal("Stripe", authUrl, icons.stripeLogo);
  }, [showRedirectModal, icons]);

  const disconnectMutation = useAppMutation(
    (accountId: number) => disconnectStripeAccount(accountId),
    {
      onSuccess: async () => {
        showToast({
          title: "Disconnected",
          description: "Stripe account disconnected successfully",
          variant: "success",
        });
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
      },
      onError: (error: unknown) => {
        showToast({
          title: "Error",
          description: extractErrorMessage(
            error,
            "Failed to disconnect Stripe account",
          ),
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
