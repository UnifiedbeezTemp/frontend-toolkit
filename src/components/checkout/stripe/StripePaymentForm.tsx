"use client";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Control } from "react-hook-form";
import { CheckoutFormData } from "../hooks/useCheckoutForm";
import Button from "../../ui/Button";
import { useStripePayment } from "../hooks/useStripePayment";
import Loader from "../../ui/Loader";
import {
  CARD_NUMBER_OPTIONS,
  CARD_EXPIRY_OPTIONS,
  CARD_CVC_OPTIONS,
} from "../../plan-selection/constants/stripeConstants";
import { cn } from "../../../lib/utils";

interface StripePaymentFormProps {
  control: Control<CheckoutFormData>;
  clientSecret: string;
  onPaymentMethodAttached?: () => void;
  setHasSubmitted?: (value: boolean) => void;
}

export default function StripePaymentForm({
  control,
  clientSecret,
  onPaymentMethodAttached,
  setHasSubmitted,
}: StripePaymentFormProps) {
  const {
    cardComplete,
    processing,
    error,
    handleCardNumberChange,
    handleCardExpiryChange,
    handleCardCvcChange,
    handlePaymentSubmit,
  } = useStripePayment({
    control,
    clientSecret,
    onPaymentMethodAttached,
  });

  return (
    <div className="space-y-[2rem] mt-[3rem]">
      {/* Card Number */}
      <div className="space-y-[0.6rem]">
        <label className="block text-[1.4rem] font-[500] text-text-primary">
          Card Number <span className="text-destructive">*</span>
        </label>
        <div
          className={cn(
            "p-[1.4rem] border rounded-[0.8rem] transition-all duration-200 bg-white",
            error
              ? "border-destructive ring-1 ring-destructive/20"
              : "border-input-stroke focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10",
          )}
        >
          <CardNumberElement
            options={CARD_NUMBER_OPTIONS}
            onChange={handleCardNumberChange}
          />
        </div>
      </div>

      {/* Expiry & CVC side by side */}
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
              onChange={handleCardExpiryChange}
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
              onChange={handleCardCvcChange}
            />
          </div>
        </div>
      </div>

      <p className="text-[1.2rem] text-text-secondary font-[500] text-right">
        Securely processed by Stripe
      </p>

      {error && (
        <p className="text-destructive text-[1.3rem] font-[500] flex items-center gap-[0.5rem]">
          <span className="inline-block w-[0.4rem] h-[0.4rem] bg-destructive rounded-full" />
          {error}
        </p>
      )}

      {/* Action Buttons */}
      <div className="pt-[2rem] flex flex-col sm:flex-row-reverse gap-[1.2rem]">
        <Button
          variant="primary"
          className="w-full h-[5rem] text-[1.6rem] font-[700] shadow-lg shadow-brand-primary/20"
          onClick={handlePaymentSubmit}
          loading={processing}
          disabled={!cardComplete}
        >
          {processing ? <Loader /> : "Confirm & Start Free Trial"}
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="w-full h-[5rem] text-[1.6rem] font-[700] border-input-stroke hover:bg-gray-50"
          onClick={() => setHasSubmitted?.(false)}
          disabled={processing}
        >
          Go back
        </Button>
      </div>
    </div>
  );
}
