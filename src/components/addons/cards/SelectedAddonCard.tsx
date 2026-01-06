import { Addon } from "../../../store/onboarding/types/addonTypes";
import { BaseAddonCard } from "./BaseAddonCard";

interface SelectedAddonCardProps {
  addon: Addon;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
  isRemoving?: boolean;
}

export const SelectedAddonCard: React.FC<SelectedAddonCardProps> = ({
  addon,
  onRemove,
  onQuantityChange,
  isRemoving = false,
}) => {
  return (
    <BaseAddonCard
      addon={addon}
      isSelected={true}
      variant="manage"
      showProgress={true}
      onRemove={onRemove}
      onQuantityChange={onQuantityChange}
      isRemoving={isRemoving}
    />
  );
};
