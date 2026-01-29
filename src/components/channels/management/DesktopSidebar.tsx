"use client";

import ChannelPreviewWithConnections from "../preview/ChannelPreviewWithConnections";
import { DesktopSidebarProps } from "../types";

export default function DesktopSidebar({
  channels,
  activeChannelId,
  onSelectChannel,
  onEditConnection,
  editingConnectionId,
}: DesktopSidebarProps) {
  return (
    <div className="overflow-y-auto flex-1">
      {channels.map((channel) => {
        const isActive = activeChannelId === channel.id;

        return (
          <ChannelPreviewWithConnections
            key={channel.id}
            channel={channel}
            isActive={isActive}
            onSelectChannel={onSelectChannel}
            onEditConnection={onEditConnection}
            editingConnectionId={editingConnectionId}
          />
        );
      })}
    </div>
  );
}
