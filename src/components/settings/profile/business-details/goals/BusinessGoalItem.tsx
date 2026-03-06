import ImageComponent from "next/image";
import { cn } from "../../../../../lib/utils";
import { BusinessGoal } from "../../../../../types/businessGoalTypes";

interface BusinessGoalItemProps {
  goal: BusinessGoal;
  isSelected: boolean;
  onSelect: (goal: BusinessGoal) => void;
  icons: Record<string, string>;
}

export default function BusinessGoalItem({
  goal,
  isSelected,
  onSelect,
  icons,
}: BusinessGoalItemProps) {
  return (
    <button
      onClick={() => onSelect(goal)}
      className={cn(
        "flex p-[1.6rem] items-center justify-between w-full rounded-[0.8rem]",
        isSelected && "bg-input-filled"
      )}
    >
      <div className="flex flex-col items-start text-left">
        <span className="text-[1.4rem] font-[700] text-text-secondary">
          {goal.title}
        </span>
        <span className="text-[1rem] font-[400] text-text-primary">
          {goal.description}
        </span>
      </div>

      <div>
        {isSelected ? (
          <ImageComponent
            alt="check"
            src={icons.check}
            width={20}
            height={20}
          />
        ) : (
          <div className="w-[2rem] h-[2rem] border rounded-full border-border shrink-0" />
        )}
      </div>
    </button>
  );
}
