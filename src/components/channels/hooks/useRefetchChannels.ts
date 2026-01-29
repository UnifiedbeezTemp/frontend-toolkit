import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateChannelsInRedux } from "./useUpdateChannelsInRedux";
import { ChannelsApiResponse, SelectedChannelsResponse } from "../../../types/channelApiTypes";
import { useStep5Channels } from "../../channel-selection/hooks/useChannelData";

interface RefetchChannelsResult {
  availableChannels: ChannelsApiResponse | null;
  selectedChannels: SelectedChannelsResponse | null;
}

export const useRefetchChannels = () => {
  const { refetch: refetchFromHook } = useStep5Channels();
  const { updateChannels } = useUpdateChannelsInRedux();
  const queryClient = useQueryClient();

  const refetchAndUpdate = useCallback(async (): Promise<void> => {
    try {
      const refetchResult = await refetchFromHook();
      
      if (refetchResult?.availableChannels && refetchResult?.selectedChannels) {
        updateChannels(refetchResult.availableChannels, refetchResult.selectedChannels);
        return;
      }

      const freshAvailable = queryClient.getQueryData<ChannelsApiResponse>(["channels", "available"]);
      const freshSelected = queryClient.getQueryData<SelectedChannelsResponse>(["channels", "selected"]);
      
      if (freshAvailable && freshSelected) {
        updateChannels(freshAvailable, freshSelected);
      }
    } catch (error) {
      console.error("Error refetching and updating channels:", error);
    }
  }, [refetchFromHook, updateChannels, queryClient]);

  return { refetchAndUpdate };
};

