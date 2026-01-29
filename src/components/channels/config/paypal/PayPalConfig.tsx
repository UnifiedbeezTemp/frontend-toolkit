"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { usePayPalHandlers } from "./hooks/usePayPalHandlers";
import PayPalRequirements from "./components/PayPalRequirements";
import { usePayPalIntegration } from "./hooks/usePayPalIntegration";
import PayPalConnectionDetails from "./components/PayPalConnectionDetails";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { PayPalConnectResponse } from "../../../../services/paypalService";
import DeleteChannelModal from "../../management/DeleteChannelModal";

interface PayPalConfigProps extends BaseChannelConfigProps {
  onRefetchChannels?: () => Promise<void> | void;
}

export default function PayPalConfig({
  channel,
  connection,
  onSave,
  isLoading = false,
  onRefetchChannels,
}: PayPalConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handlePayPalComplete = (response: PayPalConnectResponse) => {
    if (response.success) {
      onSave({
        connected: true,
      });
    }
  };

  const channelId = parseInt(channel.id) || 0;

  const {
    startIntegration,
    isLoading: isPayPalConnecting,
    isDeleting,
    handleConfirmDelete,
  } = usePayPalIntegration({
    channelId,
    onComplete: handlePayPalComplete,
    onRefetchChannels,
  });

  const {
    showRequirements,
    showDeleteModal,
    handleConnect,
    handleDeleteClick,
    handleConfirmDelete: onGlobalConfirmDelete,
    handleCloseDeleteModal,
  } = usePayPalHandlers({
    connection,
    onSave,
    startPayPalIntegration: startIntegration,
    onConfirmDelete: handleConfirmDelete,
  });

  if (showRequirements && !connection) {
    return (
      <PayPalRequirements
        onConnect={handleConnect}
        isLoading={isPayPalConnecting}
      />
    );
  }

  if (connection) {
    return (
      <>
        <PayPalConnectionDetails
          connection={connection}
          onDelete={handleDeleteClick}
          isDeleting={isDeleting}
          variant={isDesktop ? "desktop" : "mobile"}
        />
        <DeleteChannelModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={onGlobalConfirmDelete}
          channelName={channel.channelName ?? "PayPal"}
          isLoading={isDeleting}
        />
      </>
    );
  }

  return null;
}
