"use client";

import Modal from "../../../../../modal/Modal";
import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import Button from "../../../../../ui/Button";
import CreditPackageItem from "./CreditPackageItem";
import { CreditPackage } from "../../hooks/useCreditSettings";
import CloseModalButton from "../../../../../modal/CloseModalButton";

interface CreditPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  packages: CreditPackage[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function CreditPurchaseModal({
  isOpen,
  onClose,
  onContinue,
  packages,
  selectedId,
  onSelect,
}: CreditPurchaseModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      bottomSheet
      className="sm:w-[60rem] p-0 overflow-hidden"
    >
      <div className="flex items-center justify-between p-[1.6rem] sm:p-[2.4rem]">
        <div className="">
          <Heading className="text-[2.4rem] font-bold text-text-secondary mb-[0.8rem]">
            Select Credit Package
          </Heading>
          <Text className="text-[1.4rem] text-text-primary font-medium">
            Choose the package that best fits your needs
          </Text>
        </div>

        <CloseModalButton onClick={onClose} className="border-0" />
      </div>

      <div className="px-[1.6rem] sm:px-[2.4rem] space-y-[1.6rem] max-h-[50vh] overflow-y-auto">
        {packages.map((pkg) => (
          <CreditPackageItem
            key={pkg.id}
            pkg={pkg}
            isSelected={selectedId === pkg.id}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className="p-[1.6rem] sm:p-[2.4rem]  border-border flex gap-[1.6rem]">
        <Button variant="secondary" className="w-full" onClick={onClose}>
          Go back
        </Button>
        <Button className="w-full" disabled={!selectedId} onClick={onContinue}>
          Continue
        </Button>
      </div>
    </Modal>
  );
}
