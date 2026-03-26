import { cn } from "@/lib/utils";
import { Industry } from "@/shared/src/data/industries";
import ImageComponent from "next/image";
import { formatEnumString } from "@/shared/src/utils";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";

interface IndustryItemProps {
  industry: Industry;
  isSelected: boolean;
  onSelect: (industry: Industry) => void;
}

export default function IndustryItem({
  industry,
  isSelected,
  onSelect,
}: IndustryItemProps) {
  const icons = useSupabaseIcons()
  return (
    <button
      onClick={() => onSelect(industry)}
      className={cn(
        "w-full text-[1.4rem] flex items-center justify-between p-2 rounded-lg hover:bg-inactive-color/30 transition-colors",
        isSelected ? "font-[700]" : "font-[400]",
      )}
    >
      <div className="flex items-center gap-[1.5rem]">
        <span className="text-[2rem]">{industry.icon}</span>
        <span className="text-[1.4rem]">{formatEnumString(industry.name)}</span>
      </div>
      {isSelected && (
        <ImageComponent
          src={icons.checkboxBase2}
          alt="Selected"
          width={15}
          height={15}
        />
      )}
    </button>
  );
}
