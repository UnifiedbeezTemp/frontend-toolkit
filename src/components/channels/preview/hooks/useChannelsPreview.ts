import { useMemo, useState, useEffect } from "react";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { hasConnectedAccounts } from "../../utils/channelConnections";
import { getAvailableAndSelectedChannels } from "../../../../utils/channels/getAvailableAndSelectedChannels";

export function useChannelsPreview() {
  const { selectedChannels } = getAvailableAndSelectedChannels()
  const connectedChannels = useMemo(
    () => selectedChannels?.channels.filter(hasConnectedAccounts),
    [selectedChannels],
  );
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const [expandedChannelId, setExpandedChannelId] = useState<string | null>(
    null,
  );
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (connectedChannels && connectedChannels?.length > 0) {
      if (isDesktop && !activeChannelId && connectedChannels) {
        setActiveChannelId(String(connectedChannels?.[0].id));
      } else if (!isDesktop && !expandedChannelId) {
        setExpandedChannelId(String(connectedChannels?.[0].id));
      }
    }
  }, []);

  const handleSelectChannel = (channelId: string) => {
    if (isDesktop) {
      setActiveChannelId(channelId || null);
    } else {
      setSelectedChannelId(channelId || null);
    }
  };

  const handleToggleChannel = (channelId: string) => {
    if (expandedChannelId === channelId) {
      setExpandedChannelId(null);
    } else {
      setExpandedChannelId(channelId);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return {
    selectedChannels: connectedChannels,
    activeChannelId,
    expandedChannelId,
    selectedChannelId,
    searchQuery,
    isDesktop,
    handleSelectChannel,
    handleToggleChannel,
    handleSearchChange,
  };
}
