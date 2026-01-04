import { UserProfile } from "../../../types/userProfileTypes";
import { api } from "../../index";

export const profileService = {
  async getProfile(): Promise<UserProfile | null> {
    return await api.get("/auth/profile");
  },

  async logout(): Promise<{ message: string }> {
    return await api.post("/auth/logout");
  },
};
