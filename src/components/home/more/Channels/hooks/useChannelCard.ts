import { useState } from "react";
import { useChannelsQuery } from "@/shared/src/components/channel-selection/hooks/useChannelsQuery";

export const useChannelCard = () => {
  const [showChannelsModal, setShowChannelsModal] = useState(false);
  const {
    availableChannels,
    selectedChannels,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useChannelsQuery();

  return {
    showChannelsModal,
    setShowChannelsModal,
    availableChannels,
    selectedChannels,
    isLoading,
    isError,
    refetch,
    isFetching,
  };
};
