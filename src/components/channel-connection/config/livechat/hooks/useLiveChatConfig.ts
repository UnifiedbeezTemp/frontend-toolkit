import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";
import { LiveChatUpdateRequest } from "../../../../../services/livechatService";

export interface LiveChatFormData extends FieldValues {
  teamName: string;
  chatName: string;
  readReceipts: boolean;
  profilePic: File | null;
}

export function useLiveChatConfig(
  channelId: number,
  connection?: ChannelConnection | null,
) {
  const {
    control,
    handleSubmit: formHandleSubmit,
    setValue,
    watch,
    register,
    reset,
  } = useForm<LiveChatFormData>({
    defaultValues: {
      teamName:
        (connection?.configuration?.teamName as string) ||
        connection?.name ||
        "",
      chatName: (connection?.configuration?.chatName as string) || "",
      readReceipts: Boolean(connection?.configuration?.readReceipts),
      profilePic: null,
    },
  });

  useEffect(() => {
    if (connection?.id) {
      const teamName =
        (connection?.configuration?.teamName as string) ||
        connection?.name ||
        "";
      const chatName = (connection?.configuration?.chatName as string) || "";
      const readReceipts = Boolean(connection?.configuration?.readReceipts);
      reset({
        teamName,
        chatName,
        readReceipts,
        profilePic: null,
      });
    } else {
      reset({
        teamName: "",
        chatName: "",
        readReceipts: false,
        profilePic: null,
      });
    }
  }, [
    connection?.id,
    connection?.configuration?.teamName,
    connection?.configuration?.chatName,
    connection?.configuration?.readReceipts,
    connection?.name,
    reset,
  ]);

  const prepareCreateFormData = (data: LiveChatFormData): FormData => {
    const formData = new FormData();
    // formData.append("connectedChannelId", String(channelId));
    formData.append("teamName", data.teamName || "");
    formData.append("chatName", data.chatName || "");
    formData.append("readReceipts", String(Boolean(data.readReceipts)));

    if (data.profilePic) {
      formData.append("profilePic", data.profilePic);
    }

    return formData;
  };

  const prepareUpdatePayload = (
    data: LiveChatFormData,
  ): LiveChatUpdateRequest => {
    return {
      teamName: data.teamName || "",
      chatName: data.chatName || "",
      readReceipts: Boolean(data.readReceipts),
    };
  };

  return {
    control,
    formHandleSubmit,
    setValue,
    watch,
    register,
    prepareCreateFormData,
    prepareUpdatePayload,
    reset,
  };
}
