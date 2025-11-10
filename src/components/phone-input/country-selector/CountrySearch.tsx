import { Search } from "lucide-react";
import { CountrySearchProps } from "../types";

export default function CountrySearch({ value, onChange }: CountrySearchProps) {
  return (
    <div className="p-[1.4rem] border-b border-border">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary"
        />
        <input
          type="text"
          placeholder="Search countries..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-none text-[1.6rem] text-text-primary focus:shadow-[0_0_0_5px_rgba(5,61,39,0.1)] text-[1.4rem]"
          autoFocus
        />
      </div>
    </div>
  );
}
