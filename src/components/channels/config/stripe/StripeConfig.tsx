"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useStripeHandlers } from "./hooks/useStripeHandlers";
import StripeRequirements from "./components/StripeRequirements";
import { useStripeIntegration } from "./hooks/useStripeIntegration";
import StripeConnectionDetails from "./components/StripeConnectionDetails";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { StripeConnectResponse } from "../../../../services/stripeService";
import DeleteChannelModal from "../../management/DeleteChannelModal";

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

  const channelId = parseInt(channel.id) || 0;

  const { startIntegration, isLoading: isStripeConnecting } =
    useStripeIntegration({
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
    onSave,
    startStripeIntegration: startIntegration,
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
          isDeleting={isLoading}
          variant={isDesktop ? "desktop" : "mobile"}
        />
        <DeleteChannelModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          channelName={channel.channelName ?? "Stripe"}
          isLoading={isLoading}
        />
      </>
    );
  }

  return null;
}
