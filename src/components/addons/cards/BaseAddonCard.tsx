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
  isAdding?: boolean;
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
  isAdding = false,
  className = "",
}) => {
  const isUnlimited = addon.limit === -1;
  const progressPercentage =
    !isUnlimited && addon.limit > 0
      ? ((addon.used || 0) / addon.limit) * 100
      : 0;
  const activeCount = addon.active || 0;
  const cancellingCount = addon.scheduledForCancellation || 0;

  return (
    <Card
      className={`p-[2.4rem] rounded-[1.6rem] overflow-hidden ${className} ${
        addon.isIncludedInPlan
          ? "pointer-events-none"
          : ""
      }`}
    >
      <AddonHeader
        addon={addon}
        isSelected={isSelected}
        showCheckbox={variant === "add"}
        onRemove={onRemove}
        variant={variant}
      />

      {showProgress && (
        <div className="mt-[1.6rem] ">
          {!isUnlimited ? (
            <ProgressBar
              progressPercentage={progressPercentage}
              className="border-none shadow-none h-[0.7rem]"
            />
          ) : (
            <div className="text-[1.4rem] font-bold text-brand-primary">
              Unlimited
            </div>
          )}
        </div>
      )}

      <AddonInfo addon={addon} />

      <AddonActions
        addon={addon}
        variant={variant}
        onAdd={onAdd}
        onRemove={onRemove}
        onQuantityChange={onQuantityChange}
        isRemoving={isRemoving}
        isAdding={isAdding}
      />
    </Card>
  );
};
