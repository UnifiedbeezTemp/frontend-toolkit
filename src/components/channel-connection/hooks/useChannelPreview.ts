import { useMemo } from "react";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { getChannelIconKey } from "../../../utils/channels/getChannelIconKey";
import { SelectedChannel } from "../../../types/channelApiTypes";
import { AccountDisplayData } from "../../../types/channelAccountDetailTypes";

interface UseChannelPreviewProps {
  channel: SelectedChannel;
  accounts: AccountDisplayData[];
}

export function useChannelPreview({
  channel,
  accounts,
}: UseChannelPreviewProps) {
  const icons = useSupabaseIcons() as Record<string, string>;

  const accountsCount = accounts.length;
  const isConnected = accountsCount > 0;

  const icon = useMemo(() => {
    const channelIconKey = getChannelIconKey(channel?.availableChannel.name);
    return icons[channelIconKey] || icons.linkExternal;
  }, [channel?.availableChannel?.name, icons]);

  const connectionStatusText = useMemo(() => {
    if (isConnected && accountsCount > 0) {
      return `${accountsCount} account${accountsCount > 1 ? "s" : ""}`;
    }
    return "Setup in 2 minutes";
  }, [isConnected, accountsCount]);

  return {
    icon,
    isConnected,
    accountsCount,
    connectionStatusText,
    icons,
  };
}
