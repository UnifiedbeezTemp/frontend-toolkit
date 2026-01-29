import { useState } from "react";
import { PlaceholderFormData } from "./usePlaceholderConfig";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface UsePlaceholderHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  prepareFormData: (data: PlaceholderFormData) => Record<string, unknown>;
}

export function usePlaceholderHandlers({
  connection,
  onSave,
  prepareFormData,
}: UsePlaceholderHandlersProps) {
  const [showRequirements, setShowRequirements] = useState(!connection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleContinue = () => {
    setShowRequirements(false);
  };

  const handleSubmit = (data: PlaceholderFormData) => {
    const formData = prepareFormData(data);
    onSave(formData);
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
    handleContinue,
    handleSubmit,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
  };
}

