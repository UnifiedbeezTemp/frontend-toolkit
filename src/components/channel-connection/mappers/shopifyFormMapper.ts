import { ChannelConnection } from "../../../types/channelConnectionTypes";

export interface ShopifyAccount {
  id: number;
  connectedChannelId: number;
  shopDomain: string;
  shopName: string;
  shopEmail: string;
  shopifyStoreId: string;
  accessToken: string;
  scope: string;
  isActive: boolean;
  webhookAddress: string | null;
  webhookTopic: string | null;
  createdAt: string;
  updatedAt: string;
}

export const mapShopifyAccountToFormData = (
  account: ShopifyAccount,
): ChannelConnection => {
  return {
    id: String(account.id),
    channelId: String(account.connectedChannelId),
    name: account.shopName || account.shopDomain || "Shopify Store",
    configuration: {
      shopDomain: account.shopDomain,
      shopName: account.shopName,
      shopEmail: account.shopEmail,
      shopifyStoreId: account.shopifyStoreId,
      isActive: account.isActive,
    },
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
};
