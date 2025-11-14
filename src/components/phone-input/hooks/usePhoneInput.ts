import { useState, useEffect } from 'react';
import { PhoneInputProps, Country } from '../types';
import { extractLocalNumber, formatInternationalNumber, getCountryByCode } from '../utils';

export function usePhoneInput({
  value,
  onChange,
  countryCode,
  onCountryChange,
}: Pick<PhoneInputProps, 'value' | 'onChange' | 'countryCode' | 'onCountryChange'>) {
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

  const handleToggleDropdown = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  return {
    selectedCountry,
    localNumber,
    isDropdownOpen,
    handleCountrySelect,
    handleLocalNumberChange,
    handleToggleDropdown,
  };
}