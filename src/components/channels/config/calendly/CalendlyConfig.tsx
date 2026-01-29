"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useCalendlyHandlers } from "./hooks/useCalendlyHandlers";
import CalendlyRequirements from "./components/CalendlyRequirements";
import { useCalendlyIntegration } from "./hooks/useCalendlyIntegration";
import CalendlyConnectionDetails from "./components/CalendlyConnectionDetails";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { CalendlyConnectResponse } from "../../../../services/calendlyService";
import DeleteChannelModal from "../../management/DeleteChannelModal";

interface CalendlyConfigProps extends BaseChannelConfigProps {
  onRefetchChannels?: () => Promise<void> | void;
}

export default function CalendlyConfig({
  channel,
  connection,
  onSave,
  isLoading = false,
  onRefetchChannels,
}: CalendlyConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleCalendlyComplete = (response: CalendlyConnectResponse) => {
    if (response.channel) {
      onSave({
        connectedChannel: response.channel,
        email: response.channel.email,
      });
    }
  };

  const channelId = parseInt(channel.id) || 0;

  const {
    startIntegration,
    isLoading: isCalendlyConnecting,
    isDeleting,
    handleConfirmDelete: initiateDisconnect,
  } = useCalendlyIntegration({
    channelId,
    onComplete: handleCalendlyComplete,
    onRefetchChannels,
  });

  const {
    showRequirements,
    showDeleteModal,
    handleConnect,
    handleDeleteClick,
    handleConfirmDelete: onGlobalConfirmDelete,
    handleCloseDeleteModal,
  } = useCalendlyHandlers({
    connection,
    onSave,
    startCalendlyIntegration: startIntegration,
    onConfirmDelete: initiateDisconnect,
  });

  if (showRequirements && !connection) {
    return (
      <CalendlyRequirements
        onConnect={handleConnect}
        isLoading={isCalendlyConnecting}
      />
    );
  }

  if (connection) {
    return (
      <>
        <CalendlyConnectionDetails
          connection={connection}
          onDelete={handleDeleteClick}
          isDeleting={isDeleting}
          variant={isDesktop ? "desktop" : "mobile"}
        />
        <DeleteChannelModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={onGlobalConfirmDelete}
          channelName={channel.channelName ?? "Calendly"}
          isLoading={isDeleting}
        />
      </>
    );
  }

  return null;
}
