/**
 * COMPONENT: PhoneInput
 * 
 * PURPOSE:
 * Main phone input component with country selection and number input
 * Handles international phone number formatting and state management
 * 
 * USAGE:
 * <PhoneInput
 *   value={phoneNumber}
 *   onChange={setPhoneNumber}
 *   countryCode={countryCode}
 *   onCountryChange={setCountryCode}
 *   isEditing={isEditing}
 * />
 */

import { useState, useEffect } from 'react';
import PhoneNumberInput from './phone-number-input/PhoneNumberInput';
import { PhoneInputProps, Country } from './types';
import { extractLocalNumber, formatInternationalNumber, getCountryByCode } from './utils';
import Heading from '../ui/Heading';
import CountrySelector from './country-selector';

export default function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryChange,
  isEditing,
  className = '',
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => 
    getCountryByCode(countryCode)
  );
  const [localNumber, setLocalNumber] = useState(() => 
    extractLocalNumber(value, selectedCountry)
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const newCountry = getCountryByCode(countryCode);
    setSelectedCountry(newCountry);
  }, [countryCode]);

  useEffect(() => {
    if (value) {
      const newLocalNumber = extractLocalNumber(value, selectedCountry);
      setLocalNumber(newLocalNumber);
    }
  }, [value, selectedCountry]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    onCountryChange(country.alpha2Code);
    
    const fullNumber = formatInternationalNumber(country, localNumber);
    onChange(fullNumber);
  };

  const handleLocalNumberChange = (newLocalNumber: string) => {
    setLocalNumber(newLocalNumber);

    const fullNumber = formatInternationalNumber(selectedCountry, newLocalNumber);
    onChange(fullNumber);
  };

  if (!isEditing) {
    return (
      <div className={className}>
        <Heading size="sm" className="mb-[0.8rem]">
          Phone number
        </Heading>
        <div className="text-[1.6rem] border border-border rounded-[0.8rem] text-text-primary px-[1.4rem] py-[1rem]">
          {value || ""}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Heading size="sm" className="mb-[0.8rem]">
        Phone number
      </Heading>
      <div className="flex items-center gap-0 rounded-[0.8rem] border border-border overflow-hidden  focus-within:shadow-[0_0_0_5px_rgba(5,61,39,0.1)]">
        <CountrySelector
          selectedCountry={selectedCountry}
          onCountrySelect={handleCountrySelect}
          isOpen={isDropdownOpen}
          onToggle={setIsDropdownOpen}
        />

        <PhoneNumberInput
          value={localNumber}
          onChange={handleLocalNumberChange}
          callingCode={selectedCountry.callingCodes[0]}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}