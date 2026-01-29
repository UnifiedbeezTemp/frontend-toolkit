import { useAppQuery, api } from "../../../api";
import { WebchatConnectionsResponse } from "../connections/types";

export const useWebchatConnections = (options: { enabled?: boolean } = {}) => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useAppQuery<WebchatConnectionsResponse>(
    ["webchats"],
    () => api.get<WebchatConnectionsResponse>("/webchat"),
    {
      enabled: options.enabled,
    }
  );

  return {
    connections: data || { webchats: [] },
    isLoading,
    error,
    refetch,
    isFetching,
  };
};

