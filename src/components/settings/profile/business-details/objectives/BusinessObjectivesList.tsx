import { ObjectiveListItem } from "./ObjectiveListItem";
import { BusinessInfo } from "../utils/types";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { BusinessObjective } from "../../../../../types/businessObjectiveTypes";

interface BusinessObjectivesListProps {
  currentInfo: BusinessInfo;
  onToggleObjective: (objective: BusinessObjective) => void;
  objectives: BusinessObjective[];
}

export default function BusinessObjectivesList({
  currentInfo,
  onToggleObjective,
  objectives,
}: BusinessObjectivesListProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="p-[1.4rem] flex flex-col gap-[0.8rem]">
      {objectives.map((objective, index) => (
        <ObjectiveListItem
          key={index}
          objective={objective}
          isSelected={currentInfo.objectives.some(
            (o) => o.title === objective.title
          )}
          onToggle={onToggleObjective}
          icons={icons}
        />
      ))}
    </div>
  );
}
