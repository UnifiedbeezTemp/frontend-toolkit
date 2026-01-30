import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChannelConnection, ChannelConnectionFormData } from "../../../types/channelConnectionTypes";

interface ChannelConnectionsState {
  connections: Record<string, ChannelConnection[]>;
}

const initialState: ChannelConnectionsState = {
  connections: {},
};

const channelConnectionsSlice = createSlice({
  name: "channelConnections",
  initialState,
  reducers: {
    addChannelConnection: (
      state,
      action: PayloadAction<{
        channelId: string;
        connection: ChannelConnection;
      }>
    ) => {
      const { channelId, connection } = action.payload;
      if (!state.connections[channelId]) {
        state.connections[channelId] = [];
      }
      state.connections[channelId].push(connection);
    },
    updateChannelConnection: (
      state,
      action: PayloadAction<{
        channelId: string;
        connectionId: string;
        data: ChannelConnectionFormData;
      }>
    ) => {
      const { channelId, connectionId, data } = action.payload;
      const channelConnections = state.connections[channelId];
      if (channelConnections) {
        const index = channelConnections.findIndex((conn) => conn.id === connectionId);
        if (index !== -1) {
          const existingConnection = channelConnections[index];
          const connectionName =
            data.name ||
            data.displayName ||
            data.internalName ||
            existingConnection.name;
          
          state.connections[channelId][index] = {
            ...existingConnection,
            name: connectionName,
            configuration: {
              ...existingConnection.configuration,
              ...data,
            },
            updatedAt: new Date().toISOString(),
          };
        }
      }
    },
    deleteChannelConnection: (
      state,
      action: PayloadAction<{
        channelId: string;
        connectionId: string;
      }>
    ) => {
      const { channelId, connectionId } = action.payload;
      const channelConnections = state.connections[channelId];
      if (channelConnections) {
        state.connections[channelId] = channelConnections.filter(
          (conn) => conn.id !== connectionId
        );
      }
    },
    setChannelConnections: (
      state,
      action: PayloadAction<{
        channelId: string;
        connections: ChannelConnection[];
      }>
    ) => {
      const { channelId, connections } = action.payload;
      state.connections[channelId] = connections;
    },
    clearChannelConnections: (state, action: PayloadAction<string>) => {
      delete state.connections[action.payload];
    },
  },
});

export const {
  addChannelConnection,
  updateChannelConnection,
  deleteChannelConnection,
  setChannelConnections,
  clearChannelConnections,
} = channelConnectionsSlice.actions;

export default channelConnectionsSlice.reducer;

