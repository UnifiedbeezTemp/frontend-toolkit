import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLiveChatConfig, LiveChatFormData } from "./useLiveChatConfig";
import { useAppMutation } from "../../../../../api";
import {
  LiveChatCreateResponse,
  createLiveChat,
  LiveChatUpdateResponse,
  LiveChatUpdateRequest,
  updateLiveChat,
  uploadLiveChatProfilePic,
  LiveChatDeleteResponse,
  deleteLiveChat,
} from "../../../../../services/livechatService";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";
import { useToast } from "../../../../ui/toast/ToastProvider";
import { extractErrorMessage } from "../../../../../utils/extractErrorMessage";

interface UseLiveChatHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
  onEditConnection?: (connection: ChannelConnection | null) => void;
  prepareCreateFormData: (data: LiveChatFormData) => FormData;
  prepareUpdatePayload: (data: LiveChatFormData) => LiveChatUpdateRequest;
  reset: (values?: LiveChatFormData) => void;
}

type UpdateLiveChatInput = {
  payload: LiveChatUpdateRequest;
  profilePic: File | null;
};

export function useLiveChatHandlers({
  connection,
  onSave,
  onCancel,
  onEditConnection,
  prepareCreateFormData,
  prepareUpdatePayload,
  reset,
}: UseLiveChatHandlersProps) {
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
    queryClient.invalidateQueries({ queryKey: ["livechats"] });
    queryClient.invalidateQueries({ queryKey: ["channels", "selected"] });
  };

  const createLiveChatMutation = useAppMutation<
    FormData,
    LiveChatCreateResponse
  >(
    async (data) => {
      return await createLiveChat(data);
    },
    {
      onSuccess: (response) => {
        showToast({
          title: "Success",
          description: "Livechat created successfully",
          variant: "success",
        });

        refetchConnections();
        reset();
        onEditConnection?.(null);
        setForceShowRequirements(true);

        if (response.channel) {
          onSave({
            connectedChannel: response.channel,
          });
        }
      },
      onError: (error: unknown) => {
        showToast({
          title: "Error",
          description: extractErrorMessage(error, "Failed to create livechat"),
          variant: "error",
        });
      },
    },
  );

  const updateLiveChatMutation = useAppMutation<
    UpdateLiveChatInput,
    LiveChatUpdateResponse
  >(
    async ({ payload, profilePic }) => {
      if (!connection?.id) {
        throw new Error("Connection ID is required for update");
      }

      const livechatId = parseInt(connection.id, 10);
      if (isNaN(livechatId)) {
        throw new Error("Invalid livechat ID");
      }

      const updateResponse = await updateLiveChat(livechatId, payload);

      if (profilePic) {
        const uploadResponse = await uploadLiveChatProfilePic(
          livechatId,
          profilePic,
        );
        return uploadResponse || updateResponse;
      }

      return updateResponse;
    },
    {
      onSuccess: (response) => {
        showToast({
          title: "Success",
          description: "Livechat updated successfully",
          variant: "success",
        });

        refetchConnections();
        onEditConnection?.(null);
        setForceShowRequirements(true);

        if (response.channel) {
          onSave({
            connectedChannel: response.channel,
          });
        }
      },
      onError: (error: unknown) => {
        showToast({
          title: "Error",
          description: extractErrorMessage(error, "Failed to update livechat"),
          variant: "error",
        });
      },
    },
  );

  const handleContinue = () => {
    setShowRequirements(false);
  };

  const handleSubmit = (data: LiveChatFormData) => {
    if (isEditMode) {
      const payload = prepareUpdatePayload(data);
      if (process.env.NODE_ENV !== "production") {
        console.log(
          `[livechat] PATCH /livechat/${connection?.id ?? ":id"} payload`,
          payload,
        );
      }

      updateLiveChatMutation.mutate({
        payload,
        profilePic: data.profilePic ?? null,
      });
    } else {
      createLiveChatMutation.mutate(prepareCreateFormData(data));
    }
  };

  const deleteLiveChatMutation = useAppMutation<number, LiveChatDeleteResponse>(
    async (livechatId) => {
      return await deleteLiveChat(livechatId);
    },
    {
      onSuccess: () => {
        showToast({
          title: "Success",
          description: "Livechat deleted successfully",
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
          description: extractErrorMessage(error, "Failed to delete livechat"),
          variant: "error",
        });
      },
    },
  );

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!connection?.id) {
      return;
    }
    const livechatId = parseInt(connection.id, 10);
    if (isNaN(livechatId)) {
      showToast({
        title: "Error",
        description: "Invalid livechat ID",
        variant: "error",
      });
      return;
    }
    deleteLiveChatMutation.mutate(livechatId);
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
    isLoading:
      createLiveChatMutation.isPending || updateLiveChatMutation.isPending,
    isDeleting: deleteLiveChatMutation.isPending,
  };
}
