/**
 * COMPONENT: CountryDropdown
 * 
 * PURPOSE:
 * Dropdown container for country selection with search and list
 * Integrates with SmartDropdown for positioning
 */

import { useState, useEffect } from 'react';
import { Country, CountryDropdownProps } from '../types';
import { filterCountries } from '../utils';
import { SmartDropdown } from '../../smart-dropdown';
import CountryList from './CountryList';
import CountrySearch from './CountrySearch';

export default function CountryDropdown({
  selectedCountry,
  onCountrySelect,
  isOpen,
  onClose,
  triggerRef,
}: CountryDropdownProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCountries = filterCountries(searchQuery);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  const handleCountrySelect = (country: Country) => {
    onCountrySelect(country);
    onClose();
  };

  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      placement="bottom-start"
      className="min-w-[50rem] bg-[red] h-[500rem]"
      maxHeight="30rem"
      closeOnClick={false}
    >
      <CountrySearch
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <CountryList
        countries={filteredCountries}
        selectedCountry={selectedCountry}
        onCountrySelect={handleCountrySelect}
      />
    </SmartDropdown>
  );
}