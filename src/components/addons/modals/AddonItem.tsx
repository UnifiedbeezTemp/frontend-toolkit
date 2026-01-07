import ImageComponent from "next/image";
import { useAddonItem } from "./hooks/useAddonItem";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import Button from "../../ui/Button";

interface AddonItemProps {
  addon: Addon;
  onQuantityChange: (id: string, quantity: number) => void;
  calculateAddonPrice: (addon: Addon) => number;
}

export const AddonItem: React.FC<AddonItemProps> = ({
  addon,
  onQuantityChange,
  calculateAddonPrice,
}) => {
  const {
    getButtonIcons,
    buttonVariant,
    textColor,
    handleDecrease,
    handleIncrease,
    isAtMinimum,
    canIncrease,
  } = useAddonItem({ addon, onQuantityChange });

  return (
    <div className="pb-[2.4rem] mt-[2.4rem] sm:mt-0 border-b sm:border-0 border-inactive-color flex justify-between items-start sm:items-center">
      <div className="flex-1 shrink-0 w-[50%]">
        <p className={`font-[700] text-[1.6rem] ${textColor}`}>
          {addon.used} {addon.name}
        </p>
      </div>

      <div className="flex flex-col items-end justify-between gap-[1rem] sm:flex-row-reverse sm:gap-[.3rem] w-[20%]">
        <span className="text-[2rem] font-[700] text-text-primary w-[50%] block shrink-0 text-right">
          £{calculateAddonPrice(addon)}
        </span>

        <div className="flex gap-[.5rem]">
          <Button
          //@ts-ignore
            variant={buttonVariant}
            className="font-[700] p-[0.8rem] min-w-[3.2rem] h-[3.2rem] flex items-center justify-center"
            onClick={handleDecrease}
            disabled={isAtMinimum}
          >
            <ImageComponent
              src={getButtonIcons("minus")}
              alt="Decrease"
              width={12}
              height={12}
            />
          </Button>
          <span
            className={`text-[1.6rem] sm:text-[2rem] font-[700] min-w-[2rem] text-center ${textColor}`}
          >
            {addon.used}
          </span>
          <Button
          //@ts-ignore
            variant={buttonVariant}
            className="font-[700] p-[0.8rem] min-w-[3.2rem] h-[3.2rem] flex items-center justify-center"
            onClick={handleIncrease}
            disabled={!canIncrease}
          >
            <ImageComponent
              src={getButtonIcons("plus")}
              alt="Increase"
              width={12}
              height={12}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
