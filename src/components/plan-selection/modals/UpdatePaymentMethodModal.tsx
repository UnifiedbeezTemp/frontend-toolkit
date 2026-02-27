import React from "react";
import Modal from "../../modal/Modal";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { useUpdatePaymentMethod } from "../hooks/useUpdatePaymentMethod";
import { PaymentMethodData } from "../../../api/services/auth/types";
import { useStripeContext } from "../../../contexts/stripeContext";
import PreLoader from "../../ui/PreLoader";
import { CARD_ELEMENT_OPTIONS } from "../constants/stripeConstants";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newMethod: PaymentMethodData) => void;
}

function UpdatePaymentMethodContent({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (newMethod: PaymentMethodData) => void;
}) {
  const { handleUpdate, isUpdating, updateError, setUpdateError } =
    useUpdatePaymentMethod({
      onSuccess,
    });

  return (
    <div className="px-[2rem] py-[3.2rem] sm:px-[4rem] md:px-[6.4rem]">
      <div className="flex flex-col items-center justify-center text-center">
        <Heading
          align="center"
          className="text-[2.4rem] sm:text-[3.2rem] lg:text-[3.5rem] mb-[0.8rem]"
        >
          Update Payment Method
        </Heading>

        <Text
          align="center"
          size="sm"
          color="muted"
          className="mt-[0.8rem] max-w-[40rem] leading-base mx-auto"
        >
          Please enter your new card details below. This card will be saved for
          your future subscription charges.
        </Text>

        <div className="w-full mt-[3.2rem] mb-[4rem] text-left">
          <label className="block text-[1.4rem] font-bold text-text-secondary mb-[0.8rem]">
            Card Details
          </label>
          <div className="p-[1.6rem] border border-border rounded-[1.2rem] bg-gray-25 focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all">
            <CardElement
              options={CARD_ELEMENT_OPTIONS}
              onChange={() => setUpdateError(null)}
            />
          </div>
          {updateError && (
            <p className="text-[#cc0e11] text-[1.2rem] mt-[0.8rem]">
              {updateError}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-[1.2rem] w-full">
        <Button
          className="w-full sm:flex-1"
          onClick={handleUpdate}
          loading={isUpdating}
        >
          Update Card
        </Button>
        <Button
          variant="secondary"
          className="w-full sm:flex-1"
          onClick={onClose}
          disabled={isUpdating}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default function UpdatePaymentMethodModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const { stripe } = useStripeContext();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="rounded-[1.6rem]"
      size="md"
      isBlur
      bottomSheet
    >
      {stripe ? (
        <Elements stripe={stripe}>
          <UpdatePaymentMethodContent onClose={onClose} onSuccess={onSuccess} />
        </Elements>
      ) : (
        <div className="">
          <PreLoader isPage={false} height={200} />
        </div>
      )}
    </Modal>
  );
}
