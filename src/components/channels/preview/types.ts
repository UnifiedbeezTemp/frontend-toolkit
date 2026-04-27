import { SelectedChannel } from "../../../types/channelApiTypes";
import { ConnectionDisplayData } from "../connections/types";

export interface ChannelsPreviewProps {
  // No props needed - uses hooks internally
}

export interface ChannelsPreviewItemProps {
  channel: SelectedChannel;
  isExpanded: boolean;
  isSelected: boolean;
  onToggle: () => void;
  onSelect: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export interface ChannelsPreviewDesktopProps {
  channels?: SelectedChannel[];
  activeChannelId: string | null;
  onSelectChannel: (channelId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface ChannelsPreviewMobileProps {
  channels?: SelectedChannel[];
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
