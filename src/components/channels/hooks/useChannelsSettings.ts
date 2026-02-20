import { useMemo, useState, useEffect } from "react";
import { useChannelsQuery } from "@/shared/src/components/channel-selection/hooks/useChannelsQuery";
import { ChannelsApiResponse } from "@/shared/src/types/channelApiTypes";
import { useChannelConnectionToast } from "@/shared/src/components/channels/hooks/useChannelConnectionToast";
import { useUpdateChannelsInRedux } from "@/shared/src/components/channels/hooks/useUpdateChannelsInRedux";
import { useChannels } from "../context/ChannelsContext";

const STORAGE_KEY = "channels_settings_state";

export function useChannelsSettings() {
  const { updateChannels } = useUpdateChannelsInRedux();
  const { isChannelsModalOpen, closeChannelsModal } = useChannels();

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed.filter ?? "Communication Channels";
        } catch (e) {
          console.error("Error parsing stored channels settings:", e);
        }
      }
    }
    return "Communication Channels";
  });

  const [channelView, setChannelView] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed.channelView ?? "Connected Channels";
        } catch (e) {
          console.error("Error parsing stored channels settings:", e);
        }
      }
    }
    return "Connected Channels";
  });

  const [isConnectionMode, setIsConnectionMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed.isConnectionMode ?? false;
        } catch (e) {
          console.error("Error parsing stored channels settings:", e);
        }
      }
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          filter,
          channelView,
          isConnectionMode,
        }),
      );
    }
  }, [filter, channelView, isConnectionMode]);

  const { availableChannels, selectedChannels, isLoading, isError, refetch } =
    useChannelsQuery();

  useChannelConnectionToast(refetch);

  useEffect(() => {
    if (availableChannels) {
      updateChannels(availableChannels, selectedChannels ?? null);
    }
  }, [availableChannels, selectedChannels, updateChannels]);

  const connectedChannelsData = useMemo<ChannelsApiResponse | null>(() => {
    if (!availableChannels || !selectedChannels?.channels) return null;

    const connectedIds = new Set(
      selectedChannels.channels.map((c) => c.availableChannelId),
    );

    const filteredCategories = Object.entries(
      availableChannels.categories,
    ).reduce(
      (acc, [key, category]) => {
        acc[key as keyof ChannelsApiResponse["categories"]] = {
          ...category,
          available: category.available.filter((channel) =>
            connectedIds.has(channel.id),
          ),
        };
        return acc;
      },
      {} as ChannelsApiResponse["categories"],
    );

    return {
      categories: filteredCategories,
    };
  }, [availableChannels, selectedChannels]);

  const displayData =
    channelView === "Connected Channels"
      ? connectedChannelsData
      : availableChannels;

  const handleGoBackToConnected = () => {
    setChannelView("Connected Channels");
  };

  const handleContinueToConnection = () => {
    setIsConnectionMode(true);
  };

  const handleExitConnectionMode = () => {
    setIsConnectionMode(false);
  };

  return {
    isOpen: isChannelsModalOpen,
    onClose: closeChannelsModal,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    channelView,
    setChannelView,
    isConnectionMode,
    availableChannels,
    selectedChannels,
    isLoading,
    isError,
    refetch,
    displayData,
    handleGoBackToConnected,
    handleContinueToConnection,
    handleExitConnectionMode,
  };
}
