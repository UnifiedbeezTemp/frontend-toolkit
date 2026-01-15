import Heading from "../ui/Heading";
import PhoneNumberInput from "./phone-number-input/PhoneNumberInput";
import CountrySelector from "./country-selector";
import { PhoneInputProps } from "./types";
import { usePhoneInput } from "./hooks/usePhoneInput";
import { cn } from "../../lib/utils";

export default function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryChange,
  isEditing,
  className = "",
  labelClasses
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
      <Heading size={"sm"} className={cn("mb-[0.8rem]", labelClasses)}>
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
      <Heading size={"sm"} className={cn("mb-[0.4rem]", labelClasses)}>
        Phone number
      </Heading>
      <div className="flex items-center gap-[1rem] rounded-[0.8rem] bg-primary border border-border overflow-hidden focus-within:border-brand-primary focus-within:border-(--primary-90) focus-within:ring-4 focus-within:ring-(--focus-ring) focus-within:outline-none">
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
