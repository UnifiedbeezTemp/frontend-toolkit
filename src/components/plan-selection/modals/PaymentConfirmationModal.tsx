import React from "react";
import Modal from "../../modal/Modal";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import ImageComponent from "../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { PaymentMethodData } from "../../../api/services/auth/types";
import { ArrowRight, CreditCard } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onUseDifferentCard: () => void;
  paymentMethod: PaymentMethodData;
  planName: string;
  isYearly: boolean;
  loading?: boolean;
}

export default function PaymentConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  onUseDifferentCard,
  paymentMethod,
  planName,
  isYearly,
  loading = false,
}: Props) {
  const icons = useSupabaseIcons();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="rounded-[1.6rem]"
      size="md"
      isBlur
    >
      <div className="px-[2rem] py-[3.2rem] sm:px-[4rem] md:px-[6.4rem]">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Main Icon */}
          <div className="relative mb-[2.4rem]">
            <div className="w-[6.4rem] h-[6.4rem] sm:w-[8rem] sm:h-[8rem] bg-mid-green rounded-full flex items-center justify-center">
              <ImageComponent
                src={icons.greenCreditCard}
                alt="credit card"
                width={32}
                height={32}
              />
            </div>
          </div>

          <Heading
            align="center"
            className="text-[2.4rem] sm:text-[3.2rem] lg:text-[3.5rem] mb-[0.8rem]"
          >
            Confirm Upgrade
          </Heading>

          <Text
            align="center"
            size="sm"
            color="muted"
            className="mt-[0.8rem] max-w-[40rem] leading-base mx-auto"
          >
            Would you like to upgrade to the{" "}
            <span className="font-bold text-text-secondary capitalize">
              {planName}
            </span>{" "}
            plan {isYearly ? "(Yearly)" : "(Monthly)"} using your saved card?
          </Text>

          {/* Card Info Box */}
          <div className="w-full bg-gray-25 border border-border rounded-[1.2rem] p-[1.6rem] sm:p-[2rem] mt-[3.2rem] mb-[4rem]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-[1.2rem] sm:gap-[2rem]">
              <div className="flex items-center gap-[1.2rem] sm:gap-[1.6rem] w-full">
                <div className="w-[4rem] h-[2.8rem] sm:w-[4.8rem] sm:h-[3.2rem] bg-primary border border-border rounded-[0.4rem] flex items-center justify-center shadow-sm shrink-0">
                  <span className="text-[0.9rem] sm:text-[1rem] font-bold uppercase text-text-secondary">
                    {paymentMethod.brand}
                  </span>
                </div>
                <div className="text-left overflow-hidden">
                  <Text
                    weight="medium"
                    size="base"
                    color="primary"
                    className="truncate text-[1.4rem] sm:text-[1.6rem]"
                  >
                    **** **** **** {paymentMethod.last4}
                  </Text>
                  <Text size="xs" color="muted">
                    Expires {paymentMethod.expMonth.toString().padStart(2, "0")}
                    /{paymentMethod.expYear}
                  </Text>
                </div>
              </div>

              <div className="px-[1rem] py-[0.3rem] sm:px-[1.2rem] sm:py-[0.4rem] bg-mid-green rounded-full shrink-0 self-start sm:self-center">
                <Text
                  size="xs"
                  weight="bold"
                  className="text-solid-green text-[1rem] sm:text-[1.2rem]"
                >
                  Active Card
                </Text>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-[1.2rem] w-full items-center">
          <Button
            className="w-full sm:flex-1"
            onClick={onConfirm}
            loading={loading}
          >
            Confirm & Upgrade
          </Button>
          <Button
            variant="secondary"
            className="w-full sm:flex-1"
            onClick={onUseDifferentCard}
          >
            Use a different card
          </Button>
        </div>
      </div>
    </Modal>
  );
}
