import { Check } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { TagPill } from "../TagPill";
import { CRMTagItemProps } from "./types";

export const CRMTagItem = ({
  tag,
  isSelected,
  onToggle,
  config
}: CRMTagItemProps) => {
  return (
    <button
      onClick={() => onToggle(tag.id)}
      className={cn(
        "flex items-center justify-between w-full px-2 py-2.5 rounded-md text-xs transition-colors border group cursor-pointer",
        isSelected 
          ? cn("bg-gradient-to-r border-transparent bg-gradient-yellow-1")
          : "bg-primary hover:bg-gray-50 border-transparent"
      )}
    >
       <TagPill
         label={tag.label}
         className={cn(
           "rounded-md border p-2 text-md font-normal",
           config.pillColor,
           config.borderColor,
           config.textColor
         )}
         showIcon={true}
      />
      
      {isSelected && (
        <div className="bg-[#064e3b] rounded-full p-0.5 mr-1">
          <Check className="w-2 h-2 text-primary" strokeWidth={3} />
        </div>
      )}
    </button>
  );
};
