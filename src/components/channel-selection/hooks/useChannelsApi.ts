import { useAppQuery, api } from "../../../api";
import { ChannelsApiResponse, SelectedChannelsResponse } from "../../../types/channelApiTypes";

export const useChannelsApi = () => {
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
    }
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
    }
  );

  const isLoading = isLoadingAvailable || isLoadingSelected;
  const isFetching = isFetchingAvailable || isFetchingSelected;
  const error = availableError || selectedError;

  const refetch = async (): Promise<{
    availableChannels: ChannelsApiResponse | null;
    selectedChannels: SelectedChannelsResponse | null;
  }> => {
    const [availableResult, selectedResult] = await Promise.all([
      refetchAvailable(),
      refetchSelected(),
    ]);
    return {
      availableChannels: (availableResult.data as ChannelsApiResponse) || null,
      selectedChannels:
        (selectedResult.data as SelectedChannelsResponse) || null,
    };
  };

  return {
    availableChannels: availableChannels || null,
    selectedChannels: selectedChannels || null,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
