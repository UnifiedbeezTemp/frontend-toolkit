import { useState, useRef, useEffect } from "react";
import countries from "@/shared/src/data/countries";
import Heading from "@/shared/src/components/ui/Heading";
import { ChevronDown, Search } from "lucide-react";
import { SmartDropdown } from "@/shared/src/components/smart-dropdown";

interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
  countryCode: string;
  onCountryChange: (countryCode: string) => void;
  isEditing: boolean;
}

interface Country {
  alpha2Code: string;
  name: string;
  flag: string;
  callingCodes: string[];
}

export default function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryChange,
  isEditing,
}: PhoneInputProps) {
  const defaultCountry = countries.find((c) => c.alpha2Code === countryCode) || countries[0];
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Extract local number from the full phone number
  const extractLocalNumber = (phone: string, countryObj: Country) => {
    if (!phone || !countryObj) return "";
    
    const callingCode = countryObj.callingCodes[0];
    if (phone.startsWith(`+${callingCode}`)) {
      return phone.replace(`+${callingCode}`, "");
    }
    return phone.replace(/^\+\d+/, "");
  };

  const [localNumber, setLocalNumber] = useState(() => 
    extractLocalNumber(value, defaultCountry)
  );

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.alpha2Code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.callingCodes[0].includes(searchQuery)
  );

  // Update local number when value or country changes
  useEffect(() => {
    if (value) {
      const newLocalNumber = extractLocalNumber(value, country);
      setLocalNumber(newLocalNumber);
    }
  }, [value, country]);

  const handleCountrySelect = (selectedCountry: Country) => {
    setCountry(selectedCountry);
    onCountryChange(selectedCountry.alpha2Code);
    
    // Update the full phone number with new country code + existing local number
    const fullNumber = `+${selectedCountry.callingCodes[0]}${localNumber}`;
    onChange(fullNumber);
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  const handleLocalNumberChange = (inputValue: string) => {
    // Only allow numbers
    const numbersOnly = inputValue.replace(/\D/g, '');
    setLocalNumber(numbersOnly);
    
    // Update the full phone number
    const fullNumber = `+${country.callingCodes[0]}${numbersOnly}`;
    onChange(fullNumber);
  };

  if (!isEditing) {
    return (
      <div>
        <Heading size="sm" className="mb-[0.8rem]">
          Phone number
        </Heading>
        <div className="text-[1.6rem] border border-border rounded-[0.8rem] text-text-primary px-[1.4rem] py-[1rem]">
          {value || "Not provided"}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading size="sm" className="mb-[0.8rem]">
        Phone number
      </Heading>
      <div className="flex gap-0 rounded-[0.8rem] border border-border overflow-hidden focus-within:ring-2 focus-within:ring-brand-primary/20 focus-within:border-brand-primary">
        {/* Country Select */}
        <div className="w-[20%] border-r border-border">
          <button
            ref={triggerRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full h-[4.4rem] bg-primary px-[1.2rem] text-[1.4rem] flex items-center justify-between hover:bg-border/10 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span>{country.flag}</span>
              <span className="text-[1.2rem]">{country.alpha2Code}</span>
            </span>
            <ChevronDown size={16} className="text-text-primary" />
          </button>

          <SmartDropdown
            isOpen={isDropdownOpen}
            onClose={() => {
              setIsDropdownOpen(false);
              setSearchQuery("");
            }}
            triggerRef={triggerRef}
            placement="bottom-start"
            className="min-w-[300px] max-h-[300px]"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  autoFocus
                />
              </div>
            </div>

            {/* Countries List */}
            <div className="max-h-[200px] overflow-y-auto">
              {filteredCountries.map((countryItem) => (
                <button
                  key={countryItem.alpha2Code}
                  onClick={() => handleCountrySelect(countryItem)}
                  className={`w-full px-4 py-3 text-left hover:bg-border/10 transition-colors flex items-center justify-between ${
                    countryItem.alpha2Code === country.alpha2Code ? 'bg-brand-primary/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{countryItem.flag}</span>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-text-secondary">
                        {countryItem.name}
                      </span>
                      <span className="text-xs text-text-primary">
                        {countryItem.alpha2Code}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-text-primary">
                    +{countryItem.callingCodes[0]}
                  </span>
                </button>
              ))}
              
              {filteredCountries.length === 0 && (
                <div className="px-4 py-3 text-center text-text-primary text-sm">
                  No countries found
                </div>
              )}
            </div>
          </SmartDropdown>
        </div>

        {/* Phone Input */}
        <div className="flex-1 flex items-center">
          <div className="px-[1.2rem] text-[1.6rem] text-text-primary border-r border-border h-full flex items-center bg-border/10">
            +{country.callingCodes[0]}
          </div>
          <input
            value={localNumber}
            onChange={(e) => handleLocalNumberChange(e.target.value)}
            className="flex-1 h-[4.4rem] bg-primary px-[1.2rem] text-[1.6rem] border-none focus:outline-none focus:ring-0 placeholder-text-primary/50"
            placeholder="Enter phone number"
            type="tel"
            inputMode="numeric"
          />
        </div>
      </div>
    </div>
  );
}