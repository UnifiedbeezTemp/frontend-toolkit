import { useState } from "react";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface UseCalendlyHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  startCalendlyIntegration?: () => void;
  onConfirmDelete?: (accountId: number) => void;
}

export function useCalendlyHandlers({
  connection,
  onSave,
  startCalendlyIntegration,
  onConfirmDelete,
}: UseCalendlyHandlersProps) {
  const [showRequirements, setShowRequirements] = useState(!connection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConnect = () => {
    if (startCalendlyIntegration) {
      startCalendlyIntegration();
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
