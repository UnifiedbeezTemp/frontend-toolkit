"use client";

import { CardElement } from "@stripe/react-stripe-js";
import { Control } from "react-hook-form";
import { CheckoutFormData } from "../hooks/useCheckoutForm";
import Button from "../../ui/Button";
import { useStripePayment } from "../hooks/useStripePayment";
import Loader from "../../ui/Loader";

import { CARD_ELEMENT_OPTIONS } from "../../plan-selection/constants/stripeConstants";
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
    handleCardChange,
    handlePaymentSubmit,
  } = useStripePayment({
    control,
    clientSecret,
    onPaymentMethodAttached,
  });

  return (
    <div className="space-y-[3rem] mt-[3rem]">
      {/* Billing Information Section */}
      <div className="bg-white border border-input-stroke rounded-[1.2rem] p-[2rem] shadow-sm">
        <h3 className="font-[700] text-brand-primary mb-[1.5rem] text-[1.8rem] flex items-center gap-[0.8rem]">
          <span className="w-[0.4rem] h-[1.8rem] bg-brand-primary rounded-full" />
          Billing Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-[1.2rem] gap-x-[2rem] text-[1.4rem]">
          <div className="flex flex-col gap-[0.4rem]">
            <span className="text-text-secondary font-[500]">Full Name</span>
            <span className="text-text-primary font-[600]">
              {control._formValues.fullName || "—"}
            </span>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <span className="text-text-secondary font-[500]">Address</span>
            <span className="text-text-primary font-[600]">
              {control._formValues.address || "—"}
            </span>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <span className="text-text-secondary font-[500]">City & State</span>
            <span className="text-text-primary font-[600]">
              {control._formValues.city}, {control._formValues.state}
            </span>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <span className="text-text-secondary font-[500]">Postal Code</span>
            <span className="text-text-primary font-[600]">
              {control._formValues.postalCode || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Card Details Section */}
      <div className="space-y-[1.2rem]">
        <div className="flex justify-between items-end">
          <label className="block text-[1.5rem] font-[700] text-text-primary">
            Card Details
          </label>
          <span className="text-[1.2rem] text-text-secondary font-[500]">
            Securely processed by Stripe
          </span>
        </div>

        <div
          className={cn(
            "p-[1.4rem] border rounded-[0.8rem] transition-all duration-200 bg-white",
            error
              ? "border-destructive ring-1 ring-destructive/20"
              : "border-input-stroke focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10",
          )}
        >
          <CardElement
            options={CARD_ELEMENT_OPTIONS}
            onChange={handleCardChange}
          />
        </div>

        {error && (
          <p className="text-destructive text-[1.3rem] font-[500] flex items-center gap-[0.5rem]">
            <span className="inline-block w-[0.4rem] h-[0.4rem] bg-destructive rounded-full" />
            {error}
          </p>
        )}
      </div>

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
