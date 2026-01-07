import Button from "@/shared/src/components/ui/Button";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";

interface QuantitySelectorProps {
  currentQuantity: number;
  onQuantityChange: (quantity: number) => void;
  canAddMore: boolean;
  isLimitReached: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  currentQuantity,
  onQuantityChange,
  canAddMore,
  isLimitReached,
}) => {
  const icons = useSupabaseIcons();

  const getButtonIcons = () => {
    if (isLimitReached) {
      return {
        minus: icons.minusRed,
        plus: icons.plusRed,
      };
    }
    return {
      minus: icons.minus,
      plus: icons.plus,
    };
  };

  const buttonIcons = getButtonIcons();
  const textColor = isLimitReached ? "text-destructive" : "text-text-secondary";

  return (
    <div className="flex items-center gap-[1rem] justify-center py-[4rem] md:py-0 lg:py-[0rem] md:border lg:border-0 rounded-[1.6rem] border-border w-full md:h-full md:min-h-[20rem] lg:min-h-0">
      <div className="flex items-center gap-[2rem] md:gap-[3rem] justify-center w-full h-full">
        <Button
          variant={isLimitReached ? "dangerReverse" : "secondary"}
          className="text-[1.8rem] font-[700] p-[0.9rem] sm:p-[1.2rem] md:p-[1.6rem] md:min-w-[5rem]"
          onClick={() => onQuantityChange(currentQuantity - 1)}
          disabled={currentQuantity <= 1}
        >
          <ImageComponent
            src={buttonIcons.minus}
            alt="Decrease"
            width={15}
            height={15}
            className="md:w-[20px] md:h-[20px]"
          />
        </Button>

        <span
          className={`text-[4rem] sm:text-[7.2rem] font-[700] md:text-[8rem] ${textColor}`}
        >
          {currentQuantity}
        </span>

        <Button
          variant={isLimitReached ? "dangerReverse" : "secondary"}
          className="text-[1.8rem] font-[700] p-[0.9rem] sm:p-[1.2rem] md:p-[1.6rem] md:min-w-[5rem]"
          onClick={() => onQuantityChange(currentQuantity + 1)}
          disabled={!canAddMore}
        >
          <ImageComponent
            src={buttonIcons.plus}
            alt="Increase"
            width={15}
            height={15}
            className="md:w-[20px] md:h-[20px]"
          />
        </Button>
      </div>
    </div>
  );
};
