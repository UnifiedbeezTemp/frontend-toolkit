import Button from "@/shared/src/components/ui/Button";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";
import { Addon } from "@/shared/src/store/onboarding/types/addonTypes";

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

  if (variant === "add") {
    return (
      <Button className="text-[1.4rem] mt-[2.4rem]" onClick={onAdd}>
        <span className="sm:hidden">Add +</span>
        <span className="sm:block hidden">Add {addon.name}</span>
      </Button>
    );
  }

  const canIncrease = (addon.used || 1) < addon.limit;

  return (
    <div className="mt-[2.4rem]">
      {!canIncrease && (
        <div className="border border-border text-[1.4rem] text-text-primary px-[0.61rem] py-[0.31rem] font-[700] bg-input-filled rounded-[0.4rem] inline-block mb-2">
          Upgrade plan for extra {addon.name}
        </div>
      )}

      <div className="flex items-center justify-between mt-[1.2rem]">
        <Button
          variant="dangerReverse"
          className="bg-input-filled text-[1.4rem] flex gap-[1rem] items-center"
          onClick={onRemove}
          disabled={isRemoving}
        >
          {isRemoving ? (
            <>
              Removing...
              <div className="w-[1.5rem] h-[1.5rem] border-2 border-brand-red border-t-white rounded-full animate-spin" />
            </>
          ) : (
            <>
              Remove
              <ImageComponent
                src={icons.xCancelRed}
                alt="Remove"
                width={20}
                height={20}
              />
            </>
          )}
        </Button>

        <div className="flex items-center gap-[1rem]">
          <Button
            variant="secondary"
            className="text-[1.8rem] font-[700] p-[1.1rem]"
            onClick={() => onQuantityChange?.((addon.used || 1) - 1)}
            disabled={(addon.used || 1) <= 1}
          >
            <ImageComponent
              src={icons.minus}
              alt="Decrease"
              width={20}
              height={20}
            />
          </Button>
          <span className="text-[2rem] font-[700] text-text-secondary">
            {addon.used}
          </span>
          <Button
            variant="secondary"
            className="text-[1.8rem] font-[700] p-[1.1rem]"
            onClick={() => onQuantityChange?.((addon.used || 1) + 1)}
            disabled={!canIncrease}
          >
            <ImageComponent
              src={icons.plus}
              alt="Increase"
              width={20}
              height={20}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
