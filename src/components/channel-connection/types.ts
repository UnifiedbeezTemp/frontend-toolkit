import { AccountDisplayData } from "../../types/channelAccountDetailTypes";
import { SelectedChannel } from "../../types/channelApiTypes";

export interface ChannelPreviewProps {
  channel: SelectedChannel;
  isExpanded: boolean;
  onToggle: () => void;
  accounts?: AccountDisplayData[];
  onEdit?: (account: AccountDisplayData | null) => void;
  editingAccountId?: string | number | null;
}

export interface AccountItemProps {
  account: AccountDisplayData;
  isEditing: boolean;
  onEdit: () => void;
  onCancel?: () => void;
}
