"use client";

import { useState, useRef, useMemo } from "react";
import { CountrySelectorProps } from "../../types";
import { getCountryByCode, filterCountries } from "../../utils/twilioUtils";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import Input from "../../../../../forms/Input";
import { SmartDropdown } from "../../../../../smart-dropdown";

export default function CountrySelector({
  countryCode,
  onCountryCodeChange,
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const icons = useSupabaseIcons();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedCountry = useMemo(
    () => getCountryByCode(countryCode),
    [countryCode]
  );

  const filteredCountries = useMemo(() => filterCountries(search), [search]);

  return (
    <div>
      <label className="block text-[1.4rem] lg:text-[1.6rem] text-text-secondary font-[700] mb-[0.8rem]">
        Country Code
      </label>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-[1.4rem] py-[1rem] bg-primary border border-input-stroke rounded-[0.8rem] text-[1.6rem] text-text-primary flex items-center justify-between focus:border-brand-primary focus:ring-2 focus:ring-focus-ring outline-none"
      >
        <span className="flex items-center gap-[0.8rem]">
          <span className="text-[2rem] rounded-full">
            {selectedCountry.flag}
          </span>
          <ImageComponent
            src={icons.chevronDown}
            alt="arrow-down"
            width={15}
            height={15}
            className="w-[1.6rem] h-[1.6rem]"
          />
          <span className="text-[1.4rem] lg:text-[1.6rem]">
            {selectedCountry.name}
          </span>
        </span>
        <ImageComponent
          src={icons.gridDropdown}
          alt="arrow-down"
          width={25}
          height={25}
          className="w-[1.6rem] h-[1.6rem]"
        />
      </button>

      <SmartDropdown
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSearch("");
        }}
        triggerRef={triggerRef}
        maxHeight="25rem"
      >
        <div className="p-[1.5rem]">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search countries..."
            autoFocus
          />
        </div>
        <div className="py-[0.4rem]">
          {filteredCountries.map((country) => (
            <button
              key={country.alpha2Code}
              type="button"
              onClick={() => {
                onCountryCodeChange(country.alpha2Code);
                setIsOpen(false);
                setSearch("");
              }}
              className={`w-full px-[1.4rem] py-[1rem] text-left flex items-center gap-[0.8rem] hover:bg-hover-bg transition-colors ${
                country.alpha2Code === countryCode ? "bg-brand-primary/10" : ""
              }`}
            >
              <span className="text-[2rem]">{country.flag}</span>
              <span className="text-[1.4rem] text-text-primary">
                {country.name}
              </span>
              <span className="text-[1.2rem] text-text-tertiary ml-auto">
                {country.alpha2Code}
              </span>
            </button>
          ))}
        </div>
      </SmartDropdown>
    </div>
  );
}
