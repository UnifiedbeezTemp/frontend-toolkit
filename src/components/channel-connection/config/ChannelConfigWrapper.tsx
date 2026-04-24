"use client";

import { channelConfigMap } from "./channelConfigMap";
import { ChannelConfigWrapperProps } from "./types";
import { PlaceholderConfig } from "./placeholder";
import { useChannelConfigWrapper } from "../hooks/useChannelConfigWrapper";

export default function ChannelConfigWrapper({
  channel,
  onClose,
  onEditAccount,
  editingAccountId,
  onRefetchChannels,
}: ChannelConfigWrapperProps) {
  const configKey = channel.availableChannel?.name || channel.id;
  const ChannelConfigComponent =
    channelConfigMap[configKey] || PlaceholderConfig;

  const { accountToEdit, isLoading, handleSaveWithDelete, handleCancel } =
    useChannelConfigWrapper({
      channel,
      editingAccountId,
      onEditAccount,
      onClose,
    });

  return (
    <div>
      <ChannelConfigComponent
        key={`config-${configKey}-${accountToEdit?.id || "new"}`}
        channel={channel}
        connection={accountToEdit}
        onSave={handleSaveWithDelete}
        onCancel={handleCancel}
        onEditConnection={onEditAccount}
        isLoading={isLoading}
        onRefetchChannels={onRefetchChannels}
      />
    </div>
  );
}
