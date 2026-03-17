import React, { useState } from "react";
import Modal from "../../modal/Modal";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
} from "@stripe/react-stripe-js";
import { useUpdatePaymentMethod } from "../hooks/useUpdatePaymentMethod";
import { PaymentMethodData } from "../../../api/services/auth/types";
import { useStripeContext } from "../../../contexts/stripeContext";
import PreLoader from "../../ui/PreLoader";
import {
  CARD_NUMBER_OPTIONS,
  CARD_EXPIRY_OPTIONS,
  CARD_CVC_OPTIONS,
} from "../constants/stripeConstants";
import PaymentForm from "../../checkout/form/PaymentForm";
import { cn } from "../../../lib/utils";

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
  const {
    control,
    handleSubmit,
    handleUpdate,
    isUpdating,
    updateError,
    setUpdateError,
  } = useUpdatePaymentMethod({
    onSuccess,
  });

  const [cardComplete, setCardComplete] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });

  const isFormValid =
    cardComplete.number && cardComplete.expiry && cardComplete.cvc;

  return (
    <div className="px-[2rem] py-[3.2rem] sm:px-[4rem] max-h-[85vh] overflow-y-auto">
      <div className="flex flex-col">
        <Heading
          align="center"
          className="text-[2.4rem] sm:text-[3.2rem] mb-[0.8rem]"
        >
          Update Payment Method
        </Heading>

        <Text
          align="center"
          size="sm"
          color="muted"
          className="mt-[0.8rem] max-w-[40rem] leading-base mx-auto mb-[3.2rem]"
        >
          Please enter your new card and billing details below. This card will
          be saved for your future subscription charges.
        </Text>

        <section className="space-y-[1.6rem]">
          <h3 className="text-[1.8rem] font-[700] text-text-primary flex items-center gap-[0.8rem]">
            <span className="w-[0.4rem] h-[1.8rem] bg-brand-primary rounded-full" />
            Billing Information
          </h3>
          <PaymentForm control={control} />
        </section>

        <section className="space-y-[1.6rem] mt-[3.2rem] pt-[3.2rem] border-t border-input-stroke">
          <h3 className="text-[1.8rem] font-[700] text-text-primary flex items-center gap-[0.8rem]">
            <span className="w-[0.4rem] h-[1.8rem] bg-brand-primary rounded-full" />
            Card Details
          </h3>

          <div className="space-y-[1.6rem]">
            <div className="space-y-[0.6rem]">
              <label className="block text-[1.4rem] font-[500] text-text-primary">
                Card Number <span className="text-destructive">*</span>
              </label>
              <div
                className={cn(
                  "p-[1.4rem] border rounded-[0.8rem] transition-all duration-200 bg-white",
                  "border-input-stroke focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10",
                )}
              >
                <CardNumberElement
                  options={CARD_NUMBER_OPTIONS}
                  onChange={(e) => {
                    setCardComplete((prev) => ({
                      ...prev,
                      number: e.complete,
                    }));
                    setUpdateError(null);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[1.6rem]">
              <div className="space-y-[0.6rem]">
                <label className="block text-[1.4rem] font-[500] text-text-primary">
                  Expiry Date <span className="text-destructive">*</span>
                </label>
                <div
                  className={cn(
                    "p-[1.4rem] border rounded-[0.8rem] transition-all duration-200 bg-white",
                    "border-input-stroke focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10",
                  )}
                >
                  <CardExpiryElement
                    options={CARD_EXPIRY_OPTIONS}
                    onChange={(e) =>
                      setCardComplete((prev) => ({
                        ...prev,
                        expiry: e.complete,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-[0.6rem]">
                <label className="block text-[1.4rem] font-[500] text-text-primary">
                  CVC <span className="text-destructive">*</span>
                </label>
                <div
                  className={cn(
                    "p-[1.4rem] border rounded-[0.8rem] transition-all duration-200 bg-white",
                    "border-input-stroke focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10",
                  )}
                >
                  <CardCvcElement
                    options={CARD_CVC_OPTIONS}
                    onChange={(e) =>
                      setCardComplete((prev) => ({ ...prev, cvc: e.complete }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {updateError && (
            <p className="text-destructive text-[1.2rem] font-[500] mt-[0.8rem]">
              {updateError}
            </p>
          )}
        </section>
      </div>

      <div className="flex flex-col sm:flex-row gap-[1.2rem] w-full mt-[4rem]">
        <Button
          className="w-full sm:flex-1"
          onClick={handleSubmit(handleUpdate)}
          loading={isUpdating}
          disabled={!isFormValid}
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
