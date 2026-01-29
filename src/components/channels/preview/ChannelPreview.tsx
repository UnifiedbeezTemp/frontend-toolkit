"use client";

import Checkbox from "../../../components/ui/CheckBox";
import ImageComponent from "../../../components/ui/ImageComponent";
import Text from "../../../components/ui/Text";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { cn } from "../../../lib/utils";
import ConnectionItem from "../connections/ConnectionItem";
import { ChannelPreviewProps } from "../types";

export default function ChannelPreview({
  channel,
  isExpanded,
  isConnected,
  onToggle,
  connections = [],
  onEdit,
  editingConnectionId,
}: ChannelPreviewProps) {
  const icons = useSupabaseIcons();
  const connectionsCount = connections.length;

  const handleToggleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isConnectionClick = target.closest('[data-connection-item]');
    if (!isConnectionClick) {
      onToggle();
    }
  };

  return (
    <div className={`${isExpanded ? "layout-body" : ""}`}>
      <div
        className={`flex items-center justify-between p-[1.6rem] cursor-pointer`}
        onClick={handleToggleClick}
      >
        <div className="flex items-center gap-[1.2rem]">
          <ImageComponent
            src={channel.icon}
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
                isExpanded ? "text-text-secondary" : "text-inactive-color"
              )}
            >
              {channel.channelName}
            </Text>
            <Text
              className={cn(
                "text-[1rem]",
                isExpanded ? " text-text-primary" : " text-inactive-color"
              )}
            >
              {isConnected && connectionsCount > 0
                ? `${connectionsCount} connection${
                    connectionsCount > 1 ? "s" : ""
                  }`
                : "Setup in 2 minutes"}
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

      {isExpanded  && (
        <div className="px-[.8rem] pb-[1.6rem] space-y-[0.8rem]">
          {connections?.map((connection) => {
            const isEditing = editingConnectionId === connection.id;
            return (
              <ConnectionItem
                key={connection.id}
                connection={connection}
                isEditing={isEditing}
                onEdit={() => {
                  if (isEditing) {
                    onEdit?.(null);
                  } else {
                    onEdit?.(connection);
                  }
                }}
                onCancel={() => onEdit?.(null)}
              />
            );
          })}
          {/* {connections.length && (
            <Button           onClick={() => {}}
              className="w-full py-[.4rem] text-[1rem] highlight-inside border-0 rounded-[.3rem]"
            >
              Add {channel.name}
            </Button>
          )} */}
        </div>
      )}
    </div>
  );
}
