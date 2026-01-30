import { useCallback } from "react";
import { useMemo } from "react";
import { useSupabaseIcons, useSupabaseImages } from "../../../lib/supabase/useSupabase";
import { ChannelsApiResponse, SelectedChannelsResponse } from "../../../types/channelApiTypes";
import { transformChannelsResponse } from "../../../utils";
import { useChannels } from "../../channel-selection/hooks/useChannels";

export const useUpdateChannelsInRedux = () => {
  const supabaseIcons = useSupabaseIcons();
  const supabaseImages = useSupabaseImages();
  const { setChannels } = useChannels();

  const assets = useMemo(() => {
    return { ...supabaseIcons, ...supabaseImages };
  }, [supabaseIcons, supabaseImages]);

  const updateChannels = useCallback(
    (backendData: ChannelsApiResponse | null, selectedChannels: SelectedChannelsResponse | null) => {
      if (!backendData || !assets || Object.keys(assets).length === 0) {
        return;
      }

      try {
        const channelsData = transformChannelsResponse(backendData, assets, selectedChannels);
        if (channelsData.length > 0) {
          setChannels(channelsData);
        }
      } catch (error) {
        console.error("Error updating channels in Redux:", error);
      }
    },
    [assets, setChannels]
  );

  return { updateChannels };
};

