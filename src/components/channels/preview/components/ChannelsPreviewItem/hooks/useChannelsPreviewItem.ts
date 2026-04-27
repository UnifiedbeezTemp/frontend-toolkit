import { useState, useCallback, useMemo } from "react";
import { ChannelsPreviewItemProps } from "../../../types";
import { getChannelAccountsMetadata } from "../../../../../../utils/channels/getSelectedChannelAccountsMetadata";
import { getChannelIconKey } from "../../../../../../utils/channels/getChannelIconKey";
import { SelectedChannel } from "../../../../../../types/channelApiTypes";

interface UseChannelsPreviewItemProps extends Pick<
  ChannelsPreviewItemProps,
  "searchQuery" | "onSearchChange" | "onSelect" | "onToggle"
> {
  channel: SelectedChannel;
  icons: Record<string, string>;
}

export function useChannelsPreviewItem({
  channel,
  onSelect,
  onToggle,
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange,
  icons,
}: UseChannelsPreviewItemProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const searchQuery = externalSearchQuery ?? localSearchQuery;
  const onSearchChange = externalOnSearchChange ?? setLocalSearchQuery;

  const { accounts } = getChannelAccountsMetadata(channel);
  const accountsCount = accounts.length;
  const hasAccounts = accountsCount > 0;

  const icon = useMemo(() => {
    const channelIconKey = getChannelIconKey(channel?.availableChannel?.name);
    return icons[channelIconKey] || icons.linkExternal;
  }, [channel?.availableChannel?.name, icons]);

  const handleSearchChange = useCallback(
    (query: string) => {
      onSearchChange(query);
    },
    [onSearchChange],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      const isCheckboxClick = target.closest("[data-checkbox]");
      const isConnectionClick = target.closest("[data-connection-item]");

      if (isCheckboxClick) {
        onSelect();
      } else if (!isConnectionClick) {
        onToggle();
      }
    },
    [onSelect, onToggle],
  );

  return {
    searchQuery,
    hasAccounts,
    accountsCount,
    handleSearchChange,
    accounts,
    icon,
    handleClick,
  };
}
