"use client";

import Modal from "../../../../../modal/Modal";
import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import Button from "../../../../../ui/Button";
import CloseModalButton from "../../../../../modal/CloseModalButton";
import PaymentOrderSummary from "./PaymentOrderSummary";
import PaymentMethodSelector from "./PaymentMethodSelector";
import CardDetailsForm from "./CardDetailsForm";
import { CreditPackage } from "../../hooks/useCreditSettings";

interface CreditPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onComplete: () => void;
  selectedPackage: CreditPackage | null;
}

export default function CreditPaymentModal({
  isOpen,
  onClose,
  onBack,
  onComplete,
  selectedPackage,
}: CreditPaymentModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      bottomSheet
      className="sm:w-[51.2rem] p-0 overflow-hidden"
    >
      <div className="flex flex-col p-[1.6rem] sm:p-[2.4rem] sticky top-0 bg-primary">
        <div className="flex items-center justify-between">
          <Heading className="text-[2.4rem] font-bold text-text-secondary">
            Payment Details
          </Heading>
          <CloseModalButton onClick={onClose} className="border-0" />
        </div>
        <Text className="text-[1.4rem] text-text-primary font-medium">
          Complete your purchase securely
        </Text>
      </div>

      <div className="px-[1.6rem] sm:px-[2.4rem]  space-y-[1.6rem] overflow-y-auto">
        <PaymentOrderSummary pkg={selectedPackage} />
        <PaymentMethodSelector />
        <CardDetailsForm />
      </div>

      <div className="p-[1.6rem] sm:p-[2.4rem] flex gap-[1.6rem] sticky bottom-0 bg-primary">
        <Button variant="secondary" className="w-full" onClick={onBack}>
          Back
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            console.log("Processing payment...");
            onComplete();
          }}
        >
          Complete Purchase
        </Button>
      </div>
    </Modal>
  );
}
