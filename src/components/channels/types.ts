import { Channel } from "../../store/onboarding/types/channelTypes";
import { ConnectionDisplayData } from "./connections/types";

export interface ChannelItemProps {
  channel: Channel;
}

export interface DesktopChannelConnectionProps {
  // No props needed - uses hooks internally
}

export interface MobileChannelConnectionProps {
  // No props needed - uses hooks internally
}

export interface DesktopSidebarProps {
  channels: Channel[];
  activeChannelId: string;
  onSelectChannel: (channelId: string) => void;
  onEditConnection?: (connection: ConnectionDisplayData | null) => void;
  editingConnectionId?: string | number | null;
}

export interface DesktopSettingsPanelProps {
  channel: Channel | null;
  onClose: () => void;
  onEditConnection?: (connection: ConnectionDisplayData | null) => void;
  editingConnectionId?: string | number | null;
  onRefetchChannels?: () => void;
}

export interface ChannelPreviewProps {
  channel: Channel;
  isExpanded: boolean;
  isConnected: boolean;
  onToggle: () => void;
  connections?: ConnectionDisplayData[];
  onEdit?: (connection: ConnectionDisplayData | null) => void;
  editingConnectionId?: string | number | null;
}
