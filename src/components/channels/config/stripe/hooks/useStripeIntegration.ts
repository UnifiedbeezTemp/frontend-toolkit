"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRedirectModalContext } from "../../../context/RedirectModalContext";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import {
  StripeConnectResponse,
  getStripeAuthUrl,
} from "../../../../../services/stripeService";
import { useToast } from "../../../../ui/toast/ToastProvider";

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

  return {
    startIntegration,
    isLoading,
  };
};
