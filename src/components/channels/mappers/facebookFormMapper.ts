import { ChannelConnection } from "../../../types/channelConnectionTypes";

export interface FacebookAccount {
  id: number;
  connectedChannelId: number;
  pageId: string;
  pageName: string;
  accountType: string;
  pageAccessToken: string;
  instagramAccountId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  verificationStatus: string;
  verifiedAt: string | null;
  verificationAttempts: number;
  verificationError: string | null;
}

export const mapFacebookAccountToFormData = (
  account: FacebookAccount
): ChannelConnection => {
  return {
    id: String(account.id),
    channelId: String(account.connectedChannelId),
    name: account.pageName,
    configuration: {
      name: account.pageName,
      pageName: account.pageName,
      pageId: account.pageId,
      accountType: account.accountType,
      instagramAccountId: account.instagramAccountId,
      verificationStatus: account.verificationStatus,
      connectedChannelId: account.connectedChannelId,
      verifiedAt: account.verifiedAt,
      verificationAttempts: account.verificationAttempts,
      verificationError: account.verificationError,
      messengerChannelId: account.id,
      readConfirmation: false, 
      profileImageUrl: null, 
    },
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
};

