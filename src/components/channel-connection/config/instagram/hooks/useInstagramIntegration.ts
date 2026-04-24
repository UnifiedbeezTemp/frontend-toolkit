"use client";

import { useCallback, useEffect, useState } from "react";
import { useRedirectModalContext } from "../../../context/RedirectModalContext";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { getInstagramConnectUrl } from "../../../../../services/instagramService";
import { useToast } from "../../../../ui/toast/ToastProvider";

interface UseInstagramIntegrationProps {
  onComplete?: () => void;
  onRefetchChannels?: () => Promise<void> | void;
}

export const useInstagramIntegration = ({
  onComplete,
  onRefetchChannels,
}: UseInstagramIntegrationProps) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { showRedirectModal } = useRedirectModalContext();
  const icons = useSupabaseIcons();

  useEffect(() => {
    // This hook now focuses on starting the integration.
    // Redirect callbacks are handled by useChannelConnectionToast in Step5.tsx
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

  return {
    startIntegration,
    isLoading,
  };
};
