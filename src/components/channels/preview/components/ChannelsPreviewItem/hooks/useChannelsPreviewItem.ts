import { useState, useCallback } from "react";
import { ChannelsPreviewItemProps } from "../../../types";
import { ConnectionDisplayData } from "../../../../connections/types";

interface UseChannelsPreviewItemProps extends Pick<ChannelsPreviewItemProps, "searchQuery" | "onSearchChange"> {
  connections: ConnectionDisplayData[];
}

export function useChannelsPreviewItem({
  connections,
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange,
}: UseChannelsPreviewItemProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const searchQuery = externalSearchQuery ?? localSearchQuery;
  const onSearchChange = externalOnSearchChange ?? setLocalSearchQuery;

  const connectionsCount = connections.length;
  const hasConnections = connectionsCount > 0;

  const handleSearchChange = useCallback((query: string) => {
    onSearchChange(query);
  }, [onSearchChange]);

  return {
    searchQuery,
    hasConnections,
    connectionsCount,
    handleSearchChange,
  };
}

