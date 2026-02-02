import Button from "../../ui/Button";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import Loader from "../../ui/Loader";
import { useUser } from "../../../contexts/UserContext";

interface AddonActionsProps {
  addon: Addon;
  variant: "add" | "manage";
  onAdd?: () => void;
  onRemove?: () => void;
  onQuantityChange?: (quantity: number) => void;
  isRemoving?: boolean;
}

export const AddonActions: React.FC<AddonActionsProps> = ({
  addon,
  variant,
  onAdd,
  onRemove,
  onQuantityChange,
  isRemoving = false,
}) => {
  const icons = useSupabaseIcons();
  const { user } = useUser();
  const isHighestPlan = user?.plan?.toUpperCase() === "ORGANISATION";

  if (variant === "add") {
    return (
      <Button className="text-[1.4rem] mt-[2.4rem] font-bold" onClick={onAdd}>
        <span className="sm:hidden">Add +</span>
        <span className="sm:block hidden">Add {addon.name} +</span>
      </Button>
    );
  }

  const canIncrease = (addon.used || 1) < addon.limit;

  return (
    <div className="mt-[2.4rem]">
      {!canIncrease && addon.limit !== 9999 && !isHighestPlan && (
        <div className="border border-border text-[1.4rem] text-text-primary px-[0.61rem] py-[0.31rem] font-[700] bg-input-filled rounded-[0.4rem] inline-block mb-2">
          Upgrade plan for extra {addon.name}
        </div>
      )}

      <div className="flex items-center gap-[1rem] mt-[1.2rem]">
        <Button
          className="bg-brand-primary text-white text-[1.4rem] flex gap-[0.5rem] items-center px-[1.6rem] py-[0.8rem] font-[700] border-0"
          onClick={onAdd}
        >
          Add {addon.name}
        </Button>

        <Button
          variant="dangerReverse"
          className="bg-input-filled text-[1.4rem] flex gap-[1rem] items-center px-[1.6rem] py-[0.8rem]"
          onClick={onRemove}
          disabled={isRemoving}
        >
          {isRemoving ? <Loader /> : "Remove Add-on"}
          {!isRemoving && (
            <ImageComponent
              src={icons.xCancelRed}
              alt="Remove"
              width={16}
              height={16}
            />
          )}
        </Button>
      </div>
    </div>
  );
};
