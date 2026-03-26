import { useBusinessGoals } from "./hooks/useBusinessGoals";
import BusinessGoalsTrigger from "./BusinessGoalsTrigger";
import BusinessGoalsList from "./BusinessGoalsList";
import { BusinessInfo } from "../utils/types";
import { useBusinessGoalsQuery } from "../../../../../api/hooks/useBusinessGoalsQuery";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import Skeleton from "../../../../ui/Skeleton";
import Button from "../../../../ui/Button";
import SmartDropdown from "../../../../smart-dropdown/SmartDropdown";

interface Props {
  isEditing: boolean;
  currentInfo: BusinessInfo;
  setEditingInfo: (value: BusinessInfo) => void;
}

export default function BusinessGoals({
  isEditing,
  currentInfo,
  setEditingInfo,
}: Props) {
  const {
    data: goalsData,
    isLoading,
    error: queryError,
    refetch,
  } = useBusinessGoalsQuery();

  const {
    showDropdown,
    triggerRef,
    handleSelectGoal,
    handleToggleDropdown,
    handleCloseDropdown,
  } = useBusinessGoals({
    currentInfo,
    setEditingInfo,
    isEditing,
  });

  if (isLoading) {
    return (
      <div className="mt-[2.4rem]">
        <Heading size="sm" className="mb-[0.8rem]">
          Business Goals
        </Heading>
        <Skeleton className="h-[6.4rem] w-full rounded-[0.8rem]" />
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="mt-[2.4rem]">
        <Heading size="sm" className="mb-[0.8rem]">
          Business Goals
        </Heading>
        <div className="w-full border border-destructive/20 rounded-[0.8rem] p-[1.4rem] flex items-center justify-between bg-destructive/5">
          <Text className="text-destructive">
            Failed to load business goals.
          </Text>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[2.4rem]">
      <Heading size="sm" className="mb-[0.8rem]">
        Business Goals
      </Heading>

      <BusinessGoalsTrigger
        currentInfo={currentInfo}
        isEditing={isEditing}
        isOpen={showDropdown}
        onToggle={handleToggleDropdown}
        triggerRef={triggerRef}
      />

      <SmartDropdown
        isOpen={showDropdown}
        onClose={handleCloseDropdown}
        triggerRef={triggerRef}
        placement="bottom-end"
        className="rounded-[.8rem]"
        maxHeight="50rem"
        offset={20}
        closeOnClick={false}
      >
        <BusinessGoalsList
          currentInfo={currentInfo}
          onSelectGoal={handleSelectGoal}
          goals={goalsData || []}
        />
      </SmartDropdown>
    </div>
  );
}
