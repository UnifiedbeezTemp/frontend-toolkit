import { AccountDisplayData } from "../../../types/channelAccountDetailTypes";
import { SelectedChannel } from "../../../types/channelApiTypes";
import { ChannelConnection } from "../../../types/channelConnectionTypes";

export interface ChannelConfigWrapperProps {
  channel: SelectedChannel;
  onClose?: () => void;
  onEditAccount?: (account: ChannelConnection | null) => void;
  editingAccountId?: string | number | null;
  onRefetchChannels?: () => void;
}
