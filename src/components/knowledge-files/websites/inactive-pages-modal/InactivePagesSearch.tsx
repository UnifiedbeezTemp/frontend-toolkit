import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import Input from "../../../forms/Input";


interface InactivePagesSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function InactivePagesSearch({
  searchQuery,
  onSearchChange,
}: InactivePagesSearchProps) {
  const icons = useSupabaseIcons();

  return (
    <Input
      value={searchQuery}
      placeholder="Search"
      onChange={(e) => onSearchChange(e.target.value)}
      leftIcon={
        <ImageComponent
          alt="search"
          src={icons.lucideSearch}
          width={20}
          height={20}
          className="object-cover"
        />
      }
    />
  );
}