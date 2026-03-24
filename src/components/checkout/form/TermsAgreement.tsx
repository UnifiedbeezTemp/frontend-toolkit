"use client";

import Checkbox from "../../ui/CheckBox";
import { Controller } from "react-hook-form";
import { CheckoutFormData } from "../hooks/useCheckoutForm";
import type { Control } from "react-hook-form";
import { getDateAfter30Days, formatPrice } from "../../../lib/utils";
import Link from "next/link";

interface TermsAgreementProps {
  control: Control<CheckoutFormData>;
  planTitle?: string;
  totalPrice?: number;
  isYearly?: boolean;
}

export default function TermsAgreement({
  control,
  planTitle = "Selected Plan",
  totalPrice = 0,
  isYearly = false,
}: TermsAgreementProps) {
  const futureDate = getDateAfter30Days();

  const formattedPrice = formatPrice(totalPrice);

  return (
    <div className="mt-[1.6rem] space-y-[1rem]">
      <Controller
        name="agreeToTerms"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="flex gap-[1rem]">
            <Checkbox
              className="shrink-0"
              checked={field.value}
              onChange={field.onChange}
            />
            <div>
              <p className="text-[1.4rem] text-text-secondary">
                I authorize <strong>UnifiedBeez</strong> to charge my payment
                method on <strong>{futureDate}</strong> after the expiration of
                my 30-day Free Trial. Following the trial, I will be charged{" "}
                <strong>{formattedPrice}</strong>{" "}
                {isYearly ? "annually" : "monthly"} for the{" "}
                <strong>{planTitle} Plan</strong> (including any selected
                add-ons), plus applicable tax, until I cancel. I understand I
                can cancel anytime through the Account and Billing page. By
                selecting &quot;I authorize&quot;, I acknowledge the{" "}
                <Link
                  href={`${process.env.NEXT_PUBLIC_WEBSITE}/privacy-policy`}
                  target="_black"
                >
                  <strong className="hover:underline">Privacy Policy</strong>{" "}
                  {/* <strong>Marketing Free Trial Offer Terms</strong> */}
                </Link>
                and{" "}
                <Link
                  href={`${process.env.NEXT_PUBLIC_WEBSITE}/terms-of-use`}
                  target="_black"
                >
                  <strong className="hover:underline">Terms of Use</strong>
                </Link>
                . UnifiedBeez&apos;s Global Privacy Statement applies to all
                personal information collected.
              </p>
              {error && (
                <p className="text-destructive text-sm mt-1 text-[1.4rem]">
                  {error.message}
                </p>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
}
