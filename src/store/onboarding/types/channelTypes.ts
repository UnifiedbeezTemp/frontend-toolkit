export interface Channel {
  id: string; // we keep string for redux key; value is availableChannelId as string
  name: string;
  description: string;
  info: string;
  icon: string;
  isSelected: boolean;
  hasBorder?: boolean;
  type: string;
  tags?: ["popular"];
  availableChannelId?: number;
  availableChannelName?: string;
}