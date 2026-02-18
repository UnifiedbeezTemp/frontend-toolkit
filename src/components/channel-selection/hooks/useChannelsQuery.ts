"use client";

import { api, useAppQuery } from "../../../api";
import {
  ChannelsApiResponse,
  SelectedChannelsResponse,
} from "../../../types/channelApiTypes";

export function useChannelsQuery() {
  const {
    data: availableChannels,
    isLoading: isLoadingAvailable,
    error: availableError,
    refetch: refetchAvailable,
    isFetching: isFetchingAvailable,
  } = useAppQuery<ChannelsApiResponse>(
    ["channels", "available"],
    () => api.get("/channels/available"),
    {
      enabled: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  );

  const {
    data: selectedChannels,
    isLoading: isLoadingSelected,
    error: selectedError,
    refetch: refetchSelected,
    isFetching: isFetchingSelected,
  } = useAppQuery<SelectedChannelsResponse>(
    ["channels", "selected"],
    () => api.get("/channels/selected"),
    {
      enabled: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  );

  const isLoading = isLoadingAvailable || isLoadingSelected;
  const isFetching = isFetchingAvailable || isFetchingSelected;
  const isError = !!availableError || !!selectedError;

  const refetch = async () => {
    await Promise.all([refetchAvailable(), refetchSelected()]);
  };

  return {
    availableChannels,
    selectedChannels,
    isLoading,
    isFetching,
    isError,
    refetch,
    availableError,
    selectedError,
  };
}
