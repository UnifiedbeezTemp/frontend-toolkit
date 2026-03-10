import { useBusinessObjectives } from "./hooks/useBusinessObjectives";
import BusinessObjectivesTrigger from "./BusinessObjectivesTrigger";
import BusinessObjectivesList from "./BusinessObjectivesList";
import { BusinessInfo } from "../utils/types";
import { useBusinessObjectivesQuery } from "../../../../../api/hooks/useBusinessObjectivesQuery";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import Skeleton from "../../../../ui/Skeleton";
import { SmartDropdown } from "../../../../smart-dropdown";
import Button from "../../../../ui/Button";

interface Props {
  isEditing: boolean;
  currentInfo: BusinessInfo;
  setEditingInfo: (value: BusinessInfo) => void;
}

export default function BusinessObjectives({
  isEditing,
  currentInfo,
  setEditingInfo,
}: Props) {
  const {
    data: objectivesData,
    isLoading,
    error: queryError,
    refetch,
  } = useBusinessObjectivesQuery();

  const {
    showDropdown,
    triggerRef,
    handleToggleObjective,
    handleToggleDropdown,
    handleCloseDropdown,
  } = useBusinessObjectives({
    currentInfo,
    setEditingInfo,
    isEditing,
  });

  if (isLoading) {
    return (
      <div className="mt-[2.4rem]">
        <Heading size="sm" className="mb-[0.8rem]">
          Business Objectives
        </Heading>
        <Skeleton className="h-[6.4rem] w-full rounded-[0.8rem]" />
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="mt-[2.4rem]">
        <Heading size="sm" className="mb-[0.8rem]">
          Business Objectives
        </Heading>
        <div className="w-full border border-destructive/20 rounded-[0.8rem] p-[1.4rem] flex items-center justify-between bg-destructive/5">
          <Text className="text-destructive">
            Failed to load business objectives.
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
        Business Objectives
      </Heading>

      <BusinessObjectivesTrigger
        currentInfo={currentInfo}
        isEditing={isEditing}
        showDropdown={showDropdown}
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
        <BusinessObjectivesList
          currentInfo={currentInfo}
          onToggleObjective={handleToggleObjective}
          objectives={objectivesData || []}
        />
      </SmartDropdown>
    </div>
  );
}
