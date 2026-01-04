import { api } from "../../index";
import { SocialAuthPayload, AuthResponseData } from "./types";

export const socialAuthService = {
  async signIn(payload: SocialAuthPayload): Promise<AuthResponseData> {
    return await api.post("/auth/login/social", payload);
  },

  async signUp(payload: SocialAuthPayload): Promise<AuthResponseData> {
    return await api.post("/auth/signup/social", payload);
  },
};
