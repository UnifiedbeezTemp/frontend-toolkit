import { ChannelConnection } from "../../../types/channelConnectionTypes";

export interface ZoomAccount {
  id: number;
  connectedChannelId: number;
  zoomUserId: string;
  email: string;
  displayName: string;
  accountId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  tokenType: string;
  scope: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const mapZoomAccountToFormData = (
  account: ZoomAccount,
): ChannelConnection => {
  return {
    id: String(account.id),
    channelId: String(account.connectedChannelId),
    name: account.displayName || account.email || "Zoom Account",
    configuration: {
      zoomUserId: account.zoomUserId,
      email: account.email,
      displayName: account.displayName,
      accountId: account.accountId,
      isActive: account.isActive,
    },
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
};
