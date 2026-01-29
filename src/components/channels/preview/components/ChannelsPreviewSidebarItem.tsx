"use client";

import ImageComponent from "../../../../components/ui/ImageComponent";
import Text from "../../../../components/ui/Text";
import { cn } from "../../../../lib/utils";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { Channel } from "../../../../store/onboarding/types/channelTypes";
import { useChannelConnectionsData } from "../../hooks/useChannelConnectionsData";

interface ChannelsPreviewSidebarItemProps {
  channel: Channel;
  isActive: boolean;
  onClick: () => void;
}

export default function ChannelsPreviewSidebarItem({
  channel,
  isActive,
  onClick,
}: ChannelsPreviewSidebarItemProps) {
  const icons = useSupabaseIcons();
  
  // Fetch connections to display count
  const { connections } = useChannelConnectionsData(channel);
  const hasConnections = connections.length > 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-[1.2rem] py-[1.6rem] pl-[0.8rem] pr-[1.6rem] rounded-[0.8rem] cursor-pointer transition-colors",
        isActive
          ? "border border-brand-primary layout-body"
          : "bg-primary border border-input-stroke hover:bg-input-filled"
      )}
    >
      <ImageComponent
        src={channel.icon}
        alt={channel.name}
        width={24}
        height={24}
        className={cn("shrink-0")}
      />

      <div className="flex-1 min-w-0">
        <Text
          size="sm"
          className={cn(
            "font-[700] truncate",
            isActive ? "text-text-secondary" : "text-text-secondary"
          )}
        >
          {channel.name}
        </Text>
        {/* {hasConnections && (
          <Text size="xs" className="text-text-secondary truncate text-[1.2rem] opacity-70">
            {connections.length} connection
            {connections.length !== 1 ? "s" : ""}
          </Text>
        )} */}
      </div>

      <div className="shrink-0">
        {isActive ? (
          <ImageComponent
            src={icons.checkboxBase2}
            alt={"check"}
            width={24}
            height={24}
            className={cn("shrink-0")}
          />
        ) : (
          <div className="w-[2rem] h-[2rem] rounded-full border border-input-stroke" />
        )}
      </div>
    </div>
  );
}
