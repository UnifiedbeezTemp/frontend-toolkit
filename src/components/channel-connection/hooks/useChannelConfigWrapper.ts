import { useState, } from "react";
import { ChannelConnection, ChannelConnectionFormData } from "../../../types/channelConnectionTypes";
import { useAccountData } from "./useAccountData";
import { SelectedChannel } from "../../../types/channelApiTypes";
import { AccountDisplayData } from "../../../types/channelAccountDetailTypes";

interface UseChannelConfigWrapperProps {
  channel: SelectedChannel;
  editingAccountId?: string | number | null;
  onEditAccount?: (connection: ChannelConnection | null) => void;
  onClose?: () => void;
}

export function useChannelConfigWrapper({
  channel,
  editingAccountId,
  onEditAccount,
  onClose,
}: UseChannelConfigWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const channelName = channel.availableChannel?.name ?? "";

  const accountToEdit = useAccountData(
    channelName,
    editingAccountId ?? null,
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
    accountToEdit,
    isLoading,
    handleSaveWithDelete,
    handleCancel,
  };
}
