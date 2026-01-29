import { useState } from "react";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface UseStripeHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  startStripeIntegration?: () => void;
}

export function useStripeHandlers({
  connection,
  onSave,
  startStripeIntegration,
}: UseStripeHandlersProps) {
  const [showRequirements, setShowRequirements] = useState(!connection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConnect = () => {
    if (startStripeIntegration) {
      startStripeIntegration();
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (connection) {
      onSave({ _delete: true });
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
