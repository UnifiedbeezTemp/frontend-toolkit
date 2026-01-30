"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useZoomHandlers } from "./hooks/useZoomHandlers";
import ZoomRequirements from "./components/ZoomRequirements";
import { useZoomIntegration } from "./hooks/useZoomIntegration";
import ZoomConnectionDetails from "./components/ZoomConnectionDetails";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { ZoomConnectResponse } from "../../../../services/zoomService";
import DeleteChannelModal from "../../management/DeleteChannelModal";

interface ZoomConfigProps extends BaseChannelConfigProps {
  onRefetchChannels?: () => Promise<void> | void;
}

export default function ZoomConfig({
  channel,
  connection,
  onSave,
  isLoading = false,
  onRefetchChannels,
}: ZoomConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleZoomComplete = (response: ZoomConnectResponse) => {
    if (response.success) {
      onSave({
        connected: true,
      });
    }
  };

  const channelId = parseInt(channel.id) || 0;

  const {
    startIntegration,
    isLoading: isZoomConnecting,
    isDeleting,
    handleConfirmDelete: initiateDisconnect,
  } = useZoomIntegration({
    channelId,
    onComplete: handleZoomComplete,
    onRefetchChannels,
  });

  const {
    showRequirements,
    showDeleteModal,
    handleConnect,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
  } = useZoomHandlers({
    connection,
    onSave,
    startZoomIntegration: startIntegration,
    onConfirmDelete: initiateDisconnect,
  });

  if (showRequirements && !connection) {
    return (
      <ZoomRequirements
        onConnect={handleConnect}
        isLoading={isZoomConnecting}
      />
    );
  }

  if (connection) {
    return (
      <>
        <ZoomConnectionDetails
          connection={connection}
          onDelete={handleDeleteClick}
          isDeleting={isDeleting}
          variant={isDesktop ? "desktop" : "mobile"}
        />
        <DeleteChannelModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          channelName={channel.channelName ?? "Zoom"}
          isLoading={isDeleting}
        />
      </>
    );
  }

  return null;
}
