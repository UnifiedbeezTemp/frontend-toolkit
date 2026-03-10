import ImageComponent from "next/image";
import { BusinessInfo } from "../utils/types";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";

interface BusinessGoalsTriggerProps {
  currentInfo: BusinessInfo;
  isEditing: boolean;
  onToggle: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  isOpen: boolean;
}

export default function BusinessGoalsTrigger({
  currentInfo,
  isEditing,
  onToggle,
  triggerRef,
  isOpen,
}: BusinessGoalsTriggerProps) {
  const icons = useSupabaseIcons();
  const hasGoals = currentInfo.goals.length > 0;
  const firstGoal = currentInfo.goals[0];
  const moreCount = currentInfo.goals.length - 1;

  return (
    <button
      ref={triggerRef}
      onClick={onToggle}
      disabled={!isEditing}
      className="w-full border bg-primary disabled:cursor-not-allowed border-border rounded-[0.8rem] p-[1.4rem] flex items-center justify-between hover:border-brand-primary/50 disabled:border-border transition-colors min-h-[6.4rem]"
    >
      <span className="flex items-center flex-nowrap w-full px-[1.6rem] overflow-hidden">
        <span className="flex flex-col items-start">
          <span className="text-text-secondary font-[700] text-[1.4rem]">
            {hasGoals ? firstGoal.title : "Select business goals"}
          </span>
          <span className="text-text-primary font-[400] text-[1rem]">
            {hasGoals
              ? firstGoal.description
              : "What are your main objectives?"}
          </span>
        </span>

        {moreCount > 0 && (
          <span className="text-dark-base-40 text-[1.2rem] sm:text-[1.4rem] lg:text-[1.6rem] font-[700] px-[0.8rem] py-[0.4rem] rounded-full">
            +{moreCount}
          </span>
        )}
      </span>

      {isEditing && (
        <span
          className={`${
            isOpen ? "rotate-180" : ""
          } text-text-primary-2 text-[1.4rem] font-[700] flex items-center gap-[2px] transition-transform`}
        >
          <ImageComponent
            src={icons.chevronDown}
            alt=""
            width={15}
            height={15}
          />
        </span>
      )}
    </button>
  );
}
