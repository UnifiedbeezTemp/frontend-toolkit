import { useState, useEffect } from "react";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface UseInstagramHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  startInstagramIntegration?: () => void;
  onConnectionSuccess?: () => void;
  onEditConnection?: (connection: ChannelConnection | null) => void;
}

export function useInstagramHandlers({
  connection,
  onSave,
  startInstagramIntegration,
  onConnectionSuccess,
  onEditConnection,
}: UseInstagramHandlersProps) {
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

  const handleConnect = () => {
    if (startInstagramIntegration) {
      startInstagramIntegration();
    }
  };

  const handleConnectionSuccess = () => {
    if (onConnectionSuccess) {
      onConnectionSuccess();
    }
    onEditConnection?.(null);
    setForceShowRequirements(true);
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
    handleConnectionSuccess,
  };
}

