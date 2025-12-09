import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Channel } from "../types/channelTypes";

interface ChannelsState {
  channels: Channel[];
  selectedChannels: Channel[];
  unSelectedChannels: Channel[];
}

const initialState: ChannelsState = {
  channels: [],
  selectedChannels: [],
  unSelectedChannels: [],
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<Channel[]>) => {
      state.channels = action.payload;
      state.selectedChannels = action.payload.filter(
        (channel) => channel.isSelected
      );
      state.unSelectedChannels = action.payload.filter(
        (channel) => !channel.isSelected
      );
    },
    toggleChannel: (state, action: PayloadAction<string>) => {
      const channel = state.channels.find((c) => c.id === action.payload);
      if (channel) {
        channel.isSelected = !channel.isSelected;

        if (channel.isSelected) {
          state.selectedChannels.push(channel);
        } else {
          state.selectedChannels = state.selectedChannels.filter(
            (c) => c.id !== action.payload
          );
        }
      }
    },
    selectChannel: (state, action: PayloadAction<string>) => {
      const channel = state.channels.find((c) => c.id === action.payload);
      if (channel && !channel.isSelected) {
        channel.isSelected = true;
        state.selectedChannels.push(channel);
      }
    },
    unselectChannel: (state, action: PayloadAction<string>) => {
      const channel = state.channels.find((c) => c.id === action.payload);
      if (channel) {
        channel.isSelected = false;
        state.selectedChannels = state.selectedChannels.filter(
          (c) => c.id !== action.payload
        );
      }
    },
  },
});

export const { setChannels, toggleChannel, selectChannel, unselectChannel } =
  channelsSlice.actions;
export default channelsSlice.reducer;
