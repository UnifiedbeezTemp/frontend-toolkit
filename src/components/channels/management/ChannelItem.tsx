"use client";

import { ChannelConnection } from "../../../types/channelConnectionTypes";
import ChannelConfigWrapper from "../config/ChannelConfigWrapper";
import { useChannelItem } from "../hooks/useChannelItem";
import ChannelPreview from "../preview/ChannelPreview";
import { ChannelItemProps } from "../types";


interface ChannelItemPropsWithRefetch extends ChannelItemProps {
  onRefetchChannels?: () => void;
}

export default function ChannelItem({
  channel,
  onRefetchChannels,
}: ChannelItemPropsWithRefetch) {
  const {
    isExpanded,
    toggleExpand,
    hasChannelConnections,
    connections,
    editingConnection,
    handleEditConnection,
    handleClose,
    isLoading,
  } = useChannelItem({ channel });

  const handleEditConnectionWrapper = (
    connection: ChannelConnection | null,
  ) => {
    handleEditConnection(null);

    if (connection) {
      const displayConnection = connections.find(
        (conn) => String(conn.id) === String(connection.id),
      );
      if (displayConnection) {
        handleEditConnection(displayConnection);
      }
    }
  };

  return (
    <div className="border-b border-border">
      <ChannelPreview
        channel={channel}
        isExpanded={isExpanded}
        isConnected={hasChannelConnections}
        onToggle={toggleExpand}
        connections={connections}
        onEdit={handleEditConnection}
        editingConnectionId={editingConnection?.id || null}
      />

      {isExpanded && (
        <ChannelConfigWrapper
          channel={channel}
          onClose={handleClose}
          onEditConnection={handleEditConnectionWrapper}
          editingConnectionId={editingConnection?.id || null}
          onRefetchChannels={onRefetchChannels}
        />
      )}
    </div>
  );
}
