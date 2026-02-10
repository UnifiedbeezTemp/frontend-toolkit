import Button from "../../ui/Button";
import Loader from "../../ui/Loader";

interface CheckoutActionsProps {
  onClose: () => void;
  onConfirmPurchase: () => void;
  isLoading?: boolean;
}

export const CheckoutActions: React.FC<CheckoutActionsProps> = ({
  onClose,
  onConfirmPurchase,
  isLoading = false,
}) => {
  return (
    <div className="mt-[2rem] sm:mt-0 sm:pt-[0] py-[2.4rem] flex flex-col gap-[1rem] sm:flex-row-reverse">
      <Button
        className="w-full"
        onClick={onConfirmPurchase}
        disabled={isLoading}
      >
        {isLoading ? <Loader /> : "Confirm Purchase"}
      </Button>
      <Button
        className="w-full"
        variant="secondary"
        onClick={onClose}
        disabled={isLoading}
      >
        Go back
      </Button>
    </div>
  );
};
