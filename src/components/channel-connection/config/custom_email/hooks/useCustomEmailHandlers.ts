import { useState, useEffect } from "react";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface UseCustomEmailHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  startCustomEmailIntegration?: (domain: string) => void;
  onConnectionSuccess?: () => void;
  onEditConnection?: (connection: ChannelConnection | null) => void;
}

export function useCustomEmailHandlers({
  connection,
  onSave,
  startCustomEmailIntegration,
  onConnectionSuccess,
  onEditConnection,
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

  const handleConnect = (domain: string) => {
    if (startCustomEmailIntegration) {
      startCustomEmailIntegration(domain);
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

