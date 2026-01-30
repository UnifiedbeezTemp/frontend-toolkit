import { api } from "../api";
import { apiBaseUrl } from "../api/rootUrls";

export interface ShopifyConnectResponse {
  success: boolean;
  channel?: {
    id: number;
    shopDomain?: string;
    isActive: boolean;
    connectedAt: string;
  };
  message?: string;
}

export const getShopifyAuthUrl = (shopDomain: string): string => {
  let domain = shopDomain
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

  domain = domain.includes(".myshopify.com")
    ? domain
    : `${domain}.myshopify.com`;

  console.log(domain);
  return `${apiBaseUrl}/channels/shopify/auth?shop=${domain}`;
};

export const initiateShopifyAuth = (shopDomain: string): void => {
  window.location.href = getShopifyAuthUrl(shopDomain);
};

export const disconnectShopifyAccount = async (
  accountId: number,
): Promise<{ success: boolean; message?: string }> => {
  return api.post<
    { accountId: number },
    { success: boolean; message?: string }
  >(`/channels/shopify/disconnect`, { accountId });
};
