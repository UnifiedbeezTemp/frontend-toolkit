import countries from "../../../../../data/countries";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";
import { SearchParams } from "../types";

export interface TwilioConfig {
  phoneNumber: string;
  twilioSid: string;
}

export const parseTwilioConfig = (
  connection: ChannelConnection
): TwilioConfig => {
  const config = (connection.configuration as Record<string, unknown>) || {};
  return {
    phoneNumber: (config.phoneNumber as string) || connection.name || "",
    twilioSid: (config.twilioSid as string) || "",
  };
};

export const getCountryByCode = (code: string) => {
  return countries.find((c) => c.alpha2Code === code) || countries[0];
};

export const filterCountries = (search: string) => {
  if (!search) return countries;
  const s = search.toLowerCase();
  return countries.filter(
    (c) =>
      c.name.toLowerCase().includes(s) || c.alpha2Code.toLowerCase().includes(s)
  );
};

export const buildTwilioSearchQuery = (params: SearchParams) => {
  const urlParams = new URLSearchParams({
    countryCode: params.countryCode,
    numberType: params.numberType,
    limit: String(params.limit || 20),
  });
  if (params.areaCode) urlParams.append("areaCode", params.areaCode);
  return urlParams.toString();
};
