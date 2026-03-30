import { api } from "../..";
import {
  ChannelAccountConfigurationResponse,
  UpdateChannelAccountConfigurationPayload,
} from "../../../types/channelAccountConfigurationTypes";

export const fetchChannelAccountConfiguration = (params: {
  accountType: string;
  accountId: number;
}): Promise<ChannelAccountConfigurationResponse> => {
  const accountType = encodeURIComponent(params.accountType);
  const accountId = encodeURIComponent(String(params.accountId));
  return api.get(`/channel-accounts/${accountType}/${accountId}/configuration`);
};

export const patchChannelAccountConfiguration = (params: {
  accountType: string;
  accountId: number;
  payload: UpdateChannelAccountConfigurationPayload;
}): Promise<ChannelAccountConfigurationResponse> => {
  const accountType = encodeURIComponent(params.accountType);
  const accountId = encodeURIComponent(String(params.accountId));
  return api.patch(
    `/channel-accounts/${accountType}/${accountId}/configuration`,
    params.payload,
  );
};

export const bulkApplyChannelAccountConfiguration = (params: {
  accounts: Array<{ accountType: string; accountId: number }>;
  config: UpdateChannelAccountConfigurationPayload;
}): Promise<unknown> => {
  return api.post("/channel-accounts/configuration/bulk", {
    accounts: params.accounts,
    config: params.config,
  });
};
