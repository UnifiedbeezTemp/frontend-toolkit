"use client";

import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";
import ChannelItem from "./ChannelItem";
import { useChannelConnection } from "../hooks/useChannelConnection";

interface MobileChannelConnectionProps {
  onRefetchChannels?: () => void;
}

export default function MobileChannelConnection({
  onRefetchChannels,
}: MobileChannelConnectionProps) {
  const { selectedChannels } = useChannelConnection();

  return (
    <div>
      <div className="">
        <Heading size="lg" className="text-[1.8rem] sm:text-center">
          Connect selected channels
        </Heading>
        <Text size="sm" className="sm:text-center">
          Connect as many channels as you like
        </Text>
      </div>

      <div className="bg-primary rounded-[1.4rem] mt-[1.7rem]">
        <div className="p-[1.6rem] border-b border-border">
          <Text className="font-[700]">Selected Channels</Text>
        </div>

        <div>
          {selectedChannels.map((channel) => (
            <ChannelItem
              key={channel.id}
              channel={channel}
              onRefetchChannels={onRefetchChannels}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
