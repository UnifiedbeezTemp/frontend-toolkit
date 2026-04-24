import { useState, useEffect, useRef } from "react";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface UseGoogleCalendarHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  startGoogleCalendarIntegration?: () => void;
  onConnectionSuccess?: () => void;
  onEditConnection?: (connection: ChannelConnection | null) => void;
  onConfirmDelete?: (accountId: number) => void;
}

export function useGoogleCalendarHandlers({
  connection,
  onSave,
  startGoogleCalendarIntegration,
  onConnectionSuccess,
  onEditConnection,
  onConfirmDelete,
}: UseGoogleCalendarHandlersProps) {
  const [showRequirements, setShowRequirements] = useState(!connection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [forceShowRequirements, setForceShowRequirements] = useState(false);
  const startIntegrationRef = useRef(startGoogleCalendarIntegration);

  useEffect(() => {
    startIntegrationRef.current = startGoogleCalendarIntegration;
  }, [startGoogleCalendarIntegration]);

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
    if (startIntegrationRef.current) {
      startIntegrationRef.current();
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
