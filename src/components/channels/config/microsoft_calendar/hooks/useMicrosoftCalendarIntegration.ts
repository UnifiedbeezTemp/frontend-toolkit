"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppMutation } from "../../../../../api";
import { apiBaseUrl } from "../../../../../api/rootUrls";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { disconnectMicrosoftCalendar } from "../../../../../services/microsoftCalendarService";
import { useToast } from "../../../../ui/toast/ToastProvider";
import { useRedirectModalContext } from "../../../context/RedirectModalContext";

interface UseMicrosoftCalendarIntegrationProps {
  onComplete?: () => void;
  onRefetchChannels?: () => Promise<void> | void;
}

export const useMicrosoftCalendarIntegration = ({
  onComplete,
  onRefetchChannels,
}: UseMicrosoftCalendarIntegrationProps) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { showRedirectModal } = useRedirectModalContext();
  const icons = useSupabaseIcons();


  const startIntegration = useCallback(() => {
    try {
      const authUrl = `${apiBaseUrl}/channels/calendar/microsoft/auth`;
      showRedirectModal("Microsoft Calendar", authUrl, icons.microsoftCalendar);
    } catch (error) {
      console.error("Failed to initiate Microsoft Calendar OAuth:", error);
      showToast({
        title: "Error",
        description: "Failed to start Microsoft Calendar connection",
        variant: "error",
      });
      setIsLoading(false);
    }
  }, [showToast, showRedirectModal, icons]);

  const disconnectMutation = useAppMutation(
    (accountId: number) => disconnectMicrosoftCalendar(accountId),
    {
      onSuccess: async () => {
        showToast({
          title: "Disconnected",
          description: "Microsoft Calendar disconnected successfully",
          variant: "success",
        });
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
      },
      onError: () => {
        showToast({
          title: "Error",
          description: "Failed to disconnect Microsoft Calendar",
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
