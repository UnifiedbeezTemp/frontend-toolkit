import { useState, useCallback } from "react";
import { useAIAssistants } from "./useAIAssistants";
import { useAssistantForm } from "./useAssistantForm";
import { useToast } from "../../../../ui/toast/useToast";

export function useAIAssistantFormActions() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const {
    assistants,
    usage,
    canCreateMore,
    createAssistant,
    updateAssistantName,
    deleteAssistant,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAIAssistants();

  const { botName, setBotName, isValid, resetForm } = useAssistantForm();

  const { showToast } = useToast();

  const assistantsLeft =
    !usage || usage.unlimited ? "Unlimited" : usage.remaining ?? 0;

  const handleAddAssistant = useCallback(async () => {
    if (!canCreateMore) {
      showToast({
        variant: "warning",
        title: "Plan limit reached",
        description: "Upgrade your plan to add more AI assistants.",
      });
      return;
    }

    if (botName.trim() && isValid) {
      await createAssistant({
        name: botName.trim(),
        useProfileMapping: true,
      });
      resetForm();
    } else {
      await createAssistant();
    }
  }, [canCreateMore, createAssistant, showToast, botName, isValid, resetForm]);

  const handleEditAssistant = useCallback(
    (id: string) => {
      const assistant = assistants.find((a) => a.id === id);
      if (assistant) {
        setBotName(assistant.name);
        setEditingId(id);
      }
    },
    [assistants, setBotName]
  );

  const handleSaveEdit = useCallback(async () => {
    if (editingId && isValid) {
      await updateAssistantName({ id: editingId, name: botName.trim() });
      resetForm();
      setEditingId(null);
    }
  }, [editingId, isValid, botName, updateAssistantName, resetForm]);

  const handleCancelEdit = useCallback(() => {
    resetForm();
    setEditingId(null);
  }, [resetForm]);

  const handleDeleteAssistant = useCallback(async () => {
    if (!pendingDeleteId) return;
    await deleteAssistant(pendingDeleteId);
    if (pendingDeleteId === editingId) {
      handleCancelEdit();
    }
    setPendingDeleteId(null);
  }, [pendingDeleteId, editingId, deleteAssistant, handleCancelEdit]);

  const handleDeleteRequest = useCallback((id: string) => {
    setPendingDeleteId(id);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setPendingDeleteId(null);
  }, []);

  const isEditing = !!editingId;

  return {
    editingId,
    pendingDeleteId,
    assistants,
    usage,
    assistantsLeft,
    botName,
    isValid,
    isCreating,
    isUpdating,
    isDeleting,
    isEditing,
    setBotName,
    handleAddAssistant,
    handleEditAssistant,
    handleSaveEdit,
    handleCancelEdit,
    handleDeleteAssistant,
    handleDeleteRequest,
    handleCloseDeleteModal,
  };
}
