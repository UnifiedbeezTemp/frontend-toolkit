import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  selectChannel,
  unselectChannel,
} from "../../../services/channelService";
import {
  ChannelsApiResponse,
  SelectedChannelsResponse,
  BackendChannel,
} from "../../../types/channelApiTypes";
import { useToast } from "../../ui/toast/ToastProvider";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

interface UseChannelSelectionApiProps {
  backendData?: ChannelsApiResponse | null;
  selectedChannels?: SelectedChannelsResponse | null;
}

/**
 * Maps channel name to backend channel ID
 */
const getChannelIdByName = (
  channelName: string,
  backendData: ChannelsApiResponse | null | undefined
): number | null => {
  if (!backendData?.categories) {
    return null;
  }

  const allChannels: BackendChannel[] = [
    ...(backendData.categories.communication?.available || []),
    ...(backendData.categories.crmCalendar?.available || []),
    ...(backendData.categories.ecommerce?.available || []),
    ...(backendData.categories.upcoming?.available || []),
  ];

  const lower = channelName.toLowerCase();
  const channel = allChannels.find(
    (ch) =>
      ch.name?.toLowerCase() === lower ||
      ch.displayName?.toLowerCase() === lower
  );
  return channel?.id ?? null;
};

export const useChannelSelectionApi = ({
  backendData,
  selectedChannels,
}: UseChannelSelectionApiProps) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [loadingChannels, setLoadingChannels] = useState<Set<string>>(
    new Set()
  );

  const handleSelectChannel = useCallback(
    async (channel: {
      id: string;
      availableChannelId?: number;
      name: string;
    }) => {
      if (!backendData) {
        showToast({
          title: "Error",
          description: "Channel data not available",
          variant: "error",
        });
        return false;
      }

      const channelId =
        channel.availableChannelId ||
        getChannelIdByName(channel.name, backendData);
      if (!channelId) {
        showToast({
          title: "Error",
          description: "Channel not found",
          variant: "error",
        });
        return false;
      }

      setLoadingChannels((prev) => new Set(prev).add(channel.id));

      try {
        await selectChannel(channelId);
        queryClient.invalidateQueries({
          queryKey: ["channels", "selected"],
          refetchType: "active",
        });
        return true;
      } catch (error) {
        const errorMessage = extractErrorMessage(
          error,
          "Failed to select channel"
        );
        showToast({
          title: "Error",
          description: errorMessage,
          variant: "error",
        });
        return false;
      } finally {
        setLoadingChannels((prev) => {
          const next = new Set(prev);
          next.delete(channel.id);
          return next;
        });
      }
    },
    [backendData, showToast, queryClient]
  );

  const handleUnselectChannel = useCallback(
    async (channel: {
      id: string;
      availableChannelId?: number;
      name: string;
    }) => {
      if (!backendData) {
        showToast({
          title: "Error",
          description: "Channel data not available",
          variant: "error",
        });
        return false;
      }

      const availableChannelId =
        channel.availableChannelId ||
        selectedChannels?.channels?.find(
          (ch) => ch.availableChannel?.id === channel.availableChannelId
        )?.availableChannel?.id ||
        selectedChannels?.channels?.find(
          (ch) =>
            ch.availableChannel?.name?.toLowerCase() ===
            channel.name.toLowerCase()
        )?.availableChannel?.id ||
        getChannelIdByName(channel.name, backendData);

      if (!availableChannelId) {
        showToast({
          title: "Error",
          description: "Channel not found",
          variant: "error",
        });
        return false;
      }

      const connectedChannel = selectedChannels?.channels?.find(
        (ch) => ch.availableChannel?.id === availableChannelId
      );

      setLoadingChannels((prev) => new Set(prev).add(channel.id));

      try {
        await unselectChannel(availableChannelId, connectedChannel?.id);
        queryClient.invalidateQueries({
          queryKey: ["channels", "selected"],
          refetchType: "active",
        });
        return true;
      } catch (error) {
        const errorMessage = extractErrorMessage(
          error,
          "Failed to unselect channel"
        );
        showToast({
          title: "Error",
          description: errorMessage,
          variant: "error",
        });
        return false;
      } finally {
        setLoadingChannels((prev) => {
          const next = new Set(prev);
          next.delete(channel.id);
          return next;
        });
      }
    },
    [backendData, selectedChannels, showToast, queryClient]
  );

  const isChannelLoading = useCallback(
    (channelId: string) => {
      return loadingChannels.has(channelId);
    },
    [loadingChannels]
  );

  return {
    handleSelectChannel,
    handleUnselectChannel,
    isChannelLoading,
  };
};
