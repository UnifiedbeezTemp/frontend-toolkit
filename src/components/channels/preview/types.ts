import { Channel } from "../../../store/onboarding/types/channelTypes";
import { ConnectionDisplayData } from "../connections/types";

export interface ChannelsPreviewProps {
  // No props needed - uses hooks internally
}

export interface ChannelsPreviewItemProps {
  channel: Channel;
  isExpanded: boolean;
  isSelected: boolean;
  onToggle: () => void;
  onSelect: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export interface ChannelsPreviewDesktopProps {
  channels: Channel[];
  activeChannelId: string | null;
  onSelectChannel: (channelId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface ChannelsPreviewMobileProps {
  channels: Channel[];
  expandedChannelId: string | null;
  selectedChannelId: string | null;
  onToggleChannel: (channelId: string) => void;
  onSelectChannel: (channelId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface ChannelConnectionsListProps {
  connections: ConnectionDisplayData[];
  searchQuery: string;
  channelName: string;
  channelIcon: string;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

