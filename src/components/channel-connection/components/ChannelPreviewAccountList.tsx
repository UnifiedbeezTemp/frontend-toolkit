import React from "react";
import AccountItem from "./AccountItem";
import { AccountDisplayData } from "../../../types/channelAccountDetailTypes";

interface ChannelPreviewAccountListProps {
  accounts: AccountDisplayData[];
  editingAccountId?: string | number | null;
  onEdit?: (account: AccountDisplayData | null) => void;
}

export default function ChannelPreviewAccountList({
  accounts,
  editingAccountId,
  onEdit,
}: ChannelPreviewAccountListProps) {
  return (
    <div className="px-[.8rem] pb-[1.6rem] space-y-[0.8rem]">
      {accounts.map((account) => {
        const isEditing = editingAccountId === account.id;

        const handleEdit = () => {
          if (isEditing) {
            onEdit?.(null);
          } else {
            onEdit?.(account);
          }
        };

        const handleCancel = () => onEdit?.(null);

        return (
          <AccountItem
            key={account.id}
            account={account}
            isEditing={isEditing}
            onEdit={handleEdit}
            onCancel={handleCancel}
          />
        );
      })}
    </div>
  );
}
