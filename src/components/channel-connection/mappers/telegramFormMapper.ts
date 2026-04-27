import { ChannelConnection } from "../../../types/channelConnectionTypes";

export interface TelegramAccount {
  id: number;
  connectedChannelId: number;
  telegramUserId: string;
  sessionString: string;
  displayName: string;
  username: string;
  phoneNumber: string;
  isActive: boolean;
  verificationStatus: string;
  verifiedAt: string;
  createdAt: string;
  updatedAt: string;
}

export const mapTelegramAccountToFormData = (
  account: TelegramAccount,
): ChannelConnection => {
  return {
    id: String(account.id),
    channelId: String(account.connectedChannelId),
    name: account.displayName || account.username || "Telegram Account",
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    configuration: {
      telegramUserId: account.telegramUserId,
      displayName: account.displayName,
      username: account.username,
      phoneNumber: account.phoneNumber,
      verificationStatus: account.verificationStatus,
      verifiedAt: account.verifiedAt,
    },
  };
};
