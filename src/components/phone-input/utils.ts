import countries from "../../data/countries";
import { Country } from "./types";

export const extractLocalNumber = (phone: string, country: Country): string => {
  if (!phone || !country) return "";

  const callingCode = country.callingCodes[0];
  if (phone.startsWith(`+${callingCode}`)) {
    return phone.replace(`+${callingCode}`, "");
  }
  return phone.replace(/^\+\d+/, "");
};

export const formatInternationalNumber = (
  country: Country,
  localNumber: string
): string => {
  if (!country) return localNumber;
  return `+${country.callingCodes[0]}${localNumber}`;
};

export const filterCountries = (query: string): Country[] => {
  if (!query) return countries;

  return countries.filter(
    (country) =>
      country.name.toLowerCase().includes(query.toLowerCase()) ||
      country.alpha2Code.toLowerCase().includes(query.toLowerCase()) ||
      country.callingCodes[0].includes(query)
  );
};

export const getCountryByCode = (countryCode: string): Country => {
  return (
    countries.find((c) => c.alpha2Code === countryCode) ||
    countries.find((c) => c.alpha2Code === "GB") ||
    countries[0]
  );
};

export const isValidPhoneNumber = (phone: string): boolean => {
  return /^\+\d{7,15}$/.test(phone.replace(/\s/g, ""));
};
