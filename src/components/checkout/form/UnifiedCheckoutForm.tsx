"use client";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { CheckoutFormData } from "../hooks/useCheckoutForm";
import Button from "../../ui/Button";
import { useStripePayment } from "../hooks/useStripePayment";
import Loader from "../../ui/Loader";
import FormField from "../../forms/FormField";
import {
  CARD_NUMBER_OPTIONS,
  CARD_EXPIRY_OPTIONS,
  CARD_CVC_OPTIONS,
} from "../../plan-selection/constants/stripeConstants";
import { cn } from "../../../lib/utils";
import TermsAgreement from "../form/TermsAgreement";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import { useRouter } from "next/navigation";

interface UnifiedCheckoutFormProps {
  control: Control<CheckoutFormData>;
  clientSecret: string;
  planTitle?: string;
  displayPrice?: number;
  isYearly?: boolean;
  onPaymentMethodAttached?: () => void;
  handleSubmit: UseFormHandleSubmit<CheckoutFormData>;
}

export default function UnifiedCheckoutForm({
  control,
  clientSecret,
  planTitle,
  displayPrice,
  isYearly,
  onPaymentMethodAttached,
  handleSubmit,
}: UnifiedCheckoutFormProps) {
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

  const icons = useSupabaseIcons();

  const router = useRouter()

  return (
    <div className="space-y-[3.2rem] mt-[3rem]">
      <section className="space-y-[1.6rem]">
        <h3 className="text-[1.8rem] font-[700] text-text-primary flex items-center gap-[0.8rem]">
          <span className="w-[0.4rem] h-[1.8rem] bg-brand-primary rounded-full" />
          Billing Information
        </h3>

        <div className="grid gap-[1.6rem]">
          <FormField
            control={control}
            labelClassName="font-[500] text-[1.4rem]"
            showRequired
            name="cardHolderName"
            type="text"
            label="Name on card"
            placeholder="Enter name as it appears on your card"
            required
          />

          <FormField
            control={control}
            labelClassName="font-[500] text-[1.4rem]"
            showRequired
            name="address"
            type="text"
            label="Address"
            placeholder="Enter billing address"
            required
          />

          <div className="grid grid-cols-2 gap-[1.6rem]">
            <FormField
              control={control}
              labelClassName="font-[500] text-[1.4rem]"
              showRequired
              name="city"
              type="text"
              label="City"
              placeholder="City"
              required
            />
            <FormField
              control={control}
              labelClassName="font-[500] text-[1.4rem]"
              showRequired
              name="state"
              type="text"
              label="State / County"
              placeholder="State"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-[1.6rem]">
            <FormField
              control={control}
              labelClassName="font-[500] text-[1.4rem]"
              showRequired
              name="postalCode"
              type="text"
              label="Postal Code"
              placeholder="Postal Code"
              required
            />
            <FormField
              control={control}
              labelClassName="font-[500] text-[1.4rem]"
              showRequired
              name="country"
              type="text"
              label="Country"
              placeholder="IE, GB, US..."
              required
            />
          </div>
        </div>
      </section>

      {/* Payment Details Section */}
      <section className="space-y-[1.6rem] pt-[1.6rem] border-t border-input-stroke">
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
                onChange={handleCardNumberChange}
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
        </div>
      </section>

      {/* Agreement & Action */}
      <div className="">
        <TermsAgreement
          control={control}
          planTitle={planTitle}
          totalPrice={displayPrice}
          isYearly={isYearly}
        />

        {error && (
          <p className="text-destructive text-[1.3rem] font-[500] mt-[1.6rem] flex items-center gap-[0.5rem]">
            <span className="inline-block w-[0.4rem] h-[0.4rem] bg-destructive rounded-full" />
            {error}
          </p>
        )}

        <Button
          variant="primary"
          className="w-full text-[1.6rem] font-[700] shadow-lg shadow-brand-primary/20 mt-[2.4rem] highlight-inside border-0"
          onClick={handleSubmit(handlePaymentSubmit)}
          loading={processing}
          disabled={!cardComplete}
        >
          {processing ? <Loader /> : "Start My 30-Day Free Trial"}
        </Button>
        <Button
          variant="secondary"
          className="w-full mt-[1rem]"
          onClick={() => router.back()}
        >
          Go back
        </Button>

        <p className="text-[1.2rem] text-text-secondary font-[500] text-center mt-[1.2rem] flex items-center justify-center">
          <ImageComponent
            alt="stripe"
            src={icons.stripeIconCircle}
            width={20}
            height={20}
          />
          Securely processed by Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
