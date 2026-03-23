"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import countries from "../../../data/countries";
import ImageComponent from "../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Input from "../../forms/Input";
import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import { cn } from "../../../lib/utils";

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
}

export default function CountrySelector({
  value,
  onChange,
  error,
  label = "Country",
  required = false,
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const icons = useSupabaseIcons();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedCountry = useMemo(
    () => countries.find((c) => c.alpha2Code === value),
    [value],
  );

  const filteredCountries = useMemo(() => {
    if (!search) return countries;
    const lowerSearch = search.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerSearch) ||
        c.alpha2Code.toLowerCase().includes(lowerSearch),
    );
  }, [search]);

  // Reset search when opening/closing
  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  return (
    <div className="space-y-[0.6rem]">
      {label && (
        <label className="block text-[1.4rem] font-[500] text-text-primary">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-[1.4rem] py-[1.2rem] bg-white border rounded-[0.8rem] text-[1.4rem] text-text-primary flex items-center justify-between transition-all duration-200 outline-none",
          isOpen
            ? "border-brand-primary ring-2 ring-brand-primary/10"
            : "border-border",
          error ? "border-destructive" : "hover:border-brand-primary/50",
        )}
      >
        <span className="flex items-center gap-[0.8rem] min-w-0 flex-1">
          {selectedCountry ? (
            <>
              <span className="text-[2rem] leading-none shrink-0">
                {selectedCountry.flag}
              </span>
              <span className="font-[500] truncate min-w-0">
                {selectedCountry.name}
              </span>
            </>
          ) : (
            <span className="text-text-tertiary truncate min-w-0">
              Select a country
            </span>
          )}
        </span>
        <div className="flex items-center gap-[0.8rem] shrink-0">
          {selectedCountry && (
            <span className="text-[1.2rem] text-text-tertiary font-mono uppercase bg-surface-secondary px-[0.4rem] py-[0.1rem] rounded border border-border">
              {selectedCountry.alpha2Code}
            </span>
          )}
          <ImageComponent
            src={icons.chevronDown}
            alt="arrow-down"
            width={16}
            height={16}
            className={cn(
              "w-[1.6rem] h-[1.6rem] transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </div>
      </button>

      <SmartDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        maxHeight="32rem"
      >
        <div className="sticky top-0 bg-primary/80 backdrop-blur-md p-[1.2rem] border-b border-border z-10">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search countries..."
            autoFocus
            leftIcon={
              <ImageComponent
                src={icons.searchSmIcon || ""}
                alt="search"
                width={16}
                height={16}
              />
            }
          />
        </div>
        <div className="py-[0.4rem]">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <button
                key={country.alpha2Code}
                type="button"
                onClick={() => {
                  onChange(country.alpha2Code);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-[1.4rem] py-[1rem] text-left flex items-center gap-[1.2rem] hover:bg-surface-secondary transition-colors group",
                  country.alpha2Code === value ? "bg-brand-primary/5" : "",
                )}
              >
                <span className="text-[2.2rem] transition-transform group-hover:scale-110">
                  {country.flag}
                </span>
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "text-[1.4rem] transition-colors",
                      country.alpha2Code === value
                        ? "text-brand-primary font-[600]"
                        : "text-text-primary",
                    )}
                  >
                    {country.name}
                  </span>
                </div>
                <span className="text-[1.2rem] text-text-tertiary ml-auto font-mono">
                  {country.alpha2Code}
                </span>
              </button>
            ))
          ) : (
            <div className="px-[1.4rem] py-[2rem] text-center text-text-secondary text-[1.4rem]">
              No countries found for "{search}"
            </div>
          )}
        </div>
      </SmartDropdown>

      {error && (
        <p className="text-destructive text-[1.2rem] font-[500] animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
