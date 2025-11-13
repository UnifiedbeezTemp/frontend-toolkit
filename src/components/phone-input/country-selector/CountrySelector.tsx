import { useRef } from 'react';
import { CountrySelectorProps } from '../types';
import CountryDropdown from './CountryDropdown';
import { useSupabaseIcons } from '../../../lib/supabase/useSupabase';
import ImageComponent from '../../ui/ImageComponent';

export default function CountrySelector({
  selectedCountry,
  onCountrySelect,
  isOpen,
  onToggle,
}: CountrySelectorProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const icons = useSupabaseIcons()

  return (
    <div className="w-[18%] max-w-[8rem]">
      <button
        ref={triggerRef}
        onClick={() => onToggle(!isOpen)}
        className="w-full h-[4.4rem] bg-primary px-[1.2rem] text-[1.4rem] flex items-center justify-between hover:bg-border/10 transition-colors"
      >
        <span className="flex items-center gap-2">
          <span>{selectedCountry.flag}</span>
          <span className="text-[1.6rem] text-text-primary">{selectedCountry.alpha2Code}</span>
        </span>
        <ImageComponent src={icons.chevronDown} alt={""} width={20} height={20} />
      </button>

      <CountryDropdown
        selectedCountry={selectedCountry}
        onCountrySelect={onCountrySelect}
        isOpen={isOpen}
        onClose={() => onToggle(false)}
        triggerRef={triggerRef}
      />
    </div>
  );
}