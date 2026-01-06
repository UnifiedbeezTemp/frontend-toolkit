import { Addon } from "../../../store/onboarding/types/addonTypes";
import { BaseAddonCard } from "./BaseAddonCard";

interface AddonCardProps {
  addon: Addon;
  isSelected: boolean;
  onAdd: () => void;
  showAddButton?: boolean;
}

export const AddonCard: React.FC<AddonCardProps> = ({
  addon,
  isSelected,
  onAdd,
  showAddButton = true,
}) => {
  if (!showAddButton) {
    return (
      <BaseAddonCard
        addon={addon}
        isSelected={isSelected}
        variant="add"
        showProgress={false}
        className="opacity-50"
      />
    );
  }

  return (
    <BaseAddonCard
      addon={addon}
      isSelected={isSelected}
      variant="add"
      showProgress={false}
      onAdd={onAdd}
    />
  );
};
