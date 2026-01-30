import { useState } from "react";
import { WhatsAppFormData } from "./useWhatsAppConfig";
import { useWhatsAppIntegration } from "./useWhatsAppIntegration";
import { WabaCallbackResponse } from "../../../../../types/channelApiTypes";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface UseWhatsAppHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  prepareFormData: (data: WhatsAppFormData) => Record<string, unknown>;
  readConfirmation: boolean;
  onRefetchChannels?: () => Promise<void> | void;
}

/**
 * Maps WabaChannel or WabaData from backend to ChannelConnectionFormData format
 */
const mapWabaChannelToConnectionData = (
  response: WabaCallbackResponse
): Record<string, unknown> => {
  const { channel, wabaData, channelId } = response;

  return {
    // Map backend channel fields to form data
    internalName:
      channel?.name || wabaData?.verifiedName || "WhatsApp Business",
    displayName:
      channel?.verifiedName || wabaData?.verifiedName || "WhatsApp Business",
    phoneNumber: channel?.phoneNumber || wabaData?.phoneNumber || "",
    businessName: channel?.businessName || wabaData?.verifiedName || "",
    verifiedName: channel?.verifiedName || wabaData?.verifiedName || "",
    isActive: channel?.isActive ?? true,
    connectedAt: channel?.connectedAt || new Date().toISOString(),
    // Store the channel ID for reference
    wabaChannelId: channel?.id || channelId,
    // Indicate this is from the integration flow
    connectedChannel: channel || wabaData,
  };
};

export function useWhatsAppHandlers({
  connection,
  onSave,
  prepareFormData,
  readConfirmation,
  onRefetchChannels,
}: UseWhatsAppHandlersProps) {
  const [showRequirements, setShowRequirements] = useState(!connection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { startIntegration, isLoading } = useWhatsAppIntegration(
    async (response: WabaCallbackResponse) => {
      if (response?.success) {
        // Map the channel data to connection format
        const connectionData = mapWabaChannelToConnectionData(response);

        if (onRefetchChannels) {
          await onRefetchChannels();
        }

        setShowRequirements(false);
        onSave(connectionData);
      }
    }
  );

  const handleContinue = () => {
    startIntegration();
  };

  const handleSubmit = (data: WhatsAppFormData) => {
    const formData = prepareFormData({
      ...data,
      readConfirmation,
    });
    onSave(formData);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (connection) {
      onSave({ _delete: true });
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
  };
}
