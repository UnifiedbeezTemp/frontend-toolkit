"use client";

import { CheckoutFormData } from "../hooks/useCheckoutForm";
import FormField from "../../forms/FormField";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import type { Control } from "react-hook-form";

interface PaymentFormProps {
  control: Control<CheckoutFormData>;
}

export default function PaymentForm({ control }: PaymentFormProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="mt-[2rem] space-y-[1.4rem]">
      <FormField
        control={control}
        labelClassName="font-[400]"
        showRequired
        name="fullName"
        type="text"
        label="Full name"
        placeholder="Enter full name"
        required
      />

      <div className="space-y-[1.4rem] grid gap-[1rem] sm:grid-cols-2 sm:gap-[4rem] sm:space-y-0">
        <FormField
          control={control}
          labelClassName="font-[400]"
          showRequired
          name="state"
          type="text"
          label="State"
          placeholder="Enter state"
          required
        />
        <FormField
          control={control}
          labelClassName="font-[400]"
          showRequired
          name="city"
          type="text"
          label="City"
          placeholder="Enter city"
          required
        />
      </div>

      <div className="space-y-[1.4rem] grid gap-[1rem] sm:grid-cols-2 sm:gap-[4rem] sm:space-y-0">
        <FormField
          control={control}
          labelClassName="font-[400]"
          showRequired
          name="address"
          type="text"
          label="Address"
          placeholder="Enter address"
          required
        />
        <FormField
          control={control}
          labelClassName="font-[400]"
          showRequired
          name="postalCode"
          type="text"
          label="Postal Code"
          placeholder="Enter postal code"
          required
        />
      </div>
    </div>
  );
}
