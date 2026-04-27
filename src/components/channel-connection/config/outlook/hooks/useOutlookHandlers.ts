import { useState } from "react";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface UseOutlookHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  startOutlookIntegration?: () => void;
  onConfirmDelete?: (accountId: number) => void;
}

export function useOutlookHandlers({
  connection,
  onSave,
  startOutlookIntegration,
  onConfirmDelete,
}: UseOutlookHandlersProps) {
  const [showRequirements, setShowRequirements] = useState(!connection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConnect = () => {
    if (startOutlookIntegration) {
      startOutlookIntegration();
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
