import { BackendChannel, SelectedChannel } from "../../../types/channelApiTypes";


export interface Channel extends Omit<SelectedChannel, 'id' | 'availableChannel'> {
  name: string;
  isSelected: boolean;
  description: string;
  // Override id to be string for Redux compatibility
  id: string; // Converted from SelectedChannel.id (number) to string
  // UI-specific fields
  icon: string;
  hasBorder?: boolean;
  type: string;
  tags?: ["popular"];
  info: string;
  // Keep all backend fields from SelectedChannel
  // userId, availableChannelId, channelName, isActive, isConnected, credentials, etc.
  // Also keep availableChannel as nested object
  availableChannel?: BackendChannel & {
    icon?: string; // Add icon to availableChannel too
  };
}