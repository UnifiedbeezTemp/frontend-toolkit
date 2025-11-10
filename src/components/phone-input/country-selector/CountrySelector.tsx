import { useRef } from 'react';
import { CountrySelectorProps } from '../types';
import CountryDropdown from './CountryDropdown';

export default function CountrySelector({
  selectedCountry,
  onCountrySelect,
  isOpen,
  onToggle,
}: CountrySelectorProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);

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
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="var(--text-primary)"
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M4 6L8 10L12 6" stroke="var(--text-primary)" strokeWidth="2" fill="none"/>
        </svg>
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