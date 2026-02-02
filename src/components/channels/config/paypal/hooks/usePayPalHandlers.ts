import { useState } from "react";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface UsePayPalHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  startPayPalIntegration: () => void;
  onConfirmDelete?: (accountId: number) => void;
}

export function usePayPalHandlers({
  connection,
  onSave,
  startPayPalIntegration,
  onConfirmDelete,
}: UsePayPalHandlersProps) {
  const [showRequirements, setShowRequirements] = useState(!connection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConnect = () => {
    startPayPalIntegration();
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
