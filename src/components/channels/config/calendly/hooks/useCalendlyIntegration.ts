"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { extractErrorMessage } from "../../webchat/utils/errorUtils";

import { useRedirectModalContext } from "../../../context/RedirectModalContext";
import { useAppMutation } from "../../../../../api";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { CalendlyConnectResponse, CalendlyConnectRequest, connectCalendly, getCalendlyAuthUrl, disconnectCalendlyAccount } from "../../../../../services/calendlyService";
import { useToast } from "../../../../ui/toast/ToastProvider";

interface UseCalendlyIntegrationProps {
  channelId: number;
  onComplete?: (response: CalendlyConnectResponse) => void;
  onRefetchChannels?: () => Promise<void> | void;
}

export const useCalendlyIntegration = ({
  channelId,
  onComplete,
  onRefetchChannels,
}: UseCalendlyIntegrationProps) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { showRedirectModal } = useRedirectModalContext();
  const icons = useSupabaseIcons();

  const connectMutation = useAppMutation<
    CalendlyConnectRequest,
    CalendlyConnectResponse
  >(
    async (data) => {
      return await connectCalendly(data);
    },
    {
      onSuccess: async (response) => {
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
        showToast({
          title: "Success",
          description: response.message || "Calendly connected successfully",
          variant: "success",
        });
        onComplete?.(response);
        setIsLoading(false);
      },
      onError: (error: unknown) => {
        showToast({
          title: "Error",
          description: extractErrorMessage(error, "Failed to connect Calendly"),
          variant: "error",
        });
        setIsLoading(false);
      },
    },
  );

  const startIntegration = useCallback(() => {
    const authUrl = getCalendlyAuthUrl();
    showRedirectModal("Calendly", authUrl, icons.calendyLogo);
  }, [showRedirectModal, icons]);

  const disconnectMutation = useAppMutation(
    (accountId: number) => disconnectCalendlyAccount(accountId),
    {
      onSuccess: async () => {
        showToast({
          title: "Disconnected",
          description: "Calendly account disconnected successfully",
          variant: "success",
        });
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
      },
      onError: () => {
        showToast({
          title: "Error",
          description: "Failed to disconnect Calendly account",
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
