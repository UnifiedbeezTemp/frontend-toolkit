import { useMemo, useEffect } from "react";
import { useChannels } from "./useChannels";
import { useSupabaseIcons, useSupabaseImages } from "../../../lib/supabase/useSupabase";
import { ChannelsApiResponse, SelectedChannelsResponse } from "../../../types/channelApiTypes";
import { transformChannelsResponse } from "../../../utils/channelMapping";
import { Channel } from "../../../store/onboarding/types/channelTypes";

export const useChannelsData = (
  backendData?: ChannelsApiResponse | null,
  selectedChannels?: SelectedChannelsResponse | null,
  externalChannels?: Channel[]
) => {
  const supabaseIcons = useSupabaseIcons();
  const supabaseImages = useSupabaseImages();
  const {
    channels: defaultChannels,
    toggleChannel,
    setChannels,
  } = useChannels();

  const assets = useMemo(() => {
    return { ...supabaseIcons, ...supabaseImages };
  }, [supabaseIcons, supabaseImages]);

  const channelsData = useMemo(() => {
    if (!backendData) {
      return [];
    }

    if (!assets || Object.keys(assets).length === 0) {
      return [];
    }

    try {
      return transformChannelsResponse(backendData, assets, selectedChannels);
    } catch (error) {
      console.error("Error transforming channels data:", error);
      return [];
    }
  }, [backendData, assets, selectedChannels]);

  useEffect(() => {
    if (channelsData.length > 0) {
      setChannels(channelsData);
    }
  }, [channelsData, setChannels]);

  const channelsToUse = externalChannels || defaultChannels;

  return {
    assets,
    channelsData,
    channelsToUse,
    toggleChannel,
  };
};
