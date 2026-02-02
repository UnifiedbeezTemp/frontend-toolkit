import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChannelConnection, ChannelConnectionFormData } from "../../../../../types/channelConnectionTypes";

export interface PlaceholderFormData {
  name: string;
  apiKey?: string;
  apiSecret?: string;
}

export function usePlaceholderConfig(connection?: ChannelConnection | null) {
  const {
    control,
    handleSubmit: formHandleSubmit,
    setValue,
    watch,
    register,
    reset,
  } = useForm<PlaceholderFormData>({
    defaultValues: {
      name: connection?.configuration?.name || "",
      apiKey: connection?.configuration?.apiKey || "",
      apiSecret: connection?.configuration?.apiSecret || "",
    },
  });

  useEffect(() => {
    if (connection?.configuration) {
      reset({
        name: connection.configuration.name || "",
        apiKey: connection.configuration.apiKey || "",
        apiSecret: connection.configuration.apiSecret || "",
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

