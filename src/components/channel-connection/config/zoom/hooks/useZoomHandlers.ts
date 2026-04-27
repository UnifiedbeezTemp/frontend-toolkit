import { useState } from "react";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface UseZoomHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  startZoomIntegration?: () => void;
  onConfirmDelete?: (accountId: number) => void;
}

export function useZoomHandlers({
  connection,
  onSave,
  startZoomIntegration,
  onConfirmDelete,
}: UseZoomHandlersProps) {
  const [showRequirements, setShowRequirements] = useState(!connection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConnect = () => {
    if (startZoomIntegration) {
      startZoomIntegration();
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (connection) {
      if (onConfirmDelete) {
        onConfirmDelete(Number(connection.id));
      } else {
        onSave({ _delete: true });
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return {
    showRequirements,
    showDeleteModal,
    handleConnect,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
  };
}
