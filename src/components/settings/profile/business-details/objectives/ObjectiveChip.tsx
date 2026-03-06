import { BusinessObjective } from "@/shared/src/data/businessObjectives";

interface ObjectiveChipProps {
  objective: BusinessObjective;
}

export function ObjectiveChip({ objective }: ObjectiveChipProps) {
  return (
    <div className="border border-border rounded-[0.8rem] px-[1.6rem] py-[0.8rem] text-left min-w-[120px]">
      <div className="text-text-primary font-[700] text-[1.4rem] truncate whitespace-nowrap">
        {objective.title}
      </div>
      <div className="text-text-primary font-400] text-[1rem] mt-1">
        {objective.description}
      </div>
    </div>
  );
}