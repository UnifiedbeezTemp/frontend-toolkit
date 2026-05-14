import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChannelConnection, ChannelConnectionFormData } from "../../../../../types/channelConnectionTypes";

export interface PlaceholderFormData {
  name: string;
  apiKey?: string;
  apiSecret?: string;
}

export function usePlaceholderConfig(connection?: ChannelConnection | null) {
  const configuration = connection?.configuration as Record<string, unknown> | undefined;

  const {
    control,
    handleSubmit: formHandleSubmit,
    setValue,
    watch,
    register,
    reset,
  } = useForm<PlaceholderFormData>({
    defaultValues: {
      name: typeof configuration?.name === "string" ? configuration.name : "",
      apiKey:
        typeof configuration?.apiKey === "string" ? configuration.apiKey : "",
      apiSecret:
        typeof configuration?.apiSecret === "string"
          ? configuration.apiSecret
          : "",
    },
  });

  useEffect(() => {
    if (configuration) {
      reset({
        name: typeof configuration.name === "string" ? configuration.name : "",
        apiKey: typeof configuration.apiKey === "string" ? configuration.apiKey : "",
        apiSecret:
          typeof configuration.apiSecret === "string"
            ? configuration.apiSecret
            : "",
      });
    } else {
      reset({
        name: "",
        apiKey: "",
        apiSecret: "",
      });
    }
  }, [connection, reset]);

  const prepareFormData = (data: PlaceholderFormData): ChannelConnectionFormData => {
    return {
      name: data.name || "",
      apiKey: data.apiKey || "",
      apiSecret: data.apiSecret || "",
    };
  };

  return {
    control,
    formHandleSubmit,
    setValue,
    watch,
    register,
    prepareFormData,
  };
}
