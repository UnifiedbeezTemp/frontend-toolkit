import { Channel } from "../../store/onboarding/types/channelTypes";
import Heading from "../ui/Heading";
import ChannelCard from "./ChannelCard";

interface ChannelTypeSectionProps {
  type: string;
  channels: Channel[];
  isLast: boolean;
  onToggleChannel: (channel: string) => void;
  isChannelLoading?: (channelId: string) => boolean;
}

export default function ChannelTypeSection({
  type,
  channels,
  isLast,
  onToggleChannel,
  isChannelLoading,
}: ChannelTypeSectionProps) {
  return (
    <div
      className={`mt-[2rem] ${
        !isLast ? "pb-[2rem] border-inactive-color border-b" : ""
      }`}
    >
      <Heading size="md" className="mb-[1.4rem] text-[1.8rem]">
        {type}
      </Heading>
      <div className="mt-[10px] grid grid-cols-2 md:grid-cols-3 gap-[.5rem] lg:gap-[1.6rem]">
        {channels.map((channel) => (
          <ChannelCard
            key={channel.id}
            channel={channel}
            onToggle={() => onToggleChannel(channel.id)}
            canEdit={false}
            isLoading={isChannelLoading?.(channel.id) || false}
          />
        ))}
      </div>
    </div>
  );
}
