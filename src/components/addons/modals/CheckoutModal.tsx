import Modal from "../../modal/Modal";
import CloseModalButton from "../../modal/CloseModalButton";
import { CheckoutHeader } from "./CheckoutHeader";
import { AddonItem } from "./AddonItem";
import { PriceSummary } from "./PriceSummary";
import { LimitWarning } from "./LimitWarning";
import { CheckoutActions } from "./CheckoutActions";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import { useCheckoutModal } from "./hooks/useCheckoutModal";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAddons: Addon[];
  planType: string | undefined;
  isYearly: boolean;
  onQuantityChange: (id: string, quantity: number) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedAddons,
  planType,
  isYearly,
  onQuantityChange,
}) => {
  const {
    calculateAddonPrice,
    planFee,
    subtotal,
    vat,
    total,
    hasLimitReachedAddons,
    isPurchasing,
    handleConfirmPurchase,
    hasTrialInfo,
  } = useCheckoutModal({
    selectedAddons,
    planType,
    isYearly,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="px-[2.5rem] py-[2.4rem] lg:pb-0 rounded-t-[2.6rem] max-h-[90vh] overflow-y-auto sm:rounded-[1.6rem] sm:w-[67.6rem]"
      bottomSheet
    >
      <div className="flex items-center justify-between mb-[2rem]">
        <div className="w-[4rem]"></div>
        <CloseModalButton onClick={onClose} />
      </div>

      <CheckoutHeader />

      <div className="flex-1 overflow-y-auto px-[2.5rem] custom-scrollbar min-h-0">
        <div className="mt-[1rem] pb-[2.4rem]">
          {hasTrialInfo && (
            <div className="flex items-center justify-between text-[1.6rem] text-inactive-color mb-[2.4rem] font-bold">
              <span>Plan Fee</span>
              <span>£{planFee}</span>
            </div>
          )}

          {selectedAddons.map((addon) => (
            <AddonItem
              key={addon.id}
              addon={addon}
              onQuantityChange={onQuantityChange}
              calculateAddonPrice={calculateAddonPrice}
            />
          ))}

          <PriceSummary subtotal={subtotal} vat={vat} total={total} />

          {hasTrialInfo && (
            <p className="text-[1.3rem] text-text-secondary text-center mb-[0.8rem]">
              This amount will be added to your billing cycle.
            </p>
          )}

          <LimitWarning hasLimitReachedAddons={hasLimitReachedAddons} />
        </div>
      </div>

      <CheckoutActions
        onClose={onClose}
        onConfirmPurchase={handleConfirmPurchase}
        isLoading={isPurchasing}
      />
    </Modal>
  );
};
