import { useState } from "react";
import { ChannelConnection } from "../../../../types/channelConnectionTypes";

interface UseTelegramHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  onConfirmDelete?: (accountId: number) => void;
}

export function useTelegramHandlers({
  connection,
  onSave,
  onConfirmDelete,
}: UseTelegramHandlersProps) {
  const [showRequirements, setShowRequirements] = useState(!connection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleContinue = () => {
    setShowRequirements(false);
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
    handleContinue,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
  };
}
