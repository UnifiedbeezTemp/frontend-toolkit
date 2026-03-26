import BusinessGoalItem from "./BusinessGoalItem";
import { BusinessInfo } from "../utils/types";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { BusinessGoal } from "../../../../../types/businessGoalTypes";

interface BusinessGoalsListProps {
  currentInfo: BusinessInfo;
  onSelectGoal: (goal: BusinessGoal) => void;
  goals: BusinessGoal[];
}

export default function BusinessGoalsList({
  currentInfo,
  onSelectGoal,
  goals,
}: BusinessGoalsListProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="p-[1.4rem]">
      {goals.map((goal, index) => (
        <BusinessGoalItem
          key={index}
          goal={goal}
          isSelected={currentInfo.goals.some((g) => g.title === goal.title)}
          onSelect={onSelectGoal}
          icons={icons}
        />
      ))}
    </div>
  );
}
