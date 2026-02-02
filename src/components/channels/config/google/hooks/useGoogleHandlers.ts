import { useState } from "react";
import { GoogleFormData } from "./useGoogleConfig";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface UseGoogleHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  startGoogleIntegration: () => void;
  onConfirmDelete?: (accountId: number) => void;
}

export function useGoogleHandlers({
  connection,
  onSave,
  startGoogleIntegration,
  onConfirmDelete,
}: UseGoogleHandlersProps) {
  const [showRequirements, setShowRequirements] = useState(!connection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConnect = () => {
    startGoogleIntegration();
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
