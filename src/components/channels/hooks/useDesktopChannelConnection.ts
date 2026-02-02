import { useState } from "react";
import { ConnectionDisplayData } from "../connections/types";
import { useChannelConnection } from "./useChannelConnection";

export function useDesktopChannelConnection() {
  const {
    selectedChannels,
    activeChannel,
    handleSelectChannel,
    isChannelConnected,
    setActiveChannelId,
  } = useChannelConnection();
  const [editingConnection, setEditingConnection] =
    useState<ConnectionDisplayData | null>(null);

  const handleEditConnection = (connection: ConnectionDisplayData | null) => {
    setEditingConnection(connection || null);
  };

  const handleClose = () => {
    setActiveChannelId(null);
    setEditingConnection(null);
  };

  return {
    selectedChannels,
    activeChannel,
    handleSelectChannel,
    isChannelConnected,
    editingConnection,
    handleEditConnection,
    handleClose,
  };
}
