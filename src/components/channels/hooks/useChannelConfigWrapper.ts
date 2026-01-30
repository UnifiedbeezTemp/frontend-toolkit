import { useState, useEffect } from "react";
import { Channel } from "../../../store/onboarding/types/channelTypes";
import { ChannelConnection, ChannelConnectionFormData } from "../../../types/channelConnectionTypes";
import { useConnectionData } from "./useConnectionData";

interface UseChannelConfigWrapperProps {
  channel: Channel;
  editingConnectionId?: string | number | null;
  onEditConnection?: (connection: ChannelConnection | null) => void;
  onClose?: () => void;
}

export function useChannelConfigWrapper({
  channel,
  editingConnectionId,
  onEditConnection,
  onClose,
}: UseChannelConfigWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const channelName = channel.availableChannel?.name ?? "";

  const connectionToEdit = useConnectionData(
    channelName,
    editingConnectionId ?? null,
    channel
  );

  const handleSave = async (data: ChannelConnectionFormData) => {
    setIsLoading(true);
    try {
      if (onClose) {
        onClose();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveWithDelete = (data: ChannelConnectionFormData) => {
    if (data._delete) {
      return;
    }
    handleSave(data);
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return {
    connectionToEdit,
    isLoading,
    handleSaveWithDelete,
    handleCancel,
  };
}
