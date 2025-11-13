import { CountryListProps } from '../types';

export default function CountryList({
  countries,
  selectedCountry,
  onCountrySelect,
}: CountryListProps) {
  if (countries.length === 0) {
    return (
      <div className="px-4 py-3 text-center text-text-primary text-[1.6rem]">
        No countries found
      </div>
    );
  }

  return (
    <div className="max-h-[40rem] overflow-y-auto">
      {countries.map((country) => (
        <button
          key={country?.alpha2Code}
          onClick={() => onCountrySelect(country)}
          className={`w-full px-4 py-3 text-left hover:bg-border/10 transition-colors flex  text-[1.6rem] items-center justify-between ${
            country?.alpha2Code === selectedCountry?.alpha2Code ? 'bg-brand-primary/10' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-[2rem]">{country?.flag}</span>
            <div className="flex flex-col items-start">
              <span className="font-medium text-text-secondary">
                {country?.name}
              </span>
              <span className="text-text-primary">
                {country?.alpha2Code}
              </span>
            </div>
          </div>
          <span className="text-text-primary">
            +{country?.callingCodes[0]}
          </span>
        </button>
      ))}
    </div>
  );
}