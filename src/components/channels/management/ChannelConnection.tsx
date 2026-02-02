"use client";

import { useMediaQuery } from "../../../hooks/useMediaQuery";
import DesktopChannelConnection from "./DesktopChannelConnection";
import MobileChannelConnection from "./MobileChannelConnection";
import { useChannelConnection } from "../hooks/useChannelConnection";
import { useChannelConnectionToast } from "../hooks/useChannelConnectionToast";
import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";
import { useRefetchChannels } from "../hooks/useRefetchChannels";

interface ChannelConnectionProps {
  onRefetchChannels?: () => Promise<{
    availableChannels:
      | import("../../../types/channelApiTypes").ChannelsApiResponse
      | null;
    selectedChannels:
      | import("../../../types/channelApiTypes").SelectedChannelsResponse
      | null;
  }> | void;
  onBack?: () => void;
}

export default function ChannelConnection({
  onRefetchChannels,
  onBack,
}: ChannelConnectionProps) {
  useChannelConnectionToast();
  const { selectedChannels } = useChannelConnection();
  const { refetchAndUpdate } = useRefetchChannels();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleRefetch = async () => {
    if (onRefetchChannels) {
      await onRefetchChannels();
    }
    await refetchAndUpdate();
  };

  if (selectedChannels.length === 0) {
    return (
      <div className="text-center py-8">
        <Heading size="lg" className="text-[1.8rem] mb-2">
          No channels selected
        </Heading>
        <Text size="sm">Go back to select channels to connect</Text>
      </div>
    );
  }

  return isDesktop ? (
    <DesktopChannelConnection
      onRefetchChannels={handleRefetch}
      onBack={onBack}
    />
  ) : (
    <MobileChannelConnection
      onRefetchChannels={handleRefetch}
      onBack={onBack}
    />
  );
}
