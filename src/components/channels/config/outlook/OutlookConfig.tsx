"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useOutlookHandlers } from "./hooks/useOutlookHandlers";
import OutlookRequirements from "./components/OutlookRequirements";
import { useOutlookIntegration } from "./hooks/useOutlookIntegration";
import { OutlookConnectResponse } from "./types";
import OutlookConnectionDetails from "./components/OutlookConnectionDetails";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import DeleteChannelModal from "../../management/DeleteChannelModal";

interface OutlookConfigProps extends BaseChannelConfigProps {
  onRefetchChannels?: () => Promise<void> | void;
}

export default function OutlookConfig({
  channel,
  connection,
  onSave,
  onCancel,
  isLoading = false,
  onRefetchChannels,
}: OutlookConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleOutlookComplete = (response: OutlookConnectResponse) => {
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
    isLoading: isOutlookConnecting,
    isDeleting,
    handleConfirmDelete: initiateDisconnect,
  } = useOutlookIntegration({
    channelId,
    onComplete: handleOutlookComplete,
    onRefetchChannels,
  });

  const {
    showRequirements,
    showDeleteModal,
    handleConnect,
    handleDeleteClick,
    handleConfirmDelete: onGlobalConfirmDelete,
    handleCloseDeleteModal,
  } = useOutlookHandlers({
    connection,
    onSave,
    startOutlookIntegration: startIntegration,
    onConfirmDelete: initiateDisconnect,
  });

  if (showRequirements && !connection) {
    return (
      <OutlookRequirements
        onConnect={handleConnect}
        isLoading={isOutlookConnecting}
      />
    );
  }

  if (connection) {
    return (
      <>
        <OutlookConnectionDetails
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
