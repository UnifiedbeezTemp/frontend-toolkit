import Button from "@/shared/src/components/ui/Button";

interface CheckoutActionsProps {
  onClose: () => void;
  onProceedToPayment: () => void;
}

export const CheckoutActions: React.FC<CheckoutActionsProps> = ({
  onClose,
  onProceedToPayment,
}) => {
  return (
    <div className="mt-[2rem] sm:mt-0 sm:pt-[0] py-[2.4rem] flex flex-col gap-[1rem] sm:flex-row-reverse">
      <Button className="w-full" onClick={onProceedToPayment}>
        Go to Checkout
      </Button>
      <Button className="w-full" variant="secondary" onClick={onClose}>
        Go back
      </Button>
    </div>
  );
};
