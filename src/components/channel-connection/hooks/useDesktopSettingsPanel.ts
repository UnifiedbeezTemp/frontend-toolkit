import { useMemo } from "react";
import { useChannelConnectionContext } from "../context/ChannelConnectionContext";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { getChannelIconKey } from "../../../utils/channels/getChannelIconKey";

export function useDesktopSettingsPanel() {
  const icons = useSupabaseIcons() as Record<string, string>;
  const { activeChannel, editingAccount, handleEditAccount, handleClose, refetch } = useChannelConnectionContext();

  const icon = useMemo(() => {
    if (!activeChannel) return null;
    const channelIconKey = getChannelIconKey(
      activeChannel?.availableChannel?.name ?? "",
    );
    return icons[channelIconKey] || icons.linkExternal;
  }, [activeChannel?.availableChannel?.name, icons]);

  return {
    activeChannel,
    icon,
    editingAccount,
    handleEditAccount,
    refetch,
    handleClose,
  };
}
