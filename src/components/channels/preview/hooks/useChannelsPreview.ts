import { useMemo, useState } from "react";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { useChannels } from "../../../channel-selection/hooks/useChannels";
import { hasConnectedAccounts } from "../../utils/channelConnections";

export function useChannelsPreview() {
  const { selectedChannels } = useChannels();
  const connectedChannels = useMemo(
    () => selectedChannels.filter(hasConnectedAccounts),
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
