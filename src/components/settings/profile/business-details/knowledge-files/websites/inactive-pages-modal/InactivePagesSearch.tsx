import Input from "@/shared/src/components/ui/Input";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";

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