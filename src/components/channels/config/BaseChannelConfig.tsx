"use client";

import { JSX } from "react";
import { Channel } from "../../../store/onboarding/types/channelTypes";
import { ChannelConnection, ChannelConnectionFormData } from "../../../types/channelConnectionTypes";

export interface BaseChannelConfigProps {
  channel: Channel;
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
