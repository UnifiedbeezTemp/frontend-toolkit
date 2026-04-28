import { useAppQuery, api } from "../../api";
import { ChannelsApiResponse, SelectedChannelsResponse } from "../../types/channelApiTypes";

export const getAvailableAndSelectedChannels = () => {
  const {
    data: availableChannels,
    isLoading: isLoadingAvailable,
    error: availableError,
    refetch: refetchAvailable,
    isFetching: isFetchingAvailable,
  } = useAppQuery<ChannelsApiResponse>(
    ["channels", "all"],
    () => api.get("/channels/available/all"),
    {
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
      refetchOnWindowFocus: false,
    },
  );

  const isLoading = isLoadingAvailable || isLoadingSelected;
  const isFetching = isFetchingAvailable || isFetchingSelected;
  const error = availableError || selectedError;

  const refetch = async () => {
    const [availableResult, selectedResult] = await Promise.all([
      refetchAvailable(),
      refetchSelected(),
    ]);

    return {
      availableChannels: availableResult.data || null,
      selectedChannels: selectedResult.data || null,
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
