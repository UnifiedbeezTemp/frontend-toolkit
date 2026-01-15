export interface Country {
  alpha2Code: string;
  name: string;
  flag: string;
  callingCodes: string[];
}

export interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
  countryCode: string;
  onCountryChange: (countryCode: string) => void;
  isEditing: boolean;
  className?: string;
  labelClasses?: string
  inputClasses?: string
}

export interface CountrySelectorProps {
  selectedCountry: Country;
  onCountrySelect: (country: Country) => void;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

export interface CountryDropdownProps {
  selectedCountry: Country;
  onCountrySelect: (country: Country) => void;
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

export interface CountrySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export interface CountryListProps {
  countries: Country[];
  selectedCountry: Country;
  onCountrySelect: (country: Country) => void;
}

export interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  callingCode: string;
  isEditing?: boolean;
  className?: string
}