export interface Channel {
  id: string;
  name: string;
  description: string;
  info: string;
  icon: string;
  isSelected: boolean;
  hasBorder?: boolean;
  type: string;
  tags?: ["popular"];
}