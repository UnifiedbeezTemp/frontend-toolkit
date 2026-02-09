import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Dropdown from "../dropdown/Dropdown";
import { DropdownOption } from "../dropdown/hooks/useDropdown";
import Input from "../forms/Input";
import ImageComponent from "../ui/ImageComponent";

interface ChildProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
}

const filterOptions: DropdownOption[] = [
  { label: "Most Popular", value: "popular" },
  { label: "Communication Channels", value: "Communication Channels" },
  { label: "CRM & Calendar Sync", value: "CRM & Calendar Sync" },
  { label: "Ecommerce & Payment", value: "Ecommerce & Payment" },
  { label: "Upcoming / Future Integrations", value: "upcoming" },
];

export default function SearchSection({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
}: ChildProps) {
  const supabaseIcons = useSupabaseIcons();

  const filterIcon = (
    <ImageComponent
      alt="filter icon"
      src={supabaseIcons.filterLinesIcon}
      width={25}
      height={25}
      className="object-cover"
    />
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center gap-4 w-full mt-[1.5rem]">
      <div className="flex-1 relative group">
        <Input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Find integrations, apps, and more"
          leftIcon={
            <ImageComponent
              alt="search"
              src={supabaseIcons.lucideSearch}
              width={20}
              height={20}
              className="object-cover"
            />
          }
        />
      </div>

      <Dropdown
        options={filterOptions}
        value={filter}
        onSelect={setFilter}
        placeholder="Filter by"
        icon={filterIcon}
        dropdownClassName="min-w-[25rem]"
      />
    </div>
  );
}
