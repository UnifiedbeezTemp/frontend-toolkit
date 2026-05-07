import { api } from "../../index";
import { ApiAddon } from "../../../types/apiAddonTypes";
import { PurchasedAddonResponse } from "../../../store/onboarding/types/addonTypes";

export interface AddonPurchase {
  addonType: string;
  quantity: number;
}

export type BulkSeatBillingInterval = "MONTHLY" | "YEARLY";

export interface BulkSeatPackage {
  id: number;
  seats: number;
  priceEur: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserBulkSeat {
  id: number;
  packageId: number;
  quantity: number;
  billingInterval: BulkSeatBillingInterval;
  isActive: boolean;
  package: BulkSeatPackage;
}

export interface BulkSeatStats {
  currentMembers: number;
  basePlanSeats: number | null;
  bulkSeats: number;
  extraSeats: number;
  totalSeats: number | null;
  unlimited: boolean;
  canAddMembers: boolean;
  billing?: {
    monthlyTotal: number;
  };
}

export interface GetBulkSeatsResponse {
  bulkSeats: UserBulkSeat[];
  stats: BulkSeatStats;
}

export interface PurchaseBulkSeatPayload {
  packageId: number;
  quantity?: number;
}

export interface PurchaseBulkSeatResponse {
  userBulkSeat: UserBulkSeat;
  totalSeats: number | null;
  monthlyCharge?: string;
  yearlyCharge?: string;
  message: string;
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
    addon?: ApiAddon;
    error?: string;
  }>;
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

export interface MultiLanguagePreferencesResponse {
  languages: string[];
  maxAllowed: string | number;
  purchasedCount: number;
  canPurchase: boolean;
}

export const addonService = {
  async getAvailableAddons(): Promise<{ addons: ApiAddon[] }> {
    return api.get("/addon/available");
  },

  async getPurchasedAddons(): Promise<{ addons: PurchasedAddonResponse[] }> {
    return api.get("/addon/purchased");
  },

  async purchaseBatch(
    payload: PurchaseBatchPayload,
  ): Promise<PurchaseBatchResponse> {
    return api.post<PurchaseBatchPayload, PurchaseBatchResponse>(
      "/addon/purchase-batch",
      payload,
    );
  },

  async cancelAddon(
    addonType: string,
    quantity?: number,
  ): Promise<{ message: string }> {
    return api.delete(`/addon/cancel/${addonType}`, {
      data: { quantity },
    });
  },

  async cancelAddonInstance(
    addonType: string,
    userAddonId: number,
  ): Promise<{ message: string }> {
    return api.delete(`/addon/cancel/${addonType}`, {
      data: { userAddonId },
    });
  },

  async getMultiLanguagePreferences(): Promise<MultiLanguagePreferencesResponse> {
    return api.get("/addon/multi-language/preferences");
  },

  async updateMultiLanguagePreferences(
    languages: string[],
  ): Promise<MultiLanguagePreferencesResponse> {
    return api.patch("/addon/multi-language/preferences", { languages });
  },

  async getAvailableLanguages(): Promise<{
    languages: { code: string; name: string }[];
  }> {
    return api.get("/addon/available-languages");
  },
  async getAvailableAddonsByPlan(
    planType: string,
  ): Promise<{ addons: ApiAddon[] }> {
    return api.get(`/addon/available-for-plan?planType=${planType}`);
  },

  async getBulkSeats(): Promise<GetBulkSeatsResponse> {
    return api.get("/addon/bulk-seats");
  },

  async getBulkSeatPackages(): Promise<{ packages: BulkSeatPackage[] } | BulkSeatPackage[]> {
    return api.get("/addon/bulk-seats/packages");
  },

  async purchaseBulkSeatPackage(
    payload: PurchaseBulkSeatPayload,
  ): Promise<PurchaseBulkSeatResponse> {
    return api.post<PurchaseBulkSeatPayload, PurchaseBulkSeatResponse>(
      "/addon/bulk-seats/purchase",
      payload,
    );
  },

  async cancelBulkSeatPackage(id: number): Promise<{ message: string }> {
    return api.delete(`/addon/bulk-seats/${id}`);
  },
};
