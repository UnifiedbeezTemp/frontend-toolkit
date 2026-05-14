import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChannelConnection, ChannelConnectionFormData } from "../../../../../types/channelConnectionTypes";

export interface PlaceholderFormData {
  name: string;
  apiKey?: string;
  apiSecret?: string;
}

export function usePlaceholderConfig(connection?: ChannelConnection | null) {
  const getDefaultValues = (input?: ChannelConnection | null): PlaceholderFormData => {
    const config = input?.configuration ?? {};
    const name = typeof config["name"] === "string" ? config["name"] : "";
    const apiKey = typeof config["apiKey"] === "string" ? config["apiKey"] : "";
    const apiSecret =
      typeof config["apiSecret"] === "string" ? config["apiSecret"] : "";

    return { name, apiKey, apiSecret };
  };

  const {
    control,
    handleSubmit: formHandleSubmit,
    setValue,
    watch,
    register,
    reset,
  } = useForm<PlaceholderFormData>({
    defaultValues: getDefaultValues(connection),
  });

  useEffect(() => {
    reset(getDefaultValues(connection));
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
