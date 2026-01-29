import { useState } from "react";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface UseShopifyHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  startShopifyIntegration?: (shopDomain: string) => void;
  onConfirmDelete?: (accountId: number) => void;
}

export function useShopifyHandlers({
  connection,
  onSave,
  startShopifyIntegration,
  onConfirmDelete,
}: UseShopifyHandlersProps) {
  const [showRequirements, setShowRequirements] = useState(!connection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shopDomain, setShopDomain] = useState("");

  const handleConnect = () => {
    if (startShopifyIntegration) {
      startShopifyIntegration(shopDomain);
    }
  };

  const handleShopDomainChange = (value: string) => {
    setShopDomain(value);
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
    shopDomain,
    handleConnect,
    handleShopDomainChange,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
  };
}
