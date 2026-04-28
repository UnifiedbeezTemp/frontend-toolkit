import { useRef, useEffect } from "react";
import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useInstagramHandlers } from "./hooks/useInstagramHandlers";
import InstagramRequirements from "./components/InstagramRequirements";
import { useInstagramIntegration } from "./hooks/useInstagramIntegration";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import DeleteChannelModal from "../../components/DeleteChannelModal";
import InstagramConnectionDetails from "./components/InstagramConnectionDetails";

interface InstagramConfigProps extends BaseChannelConfigProps {
  onRefetchChannels?: () => Promise<void> | void;
}

export default function InstagramConfig({
  channel,
  connection,
  onSave,
  onCancel,
  isLoading: externalIsLoading = false,
  onRefetchChannels,
  onEditConnection,
}: InstagramConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const startIntegrationRef = useRef<(() => void) | undefined>(undefined);
  const handleConfirmDeleteRef = useRef<
    ((accountId: number) => void) | undefined
  >(undefined);
  const handleCloseDeleteModalRef = useRef<(() => void) | undefined>(undefined);

  const {
    showRequirements,
    showDeleteModal,
    handleConnect,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    handleConnectionSuccess,
  } = useInstagramHandlers({
    connection,
    onSave,
    startInstagramIntegration: startIntegrationRef.current,
    onConnectionSuccess: () => {
      if (onRefetchChannels) {
        onRefetchChannels();
      }
    },
    onEditConnection,
    onConfirmDelete: (id) => handleConfirmDeleteRef.current?.(id),
  });

  const {
    startIntegration,
    isLoading: isInstagramConnecting,
    isDeleting,
    handleConfirmDelete: handleIntegrationDelete,
  } = useInstagramIntegration({
    onComplete: handleConnectionSuccess,
    onDeleteSuccess: () => handleCloseDeleteModalRef.current?.(),
    onRefetchChannels,
  });

  const isLoading = externalIsLoading || isInstagramConnecting || isDeleting;

  useEffect(() => {
    startIntegrationRef.current = startIntegration;
    handleConfirmDeleteRef.current = handleIntegrationDelete;
    handleCloseDeleteModalRef.current = handleCloseDeleteModal;
  }, [startIntegration, handleIntegrationDelete, handleCloseDeleteModal]);

  if (showRequirements && !connection) {
    return (
      <InstagramRequirements onConnect={handleConnect} isLoading={isLoading} />
    );
  }

  if (connection) {
    return (
      <>
        <InstagramConnectionDetails
          connection={connection}
          onDelete={handleDeleteClick}
          isDeleting={isLoading}
          variant={isDesktop ? "desktop" : "mobile"}
        />
        <DeleteChannelModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          channelName={channel.channelName ?? "Instagram"}
          isLoading={isLoading}
        />
      </>
    );
  }

  return null;
}
