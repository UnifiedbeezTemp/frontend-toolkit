import { useAppQuery, api } from "../../../api";
import { WebchatConnectionsResponse, WebchatConnection } from "../connections/types";

type WebchatConnectionsApiResponse = WebchatConnectionsResponse | WebchatConnection[];

export const useWebchatConnections = (options: { enabled?: boolean } = {}) => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useAppQuery<WebchatConnectionsApiResponse>(
    ["webchats"],
    () => api.get<WebchatConnectionsApiResponse>("/webchat"),
    {
      enabled: options.enabled,
    }
  );

  const connections: WebchatConnectionsResponse = Array.isArray(data)
    ? { webchats: data }
    : data || { webchats: [] };

  return {
    connections,
    isLoading,
    error,
    refetch,
    isFetching,
  };
};
