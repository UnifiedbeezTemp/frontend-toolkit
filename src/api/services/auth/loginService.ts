import { api } from "../../index";
import { AuthPayload, LoginResponseData } from "./types";

export const loginService = {
  async signIn(payload: AuthPayload): Promise<LoginResponseData> {
    return await api.post("/auth/login", payload);
  },
};
