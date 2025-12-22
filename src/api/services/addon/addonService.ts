import { api } from "../../index";

export interface AddonPurchase {
  addonType: string;
  quantity: number;
}

export interface PurchaseBatchPayload {
  purchases: AddonPurchase[];
}

export interface PurchaseBatchResponse {
  success: boolean;
  results: Array<{
    addonType: string;
    status: string;
    message: string;
    addon?: object;
    error?: string;
  }>;
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

export const addonService = {
  async purchaseBatch(payload: PurchaseBatchPayload): Promise<PurchaseBatchResponse> {
    return api.post<PurchaseBatchPayload, PurchaseBatchResponse>("/addon/purchase-batch", payload);
  },
};
