"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { useRedirectModalContext } from "../../../context/RedirectModalContext";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { MessengerChannel, getConnectedMessengerChannels, selectMessengerChannel, getFacebookConnectUrl, disconnectFacebookMessenger } from "../../../../../services/facebookMessengerService";
import { useToast } from "../../../../ui/toast/ToastProvider";

export const useFacebookIntegration = (
  onChannelConnected?: (channel: MessengerChannel) => void,
) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [connectedChannels, setConnectedChannels] = useState<
    MessengerChannel[]
  >([]);
  const { showRedirectModal } = useRedirectModalContext();
  const icons = useSupabaseIcons();

  const onChannelConnectedRef = useRef(onChannelConnected);
  useEffect(() => {
    onChannelConnectedRef.current = onChannelConnected;
  }, [onChannelConnected]);

  const loadConnectedChannels = useCallback(async () => {
    try {
      const channels = await getConnectedMessengerChannels();
      setConnectedChannels(channels);
    } catch (error) {
      console.error("Failed to load connected channels:", error);
    }
  }, []);

  useEffect(() => {
    loadConnectedChannels();
  }, [loadConnectedChannels]);

  const selectChannel = useCallback(
    async (availableChannelId: number) => {
      try {
        setIsLoading(true);
        const response = await selectMessengerChannel(availableChannelId);

        setSelectedChannel({
          id: response.channel.id,
          name: response.channel.name,
        });

        showToast({
          title: "Success",
          description:
            "Facebook Messenger channel selected. Proceed to connect your Facebook Page.",
          variant: "success",
        });

        await loadConnectedChannels();
      } catch (error: unknown) {
        showToast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Failed to select channel",
          variant: "error",
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [showToast, loadConnectedChannels],
  );

  const connectMessenger = useCallback(
    (availableChannelId?: number) => {
      const connectUrl = getFacebookConnectUrl();
      showRedirectModal(
        "Facebook Messenger",
        connectUrl,
        icons.facebookMessengerLogo,
      );
    },
    [showRedirectModal, icons],
  );

  const disconnectChannel = useCallback(
    async (connectionId: number) => {
      try {
        setIsLoading(true);
        await disconnectFacebookMessenger(connectionId);

        showToast({
          title: "Success",
          description: "Facebook Messenger disconnected successfully",
          variant: "success",
        });

        await loadConnectedChannels();
      } catch (error) {
        showToast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to disconnect channel",
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [showToast, loadConnectedChannels],
  );

  return {
    isLoading,
    selectedChannel,
    connectedChannels,
    selectChannel,
    connectMessenger,
    disconnectChannel,
    loadConnectedChannels,
  };
};
