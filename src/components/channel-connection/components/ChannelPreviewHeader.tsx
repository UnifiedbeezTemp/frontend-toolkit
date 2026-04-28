import React from "react";
import ImageComponent from "../../ui/ImageComponent";
import Text from "../../ui/Text";
import Checkbox from "../../ui/CheckBox";
import { cn } from "../../../lib/utils";
import { SelectedChannel } from "../../../types/channelApiTypes";

interface ChannelPreviewHeaderProps {
  channel: SelectedChannel;
  icon: string;
  isExpanded: boolean;
  isConnected: boolean;
  connectionStatusText: string;
  onToggle: () => void;
  icons: Record<string, string>;
}

export default function ChannelPreviewHeader({
  channel,
  icon,
  isExpanded,
  isConnected,
  connectionStatusText,
  onToggle,
  icons,
}: ChannelPreviewHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between p-[1.6rem] cursor-pointer`}
      onClick={onToggle}
    >
      <div className="flex items-center gap-[1.2rem]">
        <ImageComponent
          src={icon}
          alt={channel.channelName}
          width={25}
          height={25}
          className={isExpanded ? "" : "grayscale opacity-30"}
        />

        <div>
          <Text
            size="sm"
            className={cn(
              "font-[700]",
              isExpanded ? "text-text-secondary" : "text-inactive-color",
            )}
          >
            {channel.channelName}
          </Text>
          <Text
            className={cn(
              "text-[1rem]",
              isExpanded ? " text-text-primary" : " text-inactive-color",
            )}
          >
            {connectionStatusText}
          </Text>
        </div>
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        {isConnected ? (
          <Checkbox
            checked={true}
            onChange={onToggle}
            className={
              isExpanded
                ? "rounded-full"
                : "grayscale brightness-200 rounded-full opacity-30"
            }
            size="sm"
          />
        ) : (
          <ImageComponent
            src={isExpanded ? icons.minus : icons.plus}
            alt={isExpanded ? "close" : "open"}
            width={20}
            height={20}
            className={isExpanded ? "" : "grayscale brightness-200 opacity-30"}
          />
        )}
      </div>
    </div>
  );
}
