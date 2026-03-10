"use client";

import Modal from "../../../../../modal/Modal";
import BuyContactsHeader from "./BuyContactsHeader";
import CurrentUsageOverview from "./CurrentUsageOverview";
import ContactPackageCard from "./ContactPackageCard";
import BuyMessagesInclusions from "./BuyMessagesInclusions";
import BuyMessagesFooter from "./BuyMessagesFooter";
import { UsageMetric, ContactPackage } from "../../hooks/useUsageSettings";

interface BuyContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
  usage: UsageMetric;
  packages: ContactPackage[];
  selectedPackageId: string | null;
  onSelectPackage: (id: string) => void;
}

export default function BuyContactsModal({
  isOpen,
  onClose,
  usage,
  packages,
  selectedPackageId,
  onSelectPackage,
}: BuyContactsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xxl"
      className="overflow-hidden w-full lg:w-[64rem] !p-0 h-[98dvh] sm:h-auto rounded-t-[2rem] sm:rounded-[1rem]"
      bottomSheet
    >
      <BuyContactsHeader onClose={onClose} />

      <div className="p-[1.6rem] sm:p-[2.4rem] flex flex-col gap-[2.4rem] overflow-y-auto">
        <CurrentUsageOverview usage={usage} />

        <div className="flex flex-col gap-[1.2rem]">
          <h3 className="text-[1.4rem] font-bold text-text-secondary">
            Select a Package
          </h3>
          <div className="grid grid-cols-1 gap-[1.2rem]">
            {packages.map((pkg) => (
              <ContactPackageCard
                key={pkg.id}
                pkg={pkg}
                isSelected={selectedPackageId === pkg.id}
                onSelect={onSelectPackage}
              />
            ))}
          </div>
        </div>

        <BuyMessagesInclusions />
      </div>

      <BuyMessagesFooter
        onClose={onClose}
        onSelect={() => {
          console.log("Selected contact package:", selectedPackageId);
          onClose();
        }}
        isSelectDisabled={!selectedPackageId}
      />
    </Modal>
  );
}
