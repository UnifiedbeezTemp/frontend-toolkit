import { useMemo } from "react";
import { ChannelConnectionsListProps } from "../../../types";

export function useChannelConnectionsList({
  connections,
  searchQuery,
}: Pick<ChannelConnectionsListProps, "connections" | "searchQuery">) {
  const filteredConnections = useMemo(() => {
    if (!searchQuery.trim()) {
      return connections;
    }

    const query = searchQuery.toLowerCase();
    return connections.filter((connection) => {
      const title = connection.title?.toLowerCase() || "";
      const subtitle = connection.subtitle?.toLowerCase() || "";

      return (
        title.includes(query) ||
        subtitle.includes(query)
      );
    });
  }, [connections, searchQuery]);

  return {
    filteredConnections,
  };
}

