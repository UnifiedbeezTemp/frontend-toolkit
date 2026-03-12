"use client";

import Modal from "../../../../../modal/Modal";
import BuyMessagesHeader from "./BuyMessagesHeader";
import CurrentUsageOverview from "./CurrentUsageOverview";
import PackageCard from "./PackageCard";
import BuyMessagesInclusions from "./BuyMessagesInclusions";
import BuyMessagesFooter from "./BuyMessagesFooter";
import { UsageMetric, MessagePackage } from "../../hooks/useUsageSettings";

interface BuyMessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  usage: UsageMetric;
  packages: MessagePackage[];
  selectedPackageId: string | null;
  onSelectPackage: (id: string) => void;
}

export default function BuyMessagesModal({
  isOpen,
  onClose,
  usage,
  packages,
  selectedPackageId,
  onSelectPackage,
}: BuyMessagesModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xxl"
      className="overflow-hidden w-full lg:w-[64rem] !p-0 h-[98dvh] sm:h-auto rounded-t-[2rem] sm:rounded-[1rem]"
      bottomSheet
    >
      <BuyMessagesHeader onClose={onClose} />

      <div className="p-[1.6rem] sm:p-[2.4rem] flex flex-col gap-[2.4rem]">
        <CurrentUsageOverview usage={usage} />

        <div className="flex flex-col gap-[1.2rem]">
          <h3 className="text-[1.4rem] font-bold text-text-secondary">
            Select a Package
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.2rem]">
            {packages.map((pkg) => (
              <PackageCard
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
          console.log("Selected package:", selectedPackageId);
          onClose();
        }}
        isSelectDisabled={!selectedPackageId}
      />
    </Modal>
  );
}
