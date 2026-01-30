import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import { addChannelConnection, updateChannelConnection, deleteChannelConnection } from "../../../store/onboarding/slices/channelConnectionsSlice";
import { ChannelConnection, ChannelConnectionFormData } from "../../../types/channelConnectionTypes";

export function useChannelConnections() {
  const dispatch = useAppDispatch();
  const connections = useAppSelector((state) => state?.channelConnections?.connections);

  const getConnections = useCallback(
    (channelId: string): ChannelConnection[] => {
      return connections[channelId] || [];
    },
    [connections]
  );

  const addConnection = useCallback(
    (
      channelId: string,
      data: ChannelConnectionFormData,
      name?: string
    ) => {
      const connectionName =
        name ||
        data.name ||
        data.displayName ||
        data.internalName ||
        `${channelId} Connection ${(connections[channelId]?.length || 0) + 1}`;

      const newConnection: ChannelConnection = {
        id: `conn-${Date.now()}-${Math.random()}`,
        channelId,
        name: connectionName,
        configuration: data,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch(
        addChannelConnection({
          channelId,
          connection: newConnection,
        })
      );

      return newConnection;
    },
    [connections, dispatch]
  );

  const updateConnection = useCallback(
    (
      channelId: string,
      connectionId: string,
      data: ChannelConnectionFormData
    ) => {
      dispatch(
        updateChannelConnection({
          channelId,
          connectionId,
          data,
        })
      );
    },
    [dispatch]
  );

  const deleteConnection = useCallback(
    (channelId: string, connectionId: string) => {
      dispatch(
        deleteChannelConnection({
          channelId,
          connectionId,
        })
      );
    },
    [dispatch]
  );

  const hasConnections = useCallback(
    (channelId: string): boolean => {
      return (connections[channelId]?.length || 0) > 0;
    },
    [connections]
  );

  return {
    connections,
    getConnections,
    addConnection,
    updateConnection,
    deleteConnection,
    hasConnections,
  };
}
