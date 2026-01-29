"use client";

import { channelConfigMap } from "./channelConfigMap";
import { ChannelConfigWrapperProps } from "./types";
import { useChannelConfigWrapper } from "../hooks/useChannelConfigWrapper";
import { PlaceholderConfig } from "./placeholder";

export default function ChannelConfigWrapper({
  channel,
  onClose,
  onEditConnection,
  editingConnectionId,
  onRefetchChannels,
}: ChannelConfigWrapperProps) {
  const configKey = channel.availableChannel?.name || channel.id;
  const ChannelConfigComponent =
    channelConfigMap[configKey] || PlaceholderConfig;

  // console.log(channel, channel.channelName);

  const { connectionToEdit, isLoading, handleSaveWithDelete, handleCancel } =
    useChannelConfigWrapper({
      channel,
      editingConnectionId,
      onEditConnection,
      onClose,
    });

  return (
    <div>
      <ChannelConfigComponent
        key={`config-${configKey}-${connectionToEdit?.id || "new"}`}
        channel={channel}
        connection={connectionToEdit}
        onSave={handleSaveWithDelete}
        onCancel={handleCancel}
        onEditConnection={onEditConnection}
        isLoading={isLoading}
        onRefetchChannels={onRefetchChannels}
      />
    </div>
  );
}
