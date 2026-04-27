import { AccountDisplayData } from "../../../types/channelAccountDetailTypes";

export interface AccountItemProps {
  account: AccountDisplayData;
  isEditing: boolean;
  onEdit: () => void;
  onCancel?: () => void;
}
