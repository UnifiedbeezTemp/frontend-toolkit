"use client";

import { useRef, useEffect } from "react";
import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useMicrosoftCalendarHandlers } from "./hooks/useMicrosoftCalendarHandlers";
import MicrosoftCalendarRequirements from "./components/MicrosoftCalendarRequirements";
import { useMicrosoftCalendarIntegration } from "./hooks/useMicrosoftCalendarIntegration";
import MicrosoftCalendarConnectionDetails from "./components/MicrosoftCalendarConnectionDetails";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import DeleteChannelModal from "../../management/DeleteChannelModal";

interface MicrosoftCalendarConfigProps extends BaseChannelConfigProps {
  onRefetchChannels?: () => void;
}

export default function MicrosoftCalendarConfig({
  channel,
  connection,
  onSave,
  onCancel,
  isLoading = false,
  onRefetchChannels,
  onEditConnection,
}: MicrosoftCalendarConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const startIntegrationRef = useRef<(() => void) | undefined>(undefined);

  const {
    startIntegration,
    isLoading: isMicrosoftCalendarConnecting,
    isDeleting,
    handleConfirmDelete: initiateDisconnect,
  } = useMicrosoftCalendarIntegration({
    onComplete: () => handleConnectionSuccess(),
    onRefetchChannels,
  });

  const {
    showRequirements,
    showDeleteModal,
    handleConnect,
    handleDeleteClick,
    handleConfirmDelete: onGlobalConfirmDelete,
    handleCloseDeleteModal,
    handleConnectionSuccess,
  } = useMicrosoftCalendarHandlers({
    connection,
    onSave,
    startMicrosoftCalendarIntegration: startIntegration,
    onConnectionSuccess: () => {
      if (onRefetchChannels) {
        onRefetchChannels();
      }
    },
    onEditConnection,
    onConfirmDelete: initiateDisconnect,
  });

  if (showRequirements && !connection) {
    return (
      <MicrosoftCalendarRequirements
        onConnect={handleConnect}
        isLoading={isMicrosoftCalendarConnecting}
      />
    );
  }

  if (connection) {
    return (
      <>
        <MicrosoftCalendarConnectionDetails
          connection={connection}
          onDelete={handleDeleteClick}
          isDeleting={isDeleting}
          variant={isDesktop ? "desktop" : "mobile"}
        />
        <DeleteChannelModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={onGlobalConfirmDelete}
          channelName={channel.channelName ?? ""}
          isLoading={isDeleting}
        />
      </>
    );
  }

  return null;
}
