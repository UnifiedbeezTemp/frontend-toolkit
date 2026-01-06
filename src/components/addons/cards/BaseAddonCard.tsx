import ProgressBar from "../../ui/ProgressBar";
import { AddonHeader } from "./AddonHeader";
import { AddonInfo } from "./AddonInfo";
import { AddonActions } from "./AddonActions";
import Card from "../../ui/Card";
import { Addon } from "../../../store/onboarding/types/addonTypes";

interface BaseAddonCardProps {
  addon: Addon;
  isSelected: boolean;
  variant: "add" | "manage";
  showProgress?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  onQuantityChange?: (quantity: number) => void;
  isRemoving?: boolean;
  className?: string;
}

export const BaseAddonCard: React.FC<BaseAddonCardProps> = ({
  addon,
  isSelected,
  variant,
  showProgress = false,
  onAdd,
  onRemove,
  onQuantityChange,
  isRemoving = false,
  className = "",
}) => {
  const progressPercentage = ((addon.used || 1) / addon.limit) * 100;

  return (
    <Card className={`p-[2.4rem] rounded-[1.6rem] ${className}`}>
      <AddonHeader addon={addon} isSelected={isSelected} showCheckbox={true} />

      {showProgress && (
        <ProgressBar
          progressPercentage={progressPercentage}
          className="mt-[1.6rem] border-none shadow-none"
        />
      )}

      <AddonInfo addon={addon} />

      <AddonActions
        addon={addon}
        variant={variant}
        onAdd={onAdd}
        onRemove={onRemove}
        onQuantityChange={onQuantityChange}
        isRemoving={isRemoving}
      />
    </Card>
  );
};
