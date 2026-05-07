import { useState, useEffect } from "react";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface UseCustomEmailHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  startCustomEmailIntegration?: (fromEmail: string) => void;
  onConnectionSuccess?: () => void;
  onEditConnection?: (connection: ChannelConnection | null) => void;
  onConfirmDelete?: (accountId: number) => void;
}

export function useCustomEmailHandlers({
  connection,
  onSave,
  startCustomEmailIntegration,
  onConnectionSuccess,
  onEditConnection,
  onConfirmDelete,
}: UseCustomEmailHandlersProps) {
  const [showRequirements, setShowRequirements] = useState(!connection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [forceShowRequirements, setForceShowRequirements] = useState(false);

  useEffect(() => {
    if (forceShowRequirements) {
      setShowRequirements(true);
      return;
    }

    if (connection?.id) {
      setShowRequirements(false);
    } else {
      setShowRequirements(true);
    }
  }, [connection?.id, forceShowRequirements]);

  const handleConnect = (fromEmail: string) => {
    if (startCustomEmailIntegration) {
      startCustomEmailIntegration(fromEmail);
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

  const handleConnectionSuccess = () => {
    if (onConnectionSuccess) {
      onConnectionSuccess();
    }
    onEditConnection?.(null);
    setForceShowRequirements(true);
  };

  return {
    showRequirements,
    showDeleteModal,
    handleConnect,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    handleConnectionSuccess,
  };
}
