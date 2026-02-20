import React from "react";
import Input from "../../../forms/Input";
import ImageComponent from "../../../ui/ImageComponent";
import Text from "../../../ui/Text";

import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";

interface LanguageSearchProps {
  query: string;
  onSearch: (value: string) => void;
  selectedCount: number;
  maxCount: number;
  isUnlimited?: boolean;
  icons: ReturnType<typeof useSupabaseIcons>;
}

export const LanguageSearch: React.FC<LanguageSearchProps> = ({
  query,
  onSearch,
  selectedCount,
  maxCount,
  isUnlimited = false,
  icons,
}) => {
  return (
    <div className="p-[1.4rem] sm:p-[2.4rem] border-y border-border mb-[1.4rem] sm:mb-[2.4rem]">
      <Input
        placeholder="Search languages..."
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        leftIcon={
          <ImageComponent
            src={icons.searchSmIcon}
            alt="Search"
            width={20}
            height={20}
          />
        }
        className="mb-[1.6rem]"
      />

      <div className="flex justify-between items-center">
        <Text className="text-[1.4rem] text-text-primary">
          {isUnlimited
            ? `${selectedCount} languages selected`
            : `${selectedCount} of ${maxCount} languages selected`}
        </Text>
      </div>
    </div>
  );
};
