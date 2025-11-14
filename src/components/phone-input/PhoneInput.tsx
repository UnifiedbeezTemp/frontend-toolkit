import Heading from "../ui/Heading";
import PhoneNumberInput from "./phone-number-input/PhoneNumberInput";
import CountrySelector from "./country-selector";
import { PhoneInputProps } from "./types";
import { usePhoneInput } from "./hooks/usePhoneInput";

export default function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryChange,
  isEditing,
  className = "",
}: PhoneInputProps) {
  const {
    selectedCountry,
    localNumber,
    isDropdownOpen,
    handleCountrySelect,
    handleLocalNumberChange,
    handleToggleDropdown,
  } = usePhoneInput({
    value,
    onChange,
    countryCode,
    onCountryChange,
  });

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
      <div className="flex items-center gap-0 rounded-[0.8rem] border border-border overflow-hidden focus-within:shadow-[0_0_0_5px_rgba(5,61,39,0.1)]">
        <CountrySelector
          selectedCountry={selectedCountry}
          onCountrySelect={handleCountrySelect}
          isOpen={isDropdownOpen}
          onToggle={handleToggleDropdown}
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
