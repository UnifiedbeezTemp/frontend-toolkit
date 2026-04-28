"use client";

import { JSX } from "react";
import { ChannelConnection, ChannelConnectionFormData } from "../../../types/channelConnectionTypes";
import { SelectedChannel } from "../../../types/channelApiTypes";

export interface BaseChannelConfigProps {
  channel: SelectedChannel;
  connection?: ChannelConnection | null;
  onSave: (data: ChannelConnectionFormData) => void;
  onCancel?: () => void;
  onEditConnection?: (connection: ChannelConnection | null) => void;
  isLoading?: boolean;
  onRefetchChannels?: () => void;
}

export interface ChannelConfigComponent {
  (props: BaseChannelConfigProps): JSX.Element;
}
