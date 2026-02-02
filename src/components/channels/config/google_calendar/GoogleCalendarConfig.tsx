"use client";

import { useRef, useEffect } from "react";
import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useGoogleCalendarHandlers } from "./hooks/useGoogleCalendarHandlers";
import GoogleCalendarRequirements from "./components/GoogleCalendarRequirements";
import { useGoogleCalendarIntegration } from "./hooks/useGoogleCalendarIntegration";
import GoogleCalendarConnectionDetails from "./components/GoogleCalendarConnectionDetails";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { GoogleCalendarConnectResponse } from "../../../../services/googleCalendarService";
import DeleteChannelModal from "../../management/DeleteChannelModal";

interface GoogleCalendarConfigProps extends BaseChannelConfigProps {
  onRefetchChannels?: () => void;
}

export default function GoogleCalendarConfig({
  channel,
  connection,
  onSave,
  onCancel,
  isLoading = false,
  onRefetchChannels,
  onEditConnection,
}: GoogleCalendarConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  const handleGoogleCalendarComplete = (
    response: GoogleCalendarConnectResponse,
  ) => {
    if (response.success) {
      handleConnectionSuccess();
    }
  };

  const {
    startIntegration,
    isLoading: isGoogleCalendarConnecting,
    isDeleting,
    handleConfirmDelete: initiateDisconnect,
  } = useGoogleCalendarIntegration({
    googleClientId,
    onComplete: handleGoogleCalendarComplete,
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
  } = useGoogleCalendarHandlers({
    connection,
    onSave,
    startGoogleCalendarIntegration: startIntegration,
    onConnectionSuccess: () => {
      if (onRefetchChannels) {
        onRefetchChannels();
      }
    },
    onEditConnection,
    onConfirmDelete: initiateDisconnect,
  });

  if (showRequirements && !connection) {
    return <GoogleCalendarRequirements onConnect={handleConnect} />;
  }

  if (connection) {
    return (
      <>
        <GoogleCalendarConnectionDetails
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
