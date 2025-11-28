import { planBaseUrl } from "../../rootUrls";
import { OriginalPlan } from "./types";

export const OriginalplansService = {
  async getAllPlans(): Promise<OriginalPlan[]> {
    const response = await fetch(`${planBaseUrl}/all`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch plans: ${response.status}`);
    }

    return response.json();
  },
};