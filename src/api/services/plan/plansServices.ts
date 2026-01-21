import { api } from "../../";
import { planBaseUrl } from "../../rootUrls";
import { OriginalPlan } from "./types";

export const OriginalplansService = {
  async getAllPlans(): Promise<OriginalPlan[]> {
    return api.get<OriginalPlan[]>(`${planBaseUrl}/all`);
  },

  async getUserPlanFeatures(): Promise<OriginalPlan> {
    return api.get<OriginalPlan>(`${planBaseUrl}/features`);
  },
};