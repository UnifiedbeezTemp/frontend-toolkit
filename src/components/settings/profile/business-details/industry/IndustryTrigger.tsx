import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { formatEnumString } from "../../../../../utils";
import { BusinessInfo } from "../utils/types";

interface IndustryTriggerProps {
  currentInfo: BusinessInfo;
  isEditing: boolean;
  onToggle: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export default function IndustryTrigger({
  currentInfo,
  isEditing,
  onToggle,
  triggerRef,
}: IndustryTriggerProps) {
  const icons = useSupabaseIcons();

  return (
    <button
      ref={triggerRef}
      disabled={!isEditing}
      className="w-full border bg-primary disabled:cursor-not-allowed border-border rounded-[0.8rem] p-[1.4rem] flex items-center justify-between  hover:border-brand-primary/50  disabled:border-border transition-colors"
      onClick={onToggle}
    >
      <span className="flex items-center gap-[0.8rem] justify-between text-[1.4rem] text-text-secondary font-[700]">
        <span className="text-[3rem]">{currentInfo.industry.icon}</span>
        {formatEnumString(currentInfo.industry.name)}
      </span>

      {isEditing && (
        <span className="text-text-primary-2 text-[1.4rem] font-[700] flex items-center gap-[2px] underline">
          Edit
          <ImageComponent
            src={icons.linkExternal2}
            alt=""
            width={15}
            height={15}
          />
        </span>
      )}
    </button>
  );
}
