"use client";

import { Channel } from "../../../store/onboarding/types/channelTypes";
import { ConnectionDisplayData } from "../connections/types";
import { useChannelConnectionsData } from "../hooks/useChannelConnectionsData";
import ChannelPreview from "./ChannelPreview";

interface ChannelPreviewWithConnectionsProps {
  channel: Channel;
  isActive: boolean;
  onSelectChannel: (channelId: string) => void;
  onEditConnection?: (connection: ConnectionDisplayData | null) => void;
  editingConnectionId?: string | number | null;
}

export default function ChannelPreviewWithConnections({
  channel,
  isActive,
  onSelectChannel,
  onEditConnection,
  editingConnectionId,
}: ChannelPreviewWithConnectionsProps) {
  const { connections } = useChannelConnectionsData(channel);
  const isConnected = connections.length > 0;

  return (
    <ChannelPreview
      channel={channel}
      isExpanded={isActive}
      isConnected={isConnected}
      onToggle={() => onSelectChannel(channel.id)}
      connections={connections}
      onEdit={onEditConnection}
      editingConnectionId={editingConnectionId}
    />
  );
}
