"use client";

import { useMemo } from "react";
import Button from "../../../../../components/ui/Button";
import Heading from "../../../../../components/ui/Heading";
import Loader from "../../../../../components/ui/Loader";
import CountrySelector from "./setup/CountrySelector";
import NumberTypeSelector from "./setup/NumberTypeSelector";
import AreaCodeInput from "./setup/AreaCodeInput";
import AvailableNumbersList from "./setup/AvailableNumbersList";
import { TwilioSmsSetupProps } from "../types";
import { getCountryByCode } from "../utils/twilioUtils";

export default function TwilioSmsSetup({
  countryCode,
  onCountryCodeChange,
  areaCode,
  onAreaCodeChange,
  numberType,
  onNumberTypeChange,
  availableNumbers,
  onSearch,
  onPurchase,
  isSearching,
  purchasingPhoneNumber,
}: TwilioSmsSetupProps) {
  const selectedCountry = useMemo(
    () => getCountryByCode(countryCode),
    [countryCode]
  );

  return (
    <div className="px-[1rem] lg:px-[2.8rem] py-[2.1rem]">
      <Heading size="md" className="mb-[1.6rem] text-[1.6rem] lg:text-[2rem]">
        Requirements
      </Heading>

      <div className="space-y-[2rem] lg:space-y-[2.4rem] bg-input-filled border border-input-stroke rounded-[.8rem] py-[2.4rem] px-[1.6rem]">
        <CountrySelector
          countryCode={countryCode}
          onCountryCodeChange={onCountryCodeChange}
        />

        <AreaCodeInput
          areaCode={areaCode}
          onAreaCodeChange={onAreaCodeChange}
        />

        <NumberTypeSelector
          numberType={numberType}
          onNumberTypeChange={onNumberTypeChange}
        />

        <Button onClick={onSearch} disabled={isSearching} className="w-full">
          {isSearching ? (
            <Loader className="w-[2rem] h-[2rem]" />
          ) : (
            "Search Numbers"
          )}
        </Button>

        <AvailableNumbersList
          numbers={availableNumbers}
          countryFlag={selectedCountry.flag}
          onPurchase={onPurchase}
          purchasingPhoneNumber={purchasingPhoneNumber}
        />
      </div>
    </div>
  );
}
