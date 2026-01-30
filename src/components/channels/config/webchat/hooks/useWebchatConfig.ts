import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";
import { useAppQuery } from "../../../../../api/query";
import { fetchWebsites } from "../../../../../api/websites";
import { ApiWebsite } from "../../../../../types/websiteTypes";

export interface WebchatFormData extends FieldValues {
  websiteUrl: string;
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
    },
  });

  useEffect(() => {
    if (connection?.id) {
      const websiteUrl =
        (connection?.configuration?.websiteUrl as string) || "";
      reset({
        websiteUrl: websiteUrl,
      });
    } else {
      reset({
        websiteUrl: "",
      });
    }
  }, [connection?.id, connection?.configuration?.websiteUrl, reset]);

  /* Fetch websites for selection */
  const { data: websites = [] } = useAppQuery(
    ["websites"],
    () => fetchWebsites(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  );

  const prepareFormData = (
    data: WebchatFormData,
  ): { websiteUrl: string; connectedChannelId: number } => {
    return {
      websiteUrl: data.websiteUrl || "",
      connectedChannelId: channelId,
    };
  };

  return {
    control,
    formHandleSubmit,
    setValue,
    watch,
    register,
    prepareFormData,
    websites: Array.isArray(websites) ? websites : [],
  };
}
