import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { WebchatFormData } from "./useWebchatConfig";
import { extractErrorMessage } from "../utils/errorUtils";
import { useAppMutation } from "../../../../../api";
import { WebchatCreateResponse, createWebchat, WebchatUpdateResponse, updateWebchat, WebchatDeleteResponse, deleteWebchat } from "../../../../../services/webchatService";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";
import { useToast } from "../../../../ui/toast/ToastProvider";

interface UseWebchatHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
  onEditConnection?: (connection: ChannelConnection | null) => void;
  prepareFormData: (data: WebchatFormData) => { websiteUrl: string; connectedChannelId: number };
}

export function useWebchatHandlers({
  connection,
  onSave,
  onCancel,
  onEditConnection,
  prepareFormData,
}: UseWebchatHandlersProps) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
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

  const isEditMode = Boolean(connection?.id);

  const refetchConnections = () => {
    queryClient.invalidateQueries({ queryKey: ["webchats"] });
  };

  const createWebchatMutation = useAppMutation<
    { websiteUrl: string; connectedChannelId: number },
    WebchatCreateResponse
  >(
    async (data) => {
      return await createWebchat(data);
    },
    {
      onSuccess: (response) => {
        showToast({
          title: "Success",
          description: "Webchat created successfully",
          variant: "success",
        });
        
        refetchConnections();
        onEditConnection?.(null);
        setForceShowRequirements(true);
        
        if (response.channel) {
          onSave({
            connectedChannel: response.channel,
            websiteUrl: response.channel.websiteUrl,
          });
        }
      },
      onError: (error: unknown) => {
        showToast({
          title: "Error",
          description: extractErrorMessage(error, "Failed to create webchat"),
          variant: "error",
        });
      },
    }
  );

  const updateWebchatMutation = useAppMutation<
    { websiteUrl: string },
    WebchatUpdateResponse
  >(
    async (data) => {
      if (!connection?.id) {
        throw new Error("Connection ID is required for update");
      }
      const webchatId = parseInt(connection.id, 10);
      if (isNaN(webchatId)) {
        throw new Error("Invalid webchat ID");
      }
      return await updateWebchat(webchatId, data);
    },
    {
      onSuccess: (response) => {
        showToast({
          title: "Success",
          description: "Webchat updated successfully",
          variant: "success",
        });
        
        refetchConnections();
        onEditConnection?.(null);
        setForceShowRequirements(true);
        
        if (response.channel) {
          onSave({
            connectedChannel: response.channel,
            websiteUrl: response.channel.websiteUrl,
          });
        }
      },
      onError: (error: unknown) => {
        showToast({
          title: "Error",
          description: extractErrorMessage(error, "Failed to update webchat"),
          variant: "error",
        });
      },
    }
  );

  const handleContinue = () => {
    setShowRequirements(false);
  };

  const handleSubmit = (data: WebchatFormData) => {
    if (isEditMode) {
      updateWebchatMutation.mutate({
        websiteUrl: data.websiteUrl,
      });
    } else {
      const formData = prepareFormData(data);
      createWebchatMutation.mutate(formData);
    }
  };

  const deleteWebchatMutation = useAppMutation<
    number,
    WebchatDeleteResponse
  >(
    async (webchatId) => {
      return await deleteWebchat(webchatId);
    },
    {
      onSuccess: () => {
        showToast({
          title: "Success",
          description: "Webchat deleted successfully",
          variant: "success",
        });
        
        refetchConnections();
        setShowDeleteModal(false);
        onEditConnection?.(null);
        setForceShowRequirements(true);
        
        onSave({ _delete: true });
      },
      onError: (error: unknown) => {
        showToast({
          title: "Error",
          description: extractErrorMessage(error, "Failed to delete webchat"),
          variant: "error",
        });
      },
    }
  );

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!connection?.id) {
      return;
    }
    const webchatId = parseInt(connection.id, 10);
    if (isNaN(webchatId)) {
      showToast({
        title: "Error",
        description: "Invalid webchat ID",
        variant: "error",
      });
      return;
    }
    deleteWebchatMutation.mutate(webchatId);
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
    isLoading: createWebchatMutation.isPending || updateWebchatMutation.isPending,
    isDeleting: deleteWebchatMutation.isPending,
  };
}

