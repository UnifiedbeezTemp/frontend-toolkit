import { PhoneNumberInputProps } from '../types';

export default function PhoneNumberInput({
  value,
  onChange,
  callingCode,
  isEditing = true,
}: PhoneNumberInputProps) {
  const handleChange = (inputValue: string) => {
    const numbersOnly = inputValue.replace(/\D/g, '');
    onChange(numbersOnly);
  };

  return (
    <div className="flex items-center ml-[-2rem]">
      {/* <div className="text-[1.6rem] text-text-primary  h-full flex items-center flex-1 shrink-0">
        +{callingCode}
      </div> */}
      <input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="flex-1 py-[0.8rem] bg-primary px-[.2rem] text-[1.6rem] border-none text-text-primary focus:outline-none focus:ring-0"
        placeholder="Enter phone number"
        type="tel"
        inputMode="numeric"
        disabled={!isEditing}
      />
    </div>
  );
}