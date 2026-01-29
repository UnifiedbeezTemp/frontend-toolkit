"use client";

import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRedirectModalContext } from "../../../context/RedirectModalContext";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { useAppMutation } from "../../../../../api";
import {
  ShopifyConnectResponse,
  getShopifyAuthUrl,
  disconnectShopifyAccount,
} from "../../../../../services/shopifyService";
import { useToast } from "../../../../ui/toast/ToastProvider";

interface UseShopifyIntegrationProps {
  channelId: number;
  onComplete?: (response: ShopifyConnectResponse) => void;
  onRefetchChannels?: () => Promise<void> | void;
}

export const useShopifyIntegration = ({
  channelId,
  onComplete,
  onRefetchChannels,
}: UseShopifyIntegrationProps) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { showRedirectModal } = useRedirectModalContext();
  const icons = useSupabaseIcons();

  const startIntegration = useCallback(
    (shopDomain: string) => {
      if (!shopDomain.trim()) {
        showToast({
          title: "Error",
          description: "Please enter your Shopify store domain",
          variant: "error",
        });
        return;
      }

      const authUrl = getShopifyAuthUrl(shopDomain);
      showRedirectModal("Shopify", authUrl, icons.shopifyLogo);
    },
    [showRedirectModal, icons, showToast],
  );

  const disconnectMutation = useAppMutation(
    (accountId: number) => disconnectShopifyAccount(accountId),
    {
      onSuccess: async () => {
        showToast({
          title: "Disconnected",
          description: "Shopify account disconnected successfully",
          variant: "success",
        });
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
      },
      onError: () => {
        showToast({
          title: "Error",
          description: "Failed to disconnect Shopify account",
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
