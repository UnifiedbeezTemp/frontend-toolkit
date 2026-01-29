import { Channel } from "../../../store/onboarding/types/channelTypes";
import { ChannelConnection } from "../../../types/channelConnectionTypes";

export interface ChannelConfigWrapperProps {
  channel: Channel;
  onClose?: () => void;
  onEditConnection?: (connection: ChannelConnection | null) => void;
  editingConnectionId?: string | number | null;
  onRefetchChannels?: () => void;
}
