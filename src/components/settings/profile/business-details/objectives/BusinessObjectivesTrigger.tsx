import { useObjectiveDisplay } from "./hooks/useObjectivesDisplay";
import { ObjectiveChip } from "./ObjectiveChip";
import { BusinessInfo } from "../utils/types";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";

interface BusinessObjectivesTriggerProps {
  currentInfo: BusinessInfo;
  isEditing: boolean;
  showDropdown: boolean;
  onToggle: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export default function BusinessObjectivesTrigger({
  currentInfo,
  isEditing,
  showDropdown,
  onToggle,
  triggerRef,
}: BusinessObjectivesTriggerProps) {
  const icons = useSupabaseIcons();
  const { visibleObjectives, hiddenCount } = useObjectiveDisplay(
    currentInfo.objectives
  );

  return (
    <button
      ref={triggerRef}
      onClick={onToggle}
      disabled={!isEditing}
      className="w-full border bg-primary border-border rounded-[0.8rem] p-[1.4rem] min-h-[6.4rem] flex items-center justify-between hover:border-brand-primary/50 disabled:cursor-not-allowed disabled:hover:border-border transition-all"
    >
      <div className="flex flex-nowrap gap-[0.8rem] items-center flex- overflow-hidden lg:w-[70%]">
        {currentInfo.objectives.length > 0 ? (
          <>
            {visibleObjectives.map((obj, idx) => (
              <ObjectiveChip key={idx} objective={obj} />
            ))}
            {hiddenCount > 0 && (
              <span className="text-dark-base-40 text-[1.2rem] sm:text-[1.4rem] lg:text-[1.6rem] font-[700] px-[0.8rem] py-[0.4rem] rounded-full">
                +{hiddenCount}
              </span>
            )}
          </>
        ) : (
          <span className="text-text-primary-2 text-[1.4rem] px-[1.6rem]">
            Select business objectives
          </span>
        )}
      </div>

      {isEditing && (
        <span
          className={`${
            showDropdown ? "rotate-180" : ""
          } text-text-primary-2 transition-transform duration-200 ml-[1.2rem]`}
        >
          <ImageComponent
            src={icons.chevronDown}
            alt=""
            width={16}
            height={16}
          />
        </span>
      )}
    </button>
  );
}
