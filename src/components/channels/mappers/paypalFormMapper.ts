import { ChannelConnection } from "../../../types/channelConnectionTypes";

export interface PayPalAccount {
  id: number;
  connectedChannelId: number;
  paypalMerchantId: string;
  email: string;
  accountStatus: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const mapPayPalAccountToFormData = (
  account: PayPalAccount,
): ChannelConnection => {
  return {
    id: String(account.id),
    channelId: String(account.connectedChannelId),
    name: account.email || "PayPal Account",
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    configuration: {
      paypalMerchantId: account.paypalMerchantId,
      email: account.email,
      accountStatus: account.accountStatus,
    },
  };
};
