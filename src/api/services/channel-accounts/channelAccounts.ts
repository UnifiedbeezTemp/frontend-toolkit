import { api } from "../..";
import { ChannelAccountsResponse } from "../../../types/channelAccountTypes";

export const fetchChannelAccounts = (): Promise<ChannelAccountsResponse> => {
  return api.get("/channel-accounts");
};

