import { api } from "../../index";
import { AuthPayload, SignupResponseData } from "./types";

export const signupService = {
  async signup(payload: AuthPayload): Promise<SignupResponseData> {
    return await api.post("/auth/signup", payload);
  },
};
