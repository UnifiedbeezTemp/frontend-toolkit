import React from "react";
import { getChannelAccountsMetadata } from "../../../utils/channels/getSelectedChannelAccountsMetadata";
import ChannelPreview from "../ChannelPreview";
import { useChannelConnectionContext } from "../context/ChannelConnectionContext";

export default function DesktopSidebar() {
  const {
    selectedChannels,
    activeChannel,
    handleSelectChannel,
    handleEditAccount,
    editingAccount,
  } = useChannelConnectionContext();

  return (
    <div className="overflow-y-auto flex-1">
      {selectedChannels?.channels?.map((channel) => {
        const isActive = activeChannel?.id === channel.id;
        const { accounts } = getChannelAccountsMetadata(channel);
        return (
          <ChannelPreview
            channel={channel}
            accounts={accounts}
            isExpanded={isActive}
            onToggle={() => handleSelectChannel(channel.id)}
            onEdit={handleEditAccount}
            editingAccountId={editingAccount?.id}
          />
        );
      })}
    </div>
  );
}
