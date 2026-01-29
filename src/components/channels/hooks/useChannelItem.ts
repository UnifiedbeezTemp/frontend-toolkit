import { useState } from "react";
import { useChannelState } from "./useChannelState";
import { ConnectionDisplayData } from "../connections/types";
import { Channel } from "../../../store/onboarding/types/channelTypes";
import { useChannelConnectionsData } from "./useChannelConnectionsData";

interface UseChannelItemProps {
  channel: Channel;
}

export function useChannelItem({ channel }: UseChannelItemProps) {
  const {
    isExpanded,
    toggleExpand,
  } = useChannelState(channel.id);
  
  const { connections, isLoading } = useChannelConnectionsData(channel);
  const hasChannelConnections = connections.length > 0;
  const [editingConnection, setEditingConnection] = useState<ConnectionDisplayData | null>(null);

  const handleEditConnection = (connection: ConnectionDisplayData | null) => {
    if (connection) {
      setEditingConnection(connection);
      setTimeout(() => {
        const formElement = document.querySelector('form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      setEditingConnection(null);
    }
  };

  const handleClose = () => {
    toggleExpand();
    setEditingConnection(null);
  };

  return {
    isExpanded,
    toggleExpand,
    hasChannelConnections,
    connections,
    editingConnection,
    handleEditConnection,
    handleClose,
    isLoading,
  };
}

