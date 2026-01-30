"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useGoogleHandlers } from "./hooks/useGoogleHandlers";
import GoogleRequirements from "./components/GoogleRequirements";
import { useGmailIntegration } from "./hooks/useGmailIntegration";
import GmailConnectionDetails from "./components/GmailConnectionDetails";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { GmailConnectResponse } from "../../../../services/gmailService";
import DeleteChannelModal from "../../management/DeleteChannelModal";

interface GoogleConfigProps extends BaseChannelConfigProps {
  onRefetchChannels?: () => Promise<void> | void;
}

export default function GoogleConfig({
  channel,
  connection,
  onSave,
  onCancel,
  isLoading = false,
  onRefetchChannels,
}: GoogleConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleGmailComplete = (response: GmailConnectResponse) => {
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
    isLoading: isGmailConnecting,
    isDeleting,
    handleConfirmDelete: initiateDisconnect,
  } = useGmailIntegration({
    channelId,
    onComplete: handleGmailComplete,
    onRefetchChannels,
  });

  const {
    showRequirements,
    showDeleteModal,
    handleConnect,
    handleDeleteClick,
    handleConfirmDelete: onGlobalConfirmDelete,
    handleCloseDeleteModal,
  } = useGoogleHandlers({
    connection,
    onSave,
    startGoogleIntegration: startIntegration,
    onConfirmDelete: initiateDisconnect,
  });

  if (showRequirements && !connection) {
    return <GoogleRequirements onConnect={handleConnect} />;
  }

  if (connection) {
    return (
      <>
        <GmailConnectionDetails
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
