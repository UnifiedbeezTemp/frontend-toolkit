"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useStripeHandlers } from "./hooks/useStripeHandlers";
import StripeRequirements from "./components/StripeRequirements";
import { useStripeIntegration } from "./hooks/useStripeIntegration";
import StripeConnectionDetails from "./components/StripeConnectionDetails";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { StripeConnectResponse } from "../../../../services/stripeService";
import DeleteChannelModal from "../../components/DeleteChannelModal";

interface StripeConfigProps extends BaseChannelConfigProps {
  onRefetchChannels?: () => Promise<void> | void;
}

export default function StripeConfig({
  channel,
  connection,
  onSave,
  isLoading = false,
  onRefetchChannels,
}: StripeConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleStripeComplete = (response: StripeConnectResponse) => {
    if (response.success) {
      onSave({
        connected: true,
      });
    }
  };

  const channelId = Number(channel.id) || 0;

  const {
    startIntegration,
    isLoading: isStripeConnecting,
    isDeleting,
    handleConfirmDelete: handleIntegrationDelete,
  } = useStripeIntegration({
    channelId,
    onComplete: handleStripeComplete,
    onRefetchChannels,
  });

  const {
    showRequirements,
    showDeleteModal,
    handleConnect,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
  } = useStripeHandlers({
    connection,
    startStripeIntegration: startIntegration,
    onConfirmDelete: handleIntegrationDelete,
  });

  if (showRequirements && !connection) {
    return (
      <StripeRequirements
        onConnect={handleConnect}
        isLoading={isStripeConnecting}
      />
    );
  }

  if (connection) {
    return (
      <>
        <StripeConnectionDetails
          connection={connection}
          onDelete={handleDeleteClick}
          isDeleting={isDeleting}
          variant={isDesktop ? "desktop" : "mobile"}
        />
        <DeleteChannelModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          channelName={channel.channelName ?? "Stripe"}
          isLoading={isDeleting}
        />
      </>
    );
  }

  return null;
}
