import ImageComponent from "next/image";
import { BusinessObjective } from "../../../../../types/businessObjectiveTypes";

interface ObjectiveListItemProps {
  objective: BusinessObjective;
  isSelected: boolean;
  onToggle: (objective: BusinessObjective) => void;
  icons: Record<string, string>;
}

export function ObjectiveListItem({
  objective,
  isSelected,
  onToggle,
  icons,
}: ObjectiveListItemProps) {
  return (
    <button
      onClick={() => onToggle(objective)}
      className={`w-full text-left rounded-[0.8rem] transition-colors flex items-start gap-3 px-[1.6rem] py-[0.8rem] ${
        isSelected
          ? "layout-body border-transparent bg-input-filled"
          : "border-border border"
      }`}
    >
      <div className="flex-1">
        <div
          className={`${
            isSelected ? "text-text-secondary" : "text-text-primary"
          } font-[700] text-[1.4rem]`}
        >
          {objective.title}
        </div>
        <div className="text-text-primary text-[1rem] mt-1">
          {objective.description}
        </div>
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
          <div className="w-[20px] h-[20px] border rounded-full border-border shrink-0" />
        )}
      </div>
    </button>
  );
}
