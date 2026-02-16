import Text from "../../ui/Text";
import { cn } from "../../../lib/utils";
import { AffectedChannel } from "../types";
import Checkbox from "../../ui/CheckBox";
import ChannelIcon from "./ChannelIcon";

interface ChannelItemProps {
  channel: AffectedChannel;
  isSelected: boolean;
  onToggle: () => void;
}

export default function ChannelItem({
  channel,
  isSelected,
  onToggle,
}: ChannelItemProps) {
  return (
    <div className="py-[1rem] border border-input-stroke mb-[1rem] px-[1rem] sm:px-[1.6rem] rounded-[1.2rem]">
      <div className="flex items-center gap-[1.2rem]">
        <Checkbox checked={isSelected} onChange={onToggle} />

        <div className="border border-border rounded-[1rem] p-[0.9rem] flex items-center justify-center shrink-0">
          <ChannelIcon channelName={channel.channelName} />
        </div>

        <div className="flex-1 min-w-0">
          <Text weight="bold" size="sm" className="text-text-secondary">
            {channel.displayName}
          </Text>
          <Text size="xs" className="text-text-primary">
            {channel.isConnected ? "Connected" : "Not connected"} ·{" "}
            {channel.channelType}
          </Text>
        </div>

        <div className="shrink-0">
          <span
            className={cn(
              "text-[1.1rem] font-[700] px-[0.8rem] py-[0.3rem] rounded-full",
              channel.isConnected
                ? "text-success bg-success/10"
                : "text-text-primary bg-input-filled",
            )}
          >
            {channel.isConnected ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="ml-[5.6rem] mt-[0.4rem]">
        <Text size="xs" className="text-destructive">
          {channel.reason}
        </Text>
      </div>
    </div>
  );
}
