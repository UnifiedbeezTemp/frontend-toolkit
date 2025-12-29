import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import { RootState } from "../../../store";
import { selectChannel, setChannels, toggleChannel, unselectChannel } from "../../../store/onboarding/slices/channelsSlice";
import { Channel } from "../../../store/onboarding/types/channelTypes";

export const useChannels = () => {
  const dispatch = useDispatch();

  const channels = useSelector<RootState, Channel[]>(
    (state) => state.channels.channels
  );

  const selectedChannels = useSelector<RootState, Channel[]>(
    (state) => state.channels.selectedChannels
  );

  const unSelectedChannels = useSelector<RootState, Channel[]>(
    (state) => state.channels.unSelectedChannels
  );

  const selectedCount = useSelector<RootState, number>(
    (state) => state.channels.selectedChannels.length
  );

  const memoizedSetChannels = useCallback(
    (channels: Channel[]) => dispatch(setChannels(channels)),
    [dispatch]
  );

  const memoizedToggleChannel = useCallback(
    (channelId: string) => dispatch(toggleChannel(channelId)),
    [dispatch]
  );

  const memoizedSelectChannel = useCallback(
    (channelId: string) => dispatch(selectChannel(channelId)),
    [dispatch]
  );

  const memoizedUnselectChannel = useCallback(
    (channelId: string) => dispatch(unselectChannel(channelId)),
    [dispatch]
  );

  return {
    channels,
    selectedChannels,
    selectedCount,
    unSelectedChannels,
    setChannels: memoizedSetChannels,
    toggleChannel: memoizedToggleChannel,
    selectChannel: memoizedSelectChannel,
    unselectChannel: memoizedUnselectChannel,
  };
};
