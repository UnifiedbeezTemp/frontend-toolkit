import { ChannelConnection } from "../../../types/channelConnectionTypes";

export interface OutlookAccount {
  id: number;
  connectedChannelId: number;
  provider: string;
  email: string;
  displayName: string;
  sharedCredentialId: number | null;
  isActive: boolean;
  canReceive: boolean;
  canSend: boolean;
  createdAt: string;
  updatedAt: string;
  verificationStatus: string;
  verifiedAt: string | null;
  verificationAttempts: number;
  verificationError: string | null;
}

export const mapOutlookAccountToFormData = (
  account: OutlookAccount
): ChannelConnection => {
  return {
    id: String(account.id),
    channelId: String(account.connectedChannelId),
    name: account.email,
    configuration: {
      email: account.email,
      displayName: account.displayName,
      provider: account.provider,
      canReceive: account.canReceive,
      canSend: account.canSend,
      verificationStatus: account.verificationStatus,
      verifiedAt: account.verifiedAt,
      verificationAttempts: account.verificationAttempts,
      verificationError: account.verificationError,
      sharedCredentialId: account.sharedCredentialId,
      outlookAccountId: account.id,
    },
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
};
