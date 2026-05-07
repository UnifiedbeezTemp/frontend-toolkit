import { useState } from "react";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface UseStripeHandlersProps {
  connection?: ChannelConnection | null;
  startStripeIntegration?: () => void;
  onConfirmDelete?: (accountId: number) => void;
}

export function useStripeHandlers({
  connection,
  startStripeIntegration,
  onConfirmDelete,
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
    if (connection && onConfirmDelete) {
      onConfirmDelete(Number(connection.id));
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
