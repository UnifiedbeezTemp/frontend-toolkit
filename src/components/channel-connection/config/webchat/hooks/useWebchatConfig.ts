import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";
import { WebchatUpdateRequest } from "../../../../../services/webchatService";

export interface WebchatFormData extends FieldValues {
  /**
   * Legacy field kept for backward compatibility with the old Webchat form.
   * The create flow no longer sends this to the backend.
   */
  websiteUrl?: string;
  teamName: string;
  chatName: string;
  readReceipts: boolean;
  profilePic: File | null;
}

export function useWebchatConfig(
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
  } = useForm<WebchatFormData>({
    defaultValues: {
      websiteUrl: (connection?.configuration?.websiteUrl as string) || "",
      teamName:
        (connection?.configuration?.teamName as string) || connection?.name || "",
      chatName: (connection?.configuration?.chatName as string) || "",
      readReceipts: Boolean(connection?.configuration?.readReceipts),
      profilePic: null,
    },
  });

  useEffect(() => {
    if (connection?.id) {
      const websiteUrl = (connection?.configuration?.websiteUrl as string) || "";
      const teamName =
        (connection?.configuration?.teamName as string) || connection?.name || "";
      const chatName = (connection?.configuration?.chatName as string) || "";
      const readReceipts = Boolean(connection?.configuration?.readReceipts);
      reset({
        websiteUrl: websiteUrl,
        teamName,
        chatName,
        readReceipts,
        profilePic: null,
      });
    } else {
      reset({
        websiteUrl: "",
        teamName: "",
        chatName: "",
        readReceipts: false,
        profilePic: null,
      });
    }
  }, [
    connection?.id,
    connection?.configuration?.websiteUrl,
    connection?.configuration?.teamName,
    connection?.configuration?.chatName,
    connection?.configuration?.readReceipts,
    connection?.name,
    reset,
  ]);

  const prepareCreateFormData = (data: WebchatFormData): FormData => {
    const formData = new FormData();
    formData.append("connectedChannelId", String(channelId));
    formData.append("teamName", data.teamName || "");
    formData.append("chatName", data.chatName || "");
    formData.append("readReceipts", String(Boolean(data.readReceipts)));

    if (data.profilePic) {
      formData.append("profilePic", data.profilePic);
    }

    return formData;
  };

  const prepareUpdatePayload = (data: WebchatFormData): WebchatUpdateRequest => {
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
  };
}
