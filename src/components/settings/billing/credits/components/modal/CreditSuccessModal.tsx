"use client";

import Modal from "../../../../../modal/Modal";
import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import Button from "../../../../../ui/Button";
import ImageComponent from "../../../../../ui/ImageComponent";
import SuccessOrderSummary from "./SuccessOrderSummary";
import DownloadIcon from "../../../../../../assets/icons/DownloadIcon";
import { CreditPackage } from "../../hooks/useCreditSettings";
import { useSupabaseGifs } from "../../../../../../lib/supabase/useSupabase";

interface CreditSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  selectedPackage: CreditPackage | null;
}

export default function CreditSuccessModal({
  isOpen,
  onClose,
  onDownload,
  selectedPackage,
}: CreditSuccessModalProps) {
  const { celebrationPopup } = useSupabaseGifs();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[59rem] w-full p-0 overflow-hidden rounded-[1.6rem]"
    >
      <div className="p-[1.6rem]  md:p-[4rem] flex flex-col items-center text-center">
        <div className="mb-[2.4rem]">
          <ImageComponent
            src={celebrationPopup}
            alt="Celebration"
            width={168}
            height={168}
            className="w-30.5 h-30.5 md:w-42 md:h-42"
          />
        </div>

        <Heading className="text-[2.4rem] md:text-[3rem] font-bold text-text-secondary mb-[0.8rem]">
          Purchase Successful!
        </Heading>
        <Text className="text-[1.4rem] text-text-primary font-medium mb-[3.2rem]">
          Your credits have been added to your account
        </Text>

        <SuccessOrderSummary pkg={selectedPackage} />

        <div className="flex flex-col sm:flex-row gap-[1.2rem] w-full mt-[3.2rem]">
          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-[0.8rem]"
            onClick={onDownload}
          >
            <DownloadIcon size={16} color="var(--text-secondary)" />
            Download Receipt
          </Button>
          <Button className="w-full" onClick={onClose}>
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
}
