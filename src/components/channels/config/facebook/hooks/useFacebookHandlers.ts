import { useState, useEffect, useRef } from "react";
import { FacebookFormData } from "./useFacebookConfig";
import { Channel } from "../../../../../store/onboarding/types/channelTypes";
import { MessengerChannel } from "../../../../../services/facebookMessengerService";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";
import { useFacebookIntegration } from "./useFacebookIntegration";

interface UseFacebookHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  prepareFormData: (data: FacebookFormData) => Record<string, unknown>;
  readConfirmation: boolean;
  channel?: Channel;
  onClose?: () => void;
  onRefetchChannels?: () => Promise<void> | void;
}

/**
 * Maps MessengerChannel from backend to ChannelConnectionFormData format
 */
const mapMessengerChannelToConnectionData = (
  channel: MessengerChannel
): Record<string, unknown> => {
  return {
    name: channel.pageName || channel.channelName || "",
    pageName: channel.pageName || "",
    pageId: channel.pageId || "",
    isConnected: channel.isConnected,
    isActive: channel.isActive ?? true,
    canReceive: channel.canReceive ?? false,
    canSend: channel.canSend ?? false,
    connectedAt: channel.connectedAt || new Date().toISOString(),
    hasInstagram: channel.hasInstagram || false,
    instagramAccountId: channel.instagramAccountId || null,
    // Store the channel ID for reference
    messengerChannelId: channel.id,
    // Indicate this is from the integration flow
    connectedChannel: channel,
  };
};

export function useFacebookHandlers({
  connection,
  onSave,
  prepareFormData,
  readConfirmation,
  channel,
  onClose,
  onRefetchChannels,
}: UseFacebookHandlersProps) {
  // Check for connection by id or configuration to ensure we catch all edit scenarios
  const hasConnection =
    connection && (connection.id || connection.configuration);
  const [showRequirements, setShowRequirements] = useState(!hasConnection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Use ref to stabilize onSave callback
  const onSaveRef = useRef(onSave);
  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  const {
    isLoading,
    selectedChannel,
    connectedChannels,
    selectChannel,
    connectMessenger,
    loadConnectedChannels,
    disconnectChannel,
  } = useFacebookIntegration();

  // Sync showRequirements with connection state
  // Only show requirements when there's no connection (creating new)
  useEffect(() => {
    const hasConnection =
      connection && (connection.id || connection.configuration);
    setShowRequirements(!hasConnection);
  }, [connection]);

  // Only check for existing connections once on mount if no connection exists
  // Don't auto-load - let user explicitly connect
  // The OAuth callback handler in useFacebookIntegration will handle loading after OAuth

  const handleContinue = async () => {
    if (!channel?.availableChannelId) {
      // If no availableChannelId, just hide requirements (for manual form entry)
      setShowRequirements(false);
      return;
    }

    try {
      if (channel.isSelected) {
        connectMessenger(channel.availableChannelId);
        return;
      }

      try {
        await selectChannel(channel.availableChannelId);
      } catch (error: unknown) {}

      connectMessenger(channel.availableChannelId);
    } catch (error) {
      console.error("Failed to start Facebook connection:", error);
    }
  };

  const handleSubmit = async (data: FacebookFormData) => {
    const formData = prepareFormData({
      ...data,
      readConfirmation,
    });

    if (onRefetchChannels) {
      await onRefetchChannels();
    }

    onSave(formData);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (connection?.id) {
      try {
        await disconnectChannel(Number(connection.id));

        if (onRefetchChannels) {
          await onRefetchChannels();
        }

        setShowDeleteModal(false);
        onClose?.();
      } catch (error) {}
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return {
    showRequirements,
    showDeleteModal,
    isLoading,
    handleContinue,
    handleSubmit,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    onClose,
  };
}
